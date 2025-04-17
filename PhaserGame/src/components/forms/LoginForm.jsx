
function LoginForm({ email, role, onChange, onLogin, onForgotPassword, error }) {
  return (
    <div>
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        onChange={onChange}
        placeholder="Password"
      />
      <select name="role" value={role} onChange={onChange}>
        <option value="">Select role</option>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
      </select>
      <button onClick={onLogin}>Login</button>
      <button onClick={onForgotPassword}>
        Forgot Password
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
}
export default LoginForm;