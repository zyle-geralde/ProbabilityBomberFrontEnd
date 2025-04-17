function ForgotPasswordForm({onChange, onForgotPassword}){
  return(
      <div>
          <input
          type="email"
          name="email"
          onChange={onChange}
          placeholder="Email"
          />
          <button onClick={onForgotPassword}>Confirm</button>
      </div>
  );
}
export default ForgotPasswordForm;