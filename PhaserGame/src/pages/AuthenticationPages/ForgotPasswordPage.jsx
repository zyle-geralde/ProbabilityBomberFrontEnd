
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import ForgotPasswordForm from "./../../components/forms/ForgotPasswordForm";

function ForgotPasswordPage({ email, onChange, onForgotPassword, error }) {
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
      <div className="relative z-10 w-full max-w-xl bg-white p-8 rounded-xl shadow-lg">
        {/* Icon above form */}
        <div className="flex justify-center mb-4 text-[#641B2E]">
          <FontAwesomeIcon icon={faExclamationCircle} size="4x" />
        </div>

        <ForgotPasswordForm
          email={email}
          onChange={onChange}
          onForgotPassword={onForgotPassword}
          error={error}
        />
      </div>
    </div>
  );
}

      {/* Right side (Forgot Password Form)
      <div className="md:col-span-2 flex justify-center items-center bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Forgot Password?</h2>
          <p className="text-gray-600 mb-4">
            Enter the email address you registered with, and we’ll send you a
            password reset link.
          </p>

          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
            className="w-full border p-2 rounded mb-3"
          />

          {error && <p className="text-red-500 mb-3">{error}</p>}

          <button
            onClick={onForgotPassword}
            className="w-full bg-[#641B2E] text-white py-2 rounded hover:bg-[#531626] transition"
          >
            Confirm
          </button>
        </div>
      </div> */}

export default ForgotPasswordPage;