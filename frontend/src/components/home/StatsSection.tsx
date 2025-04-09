import { useTheme } from '@/hooks/useTheme'; // Import custom hook useTheme

type StatItem = {
  value: string;
  label: string;
};

type StatsSectionProps = {
  stats?: StatItem[];
  title?: string;
  description?: string;
};

const defaultStats: StatItem[] = [
  { value: '10K+', label: 'Khóa học' },
  { value: '5M+', label: 'Học viên' },
  { value: '200+', label: 'Giảng viên' },
  { value: '150+', label: 'Quốc gia' },
];

export const StatsSection = ({
  stats = defaultStats,
  title = 'Tại sao chọn EduGenius?',
  description = 'Nền tảng học tập trực tuyến hàng đầu với các khóa học chất lượng từ chuyên gia',
}: StatsSectionProps) => {
  const { theme } = useTheme(); // Lấy theme từ useTheme hook

  return (
    <section
      className={`py-16 relative overflow-hidden ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`} // Đặt nền giống TestimonialsSection
    >
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-lg md:text-xl ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {description}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
              } shadow-md`}
            >
              <div
                className={`text-4xl md:text-5xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                }`}
              >
                {stat.value}
              </div>
              <div
                className={`text-lg ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;