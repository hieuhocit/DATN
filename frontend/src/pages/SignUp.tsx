// React
import React, { useState } from 'react';

// React router
import { Link, useNavigate } from 'react-router-dom';

// React icons
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaEye, FaEyeSlash } from 'react-icons/fa';

// Custom hooks
import { useTheme } from '@/hooks/useTheme';

// toastify
import { toast } from 'react-toastify';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();

  //
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Email, password
  const handleLocalSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const PATTERNS = {
      EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,24}$/,
    };

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    if (!name || name.trim() === '') {
      toast.error('Vui lòng nhập tên!');
      return;
    }

    if (!email || email.trim() === '') {
      toast.error('Vui lòng nhập email!');
      return;
    }

    if (!PATTERNS.EMAIL.test(email)) {
      toast.error('Email không hợp lệ!');
      return;
    }

    if (!password || password.trim() === '') {
      toast.error('Vui lòng nhập mật khẩu!');
      return;
    }

    if (!PATTERNS.PASSWORD.test(password)) {
      toast.error(
        'Mật khẩu phải từ 6-24 ký tự và bao gồm ít nhất 1 chữ thường, 1 chữ hoa và 1 ký tự đặc biệt!'
      );
      return;
    }
  };

  // Xử lý khi nhấn nút "Tiếp tục với Facebook"
  const handleFacebookLogin = async () => {
    try {
      toast.success('Đăng ký với Facebook thành công!');
      console.log('Gọi API đăng ký với Facebook');
    } catch (error) {
      console.error('Lỗi khi đăng ký với Facebook:', error);
      toast.error('Đăng ký với Facebook thất bại! Vui lòng thử lại.');
    }
  };

  // Xử lý khi nhấn nút "Tiếp tục với Google"
  const handleGoogleLogin = async () => {
    try {
      toast.success('Đăng ký với Google thành công!');
      console.log('Gọi API đăng ký với Google');
    } catch (error) {
      console.error('Lỗi khi đăng ký với Google:', error);
      toast.error('Đăng ký với Google thất bại! Vui lòng thử lại.');
    }
  };

  return (
    <div
      className={`${
        theme === 'dark' ? 'dark' : ''
      } min-h-screen bg-cover bg-center flex flex-col items-center dark:bg-gray-900`}
      style={{
        backgroundImage:
          "url('https://s3-alpha-sig.figma.com/img/84b5/e273/21aa0ec9bf62b4f0184fc192e721944e?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cAP~NA2JYc2W7W~tXpCU3K4rTCxrarTMEMoU5GyOZ0sGVLosrZVm4dRyiqda2yFuIAXjnWDat~h7ofTwbhmbXVQ8QcBO9EdavzPEf9XvqvTi~VBFiRw2Th5fiAWnoRYNcJorMd2xWWzDXtLM1QMY31GhK42kuQt1WjTaWNJAr~bu9WOhRa8HXOEW1V~qId4syNhFvq~ePlwA5mw76nwJdhi1JsPoiw4s7xRzkHMQTE0V3xHolUgYR7Lr3OM81xp3s0D8djhRmIIbyqqRkEUO4aslvSGX0IB46nSRGbNg6rGRSTkD70EaisJAgPQV8GYGYMmO7wBCCcXQ1kkLnTDKMQ__')",
      }}
    >
      {/* Sign Up Form */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mt-12 text-center'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
          Đăng ký bằng email
        </h2>

        <form className='space-y-4 mt-4' onSubmit={handleLocalSignUp}>
          <input
            type='text'
            name='name'
            placeholder='Tên đầy đủ'
            className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500'
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500'
          />
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Mật khẩu'
              className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500'
            />
            <button
              type='button'
              onClick={handleShowPassword}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300'
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          <button
            type='submit'
            className='w-full p-3 bg-red-700 text-white rounded-md hover:bg-red-800 transition-all'
          >
            Đăng ký
          </button>
        </form>

        {/* Social Login */}
        <div className='relative my-6'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300'>
              Hoặc đăng ký với
            </span>
          </div>
        </div>

        <div className='space-y-3'>
          {/* Nút Facebook */}
          <button
            onClick={handleFacebookLogin}
            className='w-full p-3 bg-[#1877F2] text-white rounded-md flex items-center justify-center gap-2 hover:bg-[#1565C0] transition-all'
          >
            <FaFacebookF size={20} />
            <span>Tiếp tục với Facebook</span>
          </button>

          {/* Nút Google */}
          <button
            onClick={handleGoogleLogin}
            className='w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'
          >
            <FcGoogle size={20} />
            <span>Tiếp tục với Google</span>
          </button>
        </div>

        {/* Login Link */}
        <p className='text-sm text-gray-600 dark:text-gray-300 mt-4'>
          Đã có tài khoản?{' '}
          <Link
            to='/login'
            className='text-purple-700 dark:text-purple-400 hover:underline'
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
