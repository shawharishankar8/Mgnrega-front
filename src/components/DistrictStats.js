import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";

export default function DistrictStats({ district }) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [averageWage, setAverageWage] = useState(0);

  useEffect(() => {
    if (district) {
      setLoading(true);
      setError(null);
      
      axios.get(`http://localhost:8080/api/mgnrega/district/${district}`)
        .then(res => {
          if (res.data && Array.isArray(res.data)) {
            // Transform backend data to match frontend format
            const transformedData = res.data.map(item => ({
              month: item.reportMonth ? formatMonth(item.reportMonth) : 'Unknown',
              householdsWorked: item.householdsWorked || 0,
              persondaysGenerated: item.personDaysGenerated || 0,
              averageWage: item.averageWage || 0
            }));
            setData(transformedData);
            
            // Calculate average wage from the data
            const avgWage = transformedData.length > 0 
              ? transformedData.reduce((sum, item) => sum + (item.averageWage || 0), 0) / transformedData.length
              : 215; // Fallback average
            setAverageWage(avgWage);
          } else {
            setData([]);
            setAverageWage(215);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(`Error fetching stats for ${district}:`, error);
          setError(`Failed to load data for ${district}. Make sure backend is running.`);
          setData([]);
          setAverageWage(215);
          setLoading(false);
        });
    } else {
      setData([]);
      setAverageWage(0);
    }
  }, [district]);

  // Helper function to format date to month name
  const formatMonth = (dateString) => {
    if (!dateString) return 'Unknown';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  // Calculate totals from real data
  const totalHouseholds = data.reduce((sum, item) => sum + (item.householdsWorked || 0), 0);
  const totalPersondays = data.reduce((sum, item) => sum + (item.persondaysGenerated || 0), 0);
  const totalExpenditure = totalPersondays * averageWage; // Use real average wage
  // eslint-disable-next-line no-unused-vars
  const performanceScore = Math.min(100, Math.floor((totalPersondays / Math.max(totalHouseholds, 1) / 30) * 100));

  if (!district) {
    return (
      <div className="mt-4 p-4 text-center text-muted border rounded">
        <i className="fas fa-map-marker-alt fa-2x mb-3 text-primary"></i>
        <h5>Select a District</h5>
        <p className="mb-0">Choose a district from the dropdown to view real MGNREGA performance data</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-4 p-4 text-center border rounded">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading real government data for {district}...</p>
        <small className="text-muted">Fetching from Ministry of Rural Development API</small>
      </div>
    );
  }

  return (
    <div className="mt-4 p-3 border rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">
          <i className="fas fa-chart-bar text-primary me-2"></i>
          {district} District - MGNREGA Performance
        </h4>
        <span className="badge bg-success">Live Data</span>
      </div>
      
      {error && (
        <div className="alert alert-warning d-flex align-items-center">
          <i className="fas fa-exclamation-triangle me-2"></i>
          <div>{error}</div>
        </div>
      )}
      
      {data.length === 0 && !loading && (
        <div className="alert alert-info d-flex align-items-center">
          <i className="fas fa-info-circle me-2"></i>
          <div>
            <strong>No data available</strong> for {district} in the database. 
            <br />
            <small>The backend might be fetching real data from government APIs.</small>
          </div>
        </div>
      )}
      
      {/* Chart - Only show if we have data */}
      {data.length > 0 && (
        <>
          <h6 className="text-muted mb-3">
            <i className="fas fa-calendar-alt me-2"></i>
            Monthly Performance Overview
          </h6>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                formatter={(value, name) => [value.toLocaleString(), name]}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }}/>
              <Bar dataKey="householdsWorked" fill="#10b981" name={t("households")} />
              <Bar dataKey="persondaysGenerated" fill="#4f46e5" name={t("persondays")} />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
      
      {/* Summary Cards */}
      {data.length > 0 && (
        <>
          <h6 className="text-muted mt-4 mb-3">
            <i className="fas fa-chart-pie me-2"></i>
            Performance Summary
          </h6>
          <div className="row text-center">
            <div className="col-md-3 mb-3">
              <div className="p-3 bg-primary text-white rounded">
                <i className="fas fa-home fa-2x mb-2"></i>
                <br />
                <strong>Households</strong><br />
                <span className="h4">{totalHouseholds.toLocaleString()}</span>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="p-3 bg-success text-white rounded">
                <i className="fas fa-users fa-2x mb-2"></i>
                <br />
                <strong>Persondays</strong><br />
                <span className="h4">{totalPersondays.toLocaleString()}</span>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="p-3 bg-warning text-white rounded">
                <i className="fas fa-rupee-sign fa-2x mb-2"></i>
                <br />
                <strong>Expenditure</strong><br />
                <span className="h4">₹{(totalExpenditure/100000).toFixed(1)}L</span>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="p-3 bg-info text-white rounded">
                <i className="fas fa-trophy fa-2x mb-2"></i>
                <br />
                <strong>Avg Wage</strong><br />
                <span className="h4">₹{averageWage.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}