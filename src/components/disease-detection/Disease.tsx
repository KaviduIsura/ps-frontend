import React, { useState } from "react";
import axios from "axios";

const DiseaseDetection = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:3000/upload", formData);
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Detection failed!");
    }
  };

  return (
    <div>
      <h1>Upload Plant Image</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Detect Disease</button>
      </form>
      {result && (
        <div>
          <h2>Detection Result</h2>
          <p>Disease: {result.disease}</p>
          <p>Confidence: {result.confidence.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default DiseaseDetection;
