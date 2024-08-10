import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Frontpage from "./components/Frontpage";
import Card from "./components/Card";
function App() {
  return (
    <div className="bg-zinc-100 w-full h-screen">

    <Router>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/card" element={<Card />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
