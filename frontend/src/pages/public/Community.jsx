import React, { useState, useEffect } from 'react'
import { Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom';

import { fetchDataForPageNumber } from '../../api_service/fetchDataForPageNumber';
import { fetchOnePostFromBackEnd } from '../../api_service/fetchOnePostFromBackEnd';

import StartNewPost from '../../assets/small_items/StartNewPost'
import UnderDevelopment from './UnderDevelopment';
import StatusFlashCard from '../../assets/small_items/StatusFlashCard';

import { CSSVariable } from '../../color_variables/CSSVariable'
import './Community.scss'

const Community = () => {
  // Some state for dynamic update of webpage
  const sizeOfPage = 5;
  const [introductionPost, setIntroductionPost] = useState(null); // The current page of the website
  const [currentPageNumberOnScreen, setCurrentPageNumberOnScreen] = useState(0); // The current page of the website
  const [currentPageNumber, setCurrentPageNumber] = useState(0); // The current page of the website
  const [isAddNewPost, setIsAddNewPost] = useState(false); // If the add new post window is on?
  const [searchTerm, setSearchTerm] = useState('');
  const [postsOnPage, setPostsOnPage] = useState(null);
  // const [isLoading, setIsLoading] = useState(true)

  // Fetch one introduction post for putting it on top
  useEffect(() => {
    const fetchIntroductionPost = async () => {
      try {
        let result = await fetchOnePostFromBackEnd(1);
        if (result === 'We have some server error') {
          return 'We have some server error';
        }
        if (result) {
          // Get the post and update the first post
          setIntroductionPost(
            <StatusFlashCard postId={result.postId} title={result.postTitle}
              author={result.username ? result.username : 'Anonymous'} description={result.postDescription}
              date={result.dateCreated} keyValue={result.accessKey}
              style={{ backgroundColor: CSSVariable.brand_color_tertiary }} />
          )
        }
        return;
      } catch (err) {
        return 'We have some server error';
      }
    };
    fetchIntroductionPost();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Fetch the data from database and view it
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await fetchDataForPageNumber(currentPageNumber, sizeOfPage);
        if (result === 'We have some server error') {
          return 'We have some server error';
        }
        if (result.length > 0) {
          // Update the page if server send any data
          setPostsOnPage(result);
          setCurrentPageNumberOnScreen(currentPageNumber)
        }
        return;
      } catch (err) {
        return 'We have some server error';
      }
    };
    fetchData();
  }, [currentPageNumber]); // Empty dependency array means this runs once when the component mounts

  // Button to add new status - Turn the add new post window on when clicked
  const handleAddButton = async (e) => {
    setIsAddNewPost(true);
    return;
  };

  // Button to search for posts
  const handleSearchButton = async (e) => {
    console.log(searchTerm);
    return;
  };

  return (
    <>
      {isAddNewPost && <StartNewPost setIsAddNewPost={setIsAddNewPost} />}
      <div className='community_layout'>
        <div className='community_layout-left'>
          <div className='util_flash_card'>
            <div className='util_flash_card-search'>
              <input type="text" placeholder='Search: Under development!' value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='util_flash_card-search-box' />
              <div className='util_flash_card-search-logo' onClick={handleSearchButton}>
                <Search color={CSSVariable.light} strokeWidth={2} size='1.5rem' />
              </div>
            </div>
            <div className='util_flash_card-add' onClick={handleAddButton}>
              <Plus color={CSSVariable.light} strokeWidth={2} size='1.5rem' />
            </div>
            <div className='util_flash_card-change_space'>
              <div className='util_flash_card-change_space-item'
                onClick={() => setCurrentPageNumber(Math.max(currentPageNumberOnScreen - 1, 0))}>
                <ChevronLeft color={CSSVariable.light} strokeWidth={2} size='1.5rem' />
              </div>
              <div className='util_flash_card-change_space-item'>
                {currentPageNumberOnScreen * sizeOfPage + 1}-{currentPageNumberOnScreen * sizeOfPage + sizeOfPage}
              </div>
              <div className='util_flash_card-change_space-item'
                onClick={() => setCurrentPageNumber(currentPageNumberOnScreen + 1)}>
                <ChevronRight color={CSSVariable.light} strokeWidth={2} size='1.5rem' />
              </div>
            </div>
          </div>

          {introductionPost}
          {postsOnPage ? (
            <>
              {postsOnPage.map((postOnPage, index) => (
                <StatusFlashCard key={index} postId={postOnPage.postId} title={postOnPage.postTitle}
                  author={postOnPage.username ? postOnPage.username : 'Anonymous'} description={postOnPage.postDescription}
                  date={postOnPage.dateCreated} keyValue={postOnPage.accessKey} />
              ))}
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className='community_layout-right'><UnderDevelopment /></div>
      </div >
    </>
  )
}

export const InfoCommunity = () => {
  return (
    <>
      <div className="info_panel_big_text">Welcome to Seal Idea!</div>
      <ul className="info_panel_ul">
        <li className="info_panel_li">Safely encrypt and publish your ideas here.</li>
        <li className="info_panel_li">Only individuals with the appropriate key can access your post.</li>
        <li className="info_panel_li">Click the add (+) button to get started!</li>
      </ul>
      <br />
      <div className="info_panel_normal_text">Learn more about our encryption protocol: <RouterLink to='/About'>Here</RouterLink></div>
      <br />
      <div className="info_panel_normal_text"><i>Note:</i></div>
      <ol className="info_panel_ul">
        <li className="info_panel_li">If you post without <RouterLink to={'/Login'}>logging in</RouterLink>, you won't be able to edit it later.</li>
        <li className="info_panel_li">Posts with a yellow lock indicate they have keys provided by the owner (however, owners can post incorrect keys).</li>
      </ol>
    </>
  )
}

export default Community