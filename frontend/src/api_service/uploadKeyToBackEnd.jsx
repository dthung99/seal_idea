import axios from 'axios';

// Send key to backend, make it public to everyone
export const uploadKeyToBackEnd = async (key, postId) => {
    // Main communication with backend sever
    // Sent postId, key to get the decrypted content
    try {
        const response = await axios.post('/backend/api/upload_key_to_back_end',
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
