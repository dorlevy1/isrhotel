import React from "react";
import Home from "./pages/Home";
import Mall from "./pages/Mall";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/*single mall*/}
        <Route path="/mall/:id" element={<Mall />} />
        <Route path="/:location/:dates/:guests" element={<Home />} />
        {/*filter search*/}
        <Route path="/malls" element={<Mall />} />
        {/*single mall with queries*/}
        <Route path="/mall/:id/room/:roomId" element={<Mall />} />
        {/*room in single mall*/}
        <Route path="/:location/:dates/:guests" element={<Home />} />{" "}
        {/*filter search*/}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
