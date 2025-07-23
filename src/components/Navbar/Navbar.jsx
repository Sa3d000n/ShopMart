import { useState } from "react";

import { IoMdCart } from "react-icons/io";
import { FaBars, FaHeart, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getTotalCartQuantity } from "../../store/cartSlice";
import { getTotalFavoriteQuantity } from "../../store/favoriteSlice";
import { NavLink } from "react-router";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemsNumber = useSelector(getTotalCartQuantity);
  const favoriteItemsNumber = useSelector(getTotalFavoriteQuantity);

  const navLinks = ["home", "products", "cart", "about"];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-xl">
      <div className="container py-2">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary-color dark:text-teal-500">
            <NavLink to="/">ShopMart</NavLink>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((item, i) => (
              <NavLink
                key={i}
                to={item === "home" ? "/" : `/${item}`}
                className={({ isActive }) =>
                  `capitalize text-sm transition ${
                    isActive
                      ? "text-primary-color dark:text-white font-medium"
                      : "text-gray-500 dark:text-gray-300 hover:text-primary-color"
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <NavLink to="/cart">
              <div className="relative bg-slate-700 rounded-full size-12 flex items-center justify-center">
                {cartItemsNumber > 0 && (
                  <span className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cartItemsNumber}
                  </span>
                )}
                <IoMdCart size={22} className="text-white" />
              </div>
            </NavLink>

            {/* Wishlist */}
            <NavLink to="/wishlist">
              <div className="relative bg-slate-700 rounded-full size-12 flex items-center justify-center">
                {favoriteItemsNumber > 0 && (
                  <span className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {favoriteItemsNumber}
                  </span>
                )}
                <FaHeart size={20} className="text-white" />
              </div>
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 dark:text-white"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2 px-2">
            {navLinks.map((item, i) => (
              <NavLink
                key={i}
                to={item === "home" ? "/" : `/${item}`}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded text-sm ${
                    isActive
                      ? "bg-primary-color text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
