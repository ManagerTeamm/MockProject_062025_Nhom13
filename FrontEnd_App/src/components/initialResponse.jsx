import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PatrolOfficerManagement from './PatrolOfficerManagement';
import SceneProtectionForm from './sceneProtectionForm';
import MedicalSupportForm from './MedicalSupportForm';
import Sidebar from '../components/sidebar';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { getCookie } from '../utils/cookie';

const API_URL = 'https://localhost:7064/api/Case';
const INITIAL_RESPONSE_API_URL = 'https://localhost:7064/api/initial-response';

export default function InitialResponse() {
  const { caseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [caseData, setCaseData] = useState(null);

  // 1. Tổng hợp state
  const [formData, setFormData] = useState({
    dispatchTime: '',
    arrivalTime: '',
    sceneAssessment: '',
    assignedOfficers: [],
    preservationMeasures: [],
    medicalRescueInfo: []
  });

  const [showModal, setShowModal] = useState(false);
  const [showSceneProtectionModal, setShowSceneProtectionModal] = useState(false);
  const [showMedicalModal, setShowMedicalModal] = useState(false);
  const [editingPreservationMeasure, setEditingPreservationMeasure] = useState(null);
  const [editingMedicalInfo, setEditingMedicalInfo] = useState(null);

  // 2. Helper cập nhật single field
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 3. Helper cập nhật array data
  const updateArrayData = (arrayName, newData, action = 'add') => {
    setFormData(prev => {
      const current = prev[arrayName] || [];
      switch (action) {
        case 'add':
          return { ...prev, [arrayName]: [...current, newData] };
        case 'update':
          return {
            ...prev,
            [arrayName]: current.map(item => 
              item.id === newData.id ? { ...item, ...newData } : item
            )
          };
        case 'delete':
          return { ...prev, [arrayName]: current.filter(item => item.id !== newData) };
        case 'replace':
          return { ...prev, [arrayName]: newData };
        default:
          return prev;
      }
    });
  };

  // 4. Fetch initial response data
  const fetchInitialResponseData = async () => {
    try {
      const token = getCookie("token");
        console.log("token:", token);
        if (!token) throw new Error("No token found");

        const response = await fetch(`${INITIAL_RESPONSE_API_URL}/${caseId}`, {
          headers: new Headers({
          'Authorization': `Bearer ${token}`
          })
      });
      const result = await response.json();
      if (result.StatusCode === 200) {
        const data = result.data;
        setFormData({
          dispatchTime: data.dispatchTime || '',
          arrivalTime: data.arrivalTime || '',
          sceneAssessment: data.sceneAssessment || '',
          assignedOfficers: data.assignedOfficers || [],
          preservationMeasures: data.preservationMeasures || [],
          medicalRescueInfo: data.medicalRescueInfo || []
        });
      } else if (result.StatusCode === 404) {
        setFormData({
          dispatchTime: '',
          arrivalTime: '',
          sceneAssessment: '',
          assignedOfficers: [],
          preservationMeasures: [],
          medicalRescueInfo: []
        });
      }
    } catch (err) {
      console.error('Error fetching initial response data:', err);
    }
  };

  // Fetch case + initial data
  useEffect(() => {
    if (!caseId) return;
    const fetchCaseData = async () => {
      try {
        const token = getCookie("token");
        console.log("token:", token);
        if (!token) throw new Error("No token found");
        const resp = await fetch(`${API_URL}/${caseId}`, {
          headers: new Headers({
          'Authorization': `Bearer ${token}`
          })
      });

        const res = await resp.json();
        if (res.statusCode === 404) {
          setError('Case not found');
        } else {
          setCaseData(res.data);
        }
      } catch (err) {
        setError('Error fetching case');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseData();
    fetchInitialResponseData();
  }, [caseId]);

  // 5. Save handler
  const handleSave = async () => {
    try {
      const form = new FormData();
      // Các field cơ bản
      form.append('caseId', caseId);
      form.append('dispatchTime', formData.dispatchTime);
      form.append('arrivalTime', formData.arrivalTime);
      form.append('sceneAssessment', formData.sceneAssessment);

      // 1) PreservationMeasures + file per-item
      formData.preservationMeasures.forEach((measure, i) => {
        form.append(`preservationMeasures[${i}].sceneProtectionId`, measure.SceneProtectionId || '');
        form.append(`preservationMeasures[${i}].protectionMethods`, measure.measure);
        form.append(`preservationMeasures[${i}].caseId`, caseId);
        form.append(`preservationMeasures[${i}].officerUserName`, measure.officer);
        form.append(`preservationMeasures[${i}].startTime`, measure.startTime);
        form.append(`preservationMeasures[${i}].endTime`, measure.endTime);
        form.append(`preservationMeasures[${i}].areaCovered`, measure.areaCovered);
        form.append(`preservationMeasures[${i}].specialInstructions`, measure.specialInstructions);

        (measure.attachment || []).forEach(fileObj => {
          if (fileObj.file instanceof File) {
            form.append(`preservationMeasures[${i}].preservationMeasuresFiles`, fileObj.file);
          }
        });
      });

      // 2) MedicalRescueInfo + file per-item
      formData.medicalRescueInfo.forEach((med, i) => {
        form.append(`medicalRescueInfo[${i}].SceneSupportId`, med.SceneSupportId || '');
        form.append(`medicalRescueInfo[${i}].UnitId`, med.unitId);
        form.append(`medicalRescueInfo[${i}].SupportType`, med.supportType);
        form.append(`medicalRescueInfo[${i}].ArrivalTime`, med.arrivalTime);
        form.append(`medicalRescueInfo[${i}].PersonnelAssigned`, med.personnelAssigned);
        form.append(`medicalRescueInfo[${i}].LocationAssigned`, med.locationAssigned);
        form.append(`medicalRescueInfo[${i}].Remarks`, med.remarks);

        (med.attachment || []).forEach(fileObj => {
          if (fileObj.file instanceof File) {
            form.append(`medicalRescueInfo[${i}].medicalFiles`, fileObj.file);
          }
        });
      });

      // Debug: trong nội dung FormData
      for (const [key, value] of form.entries()) {
        if (value instanceof File) {
          console.log(`${key}: [File] name=${value.name}`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }
const token = getCookie("token");
        console.log("token:", token);
        if (!token) throw new Error("No token found");
      // Gửi lên API
      const resp = await fetch(INITIAL_RESPONSE_API_URL, {
        method: 'POST',
        body: form,
        headers: new Headers({
          'Authorization': `Bearer ${token}`
          })
      });
      if (!resp.ok) throw new Error(`Status ${resp.status}`);
      alert('Saved successfully');
    } catch (err) {
      console.error('Error saving:', err);
      alert('Save failed');
    }
  };

  // 6. Handlers tạo/ sửa data
  const handleSelectOfficers = selected => {
    const unique = selected.filter(o =>
      !formData.assignedOfficers.some(e => e.userName === o.userName)
    );
    updateFormData('assignedOfficers', [...formData.assignedOfficers, ...unique]);
    setShowModal(false);
  };

  const handleSceneProtectionSave = data => {
    console.log('>>> attachment:', data.attachment);
    console.log('is File?', data.attachment instanceof File);
    if (editingPreservationMeasure) {
      const updated = { ...editingPreservationMeasure,
        measure: data.protectionMethods,
        officer: data.officerUserName,
        startTime: data.startTime,
        endTime: data.endTime,
        areaCovered: data.areaCovered,
        specialInstructions: data.specialInstructions,
        attachment: data.attachment
      };
      updateArrayData('preservationMeasures', updated, 'update');
    } else {
      const newId = formData.preservationMeasures.length
        ? Math.max(...formData.preservationMeasures.map(m => m.id)) + 1
        : 1;
      const newMeasure = { id: newId,
        measure: data.protectionMethods,
        officer: data.officerUserName,
        startTime: data.startTime,
        endTime: data.endTime,
        areaCovered: data.areaCovered,
        specialInstructions: data.specialInstructions,
        attachment: data.attachment
      };
      updateArrayData('preservationMeasures', newMeasure, 'add');
    }
    setShowSceneProtectionModal(false);
    setEditingPreservationMeasure(null);
  };

  const handleMedicalSupportSave = data => {
    console.log('>>> Medical Support attachment:', data.attachment);
    console.log('>>> is File?', data.attachment instanceof File);
    if (editingMedicalInfo) {
      const updated = { ...editingMedicalInfo,
        unitId: data.unitId,
        supportType: data.supportType,
        arrivalTime: data.arrivalTime,
        personnelAssigned: data.personnelAssigned,
        locationAssigned: data.locationAssigned,
        remarks: data.remarks,
        attachment: data.attachment
      };
      updateArrayData('medicalRescueInfo', updated, 'update');
    } else {
      const newId = formData.medicalRescueInfo.length
        ? Math.max(...formData.medicalRescueInfo.map(m => m.id)) + 1
        : 1;
      const newInfo = { id: newId,
        unitId: data.unitId,
        supportType: data.supportType,
        arrivalTime: data.arrivalTime,
        personnelAssigned: data.personnelAssigned,
        locationAssigned: data.locationAssigned,
        remarks: data.remarks,
        attachment: data.attachment
      };
      updateArrayData('medicalRescueInfo', newInfo, 'add');
    }
    setShowMedicalModal(false);
    setEditingMedicalInfo(null);
  };

  // 7. Delete handlers
  const handleDeletePreservationMeasure = id => {
    if (window.confirm('Delete this measure?')) updateArrayData('preservationMeasures', id, 'delete');
  };
  const handleDeleteMedicalInfo = id => {
    if (window.confirm('Delete this info?')) updateArrayData('medicalRescueInfo', id, 'delete');
  };

  if (loading) return <div className="container my-5 text-center">Loading...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="d-flex">
      <div className="bg-light border-end min-vh-100" style={{ width: 250 }}><Sidebar /></div>
      <div className="container my-5 font-montserrat">
        {caseData && (
          <div className="text-end mb-4">
            <p><strong>Case ID:</strong> {caseData.caseId}</p>
            <p><strong>Type:</strong> {caseData.typeOfCrime}</p>
            <p><strong>Location:</strong> {caseData.location}</p>
          </div>
        )}
        <h3 className="fw-bold fs-4 mb-4">INITIAL RESPONSE</h3>

        {/* Time fields */}
        <Row className="mb-3">
          <Form.Label className="fw-bold">TIME OF DISPATCHING FORCES</Form.Label>
          <Col><Form.Control
            type="time"
            value={formData.dispatchTime}
            onChange={e => updateFormData('dispatchTime', e.target.value)}
            required
          /></Col>
        </Row>
        <Row className="mb-3">
          <Form.Label className="fw-bold">TIME OF ARRIVAL</Form.Label>
          <Col><Form.Control
            type="time"
            value={formData.arrivalTime}
            onChange={e => updateFormData('arrivalTime', e.target.value)}
            required
          /></Col>
        </Row>

        {/* Officers */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-uppercase small">LIST OF OFFICERS</label>
          <div className="text-end mb-2"><Button size="sm" onClick={() => setShowModal(true)}>View</Button></div>
          <table className="table table-bordered">
            <thead className="table-light text-uppercase small">
              <tr><th>Name</th><th>Role</th><th>Phone</th></tr>
            </thead>
            <tbody>
              {formData.assignedOfficers.length ? formData.assignedOfficers.map(o => (
                <tr key={o.userName}><td>{o.fullName}</td><td>{o.role}</td><td>{o.phoneNumber}</td></tr>
              )) : (
                <tr><td colSpan={3} className="text-center">No officers assigned.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Scene assessment */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-uppercase small">PRELIMINARY ASSESSMENT</label>
          <textarea
            className="form-control rounded-3"
            rows={3}
            value={formData.sceneAssessment}
            onChange={e => updateFormData('sceneAssessment', e.target.value)}
            placeholder="Enter assessment..."
          />
        </div>

        {/* Preservation */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-uppercase small">SCENE PRESERVATION MEASURES</label>
          <div className="text-end mb-2">
            <Button size="sm" variant="outline-secondary" onClick={() => setShowSceneProtectionModal(true)}>ADD</Button>
          </div>
          <table className="table table-bordered">
            <thead className="table-light text-uppercase small">
              <tr><th>#</th><th>Measure</th><th>Officer</th><th>Time</th><th/></tr>
            </thead>
            <tbody>
              {formData.preservationMeasures.length ? formData.preservationMeasures.map((m, i) => (
                <tr key={m.id}>
                  <td>{i+1}</td><td>{m.measure}</td><td>{m.officer || 'N/A'}</td>
                  <td>{m.startTime && m.endTime ? `${m.startTime} - ${m.endTime}` : 'N/A'}</td>
                  <td>
                    <Button size="sm" onClick={() => { setEditingPreservationMeasure(m); setShowSceneProtectionModal(true); }}>Edit</Button>
                    {' '}
                    <Button size="sm" variant="danger" onClick={() => handleDeletePreservationMeasure(m.id)}>Delete</Button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="text-center">No measures added.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Medical */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-uppercase small">MEDICAL/RESCUE INFO</label>
          <div className="text-end mb-2">
            <Button size="sm" variant="outline-secondary" onClick={() => setShowMedicalModal(true)}>ADD</Button>
          </div>
          <table className="table table-bordered">
            <thead className="table-light text-uppercase small">
              <tr><th>Unit ID</th><th>Support</th><th>Personnel</th><th>Arrival</th><th>Location</th><th/></tr>
            </thead>
            <tbody>
              {formData.medicalRescueInfo.length ? formData.medicalRescueInfo.map(info => (
                <tr key={info.id}>
                  <td>{info.unitId}</td><td>{info.supportType}</td><td>{info.personnelAssigned || 'N/A'}</td>
                  <td>{info.arrivalTime}</td><td>{info.locationAssigned || 'N/A'}</td>
                  <td>
                    <Button size="sm" onClick={() => { setEditingMedicalInfo(info); setShowMedicalModal(true); }}>Edit</Button>
                    {' '}
                    <Button size="sm" variant="danger" onClick={() => handleDeleteMedicalInfo(info.id)}>Delete</Button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6} className="text-center">No info added.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="d-flex justify-content-between mt-4">
          <Button variant="light" onClick={() => window.history.back()}>Back</Button>
          <div>
            <Button variant="secondary" onClick={handleSave} className="me-2">Save</Button>
            <Button variant="dark">Next page</Button>
          </div>
        </div>

        {/* Modals */}
        {/* Officer selection */}
        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header"><h5>Select Patrol Officers</h5><button className="btn-close" onClick={() => setShowModal(false)} /></div>
                <div className="modal-body"><PatrolOfficerManagement onSelectOfficer={handleSelectOfficers} /></div>
              </div>
            </div>
          </div>
        )}
        {/* Scene protection */}
        {showSceneProtectionModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header"><button className="btn-close" onClick={() => { setShowSceneProtectionModal(false); setEditingPreservationMeasure(null); }} /></div>
                <div className="modal-body">
                  <SceneProtectionForm
                    caseId={caseId}
                    onSave={handleSceneProtectionSave}
                    onCancel={() => { setShowSceneProtectionModal(false); setEditingPreservationMeasure(null); }}
                    editData={editingPreservationMeasure}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Medical support */}
        {showMedicalModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header"><button className="btn-close" onClick={() => { setShowMedicalModal(false); setEditingMedicalInfo(null); }} /></div>
                <div className="modal-body">
                  <MedicalSupportForm
                    onSave={handleMedicalSupportSave}
                    onCancel={() => { setShowMedicalModal(false); setEditingMedicalInfo(null); }}
                    editData={editingMedicalInfo}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}