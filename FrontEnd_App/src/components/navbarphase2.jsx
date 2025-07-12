import React, { useEffect, useState } from 'react';
import styles from '../css/navbarphase2.module.css';

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