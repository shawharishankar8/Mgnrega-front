import React, { useState } from "react";
import "./i18n";
import DistrictSelector from "./components/DistrictSelector";
import DistrictStats from "./components/DistrictStats";
import LanguageToggle from "./components/LanguageToggle";
import "./App.css"; // We'll create this for custom styles

function App() {
  const [district, setDistrict] = useState("");

  return (
    <div className="mgnrega-dashboard">
      {/* Header with Government Branding */}
      <header className="dashboard-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center">
                <div className="government-logo">
                  <div className="ashoka-chakra">
                    <span>✻</span>
                  </div>
                </div>
                <div className="ms-3">
                  <h1 className="dashboard-title mb-1">
                    MGNREGA Dashboard
                  </h1>
                  <p className="dashboard-subtitle mb-0">
                    Mahatma Gandhi National Rural Employment Guarantee Act
                  </p>
                  <p className="state-subtitle mb-0">
                    Madhya Pradesh - Real-time Monitoring System
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-end">
              <div className="d-flex justify-content-end align-items-center gap-3">
                <div className="live-indicator">
                  <span className="live-dot"></span>
                  Live Data
                </div>
                <LanguageToggle />
                <div className="last-update">
                  <small>Updated: Just now</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="dashboard-main">
        <div className="container">
          {/* Quick Stats Row */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="stat-card primary">
                <div className="stat-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="stat-content">
                  <h3>7</h3>
                  <p>Districts Covered</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card success">
                <div className="stat-icon">
                  <i className="fas fa-home"></i>
                </div>
                <div className="stat-content">
                  <h3>80K+</h3>
                  <p>Households Benefited</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card warning">
                <div className="stat-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-content">
                  <h3>3.8L+</h3>
                  <p>Persondays Generated</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card info">
                <div className="stat-icon">
                  <i className="fas fa-rupee-sign"></i>
                </div>
                <div className="stat-content">
                  <h3>₹85Cr+</h3>
                  <p>Total Expenditure</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Card */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h4 className="card-title mb-0">
                    <i className="fas fa-chart-line me-2"></i>
                    District Performance Analysis
                  </h4>
                </div>
                <div className="col-md-6 text-end">
                  <div className="data-source-badge">
                    <i className="fas fa-database me-1"></i>
                    Source: Ministry of Rural Development
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <DistrictSelector onSelect={setDistrict} />
              <DistrictStats district={district} />
            </div>
          </div>

          {/* Additional Info Section */}
          {!district && (
            <div className="row mt-4">
              <div className="col-md-4">
                <div className="info-card">
                  <div className="info-icon">
                    <i className="fas fa-bullseye"></i>
                  </div>
                  <h5>Objective</h5>
                  <p>Enhance livelihood security in rural areas by providing at least 100 days of wage employment.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info-card">
                  <div className="info-icon">
                    <i className="fas fa-hand-holding-usd"></i>
                  </div>
                  <h5>Benefits</h5>
                  <p>Guaranteed wage employment, financial inclusion, and sustainable rural development.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info-card">
                  <div className="info-icon">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                  <h5>Monitoring</h5>
                  <p>Real-time tracking of employment generation and fund utilization across districts.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="footer-info">
                <strong>Government of Madhya Pradesh</strong>
                <span className="separator">|</span>
                <span>Department of Rural Development</span>
              </div>
            </div>
            <div className="col-md-6 text-end">
              <div className="footer-links">
                <small>
                  <span className="me-3">
                    <i className="fas fa-sync-alt me-1"></i>
                    Auto-refresh: 5 mins
                  </span>
                  <span>
                    <i className="fas fa-shield-alt me-1"></i>
                    Secure Portal
                  </span>
                </small>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;