import axios from 'axios';

// Send login to login to Spring security
export const changeUsernameOfAccount = async (username) => {
    // Main communication with backend sever
    // Basic input checking
    if (username.length > 63) {
        return 'username is too long!'
    }
    // Change username
    try {
        const response = await axios.post('/backend/api/change_username_of_account',
            { username },
            {
                headers: { 'Content-Type': 'application/json', },// Set content type
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return null;
    }
}
