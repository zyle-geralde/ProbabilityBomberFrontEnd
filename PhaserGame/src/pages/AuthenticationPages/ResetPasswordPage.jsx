import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import UpdatePasswordForm from "./../../components/forms/UpdatePasswordForm";
import { Link } from "react-router-dom";

function ResetPasswordPage({ onChange, onUpdate, error }) {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      {/* Split Background */}
      <div className="absolute inset-0 grid grid-rows-2">
        {/* Top half with background image */}
        <div className="bg-[url('/images/password_background.png')] bg-cover bg-center" />
        {/* Bottom half white */}
        <div className="bg-white" />
      </div>

      {/* Form Box */}
      <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        {/* Icon and Title */}
        <div className="flex flex-col items-center mb-6 text-[#641B2E]">
          <FontAwesomeIcon icon={faLock} size="3x" />
          <h2 className="!text-2xl font-bold mt-3">Reset Password</h2>
        </div>

        {/* Update Password Form */}
        <UpdatePasswordForm
          onChange={onChange}
          onUpdate={onUpdate}
          error={error}
        />

                {/* Links */}
        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <p className="text-center text-sm  text-gray-500">
            Remembered your Account?{" "}
            <Link to="/login" className="!text-[#641B2E] !font-bold !no-underline  hover:!underline">
              Login
            </Link>{" "}
            or{" "}
            <Link to="/register" className="!text-[#641B2E] !font-bold !no-underline  hover:!underline">
              Register
            </Link>{" "}
            a new account.
          </p>
        </div>

      </div>
    </div>
  );
}

export default ResetPasswordPage;
