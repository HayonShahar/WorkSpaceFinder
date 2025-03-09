import React from 'react';
import TFAHeading from './TFAHeading';
import TFAForm from './TFAForm';
import '../../styles/register.css'

function TFAContainer() {
  return (
    <div className='rl-warper'>
      <div className="rl-container">
        <TFAHeading />
        <TFAForm />
      </div>
    </div>

  );
}

export default TFAContainer;
