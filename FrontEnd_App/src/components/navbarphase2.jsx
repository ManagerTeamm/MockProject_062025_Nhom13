// src/components/NavbarPhase2.jsx
import React, { useState } from 'react';
import styles from '../css/navbarphase2.module.css';

const NavbarPhase2 = () => {
    const [openItem, setOpenItem] = useState('Initial Response');

    const navItems = [
        { id: 'Initial Response', title: 'Initial Response' },
        { id: 'Scene Information', title: 'Scene Information' },
        { id: 'Field Report Summary', title: 'Field Report Summary' },
    ];

    const toggleItem = (itemId) => {
        setOpenItem(openItem === itemId ? null : itemId);
    };

    return (
        <div className={styles.navbarContainer}>
            <div className={styles.navbarHeader}>
                {navItems.map((item) => (
                    <div
                        key={item.id}
                        className={`${styles.navbarItem} ${openItem === item.id ? styles.active : ''}`}
                        onClick={() => toggleItem(item.id)}
                    >
                        <span className={styles.dropdownIcon}>
                            {openItem === item.id ? '▼' : '►'}
                        </span>
                        {item.title}
                    </div>
                ))}
            </div>

            {navItems.map((item) =>
                openItem === item.id && item.content ? (
                    <div key={item.id} className={styles.navbarContent}>
                        {item.content}
                    </div>
                ) : null
            )}
        </div>
    );
};

export default NavbarPhase2;