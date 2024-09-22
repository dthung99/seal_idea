import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react'

import StatusFlashCard from '../../assets/small_items/StatusFlashCard';
import { fetchAllDataAboutUserFromBackEnd } from '../../api_service/fetchAllDataAboutUserFromBackEnd';
import { unsaveKeyForAPost } from '../../api_service/unsaveKeyForAPost';
import { changeUsernameOfAccount } from '../../api_service/changeUsernameOfAccount';
import { deleteOnePostFromBackEnd } from '../../api_service/deleteOnePostFromBackEnd';
import { updatePasswordInBackEnd } from '../../api_service/updatePasswordInBackEnd';
import { uploadKeyToBackEnd } from '../../api_service/uploadKeyToBackEnd';

import { LoginAndCurrentPageContext } from '../../AllContextProvider';

import { CSSVariable } from '../../color_variables/CSSVariable';

import './Profile.scss';

// The flash card to store post that owned by user
const UserOwnedPost = ({ postData, handleDeletePost, handleClickUploadKeyButton }) => {
  return (
    <>
      <div className="profile_user_posts-flex_box">
        <div className="profile_user_posts-flex_box-card">
          <StatusFlashCard postId={postData.postId} title={postData.postTitle}
            author={postData.username ? postData.username : 'Anonymous'} description={postData.postDescription}
            date={postData.dateCreated} keyValue={postData.accessKey} />
        </div>
        <div className="profile_user_posts-flex_box-util">
          <div className="profile_user_posts-flex_box-util-button" onClick={() => handleDeletePost(postData.postId)}>Delete Post</div>
          <div className="profile_user_posts-flex_box-util-button" onClick={() => handleClickUploadKeyButton(postData.postId)}>Upload Key</div>
        </div>
      </div>
    </>
  )

}

// The flash card to store post that saved by user
const UserSavedPost = ({ postData, handleClickUnsaveKey }) => {
  return (
    <div className="profile_user_posts-flex_box">
      <div className="profile_user_posts-flex_box-card">
        <StatusFlashCard postId={postData.postId} title={postData.postTitle}
          author={postData.username ? postData.username : 'Anonymous'} description={postData.postDescription}
          date={postData.dateCreated} keyValue={postData.accessKey} />
      </div>
      <div className="profile_user_posts-flex_box-util">
        <div className="profile_user_posts-flex_box-util-button" onClick={() => handleClickUnsaveKey(postData.postId)}>Unsave Key</div>
      </div>
    </div>
  )

}

const Profile = () => {
  // Import the Context
  const { loginStatus, setLoginStatus, currentPage, setCurrentPage } = useContext(LoginAndCurrentPageContext);
  const navigate = useNavigate();

  // Declare some vảiable for an interactive session
  const [userOwnedPosts, setUserOwnedPosts] = useState(null);
  const [userSavedPosts, setUserSavedPosts] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('\u00A0');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadKeyWindow, setUploadKeyWindow] = useState(false);
  const [idUploadKeyWindowId, setIdUploadKeyWindow] = useState(null); // The ID of the post that user want to update the key value
  const [key, setKey] = useState(null); // The key that user want to update
  // User password for changing password
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newConfirmedPassword, setNewConfirmedPassword] = useState(null);

  // Fetch the data from the back end once at the beginning
  useEffect(() => {
    const fetchAllDataAboutUser = async () => {
      try {
        let result = await fetchAllDataAboutUserFromBackEnd();
        if (result) {
          if (result.accountDataForSendingToUserDto === null) {
            navigate('/Login');
            return;
          }
          // Update user details
          setUsername(result.accountDataForSendingToUserDto.username)
          setEmail(result.accountDataForSendingToUserDto.email)
          // Update user's posts
          setUserOwnedPosts(result.userOwnedPosts);
          setUserSavedPosts(result.userSavedPosts);
        }
        return;
      } catch (err) {
        return 'We have some server error';
      }
    };
    fetchAllDataAboutUser();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Function to handle Upload Key button
  const handleClickUploadKeyButton = (postId) => {
    setIdUploadKeyWindow(postId);
    setUploadKeyWindow(true);
  };

  // Function to handle Upload Key button (In the new window)
  const handleMainUploadKeyButton = async () => {
    let result = await uploadKeyToBackEnd(key, idUploadKeyWindowId);
    if (result === 'Upload success!') {
      // Reload the page after success
      setErrorMessage(result);
    } else {
      setErrorMessage(result);
    };
    setUploadKeyWindow(false);
  };

  // Function to handle unsave Key button 
  const handleClickUnsaveKey = async (postId) => {
    let result = await unsaveKeyForAPost(postId);
    if (result === 'Unsave success!') {
      // Reload the page after success
      navigate('/Profile', { replace: true }); // Replace current entry in the history stack
      navigate(0); // Refresh the component
    } else {
      setErrorMessage(result);
    };
    return;
  };

  // Function to handle Change Username button
  const handleChangeUsername = async () => {
    let result = await changeUsernameOfAccount(username);
    if (result === 'Username changed success!') {
      // Reload the page after success
      setErrorMessage(result);
    } else {
      setErrorMessage(result);
    };
    return;
  };

  // Function to handle delete post of user button
  const handleDeletePost = async (postId) => {
    let result = await deleteOnePostFromBackEnd(postId);
    if (result === 'Post deleted success!') {
      // Reload the page after success
      navigate('/Profile', { replace: true }); // Replace current entry in the history stack
      navigate(0); // Refresh the component
    } else {
      setErrorMessage(result);
    };
    return;
  };

  // Function to handle delete post of user button
  const handleChangePasswordButton = async () => {
    let result = await updatePasswordInBackEnd(oldPassword, newPassword, newConfirmedPassword);
    if (result === 'Password updated success!') {
      setErrorMessage(result);
    } else {
      setErrorMessage(result);
    };
    return;
  };


  return (
    <>
      <div className="profile_bigger_layout">
        <div className="profile_layout">
          <div className="profile_user_details">
            <div className="profile_user_details-flex_box">
              <div className="profile_user_details-text">Username:</div>
              <input type="text" className='profile_user_details-text_box' value={username} maxLength='63'
                onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
              <div className="profile_user_details-button" onClick={handleChangeUsername}>Change</div>
            </div>
            <div className="profile_user_details-flex_box">
              <div className="profile_user_details-text">Email:</div>
              <div className="profile_user_details-text_box">{email}</div>
            </div>
            <div className="profile_user_details-flex_box">
              <div className="profile_user_details-text">Change Password:</div>
            </div>
            <div className="profile_user_details-flex_box">
              <input
                className='profile_user_details-text_box'
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Old Password"
                autoComplete="new-password"
              />
            </div>
            <div className="profile_user_details-flex_box">
              <input
                className='profile_user_details-text_box'
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
              />
            </div>
            <div className="profile_user_details-flex_box">
              <input
                className='profile_user_details-text_box'
                type="password"
                value={newConfirmedPassword}
                onChange={(e) => setNewConfirmedPassword(e.target.value)}
                placeholder="New Password"
              />
            </div>
            <div className="profile_user_details-flex_box">
              <div className="profile_user_details-button" onClick={handleChangePasswordButton}>Update Password</div>
            </div>
            <div className="profile_user_details-flex_box">
              <div className="profile_user_details-text" style={{ color: CSSVariable.danger }}>{errorMessage}</div>
            </div>
          </div>

          <div className="profile_user_posts">
            <div className="profile_user_posts-text">My Posts</div>
            {(userOwnedPosts === null) ? (
              <div className="profile_user_posts-text" style={{ fontSize: '1rem', marginBottom: '1rem' }}>Loading...</div>
            ) : (userOwnedPosts.length === 0 ? (
              <div className="profile_user_posts-text" style={{ fontSize: '1rem', marginBottom: '1rem' }}>You haven't posted anything!</div>
            ) : (
              <>
                {userOwnedPosts.map((userOwnedPost, index) => (
                  <UserOwnedPost key={index} postData={userOwnedPost} handleDeletePost={handleDeletePost} handleClickUploadKeyButton={handleClickUploadKeyButton} />
                ))}
              </>
            )
            )}
          </div>

          <div className="profile_user_posts">
            <div className="profile_user_posts-text">Posts that I saved Keys</div>
            {(userSavedPosts === null) ? (
              <div className="profile_user_posts-text" style={{ fontSize: '1rem', marginBottom: '1rem' }}>Loading...</div>
            ) : (userSavedPosts.length === 0 ? (
              <div className="profile_user_posts-text" style={{ fontSize: '1rem', marginBottom: '1rem' }}>You haven't saved any post!</div>
            ) : (
              <div className="profile_user_posts-flex_box">
                <div className="profile_user_posts-flex_box-card">
                  {userSavedPosts.map((userSavedPost, index) => (
                    <UserSavedPost key={index} postData={userSavedPost} handleClickUnsaveKey={handleClickUnsaveKey} />
                  ))}
                </div>
              </div>
            )
            )}
          </div>
        </div>
      </div>
      {/*Pop up window for uploading key*/}

      {uploadKeyWindow &&
        <div className="upload_key_window">
          <div className="upload_key_window-flash_card">
            <X className='close_button' color={CSSVariable.light} strokeWidth={2} size='1.5rem'
              onClick={() => setUploadKeyWindow(false)} />
            <input className="upload_key_window-text_box" type="text"
              placeholder="Key < 63 characters" maxLength='63' value={key}
              onChange={(e) => setKey(e.target.value)} />
            <div className="upload_key_window-button" onClick={handleMainUploadKeyButton}>Upload Key And Make It Public</div>
          </div>
        </div>
      }
    </>
  )
}

export const InfoProfile = () => {
  return (
    <>
      <div className='info_panel_big_text'>Your Profile</div>
      <ul className='info_panel_ul'>
        <li className="info_panel_li"><em><b>Change</b></em> your name to an <em><b>empty string</b></em>, and no one knows who you are!!!</li>
        <li className="info_panel_li">Requirement for password is provided at the end!</li>
        <li className="info_panel_li">Choose <em><b>Upload Key</b></em> to publish a key for your post that you previously decided not to. Upload an <em><b>empty string</b></em> if you want to remove the key you previously published.</li>
        <li className="info_panel_li"><em><b>Delete Post</b></em> will delete your post entirely from the database; please be careful!</li>
        <li className="info_panel_li"><em><b>Unsave Key</b></em> will remove the post from your profile.</li>
        <li className="info_panel_li">Posts with red locks mean that you saved an <em><b>empty string</b></em> as their key.</li>
      </ul>
      <br />
      <div className='info_panel_normal_text'>Requirement for password:</div>
      <ul className='info_panel_ul'>
        <li className="info_panel_li">At least 8 characters.</li>
        <li className="info_panel_li">At least one lowercase letter.</li>
        <li className="info_panel_li">At least one uppercase letter.</li>
        <li className="info_panel_li">At least one digit.</li>
        <li className="info_panel_li">At least one special character from the following set: {'*.!@$%^&(){}[]:;<>,.?\/~_+-=|'}</li>
      </ul>
    </>
  )
}

export default Profile
