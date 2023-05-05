import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

    const handleEvent = async (event) => {
    event.preventDefault();
    let info = {
      'email' : `${email}`,
      'password' : `${password}`,
    }
      console.log(info)
      try {
        const res = await axios.post('http://localhost:6000/auth/register', info);
        let data = res.data
        console.log(data)
        Cookies.set('webToken', `${data}`);
      } catch (error) {
        console.log(error.message)
      }
  }


  return (
    <form>
      <label>
        Email:
        <input type="text" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button onClick={handleEvent}>Submit</button>
    </form>
  );
}

export default LoginForm;
