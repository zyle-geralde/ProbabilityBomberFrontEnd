function RegisterForm({userName, email, password, role, onChange, onRegister, error}) {
  return (
    <div>
      <input
        type="text"
        name="userName"
        value={userName}
        onChange={onChange}
        placeholder="Name"
      />
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
        value={password}
        onChange={onChange}
        placeholder="Password"
      />
      <select name="role" value={role} onChange={onChange}>
        <option value="">Select role</option>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
      </select>
      <button onClick={onRegister}>Register</button>
      {error && <p>Error: {error}</p>}
    </div>
  );
}
export default RegisterForm;