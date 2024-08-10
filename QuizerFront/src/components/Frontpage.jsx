import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Frontpage() {
  const [type, setType] = useState("");
  const [activity, setActivity] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (type && activity) {
      navigate(`/card?category=${encodeURIComponent(type)}&activity=${encodeURIComponent(activity)}`);
    } else {
      alert("Please select both category and activity.");
    }
  };

  return (
    <>
    <div className="fixed w-full h-screen bg-zinc-950 flex items-center justify-center">
  <div className="absolute z-[2] text-6xl sm:text-8xl transform -translate-x-1/2 -translate-y-1/2 tracking-tighter leading-none top-[10%] sm:top-[15%] left-1/2 text-white font-bold drop-shadow-lg  ">
    Quizer
  </div>

  <div className="fixed top-[30%] sm:top-1/3 flex flex-col items-center gap-8">
    {/* Category Section */}
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-3xl sm:text-4xl font-bold text-yellow-400">Select a Category</h3>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 text-center justify-center items-center">
        {["Time and Work", "Permutations and Combinations"].map((item, index) => (
          <div
            key={index}
            className={`py-4 sm:py-6 px-6 sm:px-8 bg-gray-800 bg-opacity-70 rounded-lg shadow-2xl text-white text-lg font-medium transform hover:scale-105 transition-transform duration-300 cursor-pointer ${
              type === item ? "bg-opacity-100 border border-yellow-500" : ""
            }`}
            onClick={() => setType(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>

    
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-3xl sm:text-4xl font-bold text-yellow-400">Select an Activity</h3>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 text-center justify-center items-center">
        {["Activity 1", "Activity 2"].map((item, index) => (
          <div
            key={index}
            className={`py-4 sm:py-6 px-6 sm:px-8 bg-gray-800 bg-opacity-70 rounded-lg shadow-2xl text-white text-lg font-medium transform hover:scale-105 transition-transform duration-300 cursor-pointer ${
              activity === item ? "bg-opacity-100 border border-yellow-500" : ""
            }`}
            onClick={() => setActivity(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>

  <div className="fixed bottom-10 w-full flex justify-center items-center">
  <div className="relative inline-flex group">
    <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-lg blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
    <button
      className={`relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transform hover:scale-105 active:scale-95 ${
        !type || !activity ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleStart}
      disabled={!type || !activity}
    >
      Start
    </button>
  </div>
</div>

</div>

    </>
  );
}

export default Frontpage;
