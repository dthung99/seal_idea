import axios from 'axios';

// Send login to login to Spring security
export const fetchDataForPageNumber = async (currentPageNumber, sizeOfPage) => {
    // Main communication with backend sever
    // Sent post request to get all the post in the page
    try {
        const response = await axios.post('/backend/api/get_posts_on_page',
            { currentPageNumber, sizeOfPage },
            {
                headers: { 'Content-Type': 'application/json', },// Set content type
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return 'We have some server error';
    }
}
