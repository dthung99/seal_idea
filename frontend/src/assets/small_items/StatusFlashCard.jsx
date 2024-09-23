import React, { useContext, forwardRef } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { LockKeyhole, LockKeyholeOpen, LogIn } from 'lucide-react';

import './StatusFlashCard.scss'
import { CSSVariable } from '../../color_variables/CSSVariable'

// Use forwardRef to forward the reference to parent 
const StatusFlashCard = ({ postId, title, author, description, date, keyValue, ...props }) => {
  const friendlyDate = new Date(date);
  // Format the date
  const dateOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // Use 24-hour format
  };

  // Function to navigate user onclick
  const navigate = useNavigate();
  const redirectToPost = () => {
    if (keyValue === null || keyValue === '') {
      navigate('/IndividualPost/' + postId + '/key');
      return
    }
    navigate('/IndividualPost/' + postId + '/key/' + keyValue);
  }

  // Check if key is available
  const isKeyAvailable = !(keyValue === null) && !(keyValue === "");

  return (
    <>
      <div className='data_flash_card' postid={postId} {...props} onClick={redirectToPost}>
        <div className='data_flash_card-section'>
          <div className='data_flash_card-title-container'>
            <div className='data_flash_card-title'>{title}</div>
          </div>
          <div className='flash_card_icon'>
            {!isKeyAvailable && <LockKeyhole size={'1.5rem'} color={CSSVariable.danger} strokeWidth={2.5} className='flash_card_icon-root' />}
            {isKeyAvailable && <LockKeyholeOpen size={'1.5rem'} color={CSSVariable.warning} strokeWidth={2.5} className='flash_card_icon-root' />}
            <div className='flash_card_icon-note'>Key {!isKeyAvailable && 'not'} available</div>
          </div>
          <div className='flash_card_icon'>
            <LogIn size={'1.5rem'} color={CSSVariable.info} strokeWidth={2.5} className='flash_card_icon-root' />
            <div className='flash_card_icon-note'>Enter key and view</div>
          </div>
        </div>
        <div className='data_flash_card-section'>
          <div className='data_flash_card-author'> From: {author}</div>
          <div className='data_flash_card-date'>{friendlyDate.toLocaleString('en-UK', dateOptions)}</div>
        </div>
        <div className='data_flash_card-section'>
          <div className='data_flash_card-description'> {description} </div>
        </div>
      </div>
    </>
  );
};

export default StatusFlashCard