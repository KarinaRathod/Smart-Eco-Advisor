import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./Pages/Home";
import Features from "./Pages/Features";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";

function App() {
  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      const bar = document.getElementById("progressBar");
      if (bar) bar.style.width = progress + "%";
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <div className="relative">

        {/* Scroll Progress Bar */}
        <div
          id="progressBar"
          className="fixed top-0 left-0 h-[4px] bg-green-500 z-[9999]"
        ></div>

        {/* Navbar */}
        <Navbar />

        {/* Page Routing */}
        <div className="pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* ✅ LOGIN ROUTE ADDED */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        {/* Falling Leaves Animation */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-600 dark:text-green-400 animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${-Math.random() * 100}%`,
                fontSize: `${20 + Math.random() * 20}px`,
                animationDuration: `${4 + Math.random() * 5}s`
              }}
            >
              🍃
            </div>
          ))}
        </div>
      </div>
    </Router>
  );
}

export default App;
