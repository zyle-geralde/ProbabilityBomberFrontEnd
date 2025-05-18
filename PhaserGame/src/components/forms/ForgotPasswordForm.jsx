function ForgotPasswordForm({ onChange, onForgotPassword }) {
    return (
        <div className="login-page-wrapper">
            <div id="body-container"  className="login-page">
                <div id="body-section">
                    <h2>Forgot Password?</h2>
                    <p>
                        Enter the email address you registered this website with, and we will send
                        you an email message with password reset information.
                    </p>
                    <input
                        type="email"
                        name="email"
                        onChange={onChange}
                        placeholder="Email"
                    />
                    <button onClick={onForgotPassword} className="login-btn">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordForm;