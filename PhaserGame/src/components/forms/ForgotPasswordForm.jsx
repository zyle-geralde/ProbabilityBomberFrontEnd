import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function ForgotPasswordForm({ email, onChange, onForgotPassword, error }) {
  return (
    <div>
      <h2 className="!text-4xl text-center font-bold mb-4">Forgot Password?</h2>
      <p className="text-gray-600 mb-4">
        Enter the email address you registered with, and we’ll send you a
        password reset link.
      </p>

       {/* Email input with icon */}
      <div className="relative mb-3">
        <FontAwesomeIcon
          icon={faEnvelope}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Enter your email"
          className="w-full border p-2 !pl-12 rounded"
        />
      </div>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <button
        onClick={onForgotPassword}
        className="w-full bg-[#641B2E] text-white py-2 rounded hover:bg-[#531626] transition"
      >
        Confirm
      </button>

      {/* Register / Forgot Password */}
        <p className="text-center text-sm !mt-6 text-gray-600">
          Remember your account?{" "}
          <Link to="/login" className="!text-[#641B2E] !font-bold !no-underline  hover:!underline">
            Login
          </Link>{" "}
          or{" "}
          <Link to="/register" className="!text-[#641B2E] !font-bold !no-underline hover:!underline">
            Register
          </Link>{" "}
          a new account.
        </p>
    </div>
  );
}

export default ForgotPasswordForm;
