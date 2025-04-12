import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { LoginInput } from './LoginInput';
import { useUser } from '../context/usercontext';


const loginSchema = z.object({
  uid: z.string().nonempty('UID is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const user = useUser()
  const {setUid} = user
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

 const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const res =await axios.post('http://localhost:4000/api/users/login', data);
      await new Promise((resolve)=> setTimeout(resolve, 5000));
      console.log("Submitting form data");
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data.user.email)
      alert('Login successful!');
      setUid(data.user?.email || data.email)
    },
    onError: (error: any) => {
      alert(error.response?.data?.error || 'Login failed');
    }
  });
  const onSubmit = async (data: LoginFormData) => {
    await loginMutation.mutateAsync(data);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center justify-between max-w-sm space-y-4 p-6 "
      >
        <h2 className="text-center text-xl font-bold tracking-wider">Welcome back!</h2>

        <div className='w-2/3 my-3 ' >
            <LoginInput
              register={register('uid')}
              error={errors.uid?.message}
              placeholder="UID"
              type="text"
            />
        </div>

        <div className='w-2/3'>
            <LoginInput
              register={register('password')}
              error={errors.password?.message}
              placeholder="Password"
              type="password"
            />
        </div>

        <button
          type="submit" disabled={isSubmitting}
          className="w-2/3 mt-5 bg-[#263267] text-white p-3 rounded hover:bg-[#1c234f]"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};
