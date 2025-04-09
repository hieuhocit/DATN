import { useTheme } from '@/hooks/useTheme'; // Import custom hook useTheme
import { FaStar } from 'react-icons/fa'; // Import icon ngôi sao để hiển thị đánh giá

type CourseItem = {
  name: string;
  author: string;
  description: string;
  rating: number;
  ratingCount: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  image: string;
};

type CoursesSectionProps = {
  courses?: CourseItem[];
};

const defaultCourses: CourseItem[] = [
  {
    name: 'Adobe Illustrator Scratch Course',
    author: 'Va Studio',
    description:
      'Lập trình là việc sử dụng các ngôn ngữ lập trình, các đoạn mã lệnh và các tiện ích có sẵn để xây dựng các chương trình',
    rating: 5,
    ratingCount: '1.2K',
    originalPrice: '500.000 VNĐ',
    discountedPrice: '650.000 VNĐ',
    discount: '30%',
    image: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2025/4/2/1485946/Iu-Park-Bo-Gum-4225.jpg', // Thay bằng URL hình ảnh thực tế
  },
  {
    name: 'Bootstrap, Vue, Web Framework',
    author: 'Va Studio',
    description:
      'Học cách sử dụng Bootstrap và Vue để xây dựng các ứng dụng web hiện đại',
    rating: 4,
    ratingCount: '2.5K',
    originalPrice: '500.000 VNĐ',
    discountedPrice: '650.000 VNĐ',
    discount: '30%',
    image: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2025/4/2/1485946/Iu-Park-Bo-Gum-4225.jpg',
  },
  {
    name: 'Design Fundamentals Fundamentals',
    author: 'Va Studio',
    description:
      'Tìm hiểu các nguyên tắc cơ bản về thiết kế đồ họa và giao diện người dùng',
    rating: 5,
    ratingCount: '1.8K',
    originalPrice: '500.000 VNĐ',
    discountedPrice: '650.000 VNĐ',
    discount: '30%',
    image: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2025/4/2/1485946/Iu-Park-Bo-Gum-4225.jpg',
  },
  {
    name: 'Ionic Build iOS, Android & More',
    author: 'Va Studio',
    description:
      'Xây dựng ứng dụng di động đa nền tảng với Ionic và các công nghệ hiện đại',
    rating: 4,
    ratingCount: '3.1K',
    originalPrice: '500.000 VNĐ',
    discountedPrice: '650.000 VNĐ',
    discount: '30%',
    image: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2025/4/2/1485946/Iu-Park-Bo-Gum-4225.jpg',
  },
  // Thêm các khóa học khác nếu cần
];

export const CoursesSection = ({
  courses = defaultCourses,
}: CoursesSectionProps) => {
  const { theme } = useTheme(); // Lấy theme từ useTheme hook

  return (
    <section
      className={`py-16 ${
        theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Tiêu đề và mô tả */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Lựa chọn chương trình đào tạo độc quyền
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Học ngay các chương trình đào tạo độc quyền được chọn lọc
          </p>
        </div>

        {/* Grid khóa học */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Hình ảnh và tag giảm giá */}
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  Giảm {course.discount}
                </span>
              </div>

              {/* Nội dung */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                  {course.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {course.author}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center mt-2">
                  {[...Array(course.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    ({course.ratingCount})
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;