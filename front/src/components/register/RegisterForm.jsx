import React, { useState } from 'react';
import RegisterInput from './RegisterInput';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!/^[a-zA-Z]+$/.test(firstName.trim())) {
            setError('First name can only contain letters.');
            return;
        }

        if (!/^[a-zA-Z]+$/.test(lastName.trim())) {
            setError('Last name can only contain letters.');
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (dob > today) {
            setError('Date of birth cannot be in the future.');
            return;
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d.{4,})/.test(password)) {
            setError(`Password must contain at least:
        - 1 Uppercase letter
        - 1 lowercase letter
        - 5 digits`);
            return;
        }

        if (password !== password2) {
            setError('Passwords do not match.');
            return;
        }

        setError('')

        const userData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            dob: dob,
            password: password,
        };

        console.log(userData);

        setSuccess("Registretion Successfully");

        localStorage.setItem('WSFuserEmail', JSON.stringify(userData.email));
        localStorage.setItem('WSFuserName', JSON.stringify(userData.first_name));

        setTimeout(() => {
            navigate('/tfa', { state: userData });
        }, 1500)

    };

    return (
        <form className="rl-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <RegisterInput
                placeholder="First Name"
                id="first_name"
                name="first_name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <RegisterInput
                placeholder="Last Name"
                id="last_name"
                name="last_name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            <RegisterInput
                placeholder="Email"
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <RegisterInput
                placeholder="Date of Birth"
                id="dob"
                name="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
            />
            <RegisterInput
                placeholder="Password"
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <RegisterInput
                placeholder="Confirm Password"
                id="password2"
                name="password2"
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
            />
            <input value="Sign Up" type="submit" className="rl-button" />
            <div className='formBottom'>
                {success && <div className="success-message">{success}</div>}
                <a href='/login'>To Login</a>
            </div>
        </form>
    );
}

export default RegisterForm;
