import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import NotFound from "./pages/NotFound";
import EditUser from "./pages/EditUser";


function App() {

  return (
    <div className="p-2 pt-3 pt-md-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/add" element={<AddUser />}/>
          <Route path="/edit/:userId" element={<EditUser />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
