// Frontend_App/src/pages/CrimeManagementPage.jsx
import React, { useState, useCallback } from 'react';
import PreliminaryInvestigationPage from './PreliminaryInvestigationPage';
import CrimeReportingPage from './CrimeReportingPage';
import '../index.css'; // Quan trọng: Đảm bảo CSS chung được import để các class CSS hoạt động

// Dữ liệu mẫu ban đầu
const initialCrimes = [
    {
        id: 'CRIME-001',
        typeOfCrime: 'Violent Crimes',
        levelOfSeverity: '3rd Degree Felony',
        date: '13/05/2025',
        receivingUnit: 'Local PD - Investigation Division',
        location: 'Austin, TX',
        status: 'Under Investigation',
        initialResponse: {
            dispatchTime: "2025-05-13T10:00",
            officersAssigned: "Officer Davis, Officer Chen",
            preliminaryAssessment: "Assault case, suspect fled.",
            scenePreservation: "Crime tape deployed.",
            medicalSupport: "Victim transported to hospital."
        },
        sceneInformation: {
            sceneDescription: "Public park, near playground.",
            victimsWitnesses: "Victim: Jane Doe. Witness: Alex Smith.",
            lightingConditions: "Daylight, sunny.",
            weatherConditions: "Clear, 70°F."
        },
        initialInvestigationReport: {
            investigationLocation: "Austin PD Main Station",
            investigatingOfficers: "Det. Rodriguez",
            actionsTaken: "Interviewed witness, collected initial statements.",
            evidence: "No physical evidence found at scene."
        }
    },
    {
        id: 'CRIME-002',
        typeOfCrime: 'Violent Crimes',
        levelOfSeverity: '3rd Degree Felony',
        date: '13/05/2025',
        receivingUnit: 'Violent Crimes Unit (PD)',
        location: 'Chicago, IL',
        status: 'Under Investigation',
        initialResponse: {
            dispatchTime: "2025-05-13T11:30",
            officersAssigned: "Officer Brown, Officer White",
            preliminaryAssessment: "Robbery, suspect armed.",
            scenePreservation: "Area secured.",
            medicalSupport: "No injuries reported."
        },
        sceneInformation: {
            sceneDescription: "Small convenience store.",
            victimsWitnesses: "Victim: Store Clerk. No witnesses.",
            lightingConditions: "Interior lights on.",
            weatherConditions: "Cloudy, 55°F."
        },
        initialInvestigationReport: {
            investigationLocation: "Chicago PD District 1",
            investigatingOfficers: "Det. Miller",
            actionsTaken: "Reviewed surveillance footage, issued BOLO.",
            evidence: "CCTV footage."
        }
    },
    { id: 'CRIME-003', typeOfCrime: 'Property Crimes', levelOfSeverity: 'Misdemeanor', date: '22/05/2025', receivingUnit: 'Local PD - Investigation Division', location: 'New York, NY', status: 'Under Investigation', initialResponse: {}, sceneInformation: {}, initialInvestigationReport: {} },
    { id: 'CRIME-004', typeOfCrime: 'Drug Offenses', levelOfSeverity: '3rd Degree Felony', date: '15/06/2025', receivingUnit: 'ATF', location: 'San Francisco, CA', status: 'Awaiting Prosecution', initialResponse: {}, sceneInformation: {}, initialInvestigationReport: {} },
    { id: 'CRIME-005', typeOfCrime: 'Cybercrimes', levelOfSeverity: '2nd Degree Felony', date: '06/09/2025', receivingUnit: 'State Bureau of Investigation (SBI)', location: 'Chicago, IL', status: 'Awaiting Prosecution', initialResponse: {}, sceneInformation: {}, initialInvestigationReport: {} },
    { id: 'CRIME-006', typeOfCrime: 'Drug Offenses', levelOfSeverity: 'Misdemeanor', date: '25/09/2025', receivingUnit: 'ATF', location: 'Seattle, WA', status: 'Closed', initialResponse: {}, sceneInformation: {}, initialInvestigationReport: {} },
    { id: 'CRIME-007', typeOfCrime: 'Property Crimes', levelOfSeverity: 'Misdemeanor', date: '04/10/2025', receivingUnit: 'Local PD - Investigation Division', location: 'Seattle, WA', status: 'Under Investigation', initialResponse: {}, sceneInformation: {}, initialInvestigationReport: {} },
    { id: 'CRIME-008', typeOfCrime: 'White-Collar Crimes', levelOfSeverity: '2nd Degree Felony', date: '17/10/2025', receivingUnit: 'Economic Crimes Division (PD)', location: 'New York, NY', status: 'Under Investigation', initialResponse: {}, sceneInformation: {}, initialInvestigationReport: {} },
    { id: 'CRIME-009', typeOfCrime: 'Public Order Crimes', levelOfSeverity: 'Misdemeanor', date: '01/11/2025', receivingUnit: 'Local PD - Investigation Division', location: 'Seattle, WA', status: 'Closed', initialResponse: {}, sceneInformation: {}, initialInvestigationReport: {} },
    { id: 'CRIME-010', typeOfCrime: 'Property Crimes', levelOfSeverity: '3rd Degree Felony', date: '22/11/2025', receivingUnit: 'Local PD - Investigation Division', location: 'Chicago, IL', status: 'Awaiting Prosecution', initialResponse: {}, sceneInformation: {}, initialInvestigationReport: {} }
];

// Hàm tạo ID đơn giản (thay thế UUID từ backend)
const generateSimpleId = () => {
    return `CRIME-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
};

function CrimeManagementPage() {
    const [activeTab, setActiveTab] = useState('preliminary-investigation');
    const [editingCrimeId, setEditingCrimeId] = useState(null); // State để truyền ID vụ án đang chỉnh sửa
    const [allCrimes, setAllCrimes] = useState(initialCrimes); // State chứa tất cả dữ liệu vụ án

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        // Khi chuyển tab, reset editingCrimeId nếu không phải là chuyển từ bảng sang form edit
        if (tabId === 'preliminary-investigation' && editingCrimeId === null) {
            // Nếu chuyển sang tab này và không phải đang chỉnh sửa, thì form sẽ được clear bởi PreliminaryInvestigationPage
        }
    };

    const handleEditCrime = useCallback((crimeId) => {
        setEditingCrimeId(crimeId);
        setActiveTab('preliminary-investigation'); // Chuyển về tab điều tra để chỉnh sửa
    }, []);

    const handleSaveSuccess = useCallback(() => {
        setActiveTab('crime-reporting'); // Chuyển về tab báo cáo sau khi lưu/cập nhật thành công
        setEditingCrimeId(null); // Reset ID chỉnh sửa sau khi lưu/cập nhật thành công
    }, []);

    const handleSaveCrime = useCallback((crimeId, newCrimeData) => {
        if (crimeId) {
            // Cập nhật vụ án hiện có
            setAllCrimes(prevCrimes =>
                prevCrimes.map(crime =>
                    crime.id === crimeId ? { ...crime, ...newCrimeData, id: crimeId } : crime
                )
            );
            alert('Vụ án đã được cập nhật thành công!');
        } else {
            // Thêm vụ án mới
            const newId = generateSimpleId();
            setAllCrimes(prevCrimes => [
                ...prevCrimes,
                { ...newCrimeData, id: newId }
            ]);
            alert('Vụ án mới đã được thêm thành công!');
        }
    }, []);

    const handleDeleteCrime = useCallback((crimeId) => {
        setAllCrimes(prevCrimes => prevCrimes.filter(crime => crime.id !== crimeId));
    }, []);

    return (
        <div className="container">
            <div className="header-tabs">
                <div
                    className={`tab ${activeTab === 'preliminary-investigation' ? 'active' : ''}`}
                    onClick={() => handleTabClick('preliminary-investigation')}
                    data-tab="preliminary-investigation"
                >
                    Preliminary Investigation
                </div>
                <div
                    className={`tab ${activeTab === 'crime-reporting' ? 'active' : ''}`}
                    onClick={() => handleTabClick('crime-reporting')}
                    data-tab="crime-reporting"
                >
                    Crime Detection and Reporting
                </div>
                {/* Bạn có thể thêm tab cho Follow-up Investigation nếu muốn */}
                {/* <div
                    className={`tab ${activeTab === 'follow-up-investigation' ? 'active' : ''}`}
                    onClick={() => handleTabClick('follow-up-investigation')}
                    data-tab="follow-up-investigation"
                >
                    Follow-up Investigation
                </div> */}
            </div>

            <div className="main-content">
                {activeTab === 'preliminary-investigation' && (
                    <PreliminaryInvestigationPage
                        editingCrimeId={editingCrimeId}
                        setEditingCrimeId={setEditingCrimeId}
                        onSaveSuccess={handleSaveSuccess}
                        onSaveCrime={handleSaveCrime} // Truyền hàm lưu lên đây
                        allCrimes={allCrimes} // Truyền dữ liệu để PreliminaryInvestigationPage tìm vụ án chỉnh sửa
                    />
                )}
                {activeTab === 'crime-reporting' && (
                    <CrimeReportingPage
                        onEditCrime={handleEditCrime}
                        onDeleteCrime={handleDeleteCrime} // Truyền hàm xóa xuống đây
                        allCrimes={allCrimes} // Truyền dữ liệu để CrimeReportingPage hiển thị
                    />
                )}
                {/* {activeTab === 'follow-up-investigation' && (
                    <div id="follow-up-investigation-section" className="content-section active">
                        <h2>Follow-up Investigation</h2>
                        <p>Nội dung cho Follow-up Investigation sẽ ở đây.</p>
                    </div>
                )} */}
            </div>
        </div>
    );
}

export default CrimeManagementPage;