// LoginInput.tsx
interface LoginInputProps {
  register: any;
  error?: string;
  placeholder: string;
  type: string;
}

export const LoginInput = ({ register, error, placeholder, type }: LoginInputProps) => {
  return (
    <div>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className="w-full p-3 h-7 border-gray-400 border-1 text-sm rounded focus:outline-none"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
