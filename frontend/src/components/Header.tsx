// Logo
import darkLogo from '@assets/icons/dark-logo.svg';
import lightLogo from '@assets/icons/light-logo.svg'; // Thêm logo cho light mode (nếu có)

// React-router
import { Link } from 'react-router-dom';

// React
import { useState, useEffect } from 'react';

// React icons
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoSearchOutline } from 'react-icons/io5';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { IoNotificationsOutline } from 'react-icons/io5';

// Hooks
import { useTheme } from '@/hooks/useTheme'; // Import custom hook useTheme

// Components
import Categories from '@/components/Categories';

export default function Header() {
  const { theme } = useTheme(); // Lấy theme từ useTheme hook
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu closed by default
  const [isDesktop, setIsDesktop] = useState(true); // Track if it's desktop mode

  // Detect screen size to determine if it's desktop
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Tailwind's `lg` breakpoint is 1024px
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header
        className={`flex items-center justify-between px-4 py-4 shadow-lg ${
          theme === 'dark'
            ? 'dark bg-gray-800 text-white'
            : 'bg-white text-gray-800'
        }`}
      >
        <div onClick={() => setIsMenuOpen(true)} className="cursor-pointer">
          <RxHamburgerMenu
            className={`text-[28px] ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
          />
        </div>
        <div className="w-[120px] h-[30px] -mr-[28px]">
          <Link to={'/'}>
            <img
              className="w-full h-full"
              src={theme === 'dark' ? darkLogo : lightLogo} // Chuyển đổi logo theo theme
              alt="EduGenius Logo"
            />
          </Link>
        </div>
        {/* Buttons (visible only on desktop) */}
        <div className="hidden lg:flex items-center gap-5">
          <IoSearchOutline
            className={`text-[28px] ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
          />
          <IoNotificationsOutline
            className={`text-[28px] ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
          />
          <Link to="/cart">
            <MdOutlineShoppingCart
              className={`text-[28px] ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}
            />
          </Link>
        </div>
      </header>
      <Categories
        isOpen={isMenuOpen}
        closeFn={() => setIsMenuOpen(false)}
        showButtons={!isDesktop} // Show buttons in the menu on non-desktop
      />
    </>
  );
}