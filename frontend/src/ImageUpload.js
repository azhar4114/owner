import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload({ listingId, onUpload }) {
  const [files, setFiles] = useState([]);

  const handleFilesChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    for (let i = 0; i < files.length; i++) {
      let formData = new FormData();
      formData.append('listing', listingId);
      formData.append('image', files[i]);
      await axios.post('http://localhost:8000/api/listingimages/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
    onUpload && onUpload(); // Refresh listing after upload
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" multiple onChange={handleFilesChange} />
      <button type="submit">Upload Images</button>
    </form>
  );
}

export default ImageUpload;
