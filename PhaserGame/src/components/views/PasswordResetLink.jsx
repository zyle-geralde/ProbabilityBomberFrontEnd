import "../forms/UpdatePasswordForm.css";

function PasswordResetLinkComponent({ userData, onLogin }) {
  const handleOpenResetLink = () => {
    if (userData) {
      window.open(userData, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="update-pass-page-wrapper">
      <div className="update-pass-container">
        {/* Reset Password as a button that opens the link in new tab */}
        <button onClick={handleOpenResetLink}>
          Reset Password Link
        </button>

        {/* Login as a styled link */}
        <a href="#" onClick={(e) => {
          e.preventDefault();
          onLogin();
        }}>
          Login
        </a>
      </div>
    </div>
  );
}

export default PasswordResetLinkComponent;
