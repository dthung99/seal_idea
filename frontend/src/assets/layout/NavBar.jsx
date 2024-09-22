import React, { useContext, useEffect, useState, useRef } from 'react'

import { Link as LinkIcon, NotepadText, House, KeyRound, BookA, UserRound } from 'lucide-react'
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { LoginAndCurrentPageContext, InfoPanelContext } from '../../AllContextProvider'

import AccountMenu from '../small_items/AccountMenu';

import { CSSVariable } from '../../color_variables/CSSVariable'
import './NavBar.scss'

// Function for icon on small screen
const IconButton = ({ IconComponent, path, label, color = 'inherit', icon_size = '1.5rem', ...props }) => {
  return (
    <RouterLink to={path} className='my_button_no_border' style={{ padding: '0.5rem 0.5rem', backgroundColor: color }} {...props}>
      <IconComponent size={icon_size} color={CSSVariable.light} strokeWidth={2} className='my_hover_target' />
      <div className='my_hover_text' style={{ right: '0%' }}> {label} </div>
    </RouterLink>
  );
};

// Navbar
const NavBar = () => {
  // Import the Context
  const { loginStatus, setLoginStatus, currentPage, setCurrentPage } = useContext(LoginAndCurrentPageContext);

  // Check if the current page is the expectPage to change the background of the item
  // If yes, return the color code for the background. Else, make it 'inherit'
  const ColorForPage = (expectPage) => {
    return currentPage === expectPage ? CSSVariable.brand_color_tertiary : 'inherit';
  }
  const location = useLocation();

  // Hook the current path to currentPage => currentPage update when route change => Update button background
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  // Turn on/off the AccountMenu on click
  const [accountMenuStatus, setAccountMenuStatus] = useState(false);
  const clickAccountMenuIcon = () => {
    setAccountMenuStatus((previousStatus) => !previousStatus);
  };
  // // Turn the info panel on off whenever use click
  // Declare some var first
  const { infoPanelRef } = useContext(InfoPanelContext);
  const [infoPanelDisplay, setInfoPanelDisplay] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= CSSVariable.screen_width_cut_off);
  // Change when user click the button
  const clickInfoPanelIcon = () => {
    if (infoPanelDisplay === null) {
      setInfoPanelDisplay(() => window.getComputedStyle(infoPanelRef.current).display === 'flex' ? 'none' : 'flex')
    } else {
      setInfoPanelDisplay((previousDisplay) => previousDisplay === 'flex' ? 'none' : 'flex')
    }
  }
  // Change when screensize change
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= CSSVariable.screen_width_cut_off);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Hook for both screensize change and click on button
  useEffect(() => {
    infoPanelRef.current.style.display = infoPanelDisplay;
    if (infoPanelDisplay === 'none') {
      infoPanelRef.current.parentNode.style.gridTemplateColumns = '1fr';
    } else {
      if (isSmallScreen) {
        infoPanelRef.current.parentNode.style.gridTemplateColumns = '1fr';
      } else {
        infoPanelRef.current.parentNode.style.gridTemplateColumns = 'min-content 1fr';
      }
    }

  }, [infoPanelDisplay, isSmallScreen]) // effect when infoPanelVisibility change

  // Turn off the AccountMenu and info panel when click outside the icon
  const menuRef = useRef(null);
  const menuRef_icon = useRef(null);
  const accountMenuRef = useRef(null);
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)
      && menuRef_icon.current && !menuRef_icon.current.contains(event.target)
      && accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
      setAccountMenuStatus(false);
    }
  };

  // Define the effect onClick
  useEffect(() => {
    // Add event listener on mount
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='my_navbar'>
        {/* Hamburger button on the left */}
        <div className='my_navbar-left'>
          <div className='my_button_no_border' style={{ padding: '0.5rem 0.5rem' }} onClick={clickInfoPanelIcon}>
            <NotepadText size='2rem' color={CSSVariable.light} strokeWidth={2} className='my_hover_target' />
            <div className='my_hover_text' style={{ right: '0%', transform: 'translateX(100%) translateY(0%)' }}> Information </div>
          </div>
        </div>
        {/* Icon on large screen */}
        <div className='my_navbar-right-large'>
          <RouterLink to='/' className='my_button_no_border' style={{ backgroundColor: ColorForPage('/') }} >Community</RouterLink>
          <RouterLink to='/PrivateEncryption' className='my_button_no_border' style={{ backgroundColor: ColorForPage('/PrivateEncryption') }}>Private Encryption</RouterLink>
          <RouterLink to='/About' className='my_button_no_border' style={{ backgroundColor: ColorForPage('/About') }}>About</RouterLink>
          <RouterLink to='/API' className='my_button_no_border' style={{ backgroundColor: ColorForPage('/API') }}>API</RouterLink>
          <div className='my_button_no_border' onClick={clickAccountMenuIcon} ref={menuRef}>Account</div>
        </div>
        {/* Icon on small screen */}
        <div className='my_navbar-right-small'>
          <IconButton IconComponent={House} path='/' label='Community' color={ColorForPage('/')} />
          <IconButton IconComponent={KeyRound} path='/PrivateEncryption' label='Private Encryption' color={ColorForPage('/PrivateEncryption')} />
          <IconButton IconComponent={BookA} path='/About' label='About' color={ColorForPage('/About')} />
          <IconButton IconComponent={LinkIcon} path='/API' label='API' color={ColorForPage('/API')} />
          <div className='my_button_no_border' style={{ padding: '0.5rem 0.5rem' }}>
            <UserRound size='1.5rem' color={CSSVariable.light} strokeWidth={2} onClick={clickAccountMenuIcon} ref={menuRef_icon} className='my_hover_target' />
            <div className='my_hover_text' style={{ right: '0%' }}> Account </div>
          </div>
        </div>
        {accountMenuStatus && <AccountMenu ref={accountMenuRef} />}
      </div>
    </>
  );
}

export default NavBar