import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme'; // Import custom hook useTheme

type CTASectionProps = {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
};

export const CTASection = ({
  title = 'Bắt đầu hành trình học tập của bạn ngay hôm nay',
  description = 'Nâng cao kỹ năng, theo đuổi đam mê, và phát triển sự nghiệp với hơn 1000+ khóa học chất lượng cao',
  primaryButtonText = 'Khám phá khóa học',
  primaryButtonLink = '/courses',
  secondaryButtonText = 'Đăng ký ngay',
  secondaryButtonLink = '/sign-up',
}: CTASectionProps) => {
  const { theme } = useTheme(); // Lấy theme từ useTheme hook

  return (
    <section
      className={`py-16 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`} // Đồng bộ nền ngoài với StatsSection và TestimonialsSection
    >
      <div className="container mx-auto px-4">
        <div
          className={`rounded-2xl p-8 md:p-12 shadow-lg ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-900 to-black'
              : 'bg-gradient-to-r from-purple-800 to-gray-900'
          }`} // Giữ nguyên gradient bên trong
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${
                theme === 'dark' ? 'text-gray-100' : 'text-white'
              }`} // Giữ màu chữ vì gradient bên trong vẫn tối
            >
              {title}
            </h2>
            <p
              className={`text-lg md:text-xl mb-8 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-100'
              }`} // Giữ màu chữ vì gradient bên trong vẫn tối
            >
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={primaryButtonLink}
                className={`px-8 py-3 font-semibold rounded-md transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md'
                    : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md'
                }`} // Nút chính giữ nguyên
              >
                {primaryButtonText}
              </Link>
              <Link
                to={secondaryButtonLink}
                className={`px-8 py-3 font-semibold rounded-md transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-transparent border-2 border-gray-300 text-gray-300 hover:bg-gray-800 hover:border-gray-200'
                    : 'bg-transparent border-2 border-white text-white hover:bg-white/10 hover:border-gray-200'
                }`} // Nút phụ giữ nguyên vì gradient bên trong vẫn tối
              >
                {secondaryButtonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;