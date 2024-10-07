
import './App.css';

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from './pages/landing';
import Popup from './pages/popup';
import Projects from './pages/projects';

function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" exact element={<Landing />} />
    <Route path="/popup" exact element={<Popup />} />
    <Route path="/projects" exact element={<Projects />} />


      </Routes>
      </Router>

  );
}

export default App;
