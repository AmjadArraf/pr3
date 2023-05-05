import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlefirstnameChange = (event) => {
    setfirstname(event.target.value);
  };
  const handlelastnameChange = (event) => {
    setlastname(event.target.value);
  };
    const handleSubmit = async (event) => {
    event.preventDefault();
    let info = {
      'email' : `${email}`,
      'password' : `${password}`,
      'firsrname' : `${firstname}`,
      'lastname' : `${lastname}`
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
      <label>
        First Name:
        <input type="text" value={firstname} onChange={handlefirstnameChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" value={lastname} onChange={handlelastnameChange} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}

export default SignupForm;