import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import envalopt from '../img/Group.png'

const Loader = ({ Close }) => {
  const navigate = useNavigate();
  const Save = async () => {
    const savedImageUrl = localStorage.getItem('uploadedImageUrl');
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/saveimages', {
        project,
        savedImageUrl
      });
      navigate('/projects')
      console.log('submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
  const [show, setshow] = useState(false)
  const [r, setr] = useState('')
  const [project, setprojectname] = useState('')

  let data = '';
  const [tracking_number, settracking_number] = useState('')

  const onDrop = (acceptedFiles) => {
    console.log('Files dropped:', acceptedFiles);
    // Add logic to handle the files
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <div class="loader">
        <div class="loading-text">
          Loading<span class="dot">.</span><span class="dot">.
          </span><span class="dot">.</span>
        </div>
        <div class="loading-bar-background">
          <div class="loading-bar">
            <div class="white-bars-container">
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Loader