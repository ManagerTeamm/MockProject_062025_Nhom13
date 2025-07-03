import React, { useState } from 'react';
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
} from '@mui/material';

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
    additionalInfo: '',
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Render content for each step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
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
        );

      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="incidentDetails"
              label="Incident Details"
              multiline
              minRows={4}
              value={formData.incidentDetails}
              onChange={handleChange}
            />
          </Box>
        );

      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="additionalInfo"
              label="Additional Information"
              multiline
              minRows={4}
              value={formData.additionalInfo}
              onChange={handleChange}
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
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
        <form>
          {getStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button variant="contained" type="submit">
                Submit
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
