const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Để tạo ID duy nhất

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Cho phép các yêu cầu từ các origin khác nhau
app.use(bodyParser.json()); // Hỗ trợ body JSON
app.use(bodyParser.urlencoded({ extended: true })); // Hỗ trợ body URL-encoded

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Redirect tất cả các request đến index.html cho các route frontend
// Đảm bảo route này đặt SAU các định nghĩa API
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- Dữ liệu tạm thời (In-memory Database) ---
let crimes = []; // Mảng để lưu trữ các vụ án
// let currentId = 1000; // Không dùng nữa, sẽ dùng UUID

// Dữ liệu mẫu (chỉ để điền sẵn vào bảng khi khởi động server) - CẬP NHẬT NĂM 2025
const sampleCrimes = [
    {
        id: 'CRIME-001', // Sử dụng ID dạng chuỗi
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
    {
        id: 'CRIME-003',
        typeOfCrime: 'Property Crimes',
        levelOfSeverity: 'Misdemeanor',
        date: '22/05/2025',
        receivingUnit: 'Local PD - Investigation Division',
        location: 'New York, NY',
        status: 'Under Investigation',
        initialResponse: {},
        sceneInformation: {},
        initialInvestigationReport: {}
    },
    {
        id: 'CRIME-004',
        typeOfCrime: 'Drug Offenses',
        levelOfSeverity: '3rd Degree Felony',
        date: '15/06/2025',
        receivingUnit: 'ATF',
        location: 'San Francisco, CA',
        status: 'Awaiting Prosecution',
        initialResponse: {},
        sceneInformation: {},
        initialInvestigationReport: {}
    },
    {
        id: 'CRIME-005',
        typeOfCrime: 'Cybercrimes',
        levelOfSeverity: '2nd Degree Felony',
        date: '06/09/2025',
        receivingUnit: 'State Bureau of Investigation (SBI)',
        location: 'Chicago, IL',
        status: 'Awaiting Prosecution',
        initialResponse: {},
        sceneInformation: {},
        initialInvestigationReport: {}
    },
    {
        id: 'CRIME-006',
        typeOfCrime: 'Drug Offenses',
        levelOfSeverity: 'Misdemeanor',
        date: '25/09/2025',
        receivingUnit: 'ATF',
        location: 'Seattle, WA',
        status: 'Closed',
        initialResponse: {},
        sceneInformation: {},
        initialInvestigationReport: {}
    },
    {
        id: 'CRIME-007',
        typeOfCrime: 'Property Crimes',
        levelOfSeverity: 'Misdemeanor',
        date: '04/10/2025',
        receivingUnit: 'Local PD - Investigation Division',
        location: 'Seattle, WA',
        status: 'Under Investigation',
        initialResponse: {},
        sceneInformation: {},
        initialInvestigationReport: {}
    },
    {
        id: 'CRIME-008',
        typeOfCrime: 'White-Collar Crimes',
        levelOfSeverity: '2nd Degree Felony',
        date: '17/10/2025',
        receivingUnit: 'Economic Crimes Division (PD)',
        location: 'New York, NY',
        status: 'Under Investigation',
        initialResponse: {},
        sceneInformation: {},
        initialInvestigationReport: {}
    },
    {
        id: 'CRIME-009',
        typeOfCrime: 'Public Order Crimes',
        levelOfSeverity: 'Misdemeanor',
        date: '01/11/2025',
        receivingUnit: 'Local PD - Investigation Division',
        location: 'Seattle, WA',
        status: 'Closed',
        initialResponse: {},
        sceneInformation: {},
        initialInvestigationReport: {}
    },
    {
        id: 'CRIME-010',
        typeOfCrime: 'Property Crimes',
        levelOfSeverity: '3rd Degree Felony',
        date: '22/11/2025',
        receivingUnit: 'Local PD - Investigation Division',
        location: 'Chicago, IL',
        status: 'Awaiting Prosecution',
        initialResponse: {},
        sceneInformation: {},
        initialInvestigationReport: {}
    }
];

crimes = sampleCrimes; // Khởi tạo dữ liệu khi server khởi động

// --- API Routes ---

// Lấy tất cả các vụ án
app.get('/api/crimes', (req, res) => {
    res.status(200).json(crimes);
});

// Lấy một vụ án theo ID
app.get('/api/crimes/:id', (req, res) => {
    const { id } = req.params;
    const crime = crimes.find(c => c.id === id);
    if (crime) {
        res.status(200).json(crime);
    } else {
        res.status(404).json({ message: 'Crime not found' });
    }
});

// Tạo một vụ án mới (kết hợp dữ liệu từ các form)
app.post('/api/crimes', (req, res) => {
    const newCrime = {
        id: uuidv4(), // Tạo ID duy nhất bằng UUID
        typeOfCrime: req.body.typeOfCrime || 'Unspecified',
        levelOfSeverity: req.body.levelOfSeverity || 'Unspecified',
        date: req.body.date || new Date().toLocaleDateString('en-US'), // Lấy ngày hiện tại
        receivingUnit: req.body.receivingUnit || 'Local PD',
        location: req.body.location || 'Unknown', // Lấy từ Initial Investigation Report
        status: req.body.status || 'Under Investigation',
        initialResponse: req.body.initialResponse || {},
        sceneInformation: req.body.sceneInformation || {},
        initialInvestigationReport: req.body.initialInvestigationReport || {}
    };
    crimes.push(newCrime);
    console.log('New crime added:', newCrime);
    res.status(201).json({ message: 'Crime added successfully!', crime: newCrime });
});

// Cập nhật một vụ án
app.put('/api/crimes/:id', (req, res) => {
    const { id } = req.params;
    const updatedCrimeData = req.body;
    const index = crimes.findIndex(c => c.id === id);

    if (index !== -1) {
        // Cập nhật từng trường một, hoặc thay thế hoàn toàn
        crimes[index] = { ...crimes[index], ...updatedCrimeData, id: id }; // Giữ nguyên ID
        console.log('Crime updated:', crimes[index]);
        res.status(200).json({ message: 'Crime updated successfully!', crime: crimes[index] });
    } else {
        res.status(404).json({ message: 'Crime not found for update' });
    }
});

// Xóa một vụ án
app.delete('/api/crimes/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = crimes.length;
    crimes = crimes.filter(c => c.id !== id);

    if (crimes.length < initialLength) {
        console.log(`Crime with ID ${id} deleted.`);
        res.status(200).json({ message: 'Crime deleted successfully!' });
    } else {
        res.status(404).json({ message: 'Crime not found for deletion' });
    }
});

// Endpoint chung để xử lý POST từ các form riêng lẻ (như trước)
// Lưu ý: Với cách Final Save hiện tại, các endpoint temp này có thể không cần thiết
// nếu bạn chỉ muốn lưu cục bộ trên frontend cho đến khi nhấn Final Save.
// Tuy nhiên, tôi vẫn giữ chúng ở đây nếu bạn có ý định dùng lại.
let tempInitialResponse = {};
let tempSceneInformation = {};
let tempInitialInvestigationReport = {};

app.post('/api/initial-response-temp', (req, res) => {
    tempInitialResponse = req.body;
    console.log('Received temp Initial Response:', tempInitialResponse);
    res.status(200).json({ message: 'Temp Initial Response saved!' });
});

app.post('/api/scene-information-temp', (req, res) => {
    tempSceneInformation = req.body;
    console.log('Received temp Scene Information:', tempSceneInformation);
    res.status(200).json({ message: 'Temp Scene Information saved!' });
});

app.post('/api/initial-investigation-report-temp', (req, res) => {
    tempInitialInvestigationReport = req.body;
    console.log('Received temp Initial Investigation Report:', tempInitialInvestigationReport);
    res.status(200).json({ message: 'Temp Initial Investigation Report saved!' });
});

// API để lấy dữ liệu tạm thời (khi người dùng chuyển đổi giữa các tab trước khi SAVE cuối cùng)
app.get('/api/temp-data', (req, res) => {
    res.status(200).json({
        initialResponse: tempInitialResponse,
        sceneInformation: tempSceneInformation,
        initialInvestigationReport: tempInitialInvestigationReport
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});