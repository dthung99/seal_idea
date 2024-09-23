import React, { useContext, forwardRef } from 'react'
import { Link as RouterLink } from 'react-router-dom';

import { LoginAndCurrentPageContext } from '../../AllContextProvider'

import { sendLogout } from '../../api_service/sendLogout';

import './AccountMenu.scss'

// Use forwardRef to forward the reference to parent 
const AccountMenu = forwardRef(({ ...props }, ref) => {
  const { loginStatus, setLoginStatus, currentPage, setCurrentPage } = useContext(LoginAndCurrentPageContext);

  // Action when user click on Logout
  const clickLogout = async () => {
    let result = await sendLogout();
    try {
      if (result.status === 200) {
        setLoginStatus(false);
      }
    } catch (error) {
      console.log('Server error when trying to logout')
    }
  }

  // Show login and register if they are not login
  if (loginStatus === false) {
    return (
      <div className='account_menu' {...props} ref={ref}>
        <RouterLink to={'/Login'} className='account_menu-item'>Login</RouterLink>
        <RouterLink to={'/Register'} className='account_menu-item'>Register</RouterLink>
      </div>
    );
  }
  // Show Profile and Logout if they are login
  return (
    <div className='account_menu' {...props} ref={ref}>
      <RouterLink to={'/Profile'} className='account_menu-item'>Profile</RouterLink>
      <RouterLink to={'/'} className='account_menu-item' onClick={clickLogout}>Logout</RouterLink>
    </div>
  );
});

export default AccountMenu