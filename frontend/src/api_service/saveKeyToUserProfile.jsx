import axios from 'axios';

// Send login to login to Spring security
export const saveKeyToUserProfile = async (key, postId) => {
    // Main communication with backend sever
    // Save the key to user db
    try {
        const response = await axios.post('/backend/api/save_key_to_user_profile',
            { key, postId },
            {
                headers: { 'Content-Type': 'application/json', },// Set content type
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return null;
    }
}
