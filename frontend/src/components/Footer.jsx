import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full sm:w-auto text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-xl font-semibold">Job Hunt</h1>
            <p className="text-gray-400">Find your dream job here.</p>
          </div>

          <div className="flex space-x-4 mb-4 sm:mb-0">
            <Link to="/about-us" className="text-gray-400 hover:text-white transition-colors">
              About Us
            </Link>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
          </div>

          <div className="text-gray-400">
            &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
