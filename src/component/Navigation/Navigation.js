import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import Logout from '../Logout/Logout';

const NavBar = ({ user }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${searchQuery}`);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand" to={'/'}>
                    WebApp
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {user && (
                        <>
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={'/'}>
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/create'}>
                                        Create POST
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/read'}>
                                        All Posts
                                    </Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav icons">
                                <li className="nav-item">
                                    <form onSubmit={handleSearchSubmit} className="d-flex">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />
                                        <button type="submit" className="btn btn-outline-secondary">
                                            <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                    </form>
                                </li>

                                {/* <li className="nav-item">
                                    <Link className="nav-link" to={'/cart'}>
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                    </Link>
                                </li> */}
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link dropdown-toggle"
                                        to={'/profile'}
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <FontAwesomeIcon icon={faUser} />
                                    </Link>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Logout />
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

