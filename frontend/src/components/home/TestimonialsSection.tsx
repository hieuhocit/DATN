import { useTheme } from '@/hooks/useTheme'; // Import custom hook useTheme
import { FaStar } from 'react-icons/fa'; // Sử dụng FaStar thay vì IoStar

type Testimonial = {
  id: number;
  content: string;
  name: string;
  title: string;
  rating: number;
  image?: string; // Thêm trường image để lưu URL hình ảnh
};

type TestimonialsSectionProps = {
  testimonials?: Testimonial[];
  sectionTitle?: string;
  sectionDescription?: string;
};

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    content:
      'Khóa học này đã giúp tôi thay đổi sự nghiệp. Tôi đã học được rất nhiều kiến thức thực tế và áp dụng được ngay vào công việc. Giảng viên rất tâm huyết và hỗ trợ tận tình.',
    name: 'Trần Minh Quang',
    title: 'Frontend Developer',
    rating: 5,
    image: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2025/3/11/1475297/IU.jpg?w=800&h=496&crop=auto&scale=both', // Thay bằng URL hình ảnh thực tế
  },
  {
    id: 2,
    content:
      'Tôi rất ấn tượng với chất lượng khóa học. Nội dung được thiết kế rất bài bản và dễ hiểu, phù hợp cho cả người mới bắt đầu.',
    name: 'Nguyễn Thị Hồng',
    title: 'UI/UX Designer',
    rating: 4.5,
    image: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2025/3/11/1475297/IU.jpg?w=800&h=496&crop=auto&scale=both',
  },
  {
    id: 3,
    content:
      'Một trải nghiệm học tập tuyệt vời! Tôi đã cải thiện kỹ năng lập trình của mình đáng kể nhờ khóa học này.',
    name: 'Lê Văn Hùng',
    title: 'Backend Developer',
    rating: 5,
    image: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2025/3/11/1475297/IU.jpg?w=800&h=496&crop=auto&scale=both',
  },
];

// A single testimonial card component
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-4">
        {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
        {testimonial.rating % 1 !== 0 && <FaStar className="text-yellow-400" />}
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6 italic line-clamp-4">
        "{testimonial.content}"
      </p>
      <div className="flex items-center">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white">
            {testimonial.name}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {testimonial.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export const TestimonialsSection = ({
  testimonials = defaultTestimonials,
  sectionTitle = 'Người học nói gì về chúng tôi',
  sectionDescription = 'Khám phá những câu chuyện thành công từ học viên trên khắp thế giới',
}: TestimonialsSectionProps) => {
  const { theme } = useTheme(); // Lấy theme từ useTheme hook

  return (
    <section
      className={`py-16 ${
        theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            {sectionTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;