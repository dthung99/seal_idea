import axios from 'axios';

// Send login to login to Spring security
export const unsaveKeyForAPost = async (postId) => {
    // Main communication with backend sever
    // Usave key in user db
    try {
        const response = await axios.post('/backend/api/unsave_key_for_a_post',
            { postId },
            {
                headers: { 'Content-Type': 'application/json', },// Set content type
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return null;
    }
}
