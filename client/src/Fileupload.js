import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);  // State to hold the selected file
  const [uploadProgress, setUploadProgress] = useState(null); // State to track upload progress
  const [responseData, setResponseData] = useState(null);  // State to hold server response
  const [errorMessage, setErrorMessage] = useState(null);  // State to hold error messages

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);  // Get the selected file
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();  // Prevent default form submission
    if (!file) {
      setErrorMessage("Please select a file before uploading");
      return;
    }

    const formData = new FormData();  // Create a FormData object to hold the file
    formData.append('file', file);  // Append the file to the FormData

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Set content type to multipart
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(`${percentCompleted}%`);
        },
      });

      // Handle success response
      setResponseData(response.data);  // Save response data in state
      setUploadProgress(null);  // Reset progress bar
      setErrorMessage(null);  // Clear error messages
    } catch (error) {
      // Handle error response
      setErrorMessage("File upload failed. Please try again.");
      setUploadProgress(null);
    }
  };

  return (
    <div>
      <h2>Upload .pnml File</h2>
      <form onSubmit={handleFileUpload}>
        <input type="file" accept=".pnml" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {uploadProgress && <p>Uploading: {uploadProgress}</p>}  {/* Show upload progress */}
      {responseData && (
        <div>
          <h3>Server Response:</h3>
          <p>Places: {responseData.places}</p>
          <p>Transitions: {responseData.transitions}</p>
          <p>Arcs: {responseData.arcs}</p>
        </div>
      )}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  {/* Show error message */}
    </div>
  );
};

export default FileUpload;
