import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/img/logo.png';
import avatar from '../assets/img/avatar.png'
import { Link } from 'react-router-dom';

export const Header = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const userMenuRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleAvatarClick = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleMenuItemClick = (action) => {
        console.log(action);
        setIsDropdownVisible(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
            setIsDropdownVisible(false); // Close dropdown if click is outside
          }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);

    return (
        <>
            <div className='navbar'>
                <div className='nav-menu'>
                    <Link to="/">
                        <div className='logo'>
                            <img src={logo} width={40} height={40} />
                            <h2>SOLA-FE</h2>
                        </div>
                    </Link>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">HOME</Link>
                            </li>
                            <li>
                                <Link to="/projects">PROJECTS</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='user-menu' onClick={handleAvatarClick} ref={userMenuRef}>
                    <img src={avatar} width={50} height={50} title="user icons" />
                    <span>Admin</span>
                    {isDropdownVisible && (
                        <div className="dropdown-menu">
                            <ul>
                                <li onClick={() => handleMenuItemClick('Profile')}>Profile</li>
                                <li onClick={() => handleMenuItemClick('Logout')}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}