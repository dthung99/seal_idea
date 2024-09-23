import React, { useState, useContext } from 'react';

import { LoginAndCurrentPageContext } from '../../AllContextProvider';

import { sendLoginToBackEnd } from '../../api_service/sendLoginToBackEnd';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import './FormStyle.scss'

const Login = () => {
  // Declare the state for interactive website
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Handle on submit button
  const { loginStatus, setLoginStatus, currentPage, setCurrentPage } = useContext(LoginAndCurrentPageContext);
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let result = await sendLoginToBackEnd(email, password);
    if (result === 'We have some server error') {
      setErrorMessage(result);
    } else if (result.headers.loginresult === '1') {
      setLoginStatus(true);
      navigate('/');
    } else if (result.headers.loginresult === '0') {
      setErrorMessage('Oops! It looks like the username or password is incorrect.');
    } else {
      setErrorMessage('We have some server error');
    };
    return;
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleLoginSubmit}>
        <div className='form_title'>Login to your account</div>
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          required
          autoComplete='username'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
          autoComplete='current-password'
        />
        <button type='submit'>Login</button>
        <RouterLink to={'/Register'} className='redirect_button'>Register</RouterLink>
        <div className='error_message'>{errorMessage}</div>
      </form>
    </div>
  );
};

export default Login;

export const InfoLogin = () => {
  return (
    <>
      <div className='info_panel_big_text'>Login page</div>
      <br />
      <div className='info_panel_normal_text'>
        I haven't yet created a function for retrieving forgotten passwords. If you need help recovering your password, please feel free to email me directly.
      </div>
      <br />
      <div className='info_panel_normal_text'>
        A login session lasts for 30 days, after which you will be automatically logged out. You can log out at any time if you choose to do so.
      </div>
    </>
  )
}
