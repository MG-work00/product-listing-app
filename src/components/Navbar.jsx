import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiShoppingBag,
  FiUser,
  FiLogOut,
  FiHome,
  FiInfo,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/images/Logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src={Logo} alt="Letmegrab Logo" />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <FiHome className="mr-1" /> Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <FiInfo className="mr-1" /> About
            </Link>

            {user && (
              <Link
                to="/products"
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <FiShoppingBag className="mr-1" /> Products
              </Link>
            )}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <FiUser className="mr-1" /> {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <FiLogOut className="mr-1" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="bg-white border border-primary text-primary hover:bg-primary/10 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden absolute w-full bg-white shadow-md`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <FiHome className="mr-1" /> Home
          </Link>
          <Link
            to="/about"
            className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <FiInfo className="mr-1" /> About
          </Link>

          {user && (
            <Link
              to="/products"
              className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiShoppingBag className="mr-1" /> Products
            </Link>
          )}
          {user ? (
            <>
              <div className="block text-gray-700 px-3 py-2 rounded-md text-base font-medium flex items-center">
                <FiUser className="mr-1" /> {user.username}
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FiLogOut className="mr-1" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
