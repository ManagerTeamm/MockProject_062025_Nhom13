import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvidenceById } from '../services/evidenceService';
import Sidebar from '../components/sidebar';
import '../styles/evidence.css';

const EvidenceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evidence, setEvidence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        const data = await getEvidenceById(id);
        setEvidence(data);
      } catch (err) {
        setError('Không thể tải dữ liệu.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvidence();
  }, [id]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!evidence) return <div>Không tìm thấy dữ liệu.</div>;

  return (
    <div className="investigation-container">
      <Sidebar />
      <main className="investigation-main">
        <header className="investigation-header">
          <h1>Evidence Detail</h1>
        </header>
        <div className="evidence-detail-container">
          <button className="btn-back" onClick={() => navigate(-1)} style={{marginBottom:16}}>Back</button>
          <div className="evidence-section">
            <h3>Evidence</h3>
            <p><b>ID:</b> {evidence.evidenceId}</p>
            <p><b>Description:</b> {evidence.description}</p>
            <p><b>Collected At:</b> {new Date(evidence.collectedAt).toLocaleString()}</p>
            <p><b>Collector:</b> {evidence.collector}</p>
            <p><b>Status:</b> {evidence.status}</p>
          </div>
          {evidence.caseInfo && (
            <div className="case-section">
              <h3>Case</h3>
              <p><b>Case ID:</b> {evidence.caseInfo.caseId}</p>
              <p><b>Type:</b> {evidence.caseInfo.type}</p>
              <p><b>Severity:</b> {evidence.caseInfo.severity}</p>
              <p><b>Status:</b> {evidence.caseInfo.status}</p>
              <p><b>Summary:</b> {evidence.caseInfo.summary}</p>
            </div>
          )}
          {evidence.suspectInfo && (
            <div className="suspect-section">
              <h3>Suspect</h3>
              <p><b>Suspect ID:</b> {evidence.suspectInfo.suspectId}</p>
              <p><b>Full Name:</b> {evidence.suspectInfo.fullName}</p>
              <p><b>Status:</b> {evidence.suspectInfo.status}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EvidenceDetail; 