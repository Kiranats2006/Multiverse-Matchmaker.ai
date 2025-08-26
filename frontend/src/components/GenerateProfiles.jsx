import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import axios from "axios";   // ✅ import axios

const GenerateProfiles = ({ onSwipeRight }) => {   // ✅ accept callback
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastDirection, setLastDirection] = useState(null);
  const [swipeAnimation, setSwipeAnimation] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/profiles/generateProfiles");
        setProfiles(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleSwipe = (direction) => {
    if (currentIndex < profiles.length - 1) {
      if (direction === "right" && onSwipeRight) {
        onSwipeRight(profiles[currentIndex].name);  // ✅ notify parent
      }

      setLastDirection(direction);
      setSwipeAnimation(direction);

      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setSwipeAnimation(null);
      }, 300);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    trackMouse: true,
    preventDefaultScroll: true,
    delta: 10,
  });

  const resetProfiles = () => {
    setCurrentIndex(0);
    setLastDirection(null);
    setSwipeAnimation(null);
  };

  const reloadProfiles = () => {
    window.location.reload();
  };

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <p className="text-white text-xl">Loading profiles...</p>
    </div>
  );

  if (profiles.length === 0) return (
    <div className="flex items-center justify-center h-96">
      <p className="text-white text-xl">No profiles available</p>
    </div>
  );

  if (currentIndex >= profiles.length) return (
    <div className="flex flex-col items-center justify-center h-96">
      <p className="text-white text-xl mb-4">No more profiles!</p>
      <button 
        onClick={resetProfiles}
        className="px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors"
      >
        Reset
      </button>
    </div>
  );

  const currentProfile = profiles[currentIndex];

  const getAnimationClass = () => {
    if (swipeAnimation === "left") return "transform -translate-x-full opacity-0";
    if (swipeAnimation === "right") return "transform translate-x-full opacity-0";
    return "transform translate-x-0 opacity-100";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-900 to-black text-white p-4">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400" style={{ fontFamily: "'Bangers', cursive" }}>
        MARVEL CHARACTER MATCH
      </h1>
      
      <div className="relative w-80 h-96 mb-8">
        <div
          {...swipeHandlers}
          className={`absolute w-full h-full bg-gray-800 rounded-xl p-4 shadow-xl border-2 border-red-600 flex flex-col justify-between cursor-grab active:cursor-grabbing transition-all duration-300 ${getAnimationClass()}`}
        >
          <div className="h-48 bg-red-800 rounded-lg flex items-center justify-center mb-4">
            <span className="text-6xl" style={{ fontFamily: "'Bangers', cursive" }}>⚡</span>
          </div>
          
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-yellow-400" style={{ fontFamily: "'Bangers', cursive" }}>
              {currentProfile.name}
            </h2>
            <p className="text-sm text-gray-300">{currentProfile.age} years old</p>
            <p className="mt-2 text-gray-200">{currentProfile.bio}</p>
          </div>
          
          <div className="flex justify-between mt-4">
            <button 
              onClick={() => handleSwipe("left")}
              className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button 
              onClick={() => handleSwipe("right")}
              className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {lastDirection && (
        <p className="text-xl text-yellow-400 mb-4" style={{ fontFamily: "'Bangers', cursive" }}>
          You swiped {lastDirection}
        </p>
      )}
      
      <p className="text-lg text-gray-400 mb-4">
        Swipe right to like or left to pass
      </p>
      
      <div className="flex space-x-4">
        <button 
          onClick={resetProfiles}
          className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          Reset
        </button>
        <button 
          onClick={reloadProfiles}
          className="px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors"
        >
          New Characters
        </button>
      </div>
    </div>
  );
};

export default GenerateProfiles;
