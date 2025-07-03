import React, { useState, useEffect } from 'react';
import evidenceService from '../services/evidenceService';

const EvidenceTest = () => {
  const [evidences, setEvidences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testGetEvidences = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await evidenceService.getAllEvidences();
      setEvidences(data);
      console.log('Evidences loaded:', data);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testCreateEvidence = async () => {
    const testData = {
      caseId: '#TEST001',
      description: 'Test Evidence from Frontend',
      collectedAt: new Date().toISOString().split('T')[0],
      collectedBy: 'test-user',
      typeEvidence: 'Physical',
      currentLocation: 'Test Room',
      attachedFile: 'test.jpg',
      status: 'Waiting for Test'
    };

    try {
      const result = await evidenceService.createEvidence(testData);
      console.log('Evidence created:', result);
      // Refresh the list
      testGetEvidences();
    } catch (err) {
      console.error('Error creating evidence:', err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Evidence API Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testGetEvidences} 
          disabled={loading}
          style={{ marginRight: '10px', padding: '10px 20px' }}
        >
          {loading ? 'Loading...' : 'Get All Evidences'}
        </button>
        
        <button 
          onClick={testCreateEvidence}
          style={{ padding: '10px 20px' }}
        >
          Create Test Evidence
        </button>
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          Error: {error}
        </div>
      )}

      <div>
        <h3>Evidences ({evidences.length})</h3>
        {evidences.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Case ID</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Collector</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {evidences.map((evidence, index) => (
                <tr key={evidence.evidenceId || index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {evidence.evidenceId}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {evidence.caseId}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {evidence.description}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {new Date(evidence.collectedAt).toLocaleDateString()}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {evidence.collector}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {evidence.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No evidences found. Click "Get All Evidences" to load data.</p>
        )}
      </div>
    </div>
  );
};

export default EvidenceTest; 