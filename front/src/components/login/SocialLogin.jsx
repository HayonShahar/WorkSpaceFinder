import React from 'react';
import SocialButton from '../register/SocialButton';

function SocialLogin() {
  return (
    <div className="social-rl">
      <span className="title">Or Signin with</span>
      <div className="social-accounts">
        <SocialButton platform="google" />
        <SocialButton platform="apple" />
        <SocialButton platform="twitter" />
      </div>
      <span className="agreement"><a href="#">Learn user licence agreement</a></span>
    </div>
  );
}

export default SocialLogin;
