import React, { useEffect, useContext } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { LoginAndCurrentPageContext, InfoPanelContext } from './AllContextProvider';

import NavBar from './assets/layout/NavBar';
import Footer from './assets/layout/Footer';
// import InfoPanel from './assets/layout/InfoPanel';

import Communtiy, { InfoCommunity } from './pages/public/Community';
import PrivateEncryption, { InfoPrivateEncryption } from './pages/public/PrivateEncryption';
import About, { InfoAbout } from './pages/public/About';
import API, { InfoAPI } from './pages/public/API';
import Login, { InfoLogin } from './pages/authentication/Login';
import Register, { InfoRegister } from './pages/authentication/Register';
import Profile, { InfoProfile } from './pages/personal/Profile';
import IndividualPost, { InfoIndividualPost } from './pages/public/IndividualPost';
import UnderDevelopment from './pages/public/UnderDevelopment';

import { checkIsLoggedIn } from './api_service/checkIsLoggedIn';

// The infor data to pass to InfoPanel (export here for easy editing but import on the other file)
export const InfoPanelData = () => {
  return (
    <div className='info_panel'>
      <Routes>
        <Route path='/' element={<InfoCommunity />} />
        <Route path='/PrivateEncryption' element={<InfoPrivateEncryption />} />
        <Route path='/About' element={<InfoAbout />} />
        <Route path='/API' element={<InfoAPI />} />
        <Route path='/Login' element={<InfoLogin />} />
        <Route path='/Register' element={<InfoRegister />} />
        <Route path='/Profile' element={<InfoProfile />} />
        <Route path='/IndividualPost/:postId?/key/:key?' element={<InfoIndividualPost />} />
      </Routes>
    </div>
  );
};

const App = () => {
  // Import the Context
  const { loginStatus, setLoginStatus, currentPage, setCurrentPage } = useContext(LoginAndCurrentPageContext);
  const { infoPanelRef } = useContext(InfoPanelContext);

  // Check user login status once everytime they open/reload the website (For remember-me section)
  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const isLoggedIn = await checkIsLoggedIn();
        setLoginStatus(isLoggedIn);
      } catch (error) {
        setLoginStatus(false);
      }
    };
    fetchLoginStatus();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <BrowserRouter>
      <div className='main_layout'>
        <div className='main_layout-top'>
          <div className='main_layout_navbar'>
            <NavBar />
          </div>
          <div className='main_layout_horizontal'>
            <div className='main_layout_horizontal-info_panel' ref={infoPanelRef}>
              <InfoPanelData />
            </div>
            <div className='main_layout_horizontal-item'>
              <Routes>
                <Route path='/' element={<Communtiy />} />
                <Route path='/PrivateEncryption' element={<PrivateEncryption />} />
                <Route path='/About' element={<About />} />
                <Route path='/API' element={<API />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/Profile' element={<Profile />} />
                <Route path='/IndividualPost/:postId?/key/:key?' element={<IndividualPost />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </div>
        <div className='main_layout-bottom'>
          <Footer />
        </div>
      </div>
    </BrowserRouter >
  );
};

export default App;
