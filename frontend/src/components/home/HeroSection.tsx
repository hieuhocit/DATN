import { IoSearch } from 'react-icons/io5';

export const HeroSection = () => {
  return (
    <section className='relative bg-purple-900 text-white'>
      <div className='absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 opacity-90'></div>
      <div className='container mx-auto px-4 py-24 relative z-10'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6'>
            Khám phá kho khóa học trực tuyến chất lượng
          </h1>
          <p className='text-xl mb-8'>
            Nâng cao kỹ năng của bạn với hơn 1000+ khóa học từ các chuyên gia
            hàng đầu
          </p>

          {/* Search Bar */}
          <div className='relative max-w-2xl mx-auto'>
            <input
              type='text'
              placeholder='Tìm kiếm khóa học, chủ đề...'
              className='w-full p-4 pr-12 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300'
            />
            <button className='absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-800'>
              <IoSearch size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
