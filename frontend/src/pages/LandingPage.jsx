import { useState } from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  // Generate random spiderweb data
  const generateRandomWeb = (numRadials = 8, numRings = 4) => {
    const radials = [];
    const rings = [];
    
    // Random radial lines
    for (let i = 0; i < numRadials; i++) {
      const angle = (i * 360 / numRadials) + (Math.random() - 0.5) * 25;
      const length = 70 + Math.random() * 20;
      const x2 = 100 + Math.cos(angle * Math.PI / 180) * length;
      const y2 = 100 + Math.sin(angle * Math.PI / 180) * length;
      radials.push({ x2, y2, angle });
    }
    
    // Random concentric shapes
    for (let ring = 1; ring <= numRings; ring++) {
      const baseRadius = ring * 18;
      const points = [];
      
      for (let i = 0; i < numRadials; i++) {
        const angle = radials[i].angle * Math.PI / 180;
        const radius = baseRadius + (Math.random() - 0.5) * 12;
        const x = 100 + Math.cos(angle) * radius;
        const y = 100 + Math.sin(angle) * radius;
        points.push({ x, y });
      }
      rings.push(points);
    }
    
    return { radials, rings };
  };

  const [web1] = useState(() => generateRandomWeb(10, 5));
  const [web2] = useState(() => generateRandomWeb(12, 4));
  const [web3] = useState(() => generateRandomWeb(14, 6));

  const renderWeb = (webData, opacity = 1) => {
    return (
      <g stroke="#ef4444" strokeWidth="1" fill="none" opacity={opacity}>
        {webData.radials.map((radial, i) => (
          <line key={`radial-${i}`} x1="100" y1="100" x2={radial.x2} y2={radial.y2} />
        ))}
        {webData.rings.map((ring, ringIndex) => (
          <path
            key={`ring-${ringIndex}`}
            d={`M ${ring[0].x} ${ring[0].y} ${ring.map(point => `L ${point.x} ${point.y}`).join(' ')} Z`}
          />
        ))}
        {webData.rings.map((ring, ringIndex) => 
          ring.slice(0, Math.floor(Math.random() * 2) + 1).map((point, i) => (
            <circle
              key={`droplet-${ringIndex}-${i}`}
              cx={point.x + (Math.random() - 0.5) * 4}
              cy={point.y + (Math.random() - 0.5) * 4}
              r={Math.random() * 1.5 + 0.5}
              fill="#ef4444"
              opacity="0.7"
            />
          ))
        )}
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden font-sans">
      {/* Add this to your index.css or global CSS */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
        .comic-font {
          font-family: 'Bangers', cursive;
          letter-spacing: 1px;
        }
      `}</style>

      {/* Spiderweb background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-15 pointer-events-none">
        <svg className="absolute top-20 left-20 w-64 h-64" viewBox="0 0 200 200">
          {renderWeb(web1)}
        </svg>
        <svg className="absolute bottom-10 right-10 w-80 h-80" viewBox="0 0 200 200">
          {renderWeb(web2)}
        </svg>
        <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96" viewBox="0 0 200 200">
          {renderWeb(web3, 0.4)}
        </svg>
        <svg className="absolute top-1/4 right-32 w-32 h-32" viewBox="0 0 200 200">
          {renderWeb(generateRandomWeb(6, 3), 0.6)}
        </svg>
        <svg className="absolute bottom-1/4 left-32 w-48 h-48" viewBox="0 0 200 200">
          {renderWeb(generateRandomWeb(8, 4), 0.5)}
        </svg>
      </div>

      {/* Slanted Header */}
      <header className="relative z-10 bg-black bg-opacity-80 py-6 border-b-4 border-red-600 transform -skew-y-1 origin-top-left">
        <div className="container mx-auto px-4 transform skew-y-1">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white comic-font" style={{ textShadow: '3px 3px 0 #000' }}>
              MULTIVERSE MATCHMAKER
            </h1>
            <p className="text-lg md:text-xl text-gray-300 comic-font">
              Swipe through Marvel's Multiverse. Chat with your destiny.
            </p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="bg-black bg-opacity-70 border-4 border-yellow-500 rounded-xl p-8 shadow-xl max-w-4xl mx-auto mb-12 transform rotate-1">
          <div className="transform -rotate-1">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-yellow-300 comic-font" style={{ textShadow: '2px 2px 0 #000' }}>
              DISCOVER YOUR MULTIVERSE SELF
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              Ever wondered what you'd be like in different universes? Our AI creates infinite versions of YOU across the multiverse, then matches you with iconic Marvel characters who actually chat back!
            </p>
            <Link to="/register" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-105 border-4 border-red-800 shadow-lg comic-font">
              START YOUR JOURNEY
            </Link>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-black bg-opacity-70 border-4 border-blue-500 rounded-xl p-8 shadow-xl mb-12 transform -rotate-1">
          <div className="transform rotate-1">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-300 comic-font" style={{ textShadow: '2px 2px 0 #000' }}>
              HOW IT WORKS
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: 1,
                  title: "DESCRIBE YOURSELF",
                  desc: "Tell our AI about your personality, interests, and dreams. The more details, the better your multiverse matches!",
                  bg: "bg-red-800",
                  emoji: "🕷️"
                },
                {
                  step: 2,
                  title: "GET MATCHED",
                  desc: "Our AI generates alternate universe versions of you and pairs you with compatible Marvel characters across dimensions.",
                  bg: "bg-blue-800",
                  emoji: "🌀"
                },
                {
                  step: 3,
                  title: "CHAT & EXPLORE",
                  desc: "Have real conversations with Marvel characters! Swipe through universes and discover infinite possibilities.",
                  bg: "bg-green-800",
                  emoji: "💬"
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-800 border-2 border-yellow-400 rounded-lg p-6 hover:scale-105 transition-transform duration-300">
                  <div className={`h-20 ${item.bg} mb-4 flex items-center justify-center rounded`}>
                    <span className="text-4xl comic-font">{item.step}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-yellow-300 comic-font">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Character Showcase */}
        <div className="bg-black bg-opacity-70 border-4 border-green-500 rounded-xl p-8 shadow-xl mb-12 transform rotate-1">
          <div className="transform -rotate-1">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-300 comic-font" style={{ textShadow: '2px 2px 0 #000' }}>
              MEET YOUR MATCHES
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  name: "SCARLET WITCH",
                  quote: "\"Reality is whatever I want it to be...\"",
                  bg: "bg-red-800",
                  emoji: "🔮",
                  compatibility: "94%"
                },
                {
                  name: "LOKI",
                  quote: "\"I am burdened with glorious purpose...\"",
                  bg: "bg-green-800",
                  emoji: "🐍",
                  compatibility: "87%"
                },
                {
                  name: "SPIDER-MAN",
                  quote: "\"With great power comes great responsibility...\"",
                  bg: "bg-blue-800",
                  emoji: "🕸️",
                  compatibility: "92%"
                }
              ].map((character, index) => (
                <div key={index} className="bg-gray-800 border-2 border-gray-600 rounded-lg p-5 hover:scale-105 transition-transform duration-300">
                  <div className={`h-24 ${character.bg} mb-3 flex items-center justify-center rounded`}>
                    <span className="text-4xl">{character.emoji}</span>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2 text-white comic-font">
                    {character.name}
                  </h3>
                  <p className="text-sm text-gray-400 text-center mb-2 italic">{character.quote}</p>
                  <div className="text-yellow-400 text-sm text-center comic-font">
                    COMPATIBILITY: {character.compatibility}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <p className="text-lg text-gray-300 comic-font">
                And many more across infinite universes!
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-black bg-opacity-80 border-4 border-red-600 rounded-xl p-12 shadow-2xl max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-red-400 text-center comic-font" style={{ textShadow: '3px 3px 0 #000' }}>
            YOUR MULTIVERSE AWAITS
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto text-center">
            Ready to discover infinite versions of yourself and chat with Marvel's greatest heroes and villains?
          </p>
          <div className="text-center space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center">
            <Link 
              to="/register" 
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-105 border-4 border-red-800 shadow-lg hover:shadow-red-500/50 comic-font"
            >
              START SWIPING
            </Link>
            <Link 
              to="/register" 
              className="inline-block bg-gray-700 hover:bg-gray-600 border-4 border-gray-500 hover:border-white text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-105 comic-font"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </main>

      {/* Slanted Footer */}
      <footer className="relative z-10 bg-black bg-opacity-80 py-8 border-t-4 border-red-600 mt-12 transform skew-y-1 origin-bottom-left">
        <div className="container mx-auto px-4 text-center transform -skew-y-1">
          <p className="text-xl mb-2 text-white comic-font" style={{ textShadow: '2px 2px 0 #000' }}>
            YOUR JOURNEY THROUGH THE MULTIVERSE AWAITS
          </p>
          <p className="text-sm text-gray-400 comic-font">© {new Date().getFullYear()} MULTIVERSE MATCHMAKER</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;