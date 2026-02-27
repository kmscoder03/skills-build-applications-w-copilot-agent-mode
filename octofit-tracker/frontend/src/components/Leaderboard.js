import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const sorted = (data.results || data).sort((a, b) => b.points - a.points);
        setLeaders(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setLoading(false);
      });
  }, [endpoint]);

  const rankClass = (idx) => {
    if (idx === 0) return 'rank-badge rank-1';
    if (idx === 1) return 'rank-badge rank-2';
    if (idx === 2) return 'rank-badge rank-3';
    return 'rank-badge rank-other';
  };

  const rankIcon = (idx) => {
    if (idx === 0) return '🥇';
    if (idx === 1) return '🥈';
    if (idx === 2) return '🥉';
    return idx + 1;
  };

  return (
    <div>
      <h2 className="octofit-page-title">Leaderboard</h2>
      <div className="card octofit-card">
        <div className="card-header">🏆 Team Rankings</div>
        <div className="card-body">
          {loading ? (
            <div className="octofit-loading">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading leaderboard…</p>
            </div>
          ) : leaders.length === 0 ? (
            <p className="octofit-empty">No leaderboard data found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered octofit-table">
                <thead>
                  <tr>
                    <th style={{width: '60px'}}>Rank</th>
                    <th>Team</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaders.map((leader, idx) => (
                    <tr key={leader.id || idx} className={idx === 0 ? 'table-warning' : ''}>
                      <td className="text-center">
                        <span className={rankClass(idx)}>{rankIcon(idx)}</span>
                      </td>
                      <td><strong>{leader.team}</strong></td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="progress flex-grow-1"
                            style={{height: '10px'}}
                            title={`${leader.points} pts`}
                          >
                            <div
                              className="progress-bar bg-danger"
                              style={{width: `${Math.min(100, (leader.points / (leaders[0]?.points || 1)) * 100)}%`}}
                            />
                          </div>
                          <span className="fw-bold text-danger">{leader.points} pts</span>
                        </div>
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

export default Leaderboard;
