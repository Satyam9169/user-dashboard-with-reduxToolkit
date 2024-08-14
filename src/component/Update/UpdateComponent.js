import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, fetchUserById } from '../redux/userSlice'; // Assume you've implemented these actions

const UpdateComponent = ({ match }) => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.userDetail);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        // Add other fields as needed
    });

    useEffect(() => {
        dispatch(fetchUserById(match.params.id)); // Fetch the user data by ID
    }, [dispatch, match.params.id]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                // Populate other fields as needed
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser({ id: match.params.id, ...formData })); // Update the user data
    };

    return (
        <div className="container mt-4">
            <h2>Update User</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Add other fields as needed */}
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            )}
        </div>
    );
};

export default UpdateComponent;
