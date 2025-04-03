import { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Photography from "./pages/Photography";

function App() {
  return (
    <main className="min-h-screen">
      <header className="flex px-4 py-8">
        <div className="grow">
          <Link
            to="/"
            className="text-white text-4xl sm:text-6xl font-boldonse"
          >
            CHARLIE FREY
          </Link>
        </div>
        <div className="flex space-x-4 text-white text-4xl">
          <div className="h-full flex flex-col justify-center">
            <a href="https://www.instagram.com/thatsveryvalid" target="_blank">
              <FaInstagram />
            </a>
          </div>
          <div className="h-full flex flex-col justify-center">
            <a href="https://www.linkedin.com/in/csfrey95" target="_blank">
              <FaLinkedin />
            </a>
          </div>
          <div className="h-full flex flex-col justify-center">
            <a href="https://github.com/csfrey" target="_blank">
              <FaGithub />
            </a>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photography" element={<Photography />} />
      </Routes>
    </main>
  );
}

export default App;
