import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setWorkouts(data.results || data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div>
      <h2 className="octofit-page-title">Workouts</h2>
      <div className="card octofit-card">
        <div className="card-header">💪 Workout Suggestions</div>
        <div className="card-body">
          {loading ? (
            <div className="octofit-loading">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading workouts…</p>
            </div>
          ) : workouts.length === 0 ? (
            <p className="octofit-empty">No workouts found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered octofit-table">
                <thead>
                  <tr>
                    <th style={{width: '60px'}}>#</th>
                    <th>Workout Name</th>
                    <th>Suggested For</th>
                    <th>Description</th>
                    <th style={{width: '100px'}}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, idx) => (
                    <tr key={workout.id || idx}>
                      <td><span className="badge bg-secondary">{idx + 1}</span></td>
                      <td><strong>{workout.name}</strong></td>
                      <td><span className="badge bg-info text-dark">{workout.suggested_for}</span></td>
                      <td className="text-muted" style={{maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                        {workout.description}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => setSelected(workout)}
                          data-bs-toggle="modal"
                          data-bs-target="#workoutModal"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Workout Detail Modal */}
      <div className="modal fade" id="workoutModal" tabIndex="-1" aria-labelledby="workoutModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header" style={{background: 'linear-gradient(135deg, #1a1a2e, #0f3460)'}}>
              <h5 className="modal-title" id="workoutModalLabel" style={{color: '#e94560'}}>
                💪 {selected?.name}
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selected && (
                <>
                  <p><strong>Suggested For:</strong> <span className="badge bg-info text-dark">{selected.suggested_for}</span></p>
                  <p><strong>Description:</strong></p>
                  <p className="text-muted">{selected.description}</p>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
