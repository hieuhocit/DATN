import { IoStar } from 'react-icons/io5';

type Testimonial = {
  id: number;
  content: string;
  name: string;
  title: string;
  rating: number;
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
  },
  {
    id: 2,
    content:
      'Khóa học này đã giúp tôi thay đổi sự nghiệp. Tôi đã học được rất nhiều kiến thức thực tế và áp dụng được ngay vào công việc. Giảng viên rất tâm huyết và hỗ trợ tận tình.',
    name: 'Trần Minh Quang',
    title: 'Frontend Developer',
    rating: 5,
  },
  {
    id: 3,
    content:
      'Khóa học này đã giúp tôi thay đổi sự nghiệp. Tôi đã học được rất nhiều kiến thức thực tế và áp dụng được ngay vào công việc. Giảng viên rất tâm huyết và hỗ trợ tận tình.',
    name: 'Trần Minh Quang',
    title: 'Frontend Developer',
    rating: 5,
  },
];

// A single testimonial card component
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className='bg-gray-50 dark:bg-gray-700 p-6 rounded-lg'>
      <div className='flex items-center mb-4 text-yellow-500'>
        {[...Array(5)].map((_, i) => (
          <IoStar key={i} />
        ))}
      </div>
      <p className='text-gray-600 dark:text-gray-300 mb-6 italic'>
        "{testimonial.content}"
      </p>
      <div className='flex items-center'>
        <img
          src={`https://source.unsplash.com/random/100x100?portrait,${
            testimonial.id + 10
          }`}
          alt='Student'
          className='w-12 h-12 rounded-full mr-4'
        />
        <div>
          <h4 className='font-semibold text-gray-800 dark:text-white'>
            {testimonial.name}
          </h4>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
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
  return (
    <section className='py-16 bg-white dark:bg-gray-800'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold mb-4 text-gray-800 dark:text-white'>
            {sectionTitle}
          </h2>
          <p className='text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            {sectionDescription}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
