import axios from 'axios';

// Send login to login to Spring security
export const sendLogout = async (email, password) => {
  // Main communication with backend sever
  // Sent a logout request to api
  try {
    const response = await axios.post('/backend/api/logout', null, { withCredentials: true, });
    return response.data;
  } catch (error) {
    return 'Server error when posting to logout API';
  }
}
