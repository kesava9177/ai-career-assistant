import React, { useState } from "react";
import axios from "axios";

function UploadResume() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [roadmap, setRoadmap] = useState([]);

  const generateRoadmapHandler = async () => {
      if (!result) {
        alert("Please analyze resume first!");
        return;
      }

      setLoading(true);

      try {
        const res = await axios.post("https://ai-career-backend-pyom.onrender.com/api/roadmap", {
          role: result.role,
          skills: result.skills,
        });

        setRoadmap(res.data.roadmap);
      } catch (err) {
        console.error(err);
        alert("Error generating roadmap");
      }

      setLoading(false);
    };

  const analyzeResume = async () => {
    if (!text.trim()) {
      alert("Please paste resume text!");
      return;
    }
      
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("https://ai-career-backend-pyom.onrender.com/api/parse", {
        text: text},
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        
      });
      setResult(res.data);
    } catch (err) {
      alert("Error analyzing resume");
    }
    setLoading(false);
  };

  const analyzePDF =async()=>{
    if(!selectedFile){
      alert("Please upload a PDF file!");
      return;
    }

    const formData=new FormData();
    formData.append("resume",selectedFile);
    setLoading(true);
    try{
      const token = localStorage.getItem("token");
      const res=await axios.post(
        "https://ai-career-backend-pyom.onrender.com/api/parse_pdf",
        formData,
        {
          headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type":"multipart/form-data"
          }
        }
      );
      setResult(res.data);
    }catch(err){
      console.error(err);
      alert("Error analyzing PDF resume");
    }
      
    setLoading(false);
  }

  return (
    <div className="container" style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h2>AI Resume Analyzer</h2>

      <textarea
        rows="12"
        style={{ width: "100%", fontSize: "16px" }}
        placeholder="Paste your resume text here..."
        onChange={(e) => setText(e.target.value)}
      />
      <input 
       type="file"
       accept="application/pdf"
       onChange={(e)=>setSelectedFile(e.target.files[0])}
       style={{marginTop: "10px"}}
      />

      <br /><br />

      <button
        onClick={analyzeResume}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          background: "#1976d2",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
      <button
        onClick={analyzePDF}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          background: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginLeft: "10px"
        }}
      >
        {loading ? "Processing PDF..." : "Analyze PDF"}
      </button>


      {result && //(
        // <div className="card" style={{ marginTop: "20px" }}>
        //   <h3>Skills Found:</h3>
        //   <p>{result.skills.join(", ")}</p>

        //   <h3>Suggested Role:</h3>
        //   <p style={{ fontWeight: "bold" }}>{result.role}</p>

        //   <button
        //     onClick={generateRoadmapHandler}
        //     style={{
        //       marginTop: "15px",
        //       padding: "10px 20px",
        //       background: "#673ab7",
        //       color: "white",
        //       border: "none",
        //       cursor: "pointer",
        //       fontSize: "16px"
        //     }}
        //   >
        //     Generate Learning Roadmap
        //   </button>
        (
          <div className="card">
            <h3>Analysis Result</h3>
            <p><strong>Suggested Role:</strong> {result.role}</p>
            <p><strong>Skills:</strong> {result.skills.join(", ")}</p>

            <button className="secondary-btn" onClick={generateRoadmapHandler}>
              Generate Learning Roadmap
            </button>
          
            {roadmap.length > 0 && (
              <div className="card">
                <h3>Learning Roadmap</h3>
                <ul>
                  {roadmap.map((step, idx) => (
                    <li key={idx} style={{ marginBottom: "6px" }}>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div> 
      )}
    </div>
  );
}

export default UploadResume;
