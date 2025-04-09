import { Link, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'; // Sử dụng FaStar thay vì IoStar
import { useTheme } from '@/hooks/useTheme'; // Import custom hook useTheme

type Course = {
  id: number;
  title: string;
  description: string;
  instructor: string;
  originalPrice: string; // Giá gốc
  discountedPrice: string; // Giá giảm
  discount: string; // Phần trăm giảm giá
  rating: number;
  reviews: string;
  image: string; // Thêm trường image
};

type FeaturedCoursesSectionProps = {
  courses?: Course[];
};

const defaultCourses: Course[] = [
  {
    id: 1,
    title: 'Adobe Illustrator Scratch Course',
    description:
      'Lập trình là việc sử dụng các ngôn ngữ lập trình, các đoạn mã lệnh và các tiện ích có sẵn để xây dựng các chương trình',
    instructor: 'Va Studio',
    originalPrice: '500.000 VNĐ',
    discountedPrice: '650.000 VNĐ',
    discount: '30%',
    rating: 5,
    reviews: '1.2K',
    image: 'https://gamikey.com/wp-content/uploads/2025/03/review-khi-cuoc-doi-cho-ban-qua-quyt-1.png', // Thay bằng URL hình ảnh thực tế
  },
  {
    id: 2,
    title: 'Bootstrap, Vue, Web Framework',
    description:
      'Học cách sử dụng Bootstrap và Vue để xây dựng các ứng dụng web hiện đại',
    instructor: 'Va Studio',
    originalPrice: '500.000 VNĐ',
    discountedPrice: '650.000 VNĐ',
    discount: '30%',
    rating: 4,
    reviews: '2.5K',
    image: 'https://gamikey.com/wp-content/uploads/2025/03/review-khi-cuoc-doi-cho-ban-qua-quyt-1.png',
  },
  {
    id: 3,
    title: 'Design Fundamentals Design Fundamentals',
    description:
      'Tìm hiểu các nguyên tắc cơ bản về thiết kế đồ họa và giao diện người dùng',
    instructor: 'Va Studio',
    originalPrice: '500.000 VNĐ',
    discountedPrice: '650.000 VNĐ',
    discount: '30%',
    rating: 5,
    reviews: '1.8K',
    image: 'https://gamikey.com/wp-content/uploads/2025/03/review-khi-cuoc-doi-cho-ban-qua-quyt-1.png',
  },
  {
    id: 4,
    title: 'Ionic Build iOS, Android & More',
    description:
      'Xây dựng ứng dụng di động đa nền tảng với Ionic và các công nghệ hiện đại',
    instructor: 'Va Studio',
    originalPrice: '500.000 VNĐ',
    discountedPrice: '650.000 VNĐ',
    discount: '30%',
    rating: 4,
    reviews: '3.1K',
    image: 'https://gamikey.com/wp-content/uploads/2025/03/review-khi-cuoc-doi-cho-ban-qua-quyt-1.png',
  },
];

// A reusable Course Card component
const CourseCard = ({ course }: { course: Course }) => {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    navigate(`/course/${course.id}`);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={handleCourseClick}
      role="button"
      tabIndex={0}
    >
      {/* Hình ảnh và tag giảm giá */}
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
          Giảm {course.discount}
        </span>
      </div>

      {/* Nội dung */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
          {course.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {course.instructor}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
          {course.description}
        </p>
        <div className="flex items-center mt-2">
          {[...Array(Math.floor(course.rating))].map((_, i) => (
            <FaStar key={i} className="text-yellow-400" />
          ))}
          {course.rating % 1 !== 0 && <FaStar className="text-yellow-400" />}
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
            ({course.reviews})
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            {course.originalPrice}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
            {course.discountedPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export const FeaturedCoursesSection = ({
  courses = defaultCourses,
}: FeaturedCoursesSectionProps) => {
  const { theme } = useTheme(); // Lấy theme từ useTheme hook

  return (
    <section
      className={`py-16 ${
        theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              Khóa học nổi bật
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Các khóa học phổ biến và được đánh giá cao
            </p>
          </div>
          <Link
            to="/courses"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;