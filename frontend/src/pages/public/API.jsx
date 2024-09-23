import React from 'react'

import './API.scss'

const API = () => {
  return (
    <>
      <div className="api-container">
        <div className="api-section">
          <div className="api-title">API</div>
        </div>
        <div className="api-section">
          <div className="api-sub-title">Retrieving a post directly from the back end!</div>
          <br />
          <div className="api-text-normal">
            With key:
          </div>
          <div className="api-text-small">
            https://sealidea.com/dev_api/get_post?postId=&lt;<i>your_post_ID</i>&gt;&key=&lt;<i>your_key</i>&gt;
          </div>
          <br />
          <div className="api-text-normal">
            Without key:
          </div>
          <div className="api-text-small">
            https://sealidea.com/dev_api/get_post?postId=&lt;<i>your_post_ID</i>&gt;
          </div>
        </div>
      </div>
    </>
  );
}

export const InfoAPI = () => {
  return (
    <>
      <div className="info_panel_big_text">API</div>
      <div className="info_panel_normal_text">
        The website currently provides 1 API for accessing posts directly from the backend.
      </div>
    </>
  );
}

export default API