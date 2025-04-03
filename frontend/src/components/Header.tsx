// Logo
import darkLogo from '@assets/icons/dark-logo.svg';

// React-router
import { Link } from 'react-router-dom';

// React
import { useState } from 'react';

// React icons
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoSearchOutline } from 'react-icons/io5';
import { MdOutlineShoppingCart } from 'react-icons/md';

// Components
import Categories from '@/components/Categories';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <>
      <header className='flex items-center justify-between px-4 py-4 shadow-lg'>
        <div onClick={() => setIsMenuOpen(true)} className='cursor-pointer'>
          <RxHamburgerMenu className='text-[28px]' />
        </div>
        <div className='w-[120px] h-[30px] -mr-[28px]'>
          {/* <img className='w-full h-full' src={lightLogo} alt='EduGenius Light Logo' /> */}
          <Link to={'/'}>
            <img
              className='w-full h-full'
              src={darkLogo}
              alt='EduGenius Dark Logo'
            />
          </Link>
        </div>
        <div className='flex items-center gap-5'>
          <IoSearchOutline className='text-[28px]' />
          <MdOutlineShoppingCart className='text-[28px]' />
        </div>
      </header>
      <Categories isOpen={isMenuOpen} closeFn={() => setIsMenuOpen(false)} />
    </>
  );
}
