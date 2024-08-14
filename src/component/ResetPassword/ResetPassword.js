import React, { useState } from 'react';
import { auth } from '../Firebase/Firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import './ResetPassword.css';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!email) {
            setError('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Email address is invalid');
        } else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    setMessage('Password reset email sent successfully');
                    setEmail('');
                })
                .catch((error) => {
                    setError(error.message);
                });
        }
    };

    return (
        <section className='reset-container'>
            <form className='reset-form' onSubmit={handleSubmit}>
                <h2>Reset Password</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={handleChange}
                    />
                    {error && <div className="error">{error}</div>}
                    {message && <div className="message">{message}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </section>
    );
};

export default ResetPassword;

