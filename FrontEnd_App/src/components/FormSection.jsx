// Frontend_App/src/components/FormSection.jsx
import React from 'react';

function FormSection({ id, title, isActive, fields, formData, selectFields, selectData, onSave, onCancel, onFinalSave, onSelectChange, onInputChange }) {
    if (!isActive) {
        return null;
    }

    const currentFormData = formData || {};

    return (
        <div id={id} className="form-section active">
            <h2>{title}</h2>
            {fields.map(field => (
                <React.Fragment key={field.id}>
                    <label htmlFor={field.id}>{field.label}</label>
                    {field.type === 'textarea' ? (
                        <textarea
                            id={field.id}
                            rows={field.rows}
                            value={currentFormData[field.id] || ''}
                            onChange={onInputChange}
                        ></textarea>
                    ) : (
                        <input
                            type={field.type}
                            id={field.id}
                            value={
                                field.type === 'datetime-local' && currentFormData[field.id]
                                    ? new Date(currentFormData[field.id]).toISOString().slice(0, 16)
                                    : currentFormData[field.id] || ''
                            }
                            onChange={onInputChange}
                        />
                    )}
                </React.Fragment>
            ))}

            {selectFields && Object.keys(selectFields).map(key => (
                <React.Fragment key={key}>
                    <label htmlFor={key}>{selectFields[key].label}</label>
                    <select id={key} value={selectData[key]} onChange={onSelectChange}>
                        {selectFields[key].options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </React.Fragment>
            ))}

            <div className="form-actions">
                <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                <button className="save-btn" onClick={onSave}>Save</button>
                {onFinalSave && (
                    <button id="finalSaveCrime" className="final-save-btn" onClick={onFinalSave}>Final Save Crime</button>
                )}
            </div>
        </div>
    );
}

export default FormSection;