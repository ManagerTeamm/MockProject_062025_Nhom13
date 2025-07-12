import React, { useEffect, useState } from 'react';
import '../styles/navbarphase2.css';

const NavbarPhase2 = ({ activeItem, onChange }) => {
    const navItems = [
        { id: 'Initial Response', title: 'Initial Response' },
        { id: 'Scene Information', title: 'Scene Information' },
        { id: 'Field Report Summary', title: 'Field Report Summary' },
    ];

    const [openItem, setOpenItem] = useState(activeItem || navItems[0].id);

    useEffect(() => {
        if (activeItem) {
            setOpenItem(activeItem); // Update if activeItem prop changes
        }
    }, [activeItem]);

    const toggleItem = (itemId) => {
        const newItem = openItem === itemId ? null : itemId;
        setOpenItem(newItem);
        if (onChange) onChange(newItem); // optional callback
    };

    return (
        <div className="navbar-wrapper">
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
        </div>
    );
};

export default NavbarPhase2;
