import React from "react";
import { useEffect, useState } from 'react';

export default function Share() {
  const [showShareView, setShowShareView] = useState(false);

  // When the user clicks on <div>, open the popup
  function myFunction() {
    console.log('he he you clicked me')
    setShowShareView(!showShareView);
  }

  return (
    <div className="shareButton" onClick={myFunction}> Share
      { showShareView ? <SharePopUp /> : null }
    </div>
  )
}

function SharePopUp() {
  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <div className="popup">
      
      <div className="popUpTitle">
        <h2>{'Share with friends'}</h2>
      </div>
      
      <p>Copy link to share</p>

      <div className="shareLinkBox">
        <p>{window.location.href}</p>
        <button onClick={copyToClipboard()}>Copy</button>
      </div>
      

    </div>
  )
}