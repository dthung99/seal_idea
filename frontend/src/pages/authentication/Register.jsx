import React, { useState } from 'react';
import { registerAccountToBackEnd } from '../../api_service/registerAccountToBackEnd';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import './FormStyle.scss'

const Register = () => {
  // Declare the state for interactive website
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Handle on submit button
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    let result = await registerAccountToBackEnd(email, password, confirmPassword);
    if (result === 'Register success') {
      navigate('/Login');
    } else {
      setErrorMessage(result);
    };
    return;
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegisterSubmit}>
        <div className='form_title'>Register your account</div>
        <input
          type="text"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
          required
          autoComplete="username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          autoComplete="new-password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          autoComplete="new-password"
        />
        <button type="submit">Register</button>
        <RouterLink to={'/Login'} className='redirect_button'>Login</RouterLink>
        <div className='error_message'>{errorMessage}</div>
      </form>
    </div>
  );
};


export default Register;

export const InfoRegister = () => {
  return (
    <>
      <div className='info_panel_big_text'>Register page</div>
      <br />
      <div className='info_panel_normal_text'>
        It's advisable to use a valid email address for retrieving a forgotten password later.
      </div>
      <br />
      <div className='info_panel_normal_text'>Password requirement:</div>
      <ul className='info_panel_normal_text'>
        <li className="info_panel_li">At least 8 characters.</li>
        <li className="info_panel_li">At least one lowercase letter.</li>
        <li className="info_panel_li">At least one uppercase letter.</li>
        <li className="info_panel_li">At least one digit.</li>
        <li className="info_panel_li">At least one special character from the following set: {'*.!@$%^&(){}[]:;<>,.?\/~_+-=|'}</li>
      </ul>
    </>
  )
}


