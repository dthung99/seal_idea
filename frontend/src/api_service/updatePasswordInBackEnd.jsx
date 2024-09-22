import axios from 'axios';

// Send login to login to Spring security
export const updatePasswordInBackEnd = async (oldPassword, newPassword, newConfirmedPassword) => {
    // Main communication with backend sever
    console.log(!newPassword === newConfirmedPassword);
    if (!(newPassword === newConfirmedPassword)) {
        return 'The passwords do not match. Please try again!'
    }
    // Sent old and new password for backend to check (both authorization and regex matching)
    try {
        const response = await axios.post('/backend/api/update_password_in_back_end',
            { oldPassword, newPassword },
            {
                headers: { 'Content-Type': 'application/json', },// Set content type
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return null;
    }
}
