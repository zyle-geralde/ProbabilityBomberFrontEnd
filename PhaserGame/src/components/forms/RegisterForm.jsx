import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function RegisterForm({ userName, email, password, role, onChange, onRegister, error, setRole }) {
  const location = useLocation();
  const isTeacherLog = location.pathname === "/registerForTeachers"

  
  useEffect(() => { 
    if (isTeacherLog) {
      setRole("teacher")
    }
    else {
      setRole("student")
    }
    
  }, [])
  
  return (
    <div className="login-page-wrapper">
      <div id="body-container"  className="login-page">
        <div id="body-section">
          <h2>{isTeacherLog?"Register For Teachers":"Register For Students"}</h2>

          <div className="input-group">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={onChange}
              placeholder="Name"
            />
          </div>

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
              value={password}
              onChange={onChange}
              placeholder="Password"
            />
          </div>

          <div className="input-group" style={{opacity:"0"}}>
            <label htmlFor="role">Role</label>
            <select name="role" value={role} onChange={onChange} style={{width:"2px",height:"2px"}}>
              <option value="">Select role</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div className="links">
            <a href="/forgot_password">
              Forgot Password?
            </a>
            <span className="divider">|</span>
            <a href={isTeacherLog?"/loginForTeachers":"/login"}>
              Login
            </a>
          </div>

          <button onClick={onRegister} className="login-btn">Register</button>
        </div>
      </div>

      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default RegisterForm;