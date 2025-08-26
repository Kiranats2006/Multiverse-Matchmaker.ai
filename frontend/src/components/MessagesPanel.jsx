// MessagesPanel.jsx - Updated with improved UI
import React, { useState, useEffect } from "react";

function MessagesPanel({ username, selectedHero, setSelectedHero, matches }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Load messages for selected hero
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedHero) return;
      
      try {
        const res = await fetch(`http://localhost:8080/api/matches/messages/${username}/${selectedHero}`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data.messages || []);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    
    fetchMessages();
  }, [selectedHero, username]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() || !selectedHero) return;

    try {
      const res = await fetch("http://localhost:8080/api/matches/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, hero: selectedHero, sender: username, text }),
      });
      
      if (res.ok) {
        const updated = await res.json();
        setMessages(updated.messages || []);
        setText("");
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400 text-center" style={{ fontFamily: "'Bangers', cursive" }}>
        YOUR MESSAGES
      </h2>
      
      <div className="flex flex-1 min-h-[400px]">
        {/* Matches list */}
        <div className="w-1/3 border-r border-red-600 p-3 overflow-y-auto">
          <h3 className="text-lg font-bold mb-3 text-white">Your Matches</h3>
          {matches.length > 0 ? (
            <div className="space-y-2">
              {matches.map((match, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedHero(match.hero)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedHero === match.hero 
                      ? "bg-yellow-500 text-black" 
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <div className="font-bold">{match.hero}</div>
                  {match.lastMessage && (
                    <div className="text-sm truncate opacity-75">
                      {match.lastMessage.text}
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">No matches yet. Start swiping to find your heroes!</p>
          )}
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedHero ? (
            <>
              <div className="p-3 border-b border-red-600 bg-gray-800">
                <h3 className="text-lg font-bold text-yellow-400">Chat with {selectedHero}</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 bg-gray-900 bg-opacity-50">
                {messages.length > 0 ? (
                  messages.map((message, i) => (
                    <div 
                      key={i} 
                      className={`mb-4 flex ${message.sender === username ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          message.sender === username 
                            ? "bg-blue-600 text-white" 
                            : "bg-gray-700 text-white"
                        }`}
                      >
                        <div className="text-sm font-semibold mb-1">
                          {message.sender === username ? "You" : selectedHero}
                        </div>
                        <div>{message.text}</div>
                        <div className="text-xs opacity-70 mt-1 text-right">
                          {new Date(message.timestamp || Date.now()).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 mt-10">
                    Start a conversation with {selectedHero}
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={sendMessage} className="p-3 border-t border-red-600 bg-gray-800">
                <div className="flex">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 p-3 rounded-l-lg bg-gray-700 text-white"
                    placeholder="Type your message..."
                  />
                  <button 
                    type="submit" 
                    className="px-4 bg-red-600 rounded-r-lg hover:bg-red-500 disabled:opacity-50"
                    disabled={!text.trim()}
                  >
                    Send
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a hero to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessagesPanel;