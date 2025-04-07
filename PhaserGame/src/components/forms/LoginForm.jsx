import React, { Component } from 'react';

class LoginForm extends Component {
  render() {
    return (
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
          <h2>Sign In</h2>
            <div class="input-group">
              <label for="username">Username</label>
              <input type="email" name="email" value={this.props.email} onChange={this.props.onChange} placeholder="Email"/>
            </div>

            <div class="input-group">
              <label for="password">Password</label>
              <input type="password" name="password"// value={this.props.password}
                onChange={this.props.onChange}
                placeholder="Password"
              />
            </div>

            <a href="">New User?</a>
            <a href="">Forgot Password?</a>
            <button onClick={this.props.onLogin}>Login</button>
            <button onClick={this.props.onForgotPassword}>Forgot Password</button>
            </div>
          </div>
          
        
       
        {this.props.error && <p>Error: {this.props.error}</p>}
      </div>
    );
  }
}

export default LoginForm;