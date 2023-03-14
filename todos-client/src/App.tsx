import React, { FC } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Home } from "./routes/Home";
import { Routes, Route } from "react-router-dom";
import { Hub } from "./routes/Hub";
import { Users } from "./routes/Users";
import { Lists } from "./routes/Lists";

interface Props {
}

export const App: FC<Props> = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/hub" element={<Hub />} />
        <Route path='/users' element={<Users />} />
        <Route path='/lists' element={<Lists />} />
    </Routes>
  );
}
