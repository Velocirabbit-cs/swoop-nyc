import React from 'react';
import LandingPage from './LandingPage.jsx';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../styles.scss';
import '../../build/calendar.css';
import CreatePost from './sidenav/CreatePost.jsx';
import Listings from './containers/Listings.jsx';
import Share from './containers/Share.jsx';
import Login from './sidenav/Login.jsx';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateItems } from './reducers/swoopSlice.js';

export default function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuth = () => {
    console.log('Check auth');
    fetch('/auth')
      .then((res) => res.json())
      .then((auth) => {
        console.log('AUTH:', auth);
        if (auth === true) setAuthenticated(auth);
      })
      .catch((err) => {
        console.log('not authorized');
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Router>
      <nav>
        <div className="headerPlaceholder"></div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          {authenticated && (
            <li>
              <Link to='/listings'>View Listings</Link>
            </li>
          )}
          {authenticated && (
            <li>
              <Link to='/createpost'>Create Listing</Link>
            </li>
          )}
        </ul>
        {/* {authenticated && (
          <Share view={showShareView} >{'Share'}</Share>
        )} */}
        <Share />
      </nav>

      <Routes>
        <Route path='/' element={<LandingPage checkAuth={checkAuth} />}></Route>
        <Route path='/listings' element={<Listings />}></Route>
        <Route path='/createpost' element={<CreatePost />}></Route>
        <Route path='/login' element={<Login />}></Route>
        {/* <Route path='/signup' element={<Signup />}></Route> */}
      </Routes>

      <footer>
        <p>A Velocirabbit Production</p>
        <p>
          <span>J</span>ade |<span>J</span>ake |<span>J</span>ackson |
          <span>J</span>andrew |<span>J</span>dennis
        </p>
      </footer>
    </Router>
  );
}
