import RegisterForm from "./../../components/forms/RegisterForm";

function RegisterPage({ onRegister, fullName, userName, email, password, confirmPassword, onChange, error }) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-5 min-h-screen">
      <div className="relative md:col-span-3 flex flex-col justify-center items-center text-white p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/authentication_background.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b to-[#641B2E]/50" />
        <div className="relative z-10 flex flex-col items-center">
          <img
            src="/images/probability_bomber_logo.png"
            alt="Probability Bomber Logo"
            className="w-[500px] h-auto mb-6"
          />
          <div className="text-center max-w-md backdrop-blur-md">
            <h1 className="text-4xl font-extrabold !text-gray-900 mb-4">
              Join <span className="font-bold text-[#641B2E]">Probability Bomber</span>
            </h1>
            <p className="text-lg text-gray-900 leading-relaxed">
              Learn, play, and grow —{" "}
              <span className="font-semibold text-[#641B2E]">
                start your journey today
              </span>.
            </p>
          </div>
        </div>
      </div>

      <div className="md:col-span-2 flex justify-center items-center bg-gray-100 p-6">
        <RegisterForm
          fullName={fullName}
          userName={userName}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          onChange={onChange}
          onRegister={onRegister}
          error={error}
        />
      </div>
    </div>
  );
}

export default RegisterPage;
