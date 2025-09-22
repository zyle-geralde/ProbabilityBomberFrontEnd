// import "./LoginForm.css";
// import "./Forms.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEyeSlash, faEye} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// function LoginForm({ email, role, onChange, onLogin, onForgotPassword, error,setRole }) {
//   const location = useLocation();
//   const isTeacherLog = location.pathname === "/loginForTeachers"

//   useEffect(() => { 
//     if (isTeacherLog) {
//       setRole("teacher")
//     }
//     else {
//       setRole("student")
//     }
    
//   },[])

//   return (
//     <div className="login-page-wrapper">
//       <div id="body-container" className="login-page">
//         <div id="body-section">
//           <h2>{isTeacherLog?"Login For Teachers":"Log In for Students"}</h2>

//           <div className="input-group">
//             <label htmlFor="email">Username</label>
//             <input
//               type="email"
//               name="email"
//               value={email}
//               onChange={onChange}
//               placeholder="Email"
//             />
//           </div>

//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               name="password"
//               onChange={onChange}
//               placeholder="Password"
//             />
//           </div>

//           <div className="input-group" style={{opacity:"0"}}>
//             <select name="role" value={role} onChange={onChange} style={{width:"2px",height:"2px"}}>
//               <option value="">Select role</option>
//               <option value="teacher">Teacher</option>
//               <option value="student">Student</option>
//             </select>
//           </div>

//           <div className="links">
//             <a onClick={onForgotPassword} style={{ cursor: "pointer" }}>
//               Forgot Password?
//             </a>
//             <span className="divider">|</span>
//             <a href={isTeacherLog?"/registerForTeachers":"/register"} style={{ cursor: "pointer" }}>
//               Register
//             </a>
//           </div>

//           <button onClick={onLogin} className="login-btn">
//             Login
//           </button>

//           {error && <p className="error-msg">Error: {error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;

function LoginForm({ email, password, role, onChange, onLogin, onForgotPassword, error,setRole }) {
  const [showPassword, setShowPassword] = useState(false);
  const isTeacherLog = location.pathname === "/loginForTeachers"

  useEffect(() => { 
    if (isTeacherLog) {
      setRole("teacher")
    }
    else {
      setRole("student")
    }
  },[])

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-6xl font-bold mb-6 text-center">Login</div>

      <div className="space-y-4">
        {/* Email */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="flex items-center border rounded px-3 py-2 bg-white">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-2" />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Password*/}
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="flex items-center border rounded px-3 py-2 bg-white">
            <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
              className="w-full outline-none"
            />

            <div className="input-group" style={{opacity:"0"}}>
            <select name="role" value={role} onChange={onChange} style={{width:"2px",height:"2px"}}>
              <option value="">Select role</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-500 hover:text-[#641B2E] focus:outline-none"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>


        {/* Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Login Button */}
        <button
          type="button"
          onClick={onLogin}
          className="w-full bg-[#641B2E] hover:bg-[#4E1524]  transition-colors  !mt-6  text-white py-2 rounded font-medium"
        >
          Login
        </button>

        {/* Register / Forgot Password */}
        <p className="text-center text-sm !mt-6 text-gray-600">
          Forgot your Password?{" "}
          <Link to="/forgot_password" className="!text-[#641B2E] !font-bold !no-underline  hover:!underline">
            Recover Account
          </Link>{" "}
          or{" "}
          <Link to="/register" className="!text-[#641B2E] !font-bold !no-underline hover:!underline">
            Register
          </Link>{" "}
          a new account.
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
