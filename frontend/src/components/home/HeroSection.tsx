import { IoChevronForward } from 'react-icons/io5';
import { useTheme } from '@/hooks/useTheme'; // Import custom hook useTheme

// Giả định bạn có một prop hoặc context để kiểm tra trạng thái menu
type HeroSectionProps = {
  isMenuOpen?: boolean; // Thêm prop để kiểm tra menu có mở hay không
};

export const HeroSection = ({ isMenuOpen = false }: HeroSectionProps) => {
  const { theme } = useTheme(); // Lấy theme từ useTheme hook

  return (
    <section
      className={`relative w-full h-[500px] overflow-hidden ${
        theme === 'dark' ? 'dark' : ''
      }`}
    >
      {/* Background Image */}
      <img
        src="https://s3-alpha-sig.figma.com/img/84b5/e273/21aa0ec9bf62b4f0184fc192e721944e?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cAP~NA2JYc2W7W~tXpCU3K4rTCxrarTMEMoU5GyOZ0sGVLosrZVm4dRyiqda2yFuIAXjnWDat~h7ofTwbhmbXVQ8QcBO9EdavzPEf9XvqvTi~VBFiRw2Th5fiAWnoRYNcJorMd2xWWzDXtLM1QMY31GhK42kuQt1WjTaWNJAr~bu9WOhRa8HXOEW1V~qId4syNhFvq~ePlwA5mw76nwJdhi1JsPoiw4s7xRzkHMQTE0V3xHolUgYR7Lr3OM81xp3s0D8djhRmIIbyqqRkEUO4aslvSGX0IB46nSRGbNg6rGRSTkD70EaisJAgPQV8GYGYMmO7wBCCcXQ1kkLnTDKMQ__"
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 z-10 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-purple-900 to-red-900 opacity-95'
            : 'bg-gradient-to-r from-purple-800 to-red-800 opacity-90'
        }`}
      ></div>

      {/* Content */}
      <div
        className={`relative z-20 flex flex-col justify-center items-start h-full max-w-6xl mx-auto px-6 ${
          isMenuOpen ? 'md:pl-[300px]' : 'md:pl-6'
        } transition-all duration-200`} // Thêm padding bên trái khi menu mở
      >
        <h1
          className={`text-5xl md:text-6xl font-bold mb-6 ${
            theme === 'dark' ? 'text-gray-100' : 'text-white'
          }`}
        >
          Ngày hội diễn giả
        </h1>

        <button
          className={`font-semibold px-6 py-2 rounded-full mb-8 transition-all ${
            theme === 'dark'
              ? 'bg-gray-200 text-purple-900 hover:bg-gray-300'
              : 'bg-white text-purple-800 hover:bg-gray-100'
          }`}
        >
          Đăng ký ngay!
        </button>

        {/* Info section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-base">
          <div className="flex items-center gap-2">
            <span
              className={`font-semibold ${
                theme === 'dark' ? 'text-gray-200' : 'text-white'
              }`}
            >
              Nguyễn Minh Triết
            </span>
            <span
              className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-300'
              }`}
            >
              Lead UI/UX
            </span>
          </div>
          <div className="flex items-center gap-2">
            <IoChevronForward
              size={16}
              className={`${
                theme === 'dark' ? 'text-gray-200' : 'text-white'
              }`}
            />
            <span
              className={`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-200'
              }`}
            >
              Nội dung được chọn lọc
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;