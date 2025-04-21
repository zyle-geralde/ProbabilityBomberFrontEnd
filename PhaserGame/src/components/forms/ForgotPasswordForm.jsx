function ForgotPasswordForm({ onChange, onForgotPassword }) {
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

            <footer>
                <p>&copy; 2025 Dela Peña Solutions. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default ForgotPasswordForm;