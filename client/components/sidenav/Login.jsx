import React from 'react';
import { useState } from 'react';

export default function Login({ checkAuth }) {
  const [signinMessage, setSigninMessage] = useState([]);

  //async function that will check to see if the user exists
  const checkUser = async () => {
    //grab the form fields and build an object
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    const user = { username: username.value, password: password.value };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };
    try {
      await fetch('/login', options);
      checkAuth();
    } catch (err) {
      //if the login fails, throw this error below the login button
      setSigninMessage([
        <p id='error'>Could not find username or password.</p>,
      ]);
    }
  };

  //async function that will check to see if the user exists
  const createUser = async () => {
    //grab the form fields and build an object
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    const user = { username: username.value, password: password.value };
    console.log('USERNAME/PASS', user);
    //checks to make sure form fields are not empty
    for (const key in user) {
      if (user[key] === '') {
        // [AFS] updated conditional to check value at user.key
        setSigninMessage([<p>Please input a valid username or password.</p>]);
        return;
      }
    }
    //checks to make sure password does not have any special characters defined in the regex expression.
    if (password.value.match(/[@$%*#&]/)) {
      setSigninMessage([
        <p>
          Cannot use any of the following special characters in your password:
          @, $, %, *, #, &.
        </p>,
      ]);
      return;
    }
    //construct the object I am going to POST to the server
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };
    try {
      await fetch('/signup', options);
      checkAuth();
    } catch (err) {
      //if the login fails, throw this error below the login button
      setSigninMessage([
        <p id='error'>Unable to create account. Please try again.</p>,
      ]);
    }
  };

  return (
    <div id='login'>
      <div id='loginUserName'>
        <label>User Name</label>
        <input type='text' id='username'></input>
      </div>
      <div id='loginPassword'>
        <label>Password</label>
        <input type='password' id='password'></input>
      </div>
      <div className='signUpButtons'>
        <button onClick={checkUser} type='button' id='loginButton' > Login </button>
        <button onClick={createUser} type='button' id='signUpButton'> Click here to sign up!</button>
      </div>
      <div id='loginSignInMessage'>{signinMessage}</div>
    </div>
  );
}
