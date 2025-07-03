import Layout from '../components/baseLayout';
import React, { useState } from 'react';
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
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Grid,
  TextareaAutosize,
  TableContainer
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const steps = ['Step 1', 'Step 2', 'Step 3'];

export default function MultiStepFormMui() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    relation: '',
    incidentDetails: '',
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [address, setAddress] = useState('');

  const [description, setDescription] = useState('');
  
  // State cho danh sách nhân chứng
  const [witnesses, setWitnesses] = useState([
    { id: 1, role: '', name: '', statement: '', attachment: null }
  ]);
  
  // State cho danh sách bằng chứng
  const [evidences, setEvidences] = useState([
    { id: 1, type: '', location: '', description: '', attachment: null }
  ]);

  // Thêm nhân chứng mới
  const addWitness = () => {
    setWitnesses([
      ...witnesses,
      { 
        id: witnesses.length + 1, 
        role: '', 
        name: '', 
        statement: '', 
        attachment: null 
      }
    ]);
  };

  // Thêm bằng chứng mới
  const addEvidence = () => {
    setEvidences([
      ...evidences,
      { 
        id: evidences.length + 1, 
        type: '', 
        location: '', 
        description: '', 
        attachment: null 
      }
    ]);
  };

  // Xử lý thay đổi thông tin nhân chứng
  const handleWitnessChange = (id, field, value) => {
    setWitnesses(witnesses.map(wit => 
      wit.id === id ? { ...wit, [field]: value } : wit
    ));
  };

  // Xử lý thay đổi thông tin bằng chứng
  const handleEvidenceChange = (id, field, value) => {
    setEvidences(evidences.map(ev => 
      ev.id === id ? { ...ev, [field]: value } : ev
    ));
  };

  // Xóa nhân chứng
  const removeWitness = (id) => {
    if (witnesses.length <= 1) return;
    setWitnesses(witnesses.filter(wit => wit.id !== id));
  };

  // Xóa bằng chứng
  const removeEvidence = (id) => {
    if (evidences.length <= 1) return;
    setEvidences(evidences.filter(ev => ev.id !== id));
  };

  // Xử lý tải lên file
  const handleFileUpload = (e, id, type) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (type === 'witness') {
      handleWitnessChange(id, 'attachment', file);
    } else {
      handleEvidenceChange(id, 'attachment', file);
    }
  };

  const [dateTime, setDateTime] = React.useState(null);

  // Render content for each step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
            <>
            <div class="d-flex align-items-center text-center mb-4">
                <div class="flex-grow-1 border-bottom me-2"></div>
                <Typography variant="h5" align="center" gutterBottom>
                    Reporter Information
                </Typography>
                <div class="flex-grow-1 border-bottom ms-2"></div>
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
              value={formData.email}
              onChange={handleChange}
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
                name="relation"
                value={formData.relation}
                onChange={handleChange}
              >
                <FormControlLabel value="victim" control={<Radio />} label="Victim" />
                <FormControlLabel value="witness" control={<Radio />} label="Witness" />
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
     
    <Box sx={{m: 3, p: 2, maxWidth: 1200, margin: 'auto', width: '100%'}}>
        <div className='row mb-4'>
          <div className='col-6'>
            <TextField
              select      
              label="Type of crime"    
              variant="outlined" 
              fullWidth
              required
              onChange={handleChange}
            >
              <MenuItem>Crimes Against Persons</MenuItem>
              <MenuItem>Crimes Against Property</MenuItem>
              <MenuItem>White-Collar Crimes</MenuItem>
              <MenuItem>Cyber Crimes</MenuItem>
              <MenuItem>Drug-related Crimes</MenuItem>
              <MenuItem>Public Order Crimes</MenuItem>
            </TextField>
          </div>
          <div className='col-6'>
            <TextField
              select      
              label="Severity"    
              variant="outlined" 
              fullWidth
              required
              onChange={handleChange}
            >
              <MenuItem>Minor</MenuItem>
              <MenuItem>Morderate</MenuItem>
              <MenuItem>Serious</MenuItem>
              <MenuItem>Critical</MenuItem>
            </TextField>
          </div>
        </div>

        <div className='mb-4'>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Datetime of occurrence *"
            value={dateTime}
            onChange={(newValue) => {
              setDateTime(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                sx={{ mb: 4 }}
              />
            )}
          />
      </LocalizationProvider>
        </div>

        <TextField
        label='Detailed address'
        fullWidth
        multiline
        rows={4}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        variant="outlined"
        sx={{ mb: 4 }}
      />
      {/* Phần mô tả sự kiện */}
      <TextField
        label='Description of the incident'
        placeholder='Briefly describe what happened, including key facts such as time, location, and main events.'
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="outlined"
        sx={{ mb: 4 }}
      />

      {/* Bảng nhân chứng */}
      <Typography variant="h6" gutterBottom>
        Witnesses
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Relevant Role</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Statement</TableCell>
              <TableCell>Attachments</TableCell>
              <TableCell align="right">
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={addWitness}
                >
                  ADD
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {witnesses.map((witness) => (
              <TableRow key={witness.id}>
                <TableCell>{witness.id}</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={witness.role}
                    onChange={(e) => handleWitnessChange(witness.id, 'role', e.target.value)}
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={witness.name}
                    onChange={(e) => handleWitnessChange(witness.id, 'name', e.target.value)}
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={witness.statement}
                    onChange={(e) => handleWitnessChange(witness.id, 'statement', e.target.value)}
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    component="label"
                    startIcon={<AttachFileIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    {witness.attachment?.name || 'Attach File'}
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleFileUpload(e, witness.id, 'witness')}
                    />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    onClick={() => removeWitness(witness.id)}
                    disabled={witnesses.length <= 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Bảng bằng chứng */}
      <Typography variant="h6" gutterBottom>
        Evidence
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Types of Evidence</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Attachments</TableCell>
              <TableCell align="right">
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={addEvidence}
                >
                  ADD
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {evidences.map((evidence) => (
              <TableRow key={evidence.id}>
                <TableCell>{evidence.id}</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={evidence.type}
                    onChange={(e) => handleEvidenceChange(evidence.id, 'type', e.target.value)}
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={evidence.location}
                    onChange={(e) => handleEvidenceChange(evidence.id, 'location', e.target.value)}
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={evidence.description}
                    onChange={(e) => handleEvidenceChange(evidence.id, 'description', e.target.value)}
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    component="label"
                    startIcon={<AttachFileIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    {evidence.attachment?.name || 'Attach File'}
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleFileUpload(e, evidence.id, 'evidence')}
                    />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    onClick={() => removeEvidence(evidence.id)}
                    disabled={evidences.length <= 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

    </>
  );

      case 2:
        return (
          <p>Step 3</p>
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // chuyển dateTime sang ISO string (nếu cần)
    const occurredAt = dateTime ? dateTime.toISOString() : null;

    // gộp payload
    const payload = {
      reporter: formData,
      occurredAt,
      description,
      witnesses: witnesses.map(w => ({
        role: w.role,
        name: w.name,
        statement: w.statement,
        // nếu muốn upload file formData hãy xử lý riêng
      })),
      evidences: evidences.map(ev => ({
        type: ev.type,
        location: ev.location,
        description: ev.description,
      })),
    };

    try {
      const response = await axios.post('/api/report', payload);
      console.log('Submit success:', response.data);
      // bạn có thể điều hướng hoặc reset form ở đây
    } catch (error) {
      console.error('Submit error:', error);
      // hiển thị thông báo lỗi
    }
  };

  // Xử lý click nút Next/Submit
  const handleNextOrSubmit = (e) => {
    if (activeStep < steps.length - 1) {
      // Nếu chưa phải step cuối thì next
      e.preventDefault(); // Ngăn form submit
      handleNext();
    }
    // Nếu là step cuối thì để form submit tự nhiên
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Crime Report
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper sx={{ p: 4 }} elevation={3}>
          <form onSubmit={handleSubmit}>
            {getStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                type="button"
              >
                Back
              </Button>
              <Button 
                variant="contained" 
                type={activeStep === steps.length - 1 ? "submit" : "button"}
                onClick={handleNextOrSubmit}
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
}