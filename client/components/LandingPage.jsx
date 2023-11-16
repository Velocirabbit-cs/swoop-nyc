import React from 'react';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import { useState } from 'react';

import Login from './sidenav/Login.jsx';

export default function LandingPage(props) {
  return (
    <div className='landing-page'>
      <div id='title'>
        <h1>{'STOOPING'}</h1>
        <h2>{`Community Recycling Made Easy`}</h2>
      </div>

      <Login checkAuth={props.checkAuth} />
    </div>
  );
}
