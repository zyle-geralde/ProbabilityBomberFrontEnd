import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";

function PasswordResetLinkComponent({ userData, onLogin }) {
  const handleOpenResetLink = () => {
    if (userData) {
      window.open(userData, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div>
      <h2 className="!text-4xl text-center font-bold mb-4">Reset Your Password</h2>
      <p className="text-gray-600 mb-4 text-center">
        We’ve generated a reset link for your account.  
        Click the button below to open it in a new tab.
      </p>

      {/* Reset link button */}
      <div className="mb-3">
        <button
          onClick={handleOpenResetLink}
          className="w-full bg-[#641B2E] text-white py-2 rounded hover:bg-[#531626] transition flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faUnlockKeyhole} className="text-white" />
          <span>Open Reset Link</span>
        </button>
      </div>

      {/* Login / Register links */}
      <p className="text-center text-sm !mt-6 text-gray-600">
        Already reset your password?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onLogin();
          }}
          className="!text-[#641B2E] !font-bold !no-underline hover:!underline"
        >
          Login
        </a>{" "}
        or{" "}
        <Link
          to="/register"
          className="!text-[#641B2E] !font-bold !no-underline hover:!underline"
        >
          Register
        </Link>{" "}
        a new account.
      </p>
    </div>
  );
}

export default PasswordResetLinkComponent;
