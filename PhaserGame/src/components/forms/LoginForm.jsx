
function LoginForm({ email, role, onChange, onLogin, onForgotPassword, error }) {
  return (
    <div>
      <header>
        <nav>
          <div className="nav-items">
            <a href="#">Home</a>
            <a href="#">Users</a>
            <a href="#">Ranking</a>
            <a href="#">Topics</a>
            <a href="#">Settings</a>
          </div>
        </nav>
      </header>

      <div id="body-container">
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

          <a onClick={onForgotPassword} style={{ cursor: "pointer" }}>
            Forgot Password?
          </a>
          <button onClick={onLogin} className="login-btn">
            Login
          </button>
        </div>
      </div>

      {error && <p>Error: {error}</p>}

      <footer>
        <p>&copy; 2025 Dela Peña Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LoginForm;