import React, { useState } from "react";
import axios from "axios";

const DiseaseDetection = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:3000/upload", formData);
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Detection failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Upload Plant Image
      </h1>
      <div className="border-2 border-dashed rounded-lg p-6 bg-white shadow">
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <div className="relative h-32 w-full flex items-center justify-center border-2 border-dashed rounded-lg">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <p className="text-gray-500 pointer-events-none">
              Drag and drop an image here or click to browse
            </p>
          </div>
          <button
            type="submit"
            disabled={!file || loading}
            className={`w-full py-2 px-4 rounded bg-green-600 text-white font-semibold hover:bg-green-900 transition disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? "Uploading..." : "Detect Disease"}
          </button>
        </form>
      </div>
      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 shadow">
          <h2 className="text-xl font-semibold">Detection Result</h2>
          <p className="mt-2 text-gray-700">
            Disease: <span className="font-bold">{result.disease}</span>
          </p>
          <p className="text-gray-700">
            Confidence:{" "}
            <span className="font-bold">
              {(result.confidence * 100).toFixed(2)}%
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DiseaseDetection;
