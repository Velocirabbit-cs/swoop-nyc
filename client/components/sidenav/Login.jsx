import React from 'react';
import { useState } from 'react';

export default function Login() {
  const [loginMessage, setLoginMessage] = useState([]);

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
    } catch (err) {
      //if the login fails, throw this error below the login button
      setLoginMessage([<p id='error'>Could not find username or password.</p>]);
    }
  };

  return (
    <div id='login'>
      <label>User Name:</label>
      <input type='text' id='username'></input>
      <label>Password:</label>
      <input type='password' id='password'></input>
      <button onClick={checkUser}>Login</button>
    </div>
  );
}
