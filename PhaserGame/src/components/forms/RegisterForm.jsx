import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser, faUserCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function RegisterForm({ fullName, userName, email, password, confirmPassword, onChange, onRegister, error }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-6xl font-bold mb-6 text-center">Register</div>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="flex flex-col">
          <label htmlFor="fullName" className="mb-1 font-medium text-gray-700">Full Name</label>
          <div className="flex items-center border rounded px-3 py-2 bg-white">
            <FontAwesomeIcon icon={faUserCircle} className="text-gray-400 mr-2" />
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={onChange}
              placeholder="Enter your full name"
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Username */}
        <div className="flex flex-col">
          <label htmlFor="userName" className="mb-1 font-medium text-gray-700">Username</label>
          <div className="flex items-center border rounded px-3 py-2 bg-white">
            <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={onChange}
              placeholder="Choose a username"
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium text-gray-700">Email</label>
          <div className="flex items-center border rounded px-3 py-2 bg-white">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">Password</label>
          <div className="flex items-center border rounded px-3 py-2 bg-white">
            <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password (min 8 characters)"
              className="w-full outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-400 hover:text-[#641B2E] focus:outline-none"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="flex items-center border rounded px-3 py-2 bg-white">
            <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm your password"
              className="w-full outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-400 hover:text-[#641B2E] focus:outline-none"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      <button
        onClick={onRegister}
        className="w-full !mt-6 bg-[#641B2E] text-white py-2 rounded hover:bg-[#4E1524] transition-colors"
      >
        Register
      </button>

      <div className="flex justify-between text-sm text-gray-500 mt-4">
        <p className="text-center text-sm text-gray-500">
          Forgot your password?{" "}
          <Link to="/forgot_password" className="!text-[#641B2E] !font-bold !no-underline hover:!underline">
            Recover Account
          </Link>{" "}
          or{" "}
          <Link to="/login" className="!text-[#641B2E] !font-bold !no-underline hover:!underline">
            Login
          </Link>{" "}
          to your account.
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
