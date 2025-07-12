import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Sidebar from '../components/sidebar';
import StatementTable from '../components/caseDetailStep2/statementTable';
import MediaTable from '../components/caseDetailStep2/mediaTable';
import EvidenceTable from '../components/caseDetailStep2/evidenceTable';
import ImageAndVideo from '../components/caseDetailStep2/imageAndVideo';
import StatementForm from '../components/caseDetailStep2/initialStatement';
//import EvidenceForm from '../components/caseDetailStep2/evidenceForm';
import NavbarPhase2 from '../components/navbarphase2';

const CaseDetailStep2 = ({
    initialStatements = [],
    mediaFiles = [],
    physicalEvidences = [],
}) => {
    const [statements, setStatements] = useState(initialStatements);
    const [medias, setMedias] = useState(mediaFiles);
    const [evidences, setEvidences] = useState(physicalEvidences);

    // Media
    const [showAddMediaForm, setShowAddMediaForm] = useState(false);
    const [editingMedia, setEditingMedia] = useState(null);

    // Statement
    const [showAddStatementForm, setShowAddStatementForm] = useState(false);
    const [editingStatement, setEditingStatement] = useState(null);

    // Evidence
    const [showAddEvidenceForm, setShowAddEvidenceForm] = useState(false);
    const [editingEvidence, setEditingEvidence] = useState(null);

    // ================= MEDIA =================
    const handleAddMedia = () => {
        setEditingMedia(null);
        setShowAddMediaForm(true);
    };

    const handleEditMedia = (media) => {
        setEditingMedia(media);
        setShowAddMediaForm(true);
    };

    const handleCancelMedia = () => {
        setEditingMedia(null);
        setShowAddMediaForm(false);
    };

    const handleSubmitMedia = (media) => {
        if (editingMedia) {
            setMedias((prev) => prev.map(m => m.id === editingMedia.id ? { ...m, ...media } : m));
        } else {
            setMedias((prev) => [...prev, media]);
        }
        setShowAddMediaForm(false);
        setEditingMedia(null);
    };

    const handleDeleteMedia = (id) => {
        setMedias(prev => prev.filter(m => m.id !== id));
    };

    // ================= STATEMENT =================
    const handleAddStatement = () => {
        setEditingStatement(null);
        setShowAddStatementForm(true);
    };

    const handleEditStatement = (statement) => {
        setEditingStatement(statement);
        setShowAddStatementForm(true);
    };

    const handleCancelStatement = () => {
        setEditingStatement(null);
        setShowAddStatementForm(false);
    };

    const handleSubmitStatement = (statement) => {
        if (editingStatement) {
            setStatements((prev) =>
                prev.map((s) => s.id === editingStatement.id ? { ...s, ...statement } : s)
            );
        } else {
            setStatements((prev) => [...prev, statement]);
        }
        setEditingStatement(null);
        setShowAddStatementForm(false);
    };

    const handleDeleteStatement = (id) => {
        setStatements(prev => prev.filter(s => s.id !== id));
    };

    // ================= EVIDENCE =================
    const handleAddEvidence = () => {
        setEditingEvidence(null);
        setShowAddEvidenceForm(true);
    };

    const handleEditEvidence = (evidence) => {
        setEditingEvidence(evidence);
        setShowAddEvidenceForm(true);
    };

    const handleCancelEvidence = () => {
        setEditingEvidence(null);
        setShowAddEvidenceForm(false);
    };

    const handleSubmitEvidence = (evidence) => {
        if (editingEvidence) {
            setEvidences((prev) =>
                prev.map((e) => e.id === editingEvidence.id ? { ...e, ...evidence } : e)
            );
        } else {
            setEvidences((prev) => [...prev, evidence]);
        }
        setEditingEvidence(null);
        setShowAddEvidenceForm(false);
    };

    const handleDeleteEvidence = (id) => {
        setEvidences(prev => prev.filter(e => e.id !== id));
    };

    // =================== RENDER ===================
    return (
        <div className="d-flex">
            <div className="bg-light border-end min-vh-100">
                <Sidebar />
            </div>

            <div className="flex-grow-1 d-flex flex-column">
                {/* Nội dung chính */}
                <div className="flex-grow-1 p-4 bg-white">
                    <NavbarPhase2 activeItem="Scene Information" onChange={(newItem) => console.log(newItem)} />

                    <Card className="shadow mt-4">
                        <Card.Header
                            style={{ backgroundColor: '#C8E3FF' }}
                            className="text-dark fw-bold text-center fs-5"
                        >
                            INFORMATION PROTECTION FIELD
                        </Card.Header>

                        <Card.Body>
                            {showAddMediaForm ? (
                                <ImageAndVideo
                                    onSubmit={handleSubmitMedia}
                                    onCancel={handleCancelMedia}
                                    initialData={editingMedia}
                                />
                            ) :
                                showAddStatementForm ? (
                                    <StatementForm
                                        onSubmit={handleSubmitStatement}
                                        onCancel={handleCancelStatement}
                                        initialData={editingStatement}
                                    />
                                ) :                            (
                                <>
                                    <StatementTable
                                        statements={statements}
                                        onAdd={handleAddStatement}
                                        onEdit={handleEditStatement}
                                        onDelete={handleDeleteStatement}
                                    />

                                    <MediaTable
                                        medias={medias}
                                        onAdd={handleAddMedia}
                                        onEdit={handleEditMedia}
                                        onDelete={handleDeleteMedia}
                                    />

                                    <EvidenceTable
                                        evidences={evidences}
                                        onAdd={handleAddEvidence}
                                        onEdit={handleEditEvidence}
                                        onDelete={handleDeleteEvidence}
                                    />

                                    <div className="d-flex justify-content-end gap-2 mt-4">
                                        <Button variant="secondary">Back</Button>
                                        <Button variant="success">Save</Button>
                                        <Button variant="primary">Next page</Button>
                                    </div>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CaseDetailStep2;
