import { createContext, useState, useRef } from 'react';

// Create a context
const LoginAndCurrentPageContext = createContext(); // For tracking login status and root
const InfoPanelContext = createContext(); // For tracking login status and root

// Create a provider component
const AllContextProvider = ({ children }) => {
    const [loginStatus, setLoginStatus] = useState(false); // Login status
    const [currentPage, setCurrentPage] = useState('/'); // Current page path
    const infoPanelRef = useRef(null); // Reference for the info panel

    return (
        <LoginAndCurrentPageContext.Provider value={{ loginStatus, setLoginStatus, currentPage, setCurrentPage }}>
            <InfoPanelContext.Provider value={{infoPanelRef}}>
                {children}
            </InfoPanelContext.Provider>
        </LoginAndCurrentPageContext.Provider>
    );
};

export { LoginAndCurrentPageContext, InfoPanelContext };

export default AllContextProvider;