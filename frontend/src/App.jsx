import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import PropertyDetails from './components/PropertyDetails';
import AddProperty from './components/AddProperty';
import EditProperty from './components/EditProperty';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="bg-beige-50 min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/properties/edit/:id" element={<EditProperty />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
