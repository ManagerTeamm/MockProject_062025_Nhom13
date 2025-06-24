document.addEventListener('DOMContentLoaded', () => {
    const headerTabs = document.querySelectorAll('.header-tabs .tab');
    const contentSections = document.querySelectorAll('.content-section');

    const sidebarSections = document.querySelectorAll('.sidebar-section');
    const formSections = document.querySelectorAll('.form-section');
    const saveButtons = document.querySelectorAll('.save-btn');
    const cancelButtons = document.querySelectorAll('.cancel-btn');
    const finalSaveCrimeButton = document.getElementById('finalSaveCrime');
    const currentCrimeIdInput = document.getElementById('currentCrimeId');

    const crimesTableBody = document.getElementById('crimesTableBody');
    const searchCrimesInput = document.getElementById('searchCrimes');
    const showEntriesSelect = document.getElementById('showEntries');

    // Select elements for the general crime details (now visible selects)
    const typeOfCrimeSelect = document.getElementById('typeOfCrime');
    const levelOfSeveritySelect = document.getElementById('levelOfSeverity');
    const receivingUnitSelect = document.getElementById('receivingUnit');
    const statusSelect = document.getElementById('status');


    let currentTempData = {
        initialResponse: {},
        sceneInformation: {},
        initialInvestigationReport: {}
    };

    let editingCrimeId = null; // Biến để lưu ID vụ án đang chỉnh sửa

    // --- Tab Switching Logic (Crime Detection / Preliminary Investigation) ---
    const showMainSection = (sectionId) => {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        headerTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.tab === sectionId.replace('-section', '')) {
                tab.classList.add('active');
            }
        });

        // If switching to crime reporting, load data
        if (sectionId === 'crime-reporting-section') {
            loadCrimesTable();
        }
    };

    headerTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetSection = tab.dataset.tab + '-section';
            showMainSection(targetSection);
        });
    });

    // --- Preliminary Investigation Forms Logic ---

    // Function to show a specific form section within Preliminary Investigation
    const showPreliminaryInvestigationForm = (formId) => {
        formSections.forEach(form => {
            form.classList.remove('active');
        });
        document.getElementById(formId).classList.add('active');

        sidebarSections.forEach(sidebar => {
            sidebar.classList.remove('active');
            if (sidebar.dataset.section === formId.replace('-form', '')) {
                sidebar.classList.add('active');
            }
        });
        // Load temporary data into the form when switching
        if (formId === 'initial-response-form') {
            fillForm(formId, currentTempData.initialResponse);
        } else if (formId === 'scene-information-form') {
            fillForm(formId, currentTempData.sceneInformation);
        } else if (formId === 'initial-investigation-report-form') {
            fillForm(formId, currentTempData.initialInvestigationReport);
            // Also fill the select elements if they are part of this form or generally related
            typeOfCrimeSelect.value = currentTempData.typeOfCrime || 'Unspecified';
            levelOfSeveritySelect.value = currentTempData.levelOfSeverity || 'Unspecified';
            receivingUnitSelect.value = currentTempData.receivingUnit || 'Local PD';
            statusSelect.value = currentTempData.status || 'Under Investigation';
        }
    };

    // Event listener for sidebar clicks
    sidebarSections.forEach(section => {
        section.addEventListener('click', () => {
            const targetForm = section.dataset.section + '-form';
            showPreliminaryInvestigationForm(targetForm);
        });
    });

    // Function to fill form with data
    const fillForm = (formId, data) => {
        const form = document.getElementById(formId);
        if (!form || !data) return;

        for (const key in data) {
            const element = form.querySelector(`#${key}`);
            if (element) {
                if (element.type === 'datetime-local') {
                    // Handle datetime-local format if necessary, ensure it's in YYYY-MM-DDTHH:MM format
                    element.value = data[key] ? new Date(data[key]).toISOString().slice(0, 16) : '';
                } else {
                    element.value = data[key] || ''; // Use empty string for null/undefined
                }
            }
        }
    };

    // Function to collect data from a specific form
    const collectFormData = (formId) => {
        const form = document.getElementById(formId);
        const data = {};
        form.querySelectorAll('input, textarea').forEach(input => {
            if (input.id) { // Only collect if element has an ID
                data[input.id] = input.value;
            }
        });
        return data;
    };

    // Event listeners for individual Save buttons (save to temp data)
    saveButtons.forEach(button => {
        button.addEventListener('click', () => {
            const formType = button.dataset.form;
            if (formType === 'initialResponse') {
                currentTempData.initialResponse = collectFormData('initial-response-form');
            } else if (formType === 'sceneInformation') {
                currentTempData.sceneInformation = collectFormData('scene-information-form');
            } else if (formType === 'initialInvestigationReport') {
                currentTempData.initialInvestigationReport = collectFormData('initial-investigation-report-form');
            }
            alert(`Dữ liệu "${formType}" đã được lưu tạm thời.`);
            console.log('Current temporary data:', currentTempData);
        });
    });

    // Event listeners for Cancel buttons (clear form data)
    cancelButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const form = event.target.closest('.form-section');
            if (form) {
                const inputs = form.querySelectorAll('input, textarea, select'); // Include select
                inputs.forEach(input => {
                    input.value = '';
                });
                alert('Form data cleared!');
            }
        });
    });

    // --- Final Save/Update Crime Logic ---
    finalSaveCrimeButton.addEventListener('click', async () => {
        // Thu thập tất cả dữ liệu tạm thời (đảm bảo cập nhật lần cuối)
        currentTempData.initialResponse = collectFormData('initial-response-form');
        currentTempData.sceneInformation = collectFormData('scene-information-form');
        currentTempData.initialInvestigationReport = collectFormData('initial-investigation-report-form');

        // Lấy các trường tổng quát từ report form và các select mới
        const reportData = currentTempData.initialInvestigationReport;
        const crimeData = {
            initialResponse: currentTempData.initialResponse,
            sceneInformation: currentTempData.sceneInformation,
            initialInvestigationReport: reportData,
            location: reportData.investigationLocation || 'Unknown', // Dùng location từ report
            typeOfCrime: typeOfCrimeSelect.value,
            levelOfSeverity: levelOfSeveritySelect.value,
            receivingUnit: receivingUnitSelect.value,
            status: statusSelect.value,
            date: new Date().toLocaleDateString('en-US') // Lấy ngày hiện tại
        };

        const crimeId = currentCrimeIdInput.value;
        try {
            let response;
            if (crimeId) { // Chế độ chỉnh sửa
                response = await axios.put(`/api/crimes/${crimeId}`, crimeData);
                alert('Vụ án đã được cập nhật thành công!');
            } else { // Chế độ tạo mới
                response = await axios.post('/api/crimes', crimeData);
                alert('Vụ án mới đã được thêm thành công!');
            }
            console.log('Server response:', response.data);
            // Sau khi lưu, chuyển sang trang báo cáo
            showMainSection('crime-reporting-section');
            loadCrimesTable(); // Tải lại bảng với dữ liệu mới/đã cập nhật

            // Reset forms and temporary data after successful save
            clearAllForms();
            currentTempData = { initialResponse: {}, sceneInformation: {}, initialInvestigationReport: {} };
            currentCrimeIdInput.value = ''; // Clear current crime ID
            editingCrimeId = null; // Reset editing state

        } catch (error) {
            console.error('Error saving crime:', error.response ? error.response.data : error.message);
            alert('Có lỗi xảy ra khi lưu vụ án. Vui lòng kiểm tra console.');
        }
    });

    // --- Crime Table Logic ---
    let allCrimes = []; // Để lưu trữ toàn bộ dữ liệu crime
    let currentPage = 1;
    let entriesPerPage = parseInt(showEntriesSelect.value);

    const loadCrimesTable = async () => {
        try {
            const response = await axios.get('/api/crimes');
            allCrimes = response.data;
            console.log('Loaded crimes:', allCrimes);
            renderCrimesTable();
        } catch (error) {
            console.error('Error loading crimes:', error.response ? error.response.data : error.message);
            crimesTableBody.innerHTML = '<tr><td colspan="8">Không thể tải dữ liệu vụ án.</td></tr>';
        }
    };

    const renderCrimesTable = () => {
        crimesTableBody.innerHTML = ''; // Clear existing rows
        const searchTerm = searchCrimesInput.value.toLowerCase();
        const filteredCrimes = allCrimes.filter(crime =>
            Object.values(crime).some(val => {
                if (typeof val === 'object' && val !== null) {
                    // Check nested objects (initialResponse, sceneInformation, etc.)
                    return Object.values(val).some(nestedVal =>
                        String(nestedVal).toLowerCase().includes(searchTerm)
                    );
                }
                return String(val).toLowerCase().includes(searchTerm);
            })
        );

        const startIndex = (currentPage - 1) * entriesPerPage;
        const endIndex = startIndex + entriesPerPage;
        const paginatedCrimes = filteredCrimes.slice(startIndex, endIndex);

        if (paginatedCrimes.length === 0) {
            crimesTableBody.innerHTML = '<tr><td colspan="8">Không tìm thấy vụ án nào.</td></tr>';
            renderPagination(0);
            return;
        }

        paginatedCrimes.forEach(crime => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>#${crime.id}</td>
                <td>${crime.typeOfCrime || 'N/A'}</td>
                <td>${crime.levelOfSeverity || 'N/A'}</td>
                <td>${crime.date || 'N/A'}</td>
                <td>${crime.receivingUnit || 'N/A'}</td>
                <td>${crime.location || 'N/A'}</td>
                <td><span class="status-${(crime.status || 'Unspecified').toLowerCase().replace(/\s/g, '-')}">${crime.status || 'N/A'}</span></td>
                <td>
                    <button class="edit-btn" data-id="${crime.id}">Edit</button>
                    <button class="delete-btn" data-id="${crime.id}">Delete</button>
                </td>
            `;
            crimesTableBody.appendChild(row);
        });

        // Add event listeners for edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const crimeId = event.target.dataset.id;
                editCrime(crimeId);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const crimeId = event.target.dataset.id;
                if (confirm(`Bạn có chắc chắn muốn xóa vụ án #${crimeId} không?`)) {
                    deleteCrime(crimeId);
                }
            });
        });

        renderPagination(filteredCrimes.length);
    };

    const renderPagination = (totalItems) => {
        const paginationContainer = document.querySelector('.pagination');
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(totalItems / entriesPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            if (i === currentPage) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                currentPage = i;
                renderCrimesTable();
            });
            paginationContainer.appendChild(button);
        }
    };

    searchCrimesInput.addEventListener('input', () => {
        currentPage = 1; // Reset to first page on search
        renderCrimesTable();
    });

    showEntriesSelect.addEventListener('change', () => {
        entriesPerPage = parseInt(showEntriesSelect.value);
        currentPage = 1; // Reset to first page
        renderCrimesTable();
    });

    // --- Edit Crime Logic ---
    const editCrime = async (crimeId) => {
        try {
            const response = await axios.get(`/api/crimes/${crimeId}`);
            const crimeToEdit = response.data;
            console.log('Editing crime:', crimeToEdit);

            // Chuyển sang tab "Preliminary Investigation" và form "Initial Response"
            showMainSection('preliminary-investigation-section');
            showPreliminaryInvestigationForm('initial-response-form');

            // Điền dữ liệu của vụ án vào các form
            fillForm('initial-response-form', crimeToEdit.initialResponse);
            fillForm('scene-information-form', crimeToEdit.sceneInformation);
            fillForm('initial-investigation-report-form', crimeToEdit.initialInvestigationReport);

            // Cập nhật dữ liệu tạm thời để đồng bộ
            currentTempData.initialResponse = crimeToEdit.initialResponse || {};
            currentTempData.sceneInformation = crimeToEdit.sceneInformation || {};
            currentTempData.initialInvestigationReport = crimeToEdit.initialInvestigationReport || {};
            // Also store general crime data in currentTempData for easy access during edit
            currentTempData.typeOfCrime = crimeToEdit.typeOfCrime || 'Unspecified';
            currentTempData.levelOfSeverity = crimeToEdit.levelOfSeverity || 'Unspecified';
            currentTempData.receivingUnit = crimeToEdit.receivingUnit || 'Local PD';
            currentTempData.status = crimeToEdit.status || 'Under Investigation';


            // Điền các trường select
            typeOfCrimeSelect.value = crimeToEdit.typeOfCrime || 'Unspecified';
            levelOfSeveritySelect.value = crimeToEdit.levelOfSeverity || 'Unspecified';
            receivingUnitSelect.value = crimeToEdit.receivingUnit || 'Local PD';
            statusSelect.value = crimeToEdit.status || 'Under Investigation';


            // Lưu ID của vụ án đang chỉnh sửa vào input ẩn
            currentCrimeIdInput.value = crimeId;
            editingCrimeId = crimeId; // Set editing state

            alert(`Bạn đang chỉnh sửa vụ án #${crimeId}.`);

        } catch (error) {
            console.error('Error fetching crime for edit:', error.response ? error.response.data : error.message);
            alert('Không thể tải dữ liệu vụ án để chỉnh sửa.');
        }
    };

    // --- Delete Crime Logic ---
    const deleteCrime = async (crimeId) => {
        try {
            await axios.delete(`/api/crimes/${crimeId}`);
            alert(`Vụ án #${crimeId} đã được xóa thành công!`);
            loadCrimesTable(); // Tải lại bảng sau khi xóa
        } catch (error) {
            console.error('Error deleting crime:', error.response ? error.response.data : error.message);
            alert('Có lỗi xảy ra khi xóa vụ án. Vui lòng kiểm tra console.');
        }
    };

    // --- Helper to clear all forms ---
    const clearAllForms = () => {
        formSections.forEach(form => {
            form.querySelectorAll('input, textarea, select').forEach(input => {
                input.value = '';
            });
        });
        // Reset select values to default after clearing
        typeOfCrimeSelect.value = 'Unspecified';
        levelOfSeveritySelect.value = 'Unspecified';
        receivingUnitSelect.value = 'Local PD';
        statusSelect.value = 'Under Investigation';

        currentCrimeIdInput.value = ''; // Clear crime ID as well
    };

    // Initial setup when page loads
    showMainSection('preliminary-investigation-section'); // Show initial investigation by default
    showPreliminaryInvestigationForm('initial-response-form'); // Show initial response form
    // No need to load initial temp data from server if it's managed client-side for new entries
});