import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setActivities(data.results || data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div>
      <h2 className="octofit-page-title">Activities</h2>
      <div className="card octofit-card">
        <div className="card-header">📋 Activity Log</div>
        <div className="card-body">
          {loading ? (
            <div className="octofit-loading">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading activities…</p>
            </div>
          ) : activities.length === 0 ? (
            <p className="octofit-empty">No activities found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered octofit-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Activity</th>
                    <th>User</th>
                    <th>Team</th>
                    <th>Duration (min)</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, idx) => (
                    <tr key={activity.id || idx}>
                      <td><span className="badge bg-secondary">{idx + 1}</span></td>
                      <td><strong>{activity.name}</strong></td>
                      <td>{activity.user}</td>
                      <td><span className="badge bg-primary">{activity.team}</span></td>
                      <td>
                        <span className="badge bg-success">{activity.duration} min</span>
                      </td>
                      <td>{activity.date}</td>
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

export default Activities;
