import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import PasswordResetLinkComponent from "../../components/views/PasswordResetLink";

function ResetPasswordLinkPage({ userData, onLogin }) {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      {/* Split Background */}
      <div className="absolute inset-0 grid grid-rows-2">
        {/* Top half with background image */}
        <div className="bg-[url('/images/password_background.png')] bg-cover bg-center" />
        {/* Bottom half white */}
        <div className="bg-white" />
      </div>

      {/* Box */}
      <div className="relative z-10 w-full max-w-xl bg-white p-8 rounded-xl shadow-lg">
        {/* Icon above component */}
        <div className="flex justify-center mb-4 text-[#641B2E]">
          <FontAwesomeIcon icon={faExclamationCircle} size="4x" />
        </div>

        {/* Reset Password Link Component */}
        <PasswordResetLinkComponent userData={userData} onLogin={onLogin} />
      </div>
    </div>
  );
}

export default ResetPasswordLinkPage;
