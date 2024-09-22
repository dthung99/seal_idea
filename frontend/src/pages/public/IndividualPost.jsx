import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';

import { fetchOnePostFromBackEnd } from '../../api_service/fetchOnePostFromBackEnd';
import { sendKeyAndIdForDecryption } from '../../api_service/sendKeyAndIdForDecryption';
import { saveKeyToUserProfile } from '../../api_service/saveKeyToUserProfile';

import './IndividualPost.scss';

// function to copy to clipboard
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Copied to clipboard: ', text);
    })
    .catch((err) => {
      console.error('Failed to copy: ', err);
    });
};

const IndividualPost = () => {
  // Get the para for each post
  const { postId, key } = useParams();

  // Para for interactive website
  const [keyOnPage, setKeyOnPage] = useState(key);
  const [postContent, setPostContent] = useState('\u00A0');
  const [currentPostData, setCurrentPostData] = useState(null);
  const currentDomain = window.location.origin;
  const [errorMessage, setErrorMessage] = useState('');

  // Format the date
  const dateOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // Use 24-hour format
  };

  // Fetch the data from the back end once at the beginning
  useEffect(() => {
    const fetchOnePost = async () => {
      try {
        let result = await fetchOnePostFromBackEnd(postId);
        if (result === 'We have some server error') {
          return 'We have some server error';
        }
        if (result) {
          if (result.accessKey) {
            if (!key) {
              setKeyOnPage(result.accessKey);
            }
          };
          setCurrentPostData(result);
          setPostContent(result.postContent);
        }
        return;
      } catch (err) {
        return 'We have some server error';
      }
    };
    fetchOnePost();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Function to send data to back end and decrypt the data
  const handleDecryptButton = async (e) => {
    let result = await sendKeyAndIdForDecryption(keyOnPage, postId);
    if (result) {
      setPostContent(result);
      setErrorMessage('Decryption success!');
    } else {
      setErrorMessage('You might use a wrong key!');
    };
    return;
  };

  // Function to handle save key to profile page
  const handleSaveKeyButton = async (e) => {
    let result = await saveKeyToUserProfile(keyOnPage, postId);
    if (result === 'Save key success!') {
      setErrorMessage('The key and post are saved to your Profile!');
    } else {
      setErrorMessage(result);
    };
    return;
  };


  return (
    <>
      {currentPostData ? (
        <div className='individual_post_layout'>
          <div className='individual_post_container'>
            <div className='individual_post-text'>{new Date(currentPostData.dateCreated).toLocaleString('en-UK', dateOptions)}</div>
            <div className='individual_post-text'>From: {currentPostData.username ? currentPostData.username : 'Anonymous'}</div>
            <div className='individual_post-text_big'>{currentPostData.postTitle}</div>
            <div className='individual_post-text'>Description</div>
            <div className='individual_post-flash_card'>{currentPostData.postDescription}</div>
            <div className='individual_post-text'>Key</div>
            <input type='text' className='individual_post-flash_card'
              placeholder="Enter a key to decrypt the message" maxLength='63'
              value={keyOnPage} onChange={(e) => setKeyOnPage(e.target.value)} required />
            <div className='individual_post-flex_row'>
              <div className='individual_post-flex_row-button' onClick={() => copyToClipboard(keyOnPage)}>Copy Key</div>
              <div className='individual_post-flex_row-button' onClick={handleSaveKeyButton}>Save Key/Post to Profile</div>
              <div className='individual_post-flex_row-button' onClick={handleDecryptButton}>Decrypt</div>
            </div>
            <div className='individual_post-text'>Encrypted message</div>
            <div className='individual_post-flash_card'>{postContent}</div>
            <div className='individual_post-flex_row'>
              <div className='individual_post-flex_row-button' onClick={
                () => copyToClipboard(currentDomain + '/IndividualPost/' + postId + '/key/' + keyOnPage)
              }>Copy path with key</div>
              <div className='individual_post-flex_row-button' onClick={
                () => copyToClipboard(currentDomain + '/IndividualPost/' + postId + '/key')
              }>Copy path without key</div>
            </div>
            <div className='error_message'>{errorMessage}</div>
          </div>
        </div>
      ) : ('Loading...')}
    </>
  )
}

export const InfoIndividualPost = () => {
  // Get the para for each post
  const { postId, key } = useParams();
  return (
    <>
      <div className='info_panel_big_text'>Post ID: {postId}</div>
      <br />
      <div className='info_panel_normal_text'><i>Note:</i> The keys provided by the owner might not be correct!!!</div>
      <br />
      <div className='info_panel_normal_text'>Save Key/Post to Profile:</div>
      <ul className='info_panel_ul'>
        <li className='info_panel_il'>Enter the key you got from your friends. You can save even an incorrect key.</li>
        <li className='info_panel_il'>Select "Save Key/Post to Profile" to keep a portfolio of them for easier access later.</li>
        <li className='info_panel_il'>You can leave the key empty! The post will be saved to your profile with no key.</li>
        <li className='info_panel_il'>Remember that it's not a good practice to store the key to decrypt in the database.</li>
      </ul>
      <br />
      <div className='info_panel_normal_text'>If you choose "Copy path with key," a path is created with the key that is currently typed on your screen!</div>
    </>
  )
}

export default IndividualPost