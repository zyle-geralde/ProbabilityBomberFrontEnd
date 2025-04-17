function UpdatePasswordForm({ onChange, onUpdate, error }) {
  return (
    <div>
      <input
        type="password"
        name="password"
        onChange={onChange}
        placeholder="New Password"
      />
      <button onClick={onUpdate}>Confirm</button>
      {error && <p>Error: {error}</p>}

      <footer>
        <p>&copy; 2025 Dela Peña Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default UpdatePasswordForm;