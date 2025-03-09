import React from 'react';
import RegisterHeading from './RegisterHeading';
import RegisterForm from './RegisterForm';
import SocialRegister from './SocialRegister';
import '../../styles/register.css'

function RegisterContainer() {
  return (
    <div className='rl-warper'>
      <div className="rl-container">
        <RegisterHeading />
        <RegisterForm />
        <SocialRegister />
      </div>
    </div>
  );
}

export default RegisterContainer;
