
import React from 'react';

function Sidebar({ activeSection, onSectionClick }) {
    const sections = [
        { id: 'initial-response', name: 'Initial Response' },
        { id: 'scene-information', name: 'Scene Information' },
        { id: 'initial-investigation-report', name: 'Initial Investigation Report' },
    ];

    return (
        <div className="sidebar">
            {sections.map(section => (
                <div
                    key={section.id}
                    className={`sidebar-section ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => onSectionClick(section.id)}
                    data-section={section.id}
                >
                    <span className="arrow">&gt;</span> {section.name}
                </div>
            ))}
        </div>
    );
}

export default Sidebar;