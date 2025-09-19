import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as AuthController from "../../controllers/AuthController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";


function HomeNavbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const username = AuthController.getUsername();
  const role = AuthController.getCurrentUserRole();
  const isTeacher = role === "teacher";

  const handleLogout = () => {
    AuthController.logoutUser({ navigate });
  };

  const handleProfileNav = () => {
    navigate("/profilePage");
  };

return (
  <nav className="bg-[#641B2E] text-white px-4 py-2">
    <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
      {/* Logo */}
      <a href={isTeacher ? "/classPage" : "/lessonPage"} className="shrink-0">
        <img
          src="./images/probability_bomber_logo.png"
          alt="Logo"
          className="w-[100px] cursor-pointer"
        />
      </a>

      {/* User Section */}
      <div className="flex items-center gap-4 relative shrink-0">
        <span className="text-sm">Welcome, {username}</span>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="text-xl px-2 py-1 hover:scale-110 transition-transform"
        >
          <FontAwesomeIcon icon={faGear} />
        </button>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 top-full mt-2 bg-white text-gray-700 rounded-md shadow-lg w-40 z-50">
            <button
              onClick={handleProfileNav}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#641B2E]"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#641B2E]"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </nav>
);
}

export default HomeNavbar;
