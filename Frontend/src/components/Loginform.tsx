import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { LoginInput } from './LoginInput';


const loginSchema = z.object({
  uid: z.string().nonempty('UID is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

 const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      await axios.post('http://localhost:4000/api/users/login', data);
      return 
    },
    onSuccess: () => {
      alert('Login successful!');
    },
    onError: (error: any) => {
      alert(error.response?.data?.error || 'Login failed');
    }
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
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
          type="submit"
          className="w-2/3 mt-5 bg-[#263267] text-white p-3 rounded hover:bg-[#1c234f]"
        >
          Login
        </button>
      </form>
    </div>
  );
};
