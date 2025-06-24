// Frontend_App/src/pages/PreliminaryInvestigationPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/Sidebar'; // ĐÃ SỬA ĐƯỜNG DẪN
import FormSection from '../components/FormSection'; // ĐÃ SỬA ĐƯỜNG DẪN

function PreliminaryInvestigationPage({ editingCrimeId, setEditingCrimeId, onSaveSuccess, onSaveCrime, allCrimes }) {
    const [activeForm, setActiveForm] = useState('initial-response');
    const [currentTempData, setCurrentTempData] = useState({
        initialResponse: {},
        sceneInformation: {},
        initialInvestigationReport: {},
        typeOfCrime: 'Unspecified',
        levelOfSeverity: 'Unspecified',
        receivingUnit: 'Local PD',
        status: 'Under Investigation',
    });

    const formFields = {
        'initial-response': [
            { id: 'dispatchTime', label: 'Time of dispatching forces to the scene', type: 'datetime-local' },
            { id: 'officersAssigned', label: 'List of officers assigned to scene', type: 'textarea', rows: 4 },
            { id: 'preliminaryAssessment', label: 'Preliminary assessment of the scene situation', type: 'textarea', rows: 4 },
            { id: 'scenePreservation', label: 'Scene preservation measures taken', type: 'textarea', rows: 4 },
            { id: 'medicalSupport', label: 'Information on medical/rescue support provided', type: 'textarea', rows: 4 },
        ],
        'scene-information': [
            { id: 'sceneDescription', label: 'Scene description', type: 'textarea', rows: 6 },
            { id: 'victimsWitnesses', label: 'Names of victims/witnesses', type: 'textarea', rows: 4 },
            { id: 'lightingConditions', label: 'Lighting conditions', type: 'text' },
            { id: 'weatherConditions', label: 'Weather conditions', type: 'text' },
        ],
        'initial-investigation-report': [
            { id: 'investigationLocation', label: 'Location of investigation', type: 'text' },
            { id: 'investigatingOfficers', label: 'Investigating officers', type: 'textarea', rows: 4 },
            { id: 'actionsTaken', label: 'Actions taken', type: 'textarea', rows: 6 },
            { id: 'evidence', label: 'Evidence', type: 'textarea', rows: 6 },
        ],
    };

    const selectFields = {
        typeOfCrime: {
            label: 'Type of Crime',
            options: ['Unspecified', 'Violent Crimes', 'Property Crimes', 'Drug Offenses', 'Cybercrimes', 'White-Collar Crimes', 'Public Order Crimes']
        },
        levelOfSeverity: {
            label: 'Level of Severity',
            options: ['Unspecified', 'Misdemeanor', '3rd Degree Felony', '2nd Degree Felony', '1st Degree Felony']
        },
        receivingUnit: {
            label: 'Receiving Unit',
            options: ['Local PD', 'Local PD - Investigation Division', 'Violent Crimes Unit (PD)', 'Economic Crimes Division (PD)', 'ATF', 'State Bureau of Investigation (SBI)', 'FBI']
        },
        status: {
            label: 'Status',
            options: ['Under Investigation', 'Awaiting Prosecution', 'Closed']
        }
    };

    const collectFormDataFromDOM = (formId) => {
        const formElements = document.getElementById(formId);
        if (!formElements) return {};
        const data = {};
        formElements.querySelectorAll('input, textarea').forEach(input => {
            if (input.id) {
                data[input.id] = input.value;
            }
        });
        return data;
    };

    const clearAllForms = useCallback(() => {
        setCurrentTempData({
            initialResponse: {},
            sceneInformation: {},
            initialInvestigationReport: {},
            typeOfCrime: 'Unspecified',
            levelOfSeverity: 'Unspecified',
            receivingUnit: 'Local PD',
            status: 'Under Investigation',
        });
        setEditingCrimeId(null);
    }, [setEditingCrimeId]);

    const fillAllForms = useCallback((data) => {
        setCurrentTempData({
            initialResponse: data.initialResponse || {},
            sceneInformation: data.sceneInformation || {},
            initialInvestigationReport: data.initialInvestigationReport || {},
            typeOfCrime: data.typeOfCrime || 'Unspecified',
            levelOfSeverity: data.levelOfSeverity || 'Unspecified',
            receivingUnit: data.receivingUnit || 'Local PD',
            status: data.status || 'Under Investigation',
        });
    }, []);

    useEffect(() => {
        if (editingCrimeId) {
            const crimeToEdit = allCrimes.find(c => c.id === editingCrimeId);
            if (crimeToEdit) {
                fillAllForms(crimeToEdit);
                alert(`Bạn đang chỉnh sửa vụ án #${editingCrimeId}.`);
            } else {
                alert('Không tìm thấy vụ án để chỉnh sửa.');
                clearAllForms();
            }
        } else {
            clearAllForms(); // Reset form khi không có ID chỉnh sửa (tức là tạo mới)
        }
    }, [editingCrimeId, allCrimes, fillAllForms, clearAllForms]);


    const handleSaveTempData = (formType) => {
        let updatedData = {};
        if (formType === 'initialResponse') {
            updatedData = collectFormDataFromDOM('initial-response-form');
            setCurrentTempData(prev => ({ ...prev, initialResponse: updatedData }));
        } else if (formType === 'sceneInformation') {
            updatedData = collectFormDataFromDOM('scene-information-form');
            setCurrentTempData(prev => ({ ...prev, sceneInformation: updatedData }));
        } else if (formType === 'initialInvestigationReport') {
            updatedData = collectFormDataFromDOM('initial-investigation-report-form');
            setCurrentTempData(prev => ({ ...prev, initialInvestigationReport: updatedData }));
        }
        alert(`Dữ liệu "${formType}" đã được lưu tạm thời.`);
    };

    const handleCancelForm = () => {
        const formElement = document.getElementById(`${activeForm}-form`);
        if (formElement) {
            formElement.querySelectorAll('input, textarea, select').forEach(input => {
                if (input.tagName === 'SELECT') {
                    if (input.options.length > 0) {
                        input.value = input.options[0].value;
                    }
                } else {
                    input.value = '';
                }
            });
        }
        setCurrentTempData(prev => {
            if (activeForm === 'initial-response') return { ...prev, initialResponse: {} };
            if (activeForm === 'scene-information') return { ...prev, sceneInformation: {} };
            if (activeForm === 'initial-investigation-report') {
                return {
                    ...prev,
                    initialInvestigationReport: {},
                    typeOfCrime: 'Unspecified',
                    levelOfSeverity: 'Unspecified',
                    receivingUnit: 'Local PD',
                    status: 'Under Investigation'
                };
            }
            return prev;
        });

        alert('Dữ liệu form đã được xóa!');
    };


    const handleFinalSaveCrime = () => {
        const finalInitialResponse = collectFormDataFromDOM('initial-response-form');
        const finalSceneInformation = collectFormDataFromDOM('scene-information-form');
        const finalInitialInvestigationReport = collectFormDataFromDOM('initial-investigation-report-form');

        const typeOfCrimeValue = document.getElementById('typeOfCrime')?.value || 'Unspecified';
        const levelOfSeverityValue = document.getElementById('levelOfSeverity')?.value || 'Unspecified';
        const receivingUnitValue = document.getElementById('receivingUnit')?.value || 'Local PD';
        const statusValue = document.getElementById('status')?.value || 'Under Investigation';

        const crimeData = {
            initialResponse: finalInitialResponse,
            sceneInformation: finalSceneInformation,
            initialInvestigationReport: finalInitialInvestigationReport,
            location: finalInitialInvestigationReport.investigationLocation || 'Unknown',
            typeOfCrime: typeOfCrimeValue,
            levelOfSeverity: levelOfSeverityValue,
            receivingUnit: receivingUnitValue,
            status: statusValue,
            date: new Date().toLocaleDateString('en-US'),
        };

        // Gọi prop onSaveCrime để gửi dữ liệu lên component cha để xử lý lưu
        onSaveCrime(editingCrimeId, crimeData); // editingCrimeId sẽ là null nếu là tạo mới
        clearAllForms(); // Xóa form và reset state
        onSaveSuccess(); // Gọi callback để CrimeManagementPage.jsx chuyển tab và cập nhật bảng
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCurrentTempData(prev => {
            let updatedSection = {};
            if (formFields['initial-response'].some(field => field.id === id)) {
                updatedSection = { ...prev.initialResponse, [id]: value };
                return { ...prev, initialResponse: updatedSection };
            } else if (formFields['scene-information'].some(field => field.id === id)) {
                updatedSection = { ...prev.sceneInformation, [id]: value };
                return { ...prev, sceneInformation: updatedSection };
            } else if (formFields['initial-investigation-report'].some(field => field.id === id)) {
                updatedSection = { ...prev.initialInvestigationReport, [id]: value };
                return { ...prev, initialInvestigationReport: updatedSection };
            }
            return prev;
        });
    };

    const handleSelectChange = (e) => {
        const { id, value } = e.target;
        setCurrentTempData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    return (
        <div id="preliminary-investigation-section" className="content-section active">
            <Sidebar activeSection={activeForm} onSectionClick={setActiveForm} />

            <div className="content-area">
                <input type="hidden" id="currentCrimeId" value={editingCrimeId || ""} />

                <FormSection
                    id="initial-response-form"
                    title="INITIAL RESPONSE"
                    isActive={activeForm === 'initial-response'}
                    fields={formFields['initial-response']}
                    formData={currentTempData.initialResponse}
                    onSave={() => handleSaveTempData('initialResponse')}
                    onCancel={handleCancelForm}
                    onInputChange={handleInputChange}
                />

                <FormSection
                    id="scene-information-form"
                    title="SCENE INFORMATION"
                    isActive={activeForm === 'scene-information'}
                    fields={formFields['scene-information']}
                    formData={currentTempData.sceneInformation}
                    onSave={() => handleSaveTempData('sceneInformation')}
                    onCancel={handleCancelForm}
                    onInputChange={handleInputChange}
                />

                <FormSection
                    id="initial-investigation-report-form"
                    title="INITIAL INVESTIGATION REPORT"
                    isActive={activeForm === 'initial-investigation-report'}
                    fields={formFields['initial-investigation-report']}
                    formData={currentTempData.initialInvestigationReport}
                    selectFields={selectFields}
                    selectData={{
                        typeOfCrime: currentTempData.typeOfCrime,
                        levelOfSeverity: currentTempData.levelOfSeverity,
                        receivingUnit: currentTempData.receivingUnit,
                        status: currentTempData.status,
                    }}
                    onSave={() => handleSaveTempData('initialInvestigationReport')}
                    onCancel={handleCancelForm}
                    onFinalSave={handleFinalSaveCrime}
                    onSelectChange={handleSelectChange}
                    onInputChange={handleInputChange}
                />
            </div>
        </div>
    );
}

export default PreliminaryInvestigationPage;