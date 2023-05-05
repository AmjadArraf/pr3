import React, { useState } from 'react';
import LoginForm from './loginform'
import SignupForm from './signupform';

function ShowForm() {
  
  const [messageFromChild, setMessageFromChild] = useState('');
  const [state, setState] = useState(true);

  const handleChildMessage = (message) => {
    setMessageFromChild(message);
    if(message === 'success') {
        setState(false)
    }
  };

  const [showForm1, setShowForm1] = useState(true);
  const [showForm2, setShowForm2] = useState(false);

  const handleForm1ButtonClick = () => {
    setShowForm1(true);
    setShowForm2(false);
  };

  const handleForm2ButtonClick = () => {
    setShowForm1(false);
    setShowForm2(true);
  };

  return (
    <div>
         {state && (
    <div>
      <button onClick={handleForm1ButtonClick}>Log in</button>
      <button onClick={handleForm2ButtonClick}>Sign up</button>

      {showForm1 && (
          <LoginForm onMessage={handleChildMessage} />
      )}

      {showForm2 && (
            <SignupForm onMessage={handleChildMessage}/>
      )}
      {messageFromChild}
    </div>
    )}
    </div>
  );
}

export default ShowForm;