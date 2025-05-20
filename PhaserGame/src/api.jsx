// api.js
/*import axios from 'axios';

const api = axios.create({
  baseURL: `http://127.0.0.1:5001/fir-crud-restapi-6a058/us-central1/app/api`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Use token from localStorage
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    // Global Error Logging
    console.error("Global Axios Error: ", error);

    // Optional: handle specific errors
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized - possibly expired token");
        // Redirect:
        window.location.href = '/login';
      } else if (error.response.status >= 500) {
        console.warn("Server error, try again later");
      }
    } else {
      console.warn("No response from server (maybe network error)");
    }

    return Promise.reject(error); // Let your catch block handle it
  }
);

export default api;*/

// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: `http://127.0.0.1:5001/fir-crud-restapi-6a058/us-central1/app/api`,
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // Always read fresh token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    console.error("Global Axios Error: ", error);

    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized - possibly expired token");
        // Redirect to login
        window.location.href = '/login';
      } else if (error.response.status >= 500) {
        console.warn("Server error, try again later");
      }
    } else {
      console.warn("No response from server (maybe network error)");
    }

    return Promise.reject(error);
  }
);

export default api;
