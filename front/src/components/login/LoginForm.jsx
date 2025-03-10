import React, { useState, useEffect } from 'react';
import LoginInput from './LoginInput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    
    useEffect(() => {
        const savedEmail = JSON.parse(localStorage.getItem('WSFuserEmail'));
        if (savedEmail) {
            setEmail(savedEmail);
            localStorage.removeItem('WSFuserEmail');
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const userData = {
            email: email,
            password: password
        };

        console.log(userData);

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(!response.data.success){
                setError(response.data.message);
                return;
            }


            console.log('User logged in successfully!');
            console.log('Login data:', response.data);
            
            setSuccess(response.data.message);

            localStorage.setItem("token",response.data.token);
            localStorage.setItem("userId",response.data.user.id);

            setTimeout(()=>{
                navigate('/');
            },1500)

        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                console.error('API Response Error:', error.response.data);
            }
            setError('An error occurred, Please try again later.');
        }
    };

    return (
        <form className="rl-form" onSubmit={handleSubmit}>
            <LoginInput
                placeholder="Email"
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            <LoginInput
                placeholder="Password"
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            <input value="Sign In" type="submit" className="rl-button" />
            <div className='formBottom'>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <a href='/register'>To Registration</a>
            </div>
        </form>
    );
}

export default LoginForm;
