import axios from 'axios';

// Regex of email and password
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&\(\)\{\}\[\]:;<>,.?\\\/~_+\-=\|]).{8,}$/;

export const registerAccountToBackEnd = async (email, password, confirmPassword) => {
  // Basic error checking
  if (!emailRegex.test(email)) {
    return 'Please use a valid email address.';
  }
  if (!passwordRegex.test(password)) {
    return 'Please use a valid password.';
  }
  if (confirmPassword !== password) {
    return 'Two passwords do not match.';
  }
  // Main communication with backend sever
  // Sent a register request to api
  // For register, we need to send json not urlencoded
  try {
    const response = await axios.post('/backend/api/register',
      { email, password },
      {
        headers: { 'Content-Type': 'application/json', },// Set content type
      });
    return response.data;
  } catch (error) {
    return 'We have some server error';
  }
}
