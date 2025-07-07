import Layout from '../components/baseLayout';
import React, { useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    Typography,
    Container,
    Paper,
    Select,
    MenuItem,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    TableContainer,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import RelevantPartiesForm from '../components/RelevantPartiesForm';
import InitialEvidence from '../components/initialEvidence';

const steps = ['Step 1', 'Step 2', 'Step 3'];

export default function MultiStepFormMui() {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        relationToIncident: '',
        typeOfCrime: '',
        severity: '',
        dateTimeOfOccurrence: ''
    });
    const [detailedAddress, setDetailedAddress] = useState('');
    const [incidentDescription, setIncidentDescription] = useState('');
    const [relevantParties, setRelevantParties] = useState([]);
    const [evidences, setEvidences] = useState([]);
    const [openRelevantDialog, setOpenRelevantDialog] = useState(false);
    const [openEvidenceDialog, setOpenEvidenceDialog] = useState(false);
    const [relevantFormKey, setRelevantFormKey] = useState(0);
    const [evidenceFormKey, setEvidenceFormKey] = useState(0);
    const [editingRelevant, setEditingRelevant] = useState(null);
    const [editingEvidence, setEditingEvidence] = useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState({
        open: false,
        type: '', // 'relevant' or 'evidence'
        id: null,
    });
    const [submitError, setSubmitError] = useState('');

    const confirmDelete = useCallback((type, id) => {
        setConfirmDeleteDialog({ open: true, type, id });
    }, []);

    const handleConfirmDelete = () => {
        const { type, id } = confirmDeleteDialog;
        if (type === 'relevant') {
            setRelevantParties(prev => prev.filter(p => p.id !== id));
        } else if (type === 'evidence') {
            setEvidences(prev => prev.filter(e => e.id !== id));
        }
        setConfirmDeleteDialog({ open: false, type: '', id: null });
    };

    const handleCancelDelete = () => {
        setConfirmDeleteDialog({ open: false, type: '', id: null });
    };


    // Sử dụng useMemo để tối ưu hóa việc kiểm tra validation
    const isStepValid = useMemo(() => {
        switch (activeStep) {
            case 0:
                return (
                    formData.fullName.trim() !== '' &&
                    formData.email.trim() !== '' &&
                    formData.phone.trim() !== '' &&
                    formData.relationToIncident.trim() !== ''
                );
            case 1:
                return (
                    formData.typeOfCrime?.trim() !== '' &&
                    formData.severity?.trim() !== '' &&
                    formData.dateTimeOfOccurrence !== null
                );
            case 2:
                return true;
            default:
                return false;
        }
    }, [activeStep, formData]);

    const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Sử dụng useCallback để tối ưu hóa các hàm xử lý
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);
    const handleDateTimeChange = (newValue) => {
        setFormData(prev => ({ ...prev, dateTimeOfOccurrence: newValue }));
    };

    const handleNext = useCallback(() => setActiveStep(prev => prev + 1), []);
    const handleBack = useCallback(() => setActiveStep(prev => prev - 1), []);

    // Tối ưu hóa hàm renderAttachments
    const renderAttachments = useCallback((attachments) => {
        if (!attachments || attachments.length === 0) {
            return <Typography variant="caption" color="textSecondary">No attachments</Typography>;
        }

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {attachments.slice(0, 2).map((attachment, index) => {
                    const isImage = attachment.type?.startsWith('image/');
                    return (
                        <Chip
                            key={index}
                            icon={isImage ? <ImageIcon /> : <AttachmentIcon />}
                            label={attachment.name}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.75rem' }}
                        />
                    );
                })}
                {attachments.length > 2 && (
                    <Typography variant="caption" color="textSecondary">
                        +{attachments.length - 2} more
                    </Typography>
                )}
            </Box>
        );
    }, []);

    //Relevant Party handlers
    const handleOpenRelevantDialog = useCallback(() => {
        setEditingRelevant(null);
        setOpenRelevantDialog(true);
        setRelevantFormKey(prev => prev + 1);
    }, []);

    const handleOpenEditRelevantDialog = useCallback((relevant) => {
        setEditingRelevant(relevant);
        setOpenRelevantDialog(true);
        setRelevantFormKey(prev => prev + 1);
    }, []);

    const handleCloseRelevantDialog = useCallback(() => {
        setOpenRelevantDialog(false);
        setEditingRelevant(null);
    }, []);

    const handleRelevantPartySubmit = useCallback((data) => {
        if (editingRelevant) {
            const updatedParty = {
                ...editingRelevant,
                role: data.relationship,
                fullName: data.fullName, // Make sure this matches
                statement: data.statement,
                gender: data.gender,
                nationality: data.nationality,
                contact: data.contact,
                attachments: data.attachments || []
            };

            setRelevantParties(prev =>
                prev.map(party =>
                    party.id === editingRelevant.id ? updatedParty : party
                )
            );
        } else {
            const newParty = {
                id: Date.now(),
                role: data.relationship,
                fullName: data.fullName, // Make sure this matches
                statement: data.statement,
                attachments: data.attachments || [],
                gender: data.gender,
                nationality: data.nationality,
                contact: data.contact
            };
            setRelevantParties(prev => [...prev, newParty]);
        }
        handleCloseRelevantDialog();
    }, [editingRelevant, handleCloseRelevantDialog]);

    const editRelevant = useCallback((relevant) => {
        handleOpenEditRelevantDialog(relevant);
    }, [handleOpenEditRelevantDialog]);

    const removeRelevant = useCallback((id) => {
        setRelevantParties(prev => prev.filter(wit => wit.id !== id));
    }, []);

    //Evidence handlers
    const handleOpenEvidenceDialog = useCallback(() => {
        setEditingEvidence(null);
        setOpenEvidenceDialog(true);
        setEvidenceFormKey(prev => prev + 1);
    }, []);

    const handleOpenEditEvidenceDialog = useCallback((evidence) => {
        setEditingEvidence(evidence);
        setOpenEvidenceDialog(true);
        setEvidenceFormKey(prev => prev + 1);
    }, []);

    const handleCloseEvidenceDialog = useCallback(() => {
        setOpenEvidenceDialog(false);
        setEditingEvidence(null);
    }, []);

    const handleEvidenceSubmit = useCallback((data) => {
        if (editingEvidence) {
            const updatedEvidence = {
                ...editingEvidence,
                typeOfEvidence: data.typeOfEvidence,
                evidenceLocation: data.evidenceLocation,
                description: data.evidenceDescription, // Map evidenceDescription to description
                attachments: data.attachments || []
            };

            setEvidences(prev =>
                prev.map(ev =>
                    ev.id === editingEvidence.id ? updatedEvidence : ev
                )
            );
        } else {
            const newEvidence = {
                id: Date.now(),
                typeOfEvidence: data.typeOfEvidence,
                evidenceLocation: data.evidenceLocation,
                description: data.evidenceDescription, // Map evidenceDescription to description
                attachments: data.attachments || []
            };
            setEvidences(prev => [...prev, newEvidence]);
        }
        handleCloseEvidenceDialog();
    }, [editingEvidence, handleCloseEvidenceDialog]);

    const editEvidence = useCallback((evidence) => {
        handleOpenEditEvidenceDialog(evidence);
    }, [handleOpenEditEvidenceDialog]);

    const removeEvidence = useCallback((id) => {
        setEvidences(prev => prev.filter(ev => ev.id !== id));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        const fd = new FormData();

        // 1. Reporter
        fd.append("Reporter.FullName", formData.fullName);
        fd.append("Reporter.Email", formData.email);
        fd.append("Reporter.PhoneNumber", formData.phone);
        fd.append("Reporter.Address", formData.address);
        fd.append("Reporter.Relation", formData.relationToIncident);

        // 2. Incident
        if (formData.dateTimeOfOccurrence) {
            fd.append("Incident.OccurredAt", formData.dateTimeOfOccurrence.toISOString());
        }
        fd.append("Incident.TypeOfCrime", formData.typeOfCrime);
        fd.append("Incident.Severity", formData.severity);
        fd.append("Incident.DetailedAddress", detailedAddress);
        fd.append("Incident.IncidentDescription", incidentDescription);

        // 3. Relevant Parties (mảng)
        relevantParties.forEach((party, i) => {
            const prefix = `RelevantParties[${i}]`;
            fd.append(`${prefix}.Role`, party.role || '');
            fd.append(`${prefix}.FullName`, party.fullName || ''); // Fix: use fullName instead of name
            fd.append(`${prefix}.Statement`, party.statement || '');
            fd.append(`${prefix}.Gender`, party.gender || '');
            fd.append(`${prefix}.Nationality`, party.nationality || '');
            fd.append(`${prefix}.Contact`, party.contact || '');

            // Add files: use the actual File objects
            if (party.attachments && party.attachments.length > 0) {
                party.attachments.forEach(attachment => {
                    // Use the actual File object stored in the 'file' property
                    fd.append(`${prefix}.Attachments`, attachment.file);
                });
            }
        });

        // 4. Evidences (mảng)
        evidences.forEach((ev, i) => {
            const prefix = `Evidences[${i}]`;
            fd.append(`${prefix}.TypeOfEvidence`, ev.typeOfEvidence || '');
            fd.append(`${prefix}.EvidenceLocation`, ev.evidenceLocation || '');
            fd.append(`${prefix}.Description`, ev.description || ''); // Fix: use description instead of evidenceDescription

            // Add files: use the actual File objects
            if (ev.attachments && ev.attachments.length > 0) {
                ev.attachments.forEach(attachment => {
                    // Use the actual File object stored in the 'file' property
                    fd.append(`${prefix}.Attachments`, attachment.file);
                });
            }
        });

        // Debug: Log FormData contents
        console.log('FormData contents:');
        for (let [key, val] of fd.entries()) {
            if (val instanceof File) {
                console.log(`✅ ${key}:`, val.name, `(${val.size} bytes)`);
            } else {
                console.log(`📄 ${key}:`, val);
            }
        }

        // Send FormData
        try {
            await axios.post("https://localhost:7064/api/report", fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Report submitted successfully!');
        } catch (error) {
            console.error('Error submitting report:', error);
            throw error;
        }
    }, [formData, relevantParties, evidences]);

    const handleConfirmSubmit = async () => {
        setOpenConfirmDialog(false);
        try {
            await handleSubmit();
            setSubmitError('');
            setActiveStep(prev => prev + 1);
        } catch (err) {
            console.error('Submit lỗi:', err);
            setSubmitError('Submit failed. Please contact us in another way.');
        }
    };


    const handleNextOrSubmit = useCallback(async () => {
        if (activeStep === steps.length - 2) {
            setOpenConfirmDialog(true);
            return;
        }

        if (activeStep < steps.length - 1) {
            setActiveStep(prev => prev + 1);
        }
    }, [activeStep]);

    const StepContent = useMemo(() => {
        switch (activeStep) {
            case 0:
                return (
                    <>
                        <div className="d-flex align-items-center text-center mb-4">
                            <div className="flex-grow-1 border-bottom me-2"></div>
                            <Typography variant="h5" align="center" gutterBottom>
                                Reporter Information
                            </Typography>
                            <div className="flex-grow-1 border-bottom ms-2"></div>
                        </div>
                        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}>
                            <TextField
                                required
                                name="fullName"
                                label="Full name"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                            <TextField
                                required
                                name="email"
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={!isValidEmail(formData.email)}
                                helperText={!isValidEmail(formData.email) ? "Invalid email format" : ""}
                            />
                            <TextField
                                required
                                name="phone"
                                label="Phone number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <TextField
                                name="address"
                                label="Address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                            <FormControl component="fieldset" sx={{ gridColumn: 'span 2' }}>
                                <FormLabel component="legend">Relationship to the incident *</FormLabel>
                                <RadioGroup
                                    row
                                    name="relationToIncident"
                                    value={formData.relationToIncident}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="victim" control={<Radio />} label="Victim" />
                                    <FormControlLabel value="Relevant" control={<Radio />} label="Relevant" />
                                    <FormControlLabel value="offender" control={<Radio />} label="Offender" />
                                    <FormControlLabel value="anonymous" control={<Radio />} label="Anonymous" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </>
                );

            case 1:
                return (
                    <>
                        <Typography variant="h6" gutterBottom className='text-center'>
                            Incident Information
                        </Typography>
                        <Box sx={{ m: 3, p: 2, maxWidth: 1200, margin: 'auto', width: '100%' }}>
                            <div className='row mb-4'>
                                <div className='col-6'>
                                    <TextField
                                        select
                                        name="typeOfCrime"
                                        label="Type of crime"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        onChange={handleChange}
                                        value={formData.typeOfCrime || ''}
                                    >
                                        <MenuItem value="Crimes Against Persons">Crimes Against Persons</MenuItem>
                                        <MenuItem value="Crimes Against Property">Crimes Against Property</MenuItem>
                                        <MenuItem value="White-Collar Crimes">White-Collar Crimes</MenuItem>
                                        <MenuItem value="Cyber Crimes">Cyber Crimes</MenuItem>
                                        <MenuItem value="Drug-related Crimes">Drug-related Crimes</MenuItem>
                                        <MenuItem value="Public Order Crimes">Public Order Crimes</MenuItem>
                                    </TextField>
                                </div>
                                <div className='col-6'>
                                    <TextField
                                        select
                                        name="severity"
                                        label="Severity"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        value={formData.severity || ''}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Minor">Minor</MenuItem>
                                        <MenuItem value="Moderate">Moderate</MenuItem>
                                        <MenuItem value="Serious">Serious</MenuItem>
                                        <MenuItem value="Critical">Critical</MenuItem>
                                    </TextField>
                                </div>
                            </div>

                            <div className='mb-4'>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        name='dateTimeOfOccurrence'
                                        label="Datetime of occurrence *"
                                        value={formData.dateTimeOfOccurrence}
                                        onChange={handleDateTimeChange}
                                        renderInput={(params) => (
                                            <TextField {...params} fullWidth sx={{ mb: 4 }} />
                                        )}
                                    />
                                </LocalizationProvider>
                            </div>

                            <TextField
                                fullWidth
                                name="detailedAddress"
                                label="Detailed address"
                                value={detailedAddress}
                                onChange={setDetailedAddress}
                                multiline
                                sx={{ mb: 4 }}
                            />

                            <TextField
                                name="incidentDescription"
                                label="Description of the incident"
                                placeholder="Description of the incident"
                                multiline
                                rows={4}
                                fullWidth
                                value={incidentDescription}
                                onChange={setIncidentDescription}
                                sx={{ mb: 4 }}
                            />

                            <Typography variant="h6" gutterBottom>
                                Relevant Parties
                            </Typography>
                            <TableContainer component={Paper} sx={{ mb: 2 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Relevant Role</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Statement</TableCell>
                                            <TableCell>Attachments</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {relevantParties.map(relevant => (
                                            <TableRow key={relevant.id}>
                                                <TableCell>{relevant.id}</TableCell>
                                                <TableCell>{relevant.role}</TableCell>
                                                <TableCell>{relevant.fullName}</TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{
                                                        maxWidth: 200,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical'
                                                    }}>
                                                        {relevant.statement}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    {renderAttachments(relevant.attachments)}
                                                </TableCell>
                                                <TableCell align="right" className='d-flex justify-content-center border-none'>
                                                    <IconButton
                                                        onClick={() => confirmDelete('relevant', relevant.id)}
                                                        title="Delete Relevant Party"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton onClick={() => editRelevant(relevant)} title="Edit Relevant Party">
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Button className='float-end'
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleOpenRelevantDialog}
                            >
                                ADD
                            </Button>

                            <Box mt={8} />

                            <Typography variant="h6" gutterBottom>
                                Initial Evidence
                            </Typography>
                            <TableContainer component={Paper} sx={{ mb: 2 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Type of Evidence</TableCell>
                                            <TableCell>Location</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Attachments</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {evidences.map(evidence => (
                                            <TableRow key={evidence.id}>
                                                <TableCell>{evidence.id}</TableCell>
                                                <TableCell>{evidence.typeOfEvidence}</TableCell>
                                                <TableCell>{evidence.evidenceLocation}</TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{
                                                        maxWidth: 200,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical'
                                                    }}>
                                                        {evidence.description}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    {renderAttachments(evidence.attachments)}
                                                </TableCell>
                                                <TableCell align="right" className='d-flex justify-content-center border-none'>
                                                    <IconButton
                                                        onClick={() => confirmDelete('evidence', evidence.id)}
                                                        title="Delete Evidence"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton onClick={() => editEvidence(evidence)} title="Edit Evidence">
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Button className='float-end'
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleOpenEvidenceDialog}
                            >
                                ADD
                            </Button>
                            <Box mt={8} />
                        </Box>
                    </>
                );

            case 2:
                return (
                    <>
                        <div className='d-flex flex-column align-items-center text-center'>
                            <img
                                src='/images/done.png'
                                alt='done'
                                className="d-block object-fit-cover"
                                style={{ width: '160px', height: '160px' }}
                            />
                            <Typography variant="h7" gutterBottom>
                                Your report will be reviewed within 5–10 working days.
                                <br />
                                Please check the status regularly for updates.
                                <br />
                                Thank you for your submission.
                            </Typography>
                        </div>
                    </>
                );

            default:
                return null;
        }
    }, [activeStep, formData, relevantParties, evidences, handleChange, renderAttachments, handleOpenRelevantDialog, handleOpenEvidenceDialog, removeRelevant, editRelevant, removeEvidence, editEvidence]);

    return (
        <Layout>
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Crime Report
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Paper sx={{ p: 4 }} elevation={3}>
                    <form>
                        {StepContent}

                        <Dialog
                            open={openRelevantDialog}
                            onClose={handleCloseRelevantDialog}
                            fullWidth
                            maxWidth="md"
                        >
                            <DialogTitle>
                                {editingRelevant ? 'Edit Relevant Party' : 'Add Relevant Party'}
                            </DialogTitle>
                            <DialogContent>
                                <RelevantPartiesForm
                                    key={relevantFormKey}
                                    initialData={editingRelevant}
                                    onSubmit={handleRelevantPartySubmit}
                                    onCancel={handleCloseRelevantDialog}
                                />
                            </DialogContent>
                        </Dialog>

                        <Dialog
                            open={openEvidenceDialog}
                            onClose={handleCloseEvidenceDialog}
                            fullWidth
                            maxWidth="md"
                        >
                            <DialogTitle>
                                {editingEvidence ? 'Edit Evidence' : 'Add Evidence'}
                            </DialogTitle>
                            <DialogContent>
                                <InitialEvidence
                                    key={evidenceFormKey}
                                    initialData={editingEvidence}
                                    onSubmit={handleEvidenceSubmit}
                                    onCancel={handleCloseEvidenceDialog}
                                />
                            </DialogContent>
                        </Dialog>

                        <Dialog
                            open={openConfirmDialog}
                            onClose={() => setOpenConfirmDialog(false)}
                            maxWidth="xs"
                            fullWidth
                            PaperProps={{
                                sx: {
                                    borderRadius: 3,
                                    p: 3
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex' }}>
                                {/* Thanh dọc màu xanh nhạt */}
                                <Box sx={{ width: 30, borderRadius: 3, mr: 2, backgroundColor: '#ADD8E6' }} />

                                {/* Nội dung chính */}
                                <Box>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        Declaration & Confirmation
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        1. I hereby declare that all the information provided in this report is true and accurate to the best of my knowledge.
                                    </Typography>
                                    <Typography variant="body2">
                                        2. I accept full legal responsibility for any false or misleading information submitted.
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Nút hành động */}
                            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 3 }}>
                                <Button
                                    onClick={() => setOpenConfirmDialog(false)}
                                    variant="outlined"
                                    sx={{ mr: 2, minWidth: 100 }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleConfirmSubmit}
                                    variant="contained"
                                    sx={{ minWidth: 100, backgroundColor: '#333' }}
                                >
                                    Yes
                                </Button>
                            </Box>
                        </Dialog>

                        <Dialog
                            open={confirmDeleteDialog.open}
                            onClose={handleCancelDelete}
                            maxWidth="xs"
                            fullWidth
                            PaperProps={{ sx: { borderRadius: 3, p: 3 } }}
                        >

                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ width: 30, borderRadius: 3, mr: 2, backgroundColor: '#FFBCBC' }} />

                                {/* Nội dung chính */}
                                <Box>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        Confirm Deletion
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Are you sure you want to delete this {confirmDeleteDialog.type === 'relevant' ? 'relevant party' : 'evidence'}?
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                <Button
                                    onClick={handleCancelDelete}
                                    variant="outlined"
                                    sx={{ mr: 2, minWidth: 100 }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleConfirmDelete}
                                    variant="contained"
                                    sx={{ minWidth: 100, backgroundColor: '#d32f2f' }}
                                >
                                    Yes
                                </Button>
                            </Box>
                        </Dialog>


                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            {activeStep !== 2 && (
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    type="button"
                                >
                                    Back
                                </Button>
                            )}

                            {activeStep !== steps.length - 1 && (
                                <Button
                                    // disabled={!isStepValid || !isValidEmail}
                                    variant="contained"
                                    type="button"
                                    onClick={handleNextOrSubmit}
                                >
                                    {activeStep === steps.length - 2 ? 'Submit' : 'Next'}
                                </Button>
                            )}
                        </Box>
                        {submitError && (
                            <Typography color="error" align="center" sx={{ mt: 2 }}>
                                {submitError}
                            </Typography>
                        )}
                    </form>
                </Paper>
            </Container>
        </Layout>
    );
}