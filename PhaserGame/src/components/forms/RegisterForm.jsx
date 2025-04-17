
function RegisterForm({ userName, email, password, role, onChange, onRegister, error }) {
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
          <h2>Sign Up</h2>

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

          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select name="role" value={role} onChange={onChange}>
              <option value="">Select role</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          <button onClick={onRegister} className="login-btn">Register</button>
        </div>
      </div>

      {error && <p>Error: {error}</p>}

      <footer>
        <p>&copy; 2025 Dela Peña Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default RegisterForm;