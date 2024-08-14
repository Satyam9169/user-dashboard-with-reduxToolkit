import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Search = () => {
    const { search } = useLocation();
    const query = new URLSearchParams(search).get('query');
    const { users } = useSelector((state) => state.userDetail);

    const filteredUsers = users.filter(
        (user) =>
            user.title.toLowerCase().includes(query.toLowerCase()) ||
            user.description.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2>Search Results for "{query}"</h2>
            {filteredUsers.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.title}</td>
                                <td>{user.description}</td>
                                <td>{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default Search;
