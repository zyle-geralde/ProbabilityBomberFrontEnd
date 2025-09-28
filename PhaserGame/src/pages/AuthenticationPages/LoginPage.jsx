import { useState } from "react";
import LoginForm from "./../../components/forms/LoginForm";

function LoginPage({ email, password, role ,onChange, onLogin, onForgotPassword, error,setRole }) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-5 min-h-screen">
      {/* Left side */}
      <div className="relative md:col-span-3 flex flex-col justify-center items-center text-white p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/authentication_background.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b to-[#641B2E]/50" />
        <div className="relative z-10 flex flex-col items-center">
          <img
            src="/images/probability_bomber_logo.png"
            alt="Probability Bomber Logo"
            className="w-[500px] h-auto mb-6"
          />
          <div className="text-center max-w-md backdrop-blur-md ">
            <h1 className="text-4xl font-extrabold !text-gray-900 mb-4">
              Welcome to <span className="font-bold text-[#641B2E]">Probability Bomber</span>
            </h1>
            <p className="text-lg text-gray-900 leading-relaxed">
              Where learning feels like playing —{" "}
              <span className="font-semibold text-[#641B2E]">level up your mind</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="md:col-span-2 flex justify-center items-center bg-gray-100 p-6">
        <LoginForm
          email={email}
          password={password}
          role={role}
          onChange={onChange}
          onLogin={onLogin}
          onForgotPassword={onForgotPassword}
          error={error}
          setRole={ setRole}
        />

        
      </div>
    </div>
  );
}

export default LoginPage;
