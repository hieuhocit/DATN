import { Link } from 'react-router-dom';
import {
  IoStar,
  IoStarHalf,
  IoTimeOutline,
  IoBookOutline,
} from 'react-icons/io5';
import { MdOutlineOndemandVideo } from 'react-icons/md';

type Course = {
  id: number;
  title: string;
  description: string;
  instructor: string;
  price: string;
  rating: number;
  reviews: string;
  hours: string;
  lessons: string;
  level: string;
  isBestseller?: boolean;
};

type FeaturedCoursesSectionProps = {
  courses?: Course[];
};

const defaultCourses: Course[] = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp 2024',
    description:
      'Learn web development from scratch with HTML, CSS, JavaScript, React, Node, and more.',
    instructor: 'Nguyen Van A',
    price: '599.000₫',
    rating: 4.8,
    reviews: '2.5k reviews',
    hours: '42 giờ',
    lessons: '65 bài học',
    level: 'Cơ bản',
    isBestseller: true,
  },
  {
    id: 2,
    title: 'Complete Web Development Bootcamp 2024',
    description:
      'Learn web development from scratch with HTML, CSS, JavaScript, React, Node, and more.',
    instructor: 'Nguyen Van A',
    price: '599.000₫',
    rating: 4.8,
    reviews: '2.5k reviews',
    hours: '42 giờ',
    lessons: '65 bài học',
    level: 'Cơ bản',
    isBestseller: true,
  },
  {
    id: 3,
    title: 'Complete Web Development Bootcamp 2024',
    description:
      'Learn web development from scratch with HTML, CSS, JavaScript, React, Node, and more.',
    instructor: 'Nguyen Van A',
    price: '599.000₫',
    rating: 4.8,
    reviews: '2.5k reviews',
    hours: '42 giờ',
    lessons: '65 bài học',
    level: 'Cơ bản',
    isBestseller: true,
  },
  {
    id: 4,
    title: 'Complete Web Development Bootcamp 2024',
    description:
      'Learn web development from scratch with HTML, CSS, JavaScript, React, Node, and more.',
    instructor: 'Nguyen Van A',
    price: '599.000₫',
    rating: 4.8,
    reviews: '2.5k reviews',
    hours: '42 giờ',
    lessons: '65 bài học',
    level: 'Cơ bản',
    isBestseller: true,
  },
];

// A reusable Course Card component
const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300'>
      <div className='relative'>
        <img
          src={`https://source.unsplash.com/random/400x300?education,${course.id}`}
          alt='Course thumbnail'
          className='w-full h-48 object-cover'
        />
        {course.isBestseller && (
          <div className='absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded'>
            BESTSELLER
          </div>
        )}
      </div>
      <div className='p-6'>
        <div className='flex items-center mb-2 text-yellow-500'>
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStarHalf />
          <span className='text-gray-600 dark:text-gray-300 text-sm ml-2'>
            {course.rating} ({course.reviews})
          </span>
        </div>
        <h3 className='font-bold text-lg mb-2 text-gray-800 dark:text-white'>
          {course.title}
        </h3>
        <p className='text-gray-600 dark:text-gray-300 text-sm mb-4'>
          {course.description}
        </p>
        <div className='flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4 mb-4'>
          <div className='flex items-center'>
            <MdOutlineOndemandVideo className='mr-1' />
            <span>{course.hours}</span>
          </div>
          <div className='flex items-center'>
            <IoBookOutline className='mr-1' />
            <span>{course.lessons}</span>
          </div>
          <div className='flex items-center'>
            <IoTimeOutline className='mr-1' />
            <span>{course.level}</span>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <img
              src={`https://source.unsplash.com/random/100x100?portrait,${course.id}`}
              alt='instructor'
              className='w-8 h-8 rounded-full mr-2'
            />
            <span className='text-sm text-gray-600 dark:text-gray-300'>
              {course.instructor}
            </span>
          </div>
          <div className='text-lg font-bold text-purple-600 dark:text-purple-400'>
            {course.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeaturedCoursesSection = ({
  courses = defaultCourses,
}: FeaturedCoursesSectionProps) => {
  return (
    <section className='py-16 bg-gray-50 dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-end mb-12'>
          <div>
            <h2 className='text-3xl font-bold mb-4 text-gray-800 dark:text-white'>
              Khóa học nổi bật
            </h2>
            <p className='text-gray-600 dark:text-gray-300'>
              Các khóa học phổ biến và được đánh giá cao
            </p>
          </div>
          <Link
            to='/courses'
            className='text-purple-600 dark:text-purple-400 hover:underline'
          >
            Xem tất cả
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
