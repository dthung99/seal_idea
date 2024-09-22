import axios from 'axios';

// Send login to login to Spring security
export const sendKeyAndIdForDecryption = async (key, postId) => {
    // Main communication with backend sever
    // Sent postId, key to get the decrypted content
    try {
        const response = await axios.post('/backend/api/decrypt_data_with_key_and_post_id',
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
