import axios from 'axios';

// Send login to login to Spring security
export const encryptData = async (key, text) => {
    // Main communication with backend sever
    // Sent postId, key to get the decrypted content
    try {
        const response = await axios.post('/backend/api/encrypt_data_with_key',
            { key, text },
            {
                headers: { 'Content-Type': 'application/json', },// Set content type
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return null;
    }
}
