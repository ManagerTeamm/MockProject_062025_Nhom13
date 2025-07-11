// src/components/navbarphase2.jsx
import React, { useState } from 'react';
import '../styles/navbarphase2.css';

const NavbarPhase2 = () => {
    const [openItem, setOpenItem] = useState('Initial Response');

    const navItems = [
        {
            id: 'Initial Response',
            title: 'Initial Response',
           
        },
        {
            id: 'Scene Information',
            title: 'Scene Information',
            
        },
        {
            id: 'Field Report Summary',
            title: 'Field Report Summary',
           
        },
    ];

    const toggleItem = (itemId) => {
        setOpenItem(openItem === itemId ? null : itemId);
    };

    return (
        <div className="navbar-container">
            <div className="navbar-header">
                {navItems.map((item) => (
                    <div
                        key={item.id}
                        className={`navbar-item ${openItem === item.id ? 'active' : ''}`}
                        onClick={() => toggleItem(item.id)}
                    >
                        <span className="dropdown-icon">
                            {openItem === item.id ? '▼' : '►'}
                        </span>
                        {item.title}
                    </div>
                ))}
            </div>

            {navItems.map((item) =>
                openItem === item.id && item.content ? (
                    <div key={item.id} className="navbar-content show">
                        {item.content}
                    </div>
                ) : null
            )}
        </div>
    );
};

export default NavbarPhase2;
