import "./LoginForm.css";

function LoginForm({ email, role, onChange, onLogin, onForgotPassword, error }) {
  return (
    <div className="login-page-wrapper">
      <div id="body-container" className="login-page">
        <div id="body-section">
          <h2>Sign In</h2>

          <div className="input-group">
            <label htmlFor="email">Username</label>
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

          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select name="role" value={role} onChange={onChange}>
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
            <a href="/register" style={{ cursor: "pointer" }}>
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
