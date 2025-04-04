// React router
import { Link } from 'react-router-dom';

// React icons
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdOutlineDarkMode } from 'react-icons/md';
import { MdOutlineLightMode } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';

const categories = [
  {
    id: 1,
    name: 'Development',
    description: 'Courses related to software development.',
    slug: 'development',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Web Development',
    description: 'Learn about building websites.',
    slug: 'web-development',
    parentId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'Data Science',
    description: 'Courses on data analysis and machine learning.',
    slug: 'data-science',
    parentId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: 'Mobile Development',
    description: 'Learn to build mobile apps.',
    slug: 'mobile-development',
    parentId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: 'Business',
    description: 'Business-related courses.',
    slug: 'business',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    name: 'Entrepreneurship',
    description: 'Learn how to start and run a business.',
    slug: 'entrepreneurship',
    parentId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    name: 'Finance & Accounting',
    description: 'Courses related to finance and accounting.',
    slug: 'finance-accounting',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    name: 'Accounting & Bookkeeping',
    description: 'Learn the fundamentals of accounting.',
    slug: 'accounting-bookkeeping',
    parentId: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    name: 'IT & Software',
    description: 'Courses on IT and software.',
    slug: 'it-software',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    name: 'Office Productivity',
    description: 'Improve your productivity with office software.',
    slug: 'office-productivity',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11,
    name: 'Personal Development',
    description: 'Courses on personal growth and development.',
    slug: 'personal-development',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 12,
    name: 'Design',
    description: 'Courses related to design.',
    slug: 'design',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 13,
    name: 'Marketing',
    description: 'Courses related to marketing strategies.',
    slug: 'marketing',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 14,
    name: 'Lifestyle',
    description: 'Courses on various lifestyle topics.',
    slug: 'lifestyle',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 15,
    name: 'Photography & Video',
    description: 'Learn photography and video production.',
    slug: 'photography-video',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 16,
    name: 'Health & Fitness',
    description: 'Courses related to health and fitness.',
    slug: 'health-fitness',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 17,
    name: 'Music',
    description: 'Courses on music theory and practice.',
    slug: 'music',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 18,
    name: 'Teaching & Academics',
    description: 'Courses related to education and teaching.',
    slug: 'teaching-academics',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface IProps {
  isOpen: boolean;
  closeFn: () => void;
}

export default function Categories({ isOpen, closeFn }: IProps) {
  console.log(categories);

  return (
    <>
      <div className='absolute'>
        {/* Overlay */}
        <div
          className={`${
            isOpen ? 'z-10 opacity-100' : '-z-10 opacity-0 '
          } transition-opacity duration-[0.1s] ease-linear fixed inset-0 bg-black/50`}
        ></div>

        {/* Menu */}
        <div
          className={`${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-[0.2s] ease-out max-w-[280px] bg-white scroll-smooth custom-scrollbar fixed z-20 top-0 left-0 bottom-0 text-base`}
        >
          <nav
            className={`${
              isOpen ? 'opacity-100 delay-[0.2s]' : 'opacity-0'
            } transition-opacity divide-y divide-solid divide-gray-300`}
          >
            {/* Login/Logout */}
            <ul className='py-2'>
              <li>
                <Link
                  className='block py-2 px-4 text-purple-500 hover:bg-purple-100 focus:bg-purple-100 transition-colors'
                  to='/login'
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className='block py-2 px-4 text-purple-500 hover:bg-purple-100 focus:bg-purple-100 transition-colors'
                  to='/register'
                >
                  Sign up
                </Link>
              </li>
            </ul>

            {/* Categories */}
            <ul className='py-2'>
              <li>
                <button className='py-2 px-4 flex gap-4 items-center justify-between w-full hover:bg-purple-100 focus:bg-purple-100 transition-colors cursor-pointer'>
                  <div className='text-left'>Web Development</div>
                  <MdKeyboardArrowRight className='text-xl' />
                </button>
              </li>
            </ul>

            {/* Theme mode  */}
            <div className='py-2'>
              <div className='py-2 px-4 '>
                <button className='btn flex items-center gap-1 hover:scale-[1.01] focus:scale-[1.01] transition-transform'>
                  <MdOutlineDarkMode className='text-2xl text-purple-800' />
                  {/* <MdOutlineLightMode className='text-2xl text-purple-800' /> */}
                  <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-800'>
                    Chuyển sang tối
                  </span>
                </button>
              </div>
            </div>
          </nav>

          {/* Close menu  */}
          <div
            className={`${
              isOpen
                ? 'z-10 opacity-100 scale-100 delay-[0.2s]'
                : '-z-10 opacity-0 scale-0'
            } transition-all absolute top-4 -right-4 translate-x-full`}
          >
            <button
              onClick={closeFn}
              className='cursor-pointer bg-white p-3 rounded-full hover:scale-[1.05] focus:scale-[1.05] transition-transform'
            >
              <IoMdClose className='text-xl' />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
