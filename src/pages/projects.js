import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Popup from './popup';
import list from '../img/list.png';
import menu from '../img/menu.png';
import images from '../img/Frame.png';
import blankImage from '../assets/img/blank.png';


const Projects = () => {
  const navigate = useNavigate();
  const handleregister = () => {
    navigate('/signup');
  }
  const [show, setshow] = useState(false)
  const [r, setr] = useState('')
  const [showpopup, setPopup] = useState(false)
  const [allproject, setAllprojects] = useState([])
  let data = '';
  const [tracking_number, settracking_number] = useState('')
  const onDrop = (acceptedFiles) => {
    console.log('Files dropped:', acceptedFiles);
    setPopup(true)
  };
  const fetchQRtepmlete = async () => {
    try {
      const response = await axios.get('https://staging.imsynapse.com/api/getimage');
      setAllprojects(response.data.data)
      console.log('Upload', response.data.data)
    } catch (error) {
      console.error('Error fetching QR template by ID:', error);
    }
  };
  useEffect(() => {
    fetchQRtepmlete(1);
  }, []);

  const isImage = (url) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff'];
    const ext = url?.split('.').pop()?.toLowerCase(); // Get the file extension
    return imageExtensions.includes(ext);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <div className='admin-container'>
        <div className='main-content'>
          <div className='sidebar'>
            <h2 style={{ color: 'white', fontSize: '25px', marginTop: '40px', textAlign: 'center' }}>
              New Project
            </h2>
            <div className="project-dropzone-container " style={{ padding: '50px' }} >
              <input {...getInputProps()} />
              <div className="project-dropzone-box" {...getRootProps()}>
                <div className="project-drag-icon">
                  {/* Replace with your custom SVG icon or image */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-move"
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
                  create a new project or select
                  from recent projects.
                </p>
              </div>
            </div>
          </div>
          <div className='mainsec'>
            <section>
              <div className="container" >
                <div className='alignment'>
                  <div>
                    <h2 style={{ color: 'white', fontSize: '25px' }}>
                      Recent Projects
                    </h2>
                  </div>
                  <div>
                    <div className='menu'>
                      <img src={list} />
                      <img src={menu} />
                    </div>
                  </div>
                </div>
                <div className='imagegallery'>
                  {allproject.map((field, index) => (
                    <div className='hell-1'>
                      <img className='showimgs' src={field.image && isImage(field.image) ? field.image : blankImage} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects