import axios from 'axios';

// Send login to login to Spring security
export const fetchOnePostFromBackEnd = async (postId) => {
    // Main communication with backend sever
    // Sent post request to get the post with postId = postId from the db
    try {
        const response = await axios.post('/backend/api/get_one_post_with_id',
            { postId },
            {
                headers: { 'Content-Type': 'application/json', },// Set content type
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return 'We have some server error';
    }
}
