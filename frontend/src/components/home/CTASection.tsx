import { Link } from 'react-router-dom';

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
  secondaryButtonLink = '/signup',
}: CTASectionProps) => {
  return (
    <section className='py-16 bg-gray-50 dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        <div className='bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12'>
          <div className='max-w-3xl mx-auto text-center text-white'>
            <h2 className='text-3xl font-bold mb-6'>{title}</h2>
            <p className='text-xl mb-8'>{description}</p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                to={primaryButtonLink}
                className='px-8 py-3 bg-white text-purple-600 font-semibold rounded-md hover:bg-gray-100 transition-colors'
              >
                {primaryButtonText}
              </Link>
              <Link
                to={secondaryButtonLink}
                className='px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white/10 transition-colors'
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
