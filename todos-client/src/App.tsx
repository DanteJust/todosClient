import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Home } from "./routes/Home";
import { Routes, Route } from "react-router-dom";
import { Hub } from "./routes/Hub";

function App() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/hub" element={<Hub />} />
    </Routes>
  );
}

export default App;
