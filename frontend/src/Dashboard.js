import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchHistory();
  }, []);

  // const fetchHistory = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await axios.get("http://localhost:5000/api/history",{
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },});
  //     setHistory(res.data.history);
  //   } catch (error) {
  //     console.error("Error fetching history:", error);
  //   }
  // };
    const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://ai-career-backend-pyom.onrender.com/api/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data.history);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };


  return (
    <div className="container">
      <h2>Resume Analysis History</h2>
      {loading && <p>Loading history...</p>}
      {(!loading && history.length === 0 )? (
        <p>No resume analyses yet. Upload a resume to get started.</p>
      ) : (
        history.map((item) => (
          <div className="card" key={item._id}>
            <p><strong>Role:</strong> {item.role}</p>
            <p><strong>Skills:</strong> {item.skills.join(", ")}</p>
            <p><strong>Date:</strong> {new Date(item.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
