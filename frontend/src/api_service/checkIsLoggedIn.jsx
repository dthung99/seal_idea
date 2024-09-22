import axios from 'axios';

// Send login to login to Spring security
export const checkIsLoggedIn = async (email, password) => {
    // Main communication with backend sever
    // Sent a get request to api to access personal page
    try {
        const response = await axios.get('/backend/api/personal/check_login', { withCredentials: true });
        if (response.data === 'User is logged in') {
            return true;
        } else {
            return false;
        };
    } catch (error) {
        return false;
    }
}
