import React from 'react';
import { useState } from 'react';

const Signup = () => {
  const [signinMessage, setSigninMessage] = useState([]);

  //async function that will check to see if the user exists
  const createUser = async () => {
    //grab the form fields and build an object
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    const user = { username: username.value, password: password.value };
    console.log('USERNAME/PASS', user);
    //checks to make sure form fields are not empty
    for (const key in user) {
      if (key === '') {
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
      await fetch('http://localhost:3000/signup/', options)
        .then((res) => res.json())
        .then((auth) =>  {
          console.log('this is auth', auth)
        })
      let checker = false
      //if the login fails, throw this error below the login button
      if(checker === true){
      setSigninMessage([
        <p id='error'>Unable to create account. Please try again.</p>,
      ]);
    }
  };

  return (
    <div id='login'>
      <div>
        <label>User Name:</label>
        <input type='text' id='username'></input>
      </div>
      <div>
        <label>Password:</label>
        <input type='password' id='password'></input>
      </div>
      <button onClick={createUser}>Login</button>
      {signinMessage}
    </div>
  );
};

export default Signup;
