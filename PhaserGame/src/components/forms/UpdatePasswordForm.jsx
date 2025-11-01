import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function UpdatePasswordForm({ password, onChange, onUpdate, error }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mismatchError, setMismatchError] = useState("");

  const handleUpdate = () => {
    if (password !== confirmPassword) {
      setMismatchError("Passwords do not match.");
      return;
    }
    setMismatchError("");
    onUpdate(password);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <p className="text-gray-600 mb-4 text-center">
        Enter your new password below to update your account.
      </p>

      <div className="relative mb-3">
        <FontAwesomeIcon
          icon={faLock}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Enter new password"
          className="w-full border p-2 !pl-12 rounded"
        />
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>

      
      {/* Confirm Password */}
      <div className="relative mb-3">
        <FontAwesomeIcon
          icon={faLock}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          className="w-full border p-2 !pl-12 rounded"
        />
        <FontAwesomeIcon
          icon={showConfirmPassword ? faEyeSlash : faEye}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </div>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {mismatchError && <p className="text-red-500 mb-2">{mismatchError}</p>}

      <button
        onClick={handleUpdate}
        className="w-full bg-[#641B2E] text-white py-2 rounded hover:bg-[#531626] transition"
      >
        Confirm
      </button>
    </div>
  );
}

export default UpdatePasswordForm;
