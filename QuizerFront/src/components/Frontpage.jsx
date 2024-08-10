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
      <div className="fixed w-full h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 flex items-center justify-center">
        <div className="absolute z-[2] text-8xl transform -translate-x-1/2 -translate-y-1/2 tracking-tighter leading-none top-[15%] left-1/2 text-white font-bold drop-shadow-lg">
          Quizer
        </div>
       
        <div className="fixed top-1/3 flex gap-10 text-center justify-center items-center">
          {["Time and Work", "Permutations and Combinations"].map((item, index) => (
            <div
              key={index}
              className={`py-6 px-8 bg-white bg-opacity-70 rounded-lg shadow-xl text-zinc-900 text-lg font-medium transform hover:scale-105 sm:text-3xl transition-transform duration-300 cursor-pointer ${
                type === item ? "bg-opacity-100 border border-yellow-500" : ""
              }`}
              onClick={() => setType(item)}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="fixed top-1/2 flex gap-10 text-center justify-center items-center">
          {["Activity 1", "Activity 2"].map((item, index) => (
            <div
              key={index}
              className={`py-6 px-8 bg-white bg-opacity-70 rounded-lg shadow-xl text-zinc-900 text-lg font-medium transform hover:scale-105 sm:text-3xl transition-transform duration-300 cursor-pointer ${
                activity === item ? "bg-opacity-100 border border-yellow-500" : ""
              }`}
              onClick={() => setActivity(item)}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="fixed bottom-10 w-full flex justify-center">
          <button
            className={`bg-green-500 hover:bg-green-700 text-white text-3xl py-4 px-10 rounded-lg shadow-lg transition-transform transform hover:scale-105 active:scale-95 ${
              !type || !activity ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleStart}
            disabled={!type || !activity}
          >
            Start
          </button>
        </div>
      </div>
    </>
  );
}

export default Frontpage;
