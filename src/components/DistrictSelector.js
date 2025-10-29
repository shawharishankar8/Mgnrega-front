import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function DistrictSelector({ onSelect }) {
  const { t } = useTranslation();
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    axios.get("http://localhost:8080/api/mgnrega/districts")
      .then(res => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setDistricts(res.data);
        } else {
          setError("No districts data received");
          setDistricts([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching districts:", error);
        setError("Failed to load districts from backend");
        setDistricts([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="my-3">
      <label className="form-label">{t("selectDistrict")}</label>
      
      {loading && (
        <div className="alert alert-info">Loading districts from backend...</div>
      )}
      
      {error && (
        <div className="alert alert-warning">
          {error} - Make sure backend is running on port 8080
        </div>
      )}
      
      <select 
        className="form-select"
        onChange={(e) => onSelect(e.target.value)}
        disabled={loading || districts.length === 0}
      >
        <option value="">-- Select District --</option>
        {districts.map((district, i) => (
          <option key={i} value={district}>{district}</option>
        ))}
      </select>
      
      {districts.length === 0 && !loading && !error && (
        <div className="text-muted mt-2">
          No districts available from backend
        </div>
      )}
    </div>
  );
}