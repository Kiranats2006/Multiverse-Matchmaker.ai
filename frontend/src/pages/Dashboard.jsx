import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

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
      <header className="relative z-10 bg-black bg-opacity-80 py-6 border-b-4 border-red-600">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold" style={{ fontFamily: "'Bangers', cursive", textShadow: '3px 3px 0 #000' }}>
            MARVEL MULTIVERSE
          </h1>
          <div className="flex items-center gap-6">
            <div className="text-yellow-400 text-xl" style={{ fontFamily: "'Bangers', cursive" }}>
              Welcome, <span className="text-red-400">{username}</span>!
            </div>
            {/* Profile button */}
            <button 
              onClick={() => navigate('/profile')}
              className="w-12 h-12 rounded-full bg-red-600 hover:bg-yellow-500 flex items-center justify-center transition-all"
              title="View Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="bg-black bg-opacity-70 border-4 border-red-600 rounded-xl p-8 shadow-2xl transform rotate-1">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400" style={{ fontFamily: "'Bangers', cursive" }}>
            YOUR HERO DASHBOARD
          </h2>
          
          {/* Comic panels grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-800 border-2 border-yellow-500 rounded-lg p-4 hover:scale-105 transition-transform duration-300">
                <div className="h-40 bg-red-900 mb-3 flex items-center justify-center">
                  <span className="text-5xl" style={{ fontFamily: "'Bangers', cursive" }}>!</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Bangers', cursive" }}>
                  COMIC PANEL {item}
                </h3>
                <p className="text-gray-300">Explore this dimension of your multiverse</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black bg-opacity-80 py-4 border-t-4 border-red-600 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p style={{ fontFamily: "'Bangers', cursive" }}>YOUR JOURNEY THROUGH THE MULTIVERSE AWAITS</p>
          <p className="text-xs mt-2">© {new Date().getFullYear()} MARVEL MULTIVERSE DASHBOARD</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;