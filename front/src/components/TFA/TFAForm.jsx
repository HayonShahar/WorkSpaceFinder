import React, { useState, useEffect } from 'react';
import TFAInput from './TFAInput';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

function TFAForm() {
    const [code, setCode] = useState('');
    const [otc, setOtc] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(code);
        console.log(otc);
        if (code !== otc) {
            setError("Wrong Code");
            return;
        }

        setSuccess("Code Verificated");

        try {
            const userData = location.state;

            const response = await axios.post('http://localhost:8080/api/users/register', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Registration Success:', response.data);
            setSuccess(response.data.message);

        } catch (error) {

            console.error('Error:', error);
            if (error.response) {
                console.error('API Response Error:', error.response.data);
                setError(error.response.data.message);
                return;
            }
            setError('An error occurred. Please try again later.');
            return;
        }

        setTimeout(() => {
            navigate("/login");
        }, 1500)
    };

    const sendOTP = (name, email) => {
        const oneTimeCode = Math.floor(1000 + Math.random() * 9000).toString();

        setOtc(oneTimeCode);

        const dataToSend = {
            to_name: name,
            to_email: email,
            message: oneTimeCode,
        };
        console.log(dataToSend.message);

        console.log(dataToSend);

        emailjs
            .send('service_den3wln', 'template_a6orpzh', dataToSend, {
                publicKey: 'pSxMqR4gZtAvfW-1V',
            })
            .then(
                (result) => {
                    console.log('SUCCESS!');
                    console.log(result);
                    handleSubmit();
                },
                (error) => {
                    console.log('FAILED...', error);
                }
            );
    };


    useEffect(() => {
        const email = JSON.parse(localStorage.getItem('WSFuserEmail')) || '';
        const name = JSON.parse(localStorage.getItem('WSFuserName')) || '';

        if (!email || !name ) {
            setError("No email found. Please  Sign up first.");
        } else {
            sendOTP(name, email);
        }
    }, []);

    return (
        <form className="rl-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <TFAInput
                placeholder="Code"
                id="code"
                name="code"
                type="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
            />
            <input value="Verify Code" type="submit" className="rl-button" />
            <div className='formBottom'>
                {success && <div className="success-message">{success}</div>}
                <a href='/register'>Back To Registration</a>
            </div>
        </form>
    );
}

export default TFAForm;
