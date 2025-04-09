import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTheme } from '@/hooks/useTheme'; // Import custom hook useTheme

interface CartItem {
  id: number;
  title: string;
  author: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Lấy theme từ useTheme

  // Dữ liệu giả lập cho giỏ hàng
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: 'Cách lừa người dùng mua kẹo KERA 1 viên kẹo = 1 vườn rau',
      author: 'Phạm Quang Linh Angola',
      rating: 4.8,
      reviews: 301,
      price: 1999000,
      image: 'https://iv1cdn.vnecdn.net/vnexpress/images/web/2025/04/05/quang-linh-vlogs-xin-loi-nhung-nguoi-da-tin-tuong-minh-1743825292.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=Nsy-SZHZvs7m4PEy4K9iiA', // Thay bằng URL hình ảnh thật
    },
    {
      id: 2,
      title: 'Cách yêu 8 em cùng một lúc, cách chia thời gian yêu đương hiệu quả',
      author: 'Vi rút',
      rating: 4.8,
      reviews: 180,
      price: 2819000,
      image: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2025/3/29/1483824/Kem.jpg', // Thay bằng URL hình ảnh thật
    },
    {
      id: 3,
      title: 'Cách lừa 16 tỷ mà không bị chửi',
      author: 'Anh Thoại',
      rating: 4.8,
      reviews: 180,
      price: 3819000,
      image: 'https://photo.znews.vn/w660/Uploaded/mdf_uswreo/2025_02_26/phamthoai20250224123338.jpg', // Thay bằng URL hình ảnh thật
    },
  ]);

  // Tính tổng tiền
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  // Xử lý xóa khóa học khỏi giỏ hàng
  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success('Đã xóa khóa học khỏi giỏ hàng!');
  };

  // Xử lý khi bấm "Tiến hành thanh toán"
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Giỏ hàng của bạn đang trống!');
      return;
    }
    toast.info('Đang chuyển hướng đến trang thanh toán...');
    setTimeout(() => {
      navigate('/checkout');
    }, 1000);
  };

  // Định dạng tiền tệ
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const backgroundImageUrl =
    'https://s3-alpha-sig.figma.com/img/84b5/e273/21aa0ec9bf62b4f0184fc192e721944e?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cAP~NA2JYc2W7W~tXpCU3K4rTCxrarTMEMoU5GyOZ0sGVLosrZVm4dRyiqda2yFuIAXjnWDat~h7ofTwbhmbXVQ8QcBO9EdavzPEf9XvqvTi~VBFiRw2Th5fiAWnoRYNcJorMd2xWWzDXtLM1QMY31GhK42kuQt1WjTaWNJAr~bu9WOhRa8HXOEW1V~qId4syNhFvq~ePlwA5mw76nwJdhi1JsPoiw4s7xRzkHMQTE0V3xHolUgYR7Lr3OM81xp3s0D8djhRmIIbyqqRkEUO4aslvSGX0IB46nSRGbNg6rGRSTkD70EaisJAgPQV8GYGYMmO7wBCCcXQ1kkLnTDKMQ__';

 return (
    <div
      className={`min-h-screen p-6 relative ${
        theme === 'dark' ? 'dark' : ''
      }`}
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Lớp phủ mờ để nội dung dễ đọc */}
      <div
        className={`absolute inset-0 ${
          theme === 'dark' ? 'bg-gray-900/80' : 'bg-white/80'
        }`}
      ></div>

      {/* Nội dung chính */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Tiêu đề */}
        <h1
          className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          } mb-4`}
        >
          Giỏ hàng
        </h1>
        <p
          className={`${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          } mb-6`}
        >
          {cartItems.length} khóa học trong giỏ hàng
        </p>

        {/* Danh sách khóa học */}
        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <p
              className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Giỏ hàng của bạn đang trống.
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center p-4 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800/90 border-gray-600'
                    : 'bg-white/90 border-gray-200'
                }`}
              >
                {/* Hình ảnh khóa học */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-12 object-cover rounded-md mr-4"
                />

                {/* Thông tin khóa học */}
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {item.author}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500 flex items-center">
                      {item.rating}{' '}
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={
                            index < Math.floor(item.rating)
                              ? 'text-yellow-500'
                              : theme === 'dark'
                              ? 'text-gray-600'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </span>
                    <span
                      className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      } ml-2`}
                    >
                      ({item.reviews} xếp hạng)
                    </span>
                  </div>
                </div>

                {/* Giá và nút xóa */}
                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className={`flex items-center ${
                      theme === 'dark'
                        ? 'text-gray-400 hover:text-red-500'
                        : 'text-gray-500 hover:text-red-600'
                    } transition-colors`}
                  >
                    <FaTrash />
                    <span className="ml-1">Xóa</span>
                  </button>
                  <p
                    className={`text-lg font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {formatPrice(item.price)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Tổng tiền và nút thanh toán */}
        {cartItems.length > 0 && (
          <div className="flex justify-end items-center space-x-4 mt-6">
            <div className="flex items-center space-x-2">
              <p
                className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Tổng:
              </p>
              <p
                className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                {formatPrice(totalPrice)}
              </p>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center"
            >
              Tiến hành thanh toán →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;