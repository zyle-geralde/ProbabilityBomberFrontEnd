import HomeNavbar from "../navbar/HomeNavbar";

import "./UpdatePasswordForm.css";

function UpdatePasswordForm({ onChange, onUpdate, error }) {
  return (
    <>
      <HomeNavbar/>
      <div className="update-pass-page-wrapper">
        <div className="update-pass-container">
          <h2>Enter New Password</h2>

          <div className="input-group">
            <label htmlFor="userName">New Password</label>
            <input
              type="password"
              name="password"
              onChange={onChange}
              placeholder="New Password"
            />
            <button onClick={onUpdate}>Confirm</button>
          </div>
          {error && <p>Error: {error}</p>}
        </div>
        
      </div>
    </>
  );
}

export default UpdatePasswordForm;