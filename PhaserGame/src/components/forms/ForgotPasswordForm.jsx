import React, {Component} from "react";

class ForgotPasswordForm extends Component{
    render(){
        return(
            <div>
                <header>
                    <nav>
                    <div class="nav-items">
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
                        <p stlye=''>Enter the email address you registered this website, and we will send you an email message with password reset information. </p>
                        <input
                        type="email"
                        name="email"
                        // value={this.props.email}
                        onChange={this.props.onChange}
                        placeholder="Email"
                        />

                        <button onClick={this.props.onForgotPassword} class='login-btn'>Confirm</button>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default ForgotPasswordForm;