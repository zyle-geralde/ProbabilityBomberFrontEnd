import React, {Component} from "react";

class UpdatePasswordForm extends Component{
    render(){
        return(
            <div>
              <input
                type="password"
                name="password"
                onChange={this.props.onChange}
                placeholder="New Password"
              />
                <button onClick={this.props.onUpdate}>Confirm</button>

                <footer>
                  <p>&copy; 2025 Dela Peña Solutions. All rights reserved.</p>
                </footer>
            </div>
        );
    }
}

export default UpdatePasswordForm;