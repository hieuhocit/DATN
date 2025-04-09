// React
import { useState } from 'react';

// React router
import { Link, useNavigate } from 'react-router-dom';

// React icons
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaEye, FaEyeSlash } from 'react-icons/fa';

// Customs hooks
import { useTheme } from '@/hooks/useTheme';

// toastify
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();

  // Toggle hiển thị mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Xử lý khi nhấn nút "Tiếp tục với Facebook"
  const handleFacebookLogin = async () => {
    try {
      toast.success('Đăng nhập với Facebook thành công!');
      // Đây là nơi bạn sẽ gọi API khi backend sẵn sàng
      // Ví dụ: const response = await fetch('/api/auth/facebook', { method: 'POST' });
      console.log('Gọi API đăng nhập với Facebook');
      // Sau khi có backend, bạn có thể xử lý response ở đây
      // Ví dụ: if (response.ok) { navigate('/dashboard'); }
    } catch (error) {
      console.error('Lỗi khi đăng nhập với Facebook:', error);
    }
  };

  // Xử lý khi nhấn nút "Tiếp tục với Google"
  const handleGoogleLogin = async () => {
    try {
      toast.success('Đăng nhập với Google thành công!'); // Thêm thông báo toast
      console.log('Gọi API đăng nhập với Google');
    } catch (error) {
      console.error('Lỗi khi đăng nhập với Google:', error);
      toast.error('Đăng nhập với Google thất bại! Vui lòng thử lại.'); // Thêm thông báo lỗi
    }
  };

  // Local login
  const handleLocalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validation constants
    const PATTERNS = {
      EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      // Password must contain at least one lowercase letter, one uppercase letter, one special character, and be between 6 to 24 characters long
      PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,24}$/,
    };

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;



  // Kiểm tra email
  if (!email || email.trim() === '') {
    toast.error('Vui lòng nhập email!');
    return;
  } else if (!PATTERNS.EMAIL.test(email)) {
    toast.error('Email không hợp lệ!');
    return;
  }

  // Kiểm tra mật khẩu
  if (!password || password.trim() === '') {
    toast.error('Vui lòng nhập mật khẩu!');
    return;
  } else if (!PATTERNS.PASSWORD.test(password)) {
    toast.error('Mật khẩu phải từ 6-24 ký tự và bao gồm ít nhất 1 chữ thường, 1 chữ hoa và 1 ký tự đặc biệt!');
    return;
  }
  };

  //forgot-password
  const handleForgotPassword = () => {
    // Điều hướng đến trang reset mật khẩu
    navigate('/forgot-password');
    // toast.info('Vui lòng nhập email để đặt lại mật khẩu.');
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
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mt-12 text-center'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
          Đăng nhập tài khoản
        </h2>

        <form className='space-y-4 mt-4' onSubmit={handleLocalLogin}>
          <input
            type='email'
            placeholder='Email'
            name='email'
            className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500'
          />
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Mật khẩu'
              name='password'
              className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500'
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300'
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          <button
            type='submit'
            className='w-full p-3 bg-red-700 text-white rounded-md hover:bg-red-800 transition-all'
          >
            Đăng nhập
          </button>

          {/* Thêm liên kết Quên mật khẩu */}
          <div className='text-right mt-2'>
            <button
              type='button'
              onClick={handleForgotPassword}
              className='text-sm text-purple-700 dark:text-purple-400 hover:underline'
            >
              Quên mật khẩu?
            </button>
          </div>
        </form>

        <div className='relative my-6'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300'>
              Hoặc đăng nhập với
            </span>
          </div>
        </div>

        <div className='space-y-3'>
          <button
            onClick={handleFacebookLogin}
            className='w-full p-3 bg-[#1877F2] text-white rounded-md flex items-center justify-center gap-2 hover:bg-[#1565C0] transition-all'
          >
            <FaFacebookF size={20} />
            <span>Tiếp tục với Facebook</span>
          </button>

          <button
            onClick={handleGoogleLogin}
            className='w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all'
          >
            <FcGoogle size={20} />
            <span>Tiếp tục với Google</span>
          </button>
        </div>

        <p className='text-sm text-gray-600 dark:text-gray-300 mt-4'>
          Chưa có tài khoản?{' '}
          <Link
            to='/sign-up'
            className='text-purple-700 dark:text-purple-400 hover:underline'
          >
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;



