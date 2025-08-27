import "./LoginForm.css";
import "./Forms.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function LoginForm({ email, role, onChange, onLogin, onForgotPassword, error,setRole }) {
  const location = useLocation();
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
    <div className="login-page-wrapper">
      <div id="body-container" className="login-page">
        <div id="body-section">
          <h2>{isTeacherLog?"Login For Teachers":"Log In for Students"}</h2>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={onChange}
              placeholder="Password"
            />
          </div>

          <div className="input-group" style={{opacity:"0"}}>
            <select name="role" value={role} onChange={onChange} style={{width:"2px",height:"2px"}}>
              <option value="">Select role</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div className="links">
            <a onClick={onForgotPassword} style={{ cursor: "pointer" }}>
              Forgot Password?
            </a>
            <span className="divider">|</span>
            <a href={isTeacherLog?"/registerForTeachers":"/register"} style={{ cursor: "pointer" }}>
              Register
            </a>
          </div>

          <button onClick={onLogin} className="login-btn">
            Login
          </button>

          {error && <p className="error-msg">Error: {error}</p>}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
