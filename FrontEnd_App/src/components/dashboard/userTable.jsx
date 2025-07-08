import React from "react";

const UserTable = ({ cases }) => {
  const users = cases.map(c => c.suspect);

  return (
    <div>
      <div className="user-table-container">
        <h4>Suspect List</h4>
        <select className="filter-dropdown">
          <option value="">Filter...</option>
        </select>
        <table className="user-table">
          <thead>
            <tr>
              <th>Suspect ID</th>
              <th>Name</th>
              <th>Birthdate</th>
              <th>Features</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {users.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.fullName}</td>
                <td>{s.birthdate}</td>
                <td>{s.features}</td>
                <td>
                  <img src={s.photoUrl} alt={s.fullName} style={{ width: "80px", borderRadius: "6px" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      );
};

      export default UserTable;
