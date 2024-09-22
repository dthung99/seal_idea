import axios from 'axios';

// Send login to login to Spring security
export const fetchAllDataAboutUserFromBackEnd = async () => {
    // Main communication with backend sever
    // Sent post request to get the post with postId = postId from the db
    try {
        const response = await axios.post('/backend/api/get_all_data_of_the_current_user',
            {},
            {
                headers: { 'Content-Type': 'application/json', },// Set content type
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return 'We have some server error';
    }
}
