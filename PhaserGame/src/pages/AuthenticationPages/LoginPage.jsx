import { useState } from "react";
import LoginForm from "./../../components/forms/LoginForm";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLogin() {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Invalid credentials");
    } catch (err) {
      setError(err.message);
    }
  }

function handleForgotPassword() {
    console.log("Forgot password clicked");
}

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-5 min-h-screen">
      {/* Left side */}
      <div className="relative md:col-span-3 flex flex-col justify-center items-center text-white p-12 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/authentication_background.png')] bg-cover bg-center" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b to-[#641B2E]/50" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo */}
          <img
            src="/images/probability_bomber_logo.png"
            alt="Probability Bomber Logo"
            className="w-[500px] h-auto mb-6"
          />

          {/* Text Section */}
          <div className="text-center max-w-md backdrop-blur-md ">
            <h1 className="text-4xl font-extrabold !text-gray-900 mb-4">
              Welcome to{" "}
              <span className="font-bold text-[#641B2E]">
                Probability Bomber
              </span>
            </h1>
            <p className="text-lg text-gray-900 leading-relaxed">
              Where learning feels like playing —{" "}
              <span className="font-semibold text-[#641B2E]">
                level up your mind
              </span>.
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className=" md:col-span-2 flex justify-center items-center bg-gray-100 p-6">
        <LoginForm
          email={formData.email}
          password={formData.password}
          onChange={handleChange}
          onLogin={handleLogin}
          onForgotPassword={handleForgotPassword}
          error={error}
        />
      </div>
    </div>

  );
}

export default LoginPage;
