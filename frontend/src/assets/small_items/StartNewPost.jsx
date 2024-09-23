import React, { useState, useContext } from 'react'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

import { LoginAndCurrentPageContext } from '../../AllContextProvider';

import { sendStatusToBackEnd } from '../../api_service/sendStatusToBackEnd';

import { CSSVariable } from '../../color_variables/CSSVariable'
import './StartNewPost.scss';

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

const StartNewPost = ({ setIsAddNewPost }) => {
    // Some state for dynamic update of the page
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState('');
    const [key, setKey] = useState('');
    const [errorMessage, setErrorMessage] = useState('\u00A0');
    const [isPublic, setIsPublic] = useState(false);
    const [isStoredToProfile, setIsStoredToProfile] = useState(false);

    // Context to check login status of user
    const { loginStatus, setLoginStatus, currentPage, setCurrentPage } = useContext(LoginAndCurrentPageContext);

    // Function to Generate a random string
    const generateRandomString = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    };
    // Button to close new status - Turn the add new post window off when clicked
    const handleCloseButton = async (e) => {
        setIsAddNewPost(false);
        return;
    };
    // Function to post data to the backend
    const navigate = useNavigate();
    const handlePost = async (e) => {
        e.preventDefault();
        // Main logic with the backend
        let result = await sendStatusToBackEnd(title, description, data, key, isPublic, isStoredToProfile);

        if (result === 'Adding new post success') {
            // Reload the page after success
            navigate('/', { replace: true }); // Replace current entry in the history stack
            navigate(0); // Refresh the component
        } else {
            setErrorMessage(result);
        };
        return;
    }

    // Function to handle check box for public

    return (
        <div className='add_new_post_container'>
            <div className='form'>
                <div className='close_button' onClick={handleCloseButton}>
                    <X color={CSSVariable.danger} strokeWidth={2} size='1.5rem' />
                </div>
                <div className='form_title'>Encrypt and post your Idea!!!</div>
                <input type="text" placeholder="Title - It's Public to everyone!" maxLength='127' value={title}
                    onChange={(e) => setTitle(e.target.value)} required />
                <div className='form_guide'>Character count: {title.length}/127.</div>
                <textarea type="text" rows={3} placeholder="Description - It's Public to everyone!" maxLength='255'
                    value={description} onChange={(e) => setDescription(e.target.value)} required />
                <div className='form_guide'> Character count: {description.length}/255.</div>
                <textarea type="text" rows={10} placeholder="Content - This section is encrypted!" maxLength='1023'
                    value={data} onChange={(e) => setData(e.target.value)} required />
                <div className='form_guide'>Any data you share is encrypted and accessible only by those who possess the corresponding key. Character count: {data.length}/1023.</div>
                <div className='key_area'>
                    <input type="text" placeholder="Any key < 63 characters" maxLength='63' value={key}
                        onChange={(e) => setKey(e.target.value)} required />
                    <button onClick={() => setKey(generateRandomString(63))}>Generate!</button>
                    <button onClick={() => copyToClipboard(key)}> Copy!</button>
                    <button type='submit' onClick={handlePost}>Post!!!</button>
                </div>
                <div className='form_guide'>Enter any Key or Generate One! Character count: {key.length}/63.</div>
                <div className='check_box_area'>
                    <div className='check_box_area-checkbox'>
                        <input type="checkbox" checked={isPublic} onChange={() => setIsPublic((previousValue) => !previousValue)} />
                    </div>
                    <div className='check_box_area-text' onClick={() => setIsPublic((previousValue) => (!previousValue))}> Tick here to store your key on the server and make it visible to others! </div>
                </div>
                <div className='check_box_area'>
                    <div className='check_box_area-checkbox'>
                        <input type="checkbox" disabled={!loginStatus} checked={isStoredToProfile} onChange={() => setIsStoredToProfile((previousValue) => !previousValue)} />
                    </div>
                    <div className='check_box_area-text' onClick={() => setIsStoredToProfile((previousValue) => (!previousValue))}> Tick here to save the key to your profile (Loggin Only!). </div>
                </div>
                <div className='error_message'>{errorMessage}</div>
            </div>
        </div>
    )
}

export default StartNewPost