import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setTeams(data.results || data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div>
      <h2 className="octofit-page-title">Teams</h2>
      <div className="card octofit-card">
        <div className="card-header">👥 Registered Teams</div>
        <div className="card-body">
          {loading ? (
            <div className="octofit-loading">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading teams…</p>
            </div>
          ) : teams.length === 0 ? (
            <p className="octofit-empty">No teams found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered octofit-table">
                <thead>
                  <tr>
                    <th style={{width: '60px'}}>#</th>
                    <th>Team Name</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, idx) => (
                    <tr key={team.id || idx}>
                      <td><span className="badge bg-secondary">{team.id || idx + 1}</span></td>
                      <td>
                        <span className="fw-semibold">👥 {team.name}</span>
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

export default Teams;
