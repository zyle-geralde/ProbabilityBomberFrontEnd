import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function EmailConfirmationPage() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      {/* Split Background */}
      <div className="absolute inset-0 grid grid-rows-2">
        <div className="bg-[url('/images/password_background.png')] bg-cover bg-center" />
        <div className="bg-white" />
      </div>

      {/* Box */}
      <div className="relative z-10 w-full max-w-xl bg-white p-8 rounded-xl shadow-lg text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4 text-[#641B2E]">
          <FontAwesomeIcon icon={faEnvelope} size="4x" />
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold mb-2 text-[#641B2E]">
          Check your email
        </h2>
        <p className="text-gray-700">
          We’ve sent a password reset link to your email. Please check your inbox
          and follow the instructions to reset your password.
        </p>
      </div>
    </div>
  );
}

export default EmailConfirmationPage;
