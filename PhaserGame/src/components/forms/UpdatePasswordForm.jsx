function UpdatePasswordForm ({ onChange, onUpdate, error }) {
  return(
    <div>
      <input
        type="password"
        name="password"
        onChange={onChange}
        placeholder="New Password"
        />
        <button onClick={onUpdate}>Confirm</button>
        {error && <p>Error: {error}</p>}
    </div>
  );
}
export default UpdatePasswordForm;