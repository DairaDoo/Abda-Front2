import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import Image from "next/image";
import Search from "../Search bar/search";
import LoginModal from "@/app/components/cart/LoginModal";
import { Kaushan_Script } from "next/font/google";
import Icon from "@mdi/react";
import { mdiAccountCircle, mdiCartVariant } from "@mdi/js";

const kaushan = Kaushan_Script({ subsets: ["latin"], weight: ["400"] });

interface NavbarProps {
  onCategoryChange: (category: string) => void;
  isAdmin: boolean;
  cartItemCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onCategoryChange, isAdmin, cartItemCount} ) => {
  const fontStyle = {
    fontFamily: kaushan.className,
    fontSize: "36px",
    color: isAdmin ? "#FFFFFF" : "#5B5C31", // Invert text color for admin
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
    WebkitTextStroke: isAdmin ? "0.5px black" : "1px black",
    fontStyle: "italic",
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const userLoggedIn = Cookies.get("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
  }, []);


  const handleCartClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      window.location.href = "/cart";
    }
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    onCategoryChange(section);
    setNavbar(false);
  };


  return (
    <div>
      <nav className={`w-full h-18 ${isAdmin ? "bg-black text-white" : "bg-[#FBF8F3] text-black"} border-b ${isAdmin ? "border-white" : "border-gray-300"} border-b-black fixed top-0 left-0 right-0 z-50`}>
        <div className="flex justify-between items-center px-4 mx-auto lg:max-w-7xl md:px-8">
          <div className="flex items-center py-2">
            <Link href="/" onClick={() => handleSectionChange('home')}>
              <h2 className="text-xl" style={fontStyle}>ABDA Shirts</h2>
            </Link>
            <div className="md:hidden ml-4">
              <button
                className="p-2 focus:outline-none"
                onClick={() => setNavbar(!navbar)}
                aria-label="Toggle navigation"
              >
                {navbar ? (
                  <Image src="/icons8-close.svg" width={30} height={30} alt="Close icon" />
                ) : (
                  <Image src="/icons8-hamburger.svg" width={30} height={30} alt="Menu icon" />
                )}
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <Search />
          </div>
          <div className={`md:flex ${navbar ? "block" : "hidden"} w-full md:w-auto mt-4 md:mt-0`}>
            <ul className="flex flex-col md:flex-row items-center md:space-x-8 mt-4 md:mt-0">
              {isAdmin && (
                <li className="text-xl py-2 md:py-0 hover:text-gray-400">
                  <Link href="/admin" onClick={() => setNavbar(false)}>Admin</Link>
                </li>
              )}
              <li
                className={`text-xl py-2 md:py-0 ${activeSection === 'men' ? 'text-orange-500' : 'hover:text-gray-400'}`}
              >
                <Link href="/" onClick={() => handleSectionChange('men')}>Men</Link>
              </li>
              <li
                className={`text-xl py-2 md:py-0 ${activeSection === 'women' ? 'text-orange-500' : 'hover:text-gray-400'}`}
              >
                <Link href="/" onClick={() => handleSectionChange('women')}>Women</Link>
              </li>
              <li className="text-xl py-2 md:py-0 hover:text-gray-400">
                <Link href={isLoggedIn ? "/profile" : "/login"} onClick={() => setNavbar(!navbar)}>
                  <Icon path={mdiAccountCircle} size={1.3} className="text-current" />
                </Link>
              </li>
              <li className="text-xl py-2 md:py-0 hover:text-gray-400 relative">
                <button onClick={handleCartClick} className="relative">
                  <Icon path={mdiCartVariant} size={1.3} className="text-current" />
                  {cartItemCount > 0 && (
                    <span className="bg-red-400 rounded-full text-xs px-2 py-1 absolute -top-2 -right-2 transform translate-x-1/2 font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
