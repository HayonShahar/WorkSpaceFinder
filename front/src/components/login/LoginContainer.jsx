import React from 'react';
import LoginHeading from './LoginHeading';
import LoginForm from './LoginForm';
import SocialLogin from './SocialLogin';
import '../../styles/register.css'

function LoginContainer() {
  return (
    <div className='rl-warper'>
      <div className="rl-container">
        <LoginHeading />
        <LoginForm />
        <SocialLogin />
      </div>
    </div>
  );
}

export default LoginContainer;
