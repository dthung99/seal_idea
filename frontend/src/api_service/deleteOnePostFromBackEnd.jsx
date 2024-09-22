import axios from 'axios';

// Send login to login to Spring security
export const deleteOnePostFromBackEnd = async (postId) => {
    // Main communication with backend sever
    // Sent postId and delete that post on backend if the user own it
    try {
        const response = await axios.post('/backend/api/delete_one_post_from_back_end',
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
