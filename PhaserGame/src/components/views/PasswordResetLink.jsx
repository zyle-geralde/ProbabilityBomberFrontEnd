function PasswordResetLinkComponent({ userData, onLogin }) {
  return(
  <div>
      <a href={userData} target="_blank" rel="noopener noreferrer">
        Reset Password Link
      </a>
      <br/>
      <button onClick={onLogin}>
      Login
      </button>
  </div>
  );
}
export default PasswordResetLinkComponent;