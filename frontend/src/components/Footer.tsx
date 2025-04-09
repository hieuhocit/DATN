import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import { useTheme } from '@/hooks/useTheme'; // Import custom hook useTheme

export const Footer = () => {
  const { theme } = useTheme(); // Lấy theme từ useTheme hook

  return (
    <footer
      className={`py-12 ${
        theme === 'dark' ? 'dark bg-gray-950' : 'bg-black'
      } text-white`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div>
            <h3 className="text-2xl font-bold text-purple-500 mb-4">
              EduGenlus
            </h3>
            <p className="text-gray-400 text-sm">
              Copyright ©VAeducation2025
            </p>
          </div>

          {/* Cột 1: Programming */}
          <div>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Web Programming
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Mobile Programming
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Java A-Z
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  PHP A-Z
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 2: Design */}
          <div>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Adobe Illustrator
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Adobe Photoshop
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Design Logo
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Other */}
          <div>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Chính thuật 30 ngày
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Photography
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Làm phim
                </a>
              </li>
            </ul>
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaFacebook size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;