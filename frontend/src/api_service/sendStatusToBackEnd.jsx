import axios from 'axios';

export const sendStatusToBackEnd = async (title, description, data, key, isPublic, isStoredToProfile) => {
  // Basic user input checking
  if (!title.trim()) {
    return 'Add your title!';
  }
  if (!description.trim()) {
    return 'Add your description!';
  }
  if (!data.trim()) {
    return 'Add your message!';
  }
  if (!key.trim()) {
    return 'Add your key!';
  }
  if (title.length > 127) {
    return 'Invalid title!';
  }
  if (description.length > 255) {
    return 'Invalid description!';
  }
  if (data.length > 1023) {
    return 'Invalid message!';
  }
  if (key.length > 63) {
    return 'Invalid key!';
  }

  // Main communication with backend sever
  // Sent a register request to api
  // For register, we need to send json not urlencoded
  try {
    const response = await axios.post('/backend/api/add_new_post',
      { title, description, data, key, isPublic, isStoredToProfile},
      {
        headers: { 'Content-Type': 'application/json', },// Set content type
        withCredentials: true,
      });
    return response.data;
  } catch (error) {
    return 'We have some server error';
  }
}
