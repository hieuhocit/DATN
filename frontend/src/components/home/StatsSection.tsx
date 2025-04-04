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
  return (
    <section className='py-16 bg-purple-900 text-white'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto text-center mb-12'>
          <h2 className='text-3xl font-bold mb-4'>{title}</h2>
          <p className='text-purple-200'>{description}</p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          {stats.map((stat, index) => (
            <div key={index} className='text-center'>
              <div className='text-4xl font-bold mb-2'>{stat.value}</div>
              <div className='text-purple-200'>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
