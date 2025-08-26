// Dashboard.jsx - Updated with improved UI
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import GenerateProfiles from "../components/GenerateProfiles";
import MessagesPanel from "../components/MessagesPanel";

function Dashboard() {
  const username = localStorage.getItem("username") || "Hero";
  const navigate = useNavigate();
  const [selectedHero, setSelectedHero] = useState(null);
  const [showMatchPopup, setShowMatchPopup] = useState(null);
  const [activeSection, setActiveSection] = useState('discover');
  const [matches, setMatches] = useState([]);

  // Fetch user's matches
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/matches/${username}`);
        if (response.ok) {
          const data = await response.json();
          setMatches(data);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };
    
    fetchMatches();
  }, [username, showMatchPopup]);

  // Handle swipe right - create match
  const handleSwipeRight = async (heroName) => {
    try {
      const response = await fetch("http://localhost:8080/api/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, hero: heroName }),
      });

      if (response.ok) {
        setShowMatchPopup(heroName);
        // Refresh matches list
        const matchesResponse = await fetch(`http://localhost:8080/api/matches/${username}`);
        if (matchesResponse.ok) {
          const data = await matchesResponse.json();
          setMatches(data);
        }
      }
    } catch (error) {
      console.error("Error creating match:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Spiderweb background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 border-2 border-red-500 rounded-full" 
             style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 30%, 30% 100%, 0% 100%)' }}></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 border-2 border-red-500 rounded-full" 
             style={{ clipPath: 'polygon(70% 0%, 100% 30%, 100% 100%, 0% 100%, 0% 70%)' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-red-500 rounded-full opacity-50"
             style={{ clipPath: 'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)' }}></div>
      </div>

      {/* Header with comic book style */}
      <header className="relative z-10 bg-black bg-opacity-80 py-4 border-b-4 border-red-600">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Bangers', cursive", textShadow: '3px 3px 0 #000' }}>
            MARVEL MULTIVERSE
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-yellow-400 text-lg" style={{ fontFamily: "'Bangers', cursive" }}>
              Welcome, <span className="text-red-400">{username}</span>!
            </div>
            {/* Profile button */}
            <button 
              onClick={() => navigate('/profile')}
              className="w-10 h-10 rounded-full bg-red-600 hover:bg-yellow-500 flex items-center justify-center transition-all"
              title="View Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="relative z-10 container mx-auto px-4 pt-6">
        <div className="flex justify-center space-x-4 border-b-2 border-red-600 pb-2">
          <button 
            onClick={() => setActiveSection('discover')}
            className={`px-6 py-2 rounded-t-lg font-bold ${activeSection === 'discover' ? 'bg-red-600 text-yellow-400' : 'bg-gray-800 text-white hover:bg-red-700'}`}
            style={{ fontFamily: "'Bangers', cursive" }}
          >
            DISCOVER
          </button>
          <button 
            onClick={() => setActiveSection('messages')}
            className={`px-6 py-2 rounded-t-lg font-bold ${activeSection === 'messages' ? 'bg-red-600 text-yellow-400' : 'bg-gray-800 text-white hover:bg-red-700'}`}
            style={{ fontFamily: "'Bangers', cursive" }}
          >
            MESSAGES {matches.length > 0 && <span className="ml-2 bg-yellow-500 text-black rounded-full px-2 py-1 text-xs">{matches.length}</span>}
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-6">
        {activeSection === 'discover' ? (
          <div className="bg-black bg-opacity-70 border-4 border-red-600 rounded-xl p-6 shadow-2xl">
            <GenerateProfiles onSwipeRight={handleSwipeRight} />
          </div>
        ) : (
          <div className="bg-black bg-opacity-70 border-4 border-red-600 rounded-xl p-6 shadow-2xl min-h-[500px]">
            <MessagesPanel 
              username={username} 
              selectedHero={selectedHero} 
              setSelectedHero={setSelectedHero} 
              matches={matches}
            />
          </div>
        )}
      </main>

      {/* Match Popup */}
      {showMatchPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-8 text-center border-4 border-yellow-400">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-yellow-400 mb-4" style={{ fontFamily: "'Bangers', cursive" }}>
              IT'S A MATCH!
            </h2>
            <p className="text-xl text-white mb-6">You and {showMatchPopup} liked each other!</p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => setShowMatchPopup(null)}
                className="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors"
              >
                Continue Swiping
              </button>
              <button 
                onClick={() => {
                  setShowMatchPopup(null);
                  setActiveSection('messages');
                  setSelectedHero(showMatchPopup);
                }}
                className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Message Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 bg-black bg-opacity-80 py-4 border-t-4 border-red-600 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p style={{ fontFamily: "'Bangers', cursive" }}>YOUR JOURNEY THROUGH THE MULTIVERSE AWAITS</p>
          <p className="text-xs mt-2">© {new Date().getFullYear()} MARVEL MULTIVERSE DASHBOARD</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;