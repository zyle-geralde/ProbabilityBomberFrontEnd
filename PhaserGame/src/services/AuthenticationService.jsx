// /services/authService.js
import api from '../api';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, getAuth, signOut, sendPasswordResetEmail } from 'firebase/auth';

export const firebaseLoginAndGetToken = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();
  return token;
};

export const fireBaseLogout = async () => {
  const auth = getAuth();
  await signOut(auth);
}

export const loginWithToken = async (token, role) => {
  return api.post('/auth/login/', {role}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const registerUser = async (fullname, username, email, password, confirm_password) => {
  // console.log("Debug: ", fullname, username, email, password, confirm_password)
  return api.post('/auth/register/', { fullname, username, email, password, confirm_password});
};

export const resetPassword = async (newPassword) => {
  return api.post('/auth/reset_password/', { newPassword });
};

export const forgotPassword = async (email) => {
  const baseUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:5173"
      : "https://yourdomain.com"; // replace with your deployed domain

  const actionCodeSettings = {
    url: `${baseUrl}/reset-password`,
    handleCodeInApp: true,
  };

  await sendPasswordResetEmail(auth, email, actionCodeSettings);

  return { message: "Password reset email sent" };
};
