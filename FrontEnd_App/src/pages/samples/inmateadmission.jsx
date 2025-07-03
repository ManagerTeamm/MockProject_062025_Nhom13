import React, { useState } from 'react';
import inmateAdmissions from '../../samples/inmateadmission';

const InmateAdmissions = () => {
  const [search, setSearch] = useState('');

  const filtered = inmateAdmissions.filter((f) =>
    f.fileId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4 position-relative">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="w-100 text-center m-0">Inmate Admission Files</h4>
        <input
          type="text"
          className="form-control w-25 position-absolute"
          style={{ top: 0, right: 0 }}
          placeholder="Search by file ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>File ID</th>
            <th>Case ID</th>
            <th>Intake Time</th>
            <th>Prisoner</th>
            <th>Reason</th>
            <th>Health</th>
            <th>ID Photo</th>
            <th>Fingerprint</th>
            <th>Relatives</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((file) => (
            <tr key={file.fileId}>
              <td>{file.fileId}</td>
              <td>{file.caseId}</td>
              <td>{file.intakeTime}</td>
              <td>{file.prisoner.name}</td>
              <td>{file.reason}</td>
              <td>{file.health}</td>
              <td>
                <img
                  src={file.prisoner.photo}
                  alt="ID"
                  className="img-thumbnail"
                  style={{ width: '60px', height: '60px' }}
                />
              </td>
              <td>
                <img
                  src={file.fingerprint}
                  alt="Fingerprint"
                  className="img-thumbnail"
                  style={{ width: '60px', height: '60px' }}
                />
              </td>
              <td>
                {file.relatives.map((r) => (
                  <div key={r.phone}>
                    <strong>{r.phone}</strong>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InmateAdmissions;
