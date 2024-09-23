import axios from 'axios';
import qs from 'qs'; // Import qs to convert object to URL-encoded string

// Send login to login to Spring security
export const sendLoginToBackEnd = async (email, password) => {
  // Main communication with backend sever
  // Sent a login request to api
  try {
    const response = await axios.post('/backend/api/login',
      qs.stringify({ email, password }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', },// Set content type
        withCredentials: true, // Include cookies
      });
    return response;
  } catch (error) {
    return 'We have some server error';
  }
}
