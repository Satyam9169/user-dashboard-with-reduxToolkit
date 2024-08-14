import React from 'react'
import { auth } from '../Firebase/Firebase'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return (
        <button className="dropdown-item" onClick={handleLogout}>
            Logout
        </button>
    )
}

export default Logout