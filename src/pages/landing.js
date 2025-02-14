import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Popup from './popup';
import Loader from './loader';
import '../assets/css/AdminPanel.css'

const Landing = () => {

  const navigate = useNavigate();
  const handleregister = () => {
    navigate('/signup');
  }
  const [isLoading, setIsLoading] = useState(false);
  const [showpopup, setPopup] = useState(false);
  const [uploadedImgs, setUploadedImgs] = useState([]);

  const onDrop = (acceptedFiles) => {
    setIsLoading(true);
    const uploadPromises = acceptedFiles.map(file => getImageFileObjects(file));
    Promise.all(uploadPromises)
      .then(() => {
        localStorage.setItem('uploadedImgs', uploadedImgs);
        setIsLoading(false);
        setPopup(true);
        console.log(uploadedImgs);
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
        setIsLoading(false);
      });
  };
  const Closepop = () => {
    setPopup(false)
  }

  async function getImageFileObjects(file) {
    console.log('File landing:', file);
    if (file instanceof Blob || file instanceof File) {
      try {
        const uploadPreset = "tixx1a8u";
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        const response = await fetch(`https://api.cloudinary.com/v1_1/degjqq6vo/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          setUploadedImgs(prevImgs => {
            const updatedImgs = [...prevImgs, data.url];
            return updatedImgs;
          });

        } else {
          console.error('Upload failed:', data.error.message);
        }

      } catch (error) {
        console.error('Upload failed:', error);
      }
    } else {
      console.error("Invalid image file object");
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  window.addEventListener('keydown', function (e) {
    if ((e.ctrlKey && (e.key === '+' || e.key === '-')) || e.key === 'Meta') {
      e.preventDefault();
    }
  });

  return (
    <>
      {
        isLoading &&
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <br />
          <p className="loading-label">Uploading...</p>
        </div>
      }
      <section id="landing">
        <div className="container">
          <div className='main'>
            <div className="dropzone-container" >
              <input {...getInputProps()} />
              <div className="dropzone-box" {...getRootProps()}>
                <div className="drag-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className='drag-svg-icon'
                  >
                    <polyline points="5 9 2 12 5 15"></polyline>
                    <polyline points="9 5 12 2 15 5"></polyline>
                    <polyline points="15 19 12 22 9 19"></polyline>
                    <polyline points="19 9 22 12 19 15"></polyline>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <line x1="12" y1="2" x2="12" y2="22"></line>
                  </svg>
                </div>
                <p>
                  Drag and drop a Folder to
                  <br />
                  create a new project
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {
        showpopup &&
        <div>
          <div className="popup">
            <Popup uploadedImgs={uploadedImgs} Close={Closepop} />
          </div>
        </div>
      }
    </>
  )
}

export default Landing