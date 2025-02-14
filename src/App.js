import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from './pages/landing';
import Popup from './pages/popup';
import Projects from './pages/projects';
import { Header } from './components/header';
import {Rendering} from "./pages/rendering";
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/render" element={<Rendering />} />
          <Route path="/popup" element={<Popup />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
