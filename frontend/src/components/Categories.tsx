// React router
import { Link } from 'react-router-dom';

// React
import { useState } from 'react';

// React icons
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { IoSearchOutline, IoNotificationsOutline } from 'react-icons/io5';
import { MdOutlineShoppingCart } from 'react-icons/md';

// Hooks
import { useTheme } from '@/hooks/useTheme';

// Categories data
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
  showButtons?: boolean;
}

export default function Categories({ isOpen, closeFn, showButtons = true }: IProps) {
  const { theme, toggleTheme } = useTheme();
  const [openCategories, setOpenCategories] = useState<number[]>([]);

  // Toggle subcategory visibility
  const toggleCategory = (categoryId: number) => {
    setOpenCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Filter parent categories (categories with parentId === null)
  const parentCategories = categories.filter((category) => category.parentId === null);

  // Get subcategories for a given parent category
  const getSubcategories = (parentId: number) =>
    categories.filter((category) => category.parentId === parentId);

  return (
    <>
      <div className="absolute">
        {/* Overlay */}
        <div
          onClick={closeFn}
          className={`${
            isOpen ? 'z-40 opacity-100' : '-z-10 opacity-0'
          } transition-opacity duration-[0.1s] ease-linear fixed inset-0 bg-black/50`}
        ></div>

        {/* Menu */}
        <div
          className={`${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-[0.2s] ease-out max-w-[280px] ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } scroll-smooth custom-scrollbar fixed z-50 top-0 left-0 bottom-0 text-base overflow-y-auto`} // Đồng bộ dark mode
        >
          <nav
            className={`${
              isOpen ? 'opacity-100 delay-[0.2s]' : 'opacity-0'
            } transition-opacity divide-y divide-solid ${
              theme === 'dark' ? 'divide-gray-600' : 'divide-gray-300'
            }`} // Đồng bộ dark mode cho phân cách
          >
            {/* Login/Logout */}
            <ul className="py-2">
              <li>
                <Link
                  className={`block py-2 px-4 ${
                    theme === 'dark'
                      ? 'text-gray-200 hover:bg-gray-700'
                      : 'text-purple-500 hover:bg-purple-100'
                  } focus:bg-purple-100 transition-colors`} // Đồng bộ dark mode
                  to="/login"
                  onClick={closeFn}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 px-4 ${
                    theme === 'dark'
                      ? 'text-gray-200 hover:bg-gray-700'
                      : 'text-purple-500 hover:bg-purple-100'
                  } focus:bg-purple-100 transition-colors`} // Đồng bộ dark mode
                  to="/sign-up"
                  onClick={closeFn}
                >
                  Sign up
                </Link>
              </li>
            </ul>

            {/* Categories */}
            <ul className="py-2">
              {parentCategories.map((category) => {
                const subcategories = getSubcategories(category.id);
                const isOpen = openCategories.includes(category.id);

                return (
                  <li key={category.id}>
                    {/* Parent Category */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className={`py-2 px-4 flex gap-4 items-center justify-between w-full ${
                        theme === 'dark'
                          ? 'text-gray-200 hover:bg-gray-700'
                          : 'text-gray-800 hover:bg-purple-100'
                      } focus:bg-purple-100 transition-colors cursor-pointer`} // Đồng bộ dark mode
                    >
                      <div className="text-left">{category.name}</div>
                      {subcategories.length > 0 && (
                        isOpen ? (
                          <MdKeyboardArrowDown
                            className={`text-xl ${
                              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                            }`} // Đồng bộ dark mode
                          />
                        ) : (
                          <MdKeyboardArrowRight
                            className={`text-xl ${
                              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                            }`} // Đồng bộ dark mode
                          />
                        )
                      )}
                    </button>

                    {/* Subcategories */}
                    {isOpen && subcategories.length > 0 && (
                      <ul className="pl-6">
                        {subcategories.map((subcategory) => (
                          <li key={subcategory.id}>
                            <Link
                              to={`/${subcategory.slug}`}
                              onClick={closeFn}
                              className={`block py-2 px-4 ${
                                theme === 'dark'
                                  ? 'text-gray-300 hover:bg-gray-700'
                                  : 'text-gray-700 hover:bg-purple-100'
                              } focus:bg-purple-100 transition-colors`} // Đồng bộ dark mode
                            >
                              {subcategory.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Action Buttons (Search, Notifications, Cart) - Shown on non-desktop */}
            {showButtons && (
              <div className="py-2">
                <div className="py-2 px-4">
                  <h3
                    className={`text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    } mb-2`} // Đồng bộ dark mode
                  >
                    Actions
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <button
                        className={`flex items-center gap-2 py-2 px-4 w-full text-left ${
                          theme === 'dark'
                            ? 'text-gray-200 hover:bg-gray-700'
                            : 'text-gray-800 hover:bg-purple-100'
                        } focus:bg-purple-100 transition-colors`} // Đồng bộ dark mode
                      >
                        <IoSearchOutline
                          className={`text-xl ${
                            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                          }`} // Đồng bộ dark mode
                        />
                        <span>Tìm kiếm</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className={`flex items-center gap-2 py-2 px-4 w-full text-left ${
                          theme === 'dark'
                            ? 'text-gray-200 hover:bg-gray-700'
                            : 'text-gray-800 hover:bg-purple-100'
                        } focus:bg-purple-100 transition-colors`} // Đồng bộ dark mode
                      >
                        <IoNotificationsOutline
                          className={`text-xl ${
                            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                          }`} // Đồng bộ dark mode
                        />
                        <span>Thông báo</span>
                      </button>
                    </li>
                    <li>
                      <Link
                        to="/cart"
                        onClick={closeFn}
                        className={`flex items-center gap-2 py-2 px-4 w-full text-left ${
                          theme === 'dark'
                            ? 'text-gray-200 hover:bg-gray-700'
                            : 'text-gray-800 hover:bg-purple-100'
                        } focus:bg-purple-100 transition-colors`} // Đồng bộ dark mode
                      >
                        <MdOutlineShoppingCart
                          className={`text-xl ${
                            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                          }`} // Đồng bộ dark mode
                        />
                        <span>Giỏ hàng</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Theme Mode */}
            <div className="py-2">
              <div className="py-2 px-4">
                <button
                  onClick={toggleTheme}
                  className={`btn flex items-center gap-1 hover:scale-[1.01] focus:scale-[1.01] transition-transform ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`} // Đồng bộ dark mode
                >
                  {theme === 'light' ? (
                    <MdOutlineDarkMode className="text-2xl text-purple-800" />
                  ) : (
                    <MdOutlineLightMode className="text-2xl text-purple-800" />
                  )}
                  <span
                    className={`bg-clip-text text-transparent bg-gradient-to-r ${
                      theme === 'dark'
                        ? 'from-blue-400 to-purple-400'
                        : 'from-blue-700 to-purple-800'
                    }`} // Đồng bộ dark mode
                  >
                    Chuyển sang {theme === 'light' ? 'tối' : 'sáng'}
                  </span>
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Close Menu */}
        <div
          className={`${
            isOpen
              ? 'z-60 opacity-100 scale-100 delay-[0.2s]'
              : '-z-10 opacity-0 scale-0'
          } transition-all fixed top-4 right-4`} // Vị trí nút đóng
        >
          <button
            onClick={closeFn}
            className={`cursor-pointer p-3 rounded-full shadow-md hover:scale-[1.05] focus:scale-[1.05] transition-transform ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`} // Đồng bộ dark mode
            aria-label="Đóng menu"
          >
            <IoMdClose
              className={`text-xl ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-600'
              }`} // Đồng bộ dark mode
            />
          </button>
        </div>
      </div>
    </>
  );
}