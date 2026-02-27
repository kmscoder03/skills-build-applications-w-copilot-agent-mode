
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import logo from './octofitapp-small.png';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li className="nav-item">
      <Link className={`nav-link${isActive ? ' active' : ''}`} to={to}>{children}</Link>
    </li>
  );
}

function HomePage() {
  return (
    <div className="octofit-hero">
      <img src={logo} alt="OctoFit" style={{height: '72px', marginBottom: '1rem', borderRadius: '12px', boxShadow: '0 0 24px rgba(233,69,96,0.4)'}} />
      <h1>OctoFit Tracker</h1>
      <p className="mt-2">Track your activities, join teams, and climb the leaderboard.</p>
      <div className="mt-4 d-flex gap-2 justify-content-center flex-wrap">
        <Link to="/activities" className="btn btn-danger px-4">Activities</Link>
        <Link to="/leaderboard" className="btn btn-outline-light px-4">Leaderboard</Link>
        <Link to="/teams" className="btn btn-outline-light px-4">Teams</Link>
        <Link to="/users" className="btn btn-outline-light px-4">Users</Link>
        <Link to="/workouts" className="btn btn-outline-light px-4">Workouts</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg octofit-navbar mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="OctoFit logo" />
            Octo<span>Fit</span> Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <NavLink to="/activities">Activities</NavLink>
              <NavLink to="/leaderboard">Leaderboard</NavLink>
              <NavLink to="/teams">Teams</NavLink>
              <NavLink to="/users">Users</NavLink>
              <NavLink to="/workouts">Workouts</NavLink>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container pb-5">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
