import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import envalopt from '../img/Group.png'

const Popup = ({ uploadedImgs, Close }) => {
  const navigate = useNavigate();
  const [uploads, setUploads] = useState([]);
  const Save = async () => {
    if (uploads.length > 0) {
      const uploadPromises = uploads.map(url => {
        console.log(url);
        axios.post('https://staging.imsynapse.com/api/saveimages', {
          project,
          url
        })
      });
      Promise.all(uploadPromises)
        .then(() => {
          navigate('/projects')
        })
        .catch((error) => {
          console.error('Error uploading files:', error);
        });
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

  useEffect(() => {
    setUploads(uploadedImgs);
  }, [uploadedImgs])
  return (
    <>
      <div className="new-project-container">
        <h2 className="new-project-title">New Project</h2>
        <div className="new-project-form">
          <div className="input-group">
            <input type="text" id="project-name" name="project-name" placeholder="Project Name" value={project} onChange={(e) => setprojectname(e.target.value)} />
          </div>
          <div className="input-group">
            <div className="project-path-container">
              <input type="text" id="project-path" name="project-path" placeholder="Project Path" />
              <span className="folder-icon"><img src={envalopt} /></span>
            </div>
          </div>
          <div className="buttons-group">
            <button className="btn primary" onClick={Save}>OK</button>
            <button type="button" className="btn secondary" onClick={Close}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Popup