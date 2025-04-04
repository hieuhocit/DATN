import { FaGraduationCap } from 'react-icons/fa';

type CategoryItem = {
  name: string;
  count: string;
};

type CategoriesSectionProps = {
  categories?: CategoryItem[];
};

const defaultCategories: CategoryItem[] = [
  { name: 'Phát triển Web', count: '120+ khóa học' },
  { name: 'Kinh doanh', count: '120+ khóa học' },
  { name: 'Thiết kế đồ họa', count: '120+ khóa học' },
  { name: 'Marketing', count: '120+ khóa học' },
  { name: 'Phát triển cá nhân', count: '120+ khóa học' },
  { name: 'Công nghệ thông tin', count: '120+ khóa học' },
  { name: 'Phát triển Mobile', count: '120+ khóa học' },
  { name: 'Kỹ năng mềm', count: '120+ khóa học' },
];

export const CategoriesSection = ({
  categories = defaultCategories,
}: CategoriesSectionProps) => {
  return (
    <section className='py-16 bg-white dark:bg-gray-800'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold mb-4 text-gray-800 dark:text-white'>
            Khám phá theo danh mục
          </h2>
          <p className='text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            Tìm các khóa học phù hợp với mục tiêu học tập và phát triển sự
            nghiệp của bạn
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {categories.map((category, index) => (
            <div
              key={index}
              className='bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300 cursor-pointer'
            >
              <div className='bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <FaGraduationCap className='text-purple-600 dark:text-purple-300 text-2xl' />
              </div>
              <h3 className='font-semibold text-gray-800 dark:text-white'>
                {category.name}
              </h3>
              <p className='text-sm text-gray-500 dark:text-gray-300 mt-2'>
                {category.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
