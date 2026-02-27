import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setUsers(data.results || data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, [endpoint]);

  const avatarLetter = (username) =>
    username ? username.charAt(0).toUpperCase() : '?';

  return (
    <div>
      <h2 className="octofit-page-title">Users</h2>
      <div className="card octofit-card">
        <div className="card-header">🧑‍💻 Registered Users</div>
        <div className="card-body">
          {loading ? (
            <div className="octofit-loading">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading users…</p>
            </div>
          ) : users.length === 0 ? (
            <p className="octofit-empty">No users found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered octofit-table">
                <thead>
                  <tr>
                    <th style={{width: '60px'}}>#</th>
                    <th>Username</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={user.id || idx}>
                      <td><span className="badge bg-secondary">{user.id || idx + 1}</span></td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <span
                            className="badge bg-danger rounded-circle d-flex align-items-center justify-content-center"
                            style={{width: '32px', height: '32px', fontSize: '0.9rem'}}
                          >
                            {avatarLetter(user.username)}
                          </span>
                          <strong>{user.username}</strong>
                        </div>
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`} className="text-decoration-none">
                          {user.email}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
