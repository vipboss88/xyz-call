import { useState, useEffect } from 'react';

const FloatingEmoji = ({ emoji, delay }) => (
  <div 
    className={`absolute text-2xl md:text-4xl animate-bounce`}
    style={{
      left: `${Math.random() * 90}%`,
      animationDelay: `${delay}s`,
      animationDuration: '3s'
    }}
  >
    {emoji}
  </div>
);

export default function App() {
  const [isAddressTooltip, setIsAddressTooltip] = useState(false);
  const [scale, setScale] = useState(1);
  const tonAddress = 'UQBN7qefNXMFPLObZSqkY9FogFfuQx8a9n8cQ3kVAyrrHPAn';

  useEffect(() => {
    const interval = setInterval(() => {
      setScale(prev => prev === 1 ? 1.1 : 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tonAddress);
    setIsAddressTooltip(true);
    setTimeout(() => setIsAddressTooltip(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-500 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Floating emojis background */}
      {['🎵', '💫', '🌟', '✨', '🎶'].map((emoji, i) => (
        <FloatingEmoji key={i} emoji={emoji} delay={i * 0.5} />
      ))}
      
      {/* Main content */}
      <div className="text-center relative w-full max-w-lg px-4">
        {/* Giant spinning phone emoji */}
        <div className="animate-spin text-5xl md:text-8xl mb-4 md:mb-6 inline-block">📞</div>
        
        {/* Fun bouncy title */}
        <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 md:mb-12 animate-bounce"
            style={{
              textShadow: '2px 2px 0 #FF61D8, 4px 4px 0 #6B8AFF',
              transform: `scale(${scale})`,
              transition: 'transform 0.3s ease'
            }}>
          Nigga on Call!
        </h1>
        
        {/* Big fun call button */}
        <a href="tel:+1234567890"
           className="inline-block px-8 py-4 md:px-16 md:py-8 text-2xl md:text-4xl font-bold text-white 
                    bg-gradient-to-r from-pink-500 to-yellow-500 
                    rounded-full shadow-lg hover:shadow-2xl 
                    hover:scale-105 md:hover:scale-110 transform transition-all duration-300 
                    animate-pulse mb-8 md:mb-12">
          CALL NOW! 🎵
        </a>
      </div>

      {/* Donation section with glass effect */}
      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl p-4 md:p-8 
                      w-full max-w-[90%] md:max-w-md hover:bg-opacity-30 transition-all duration-300 
                      transform hover:scale-102 md:hover:scale-105">
        <p className="text-xl md:text-2xl text-white mb-4 md:mb-6 animate-bounce">
          🎁 Support the Nigga! 🎁
        </p>
        
        <div onClick={copyToClipboard}
             className="bg-white bg-opacity-30 p-4 md:p-6 rounded-2xl cursor-pointer 
                        hover:bg-opacity-40 transition-all duration-300 relative
                        transform hover:scale-102 md:hover:scale-105">
          <p className="font-mono text-sm md:text-lg text-white break-all">
            {tonAddress}
          </p>
          
          {isAddressTooltip && (
            <div className="absolute -top-10 md:-top-12 left-1/2 transform -translate-x-1/2 
                          bg-black text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-lg md:text-xl">
              Copied! ✨
            </div>
          )}
        </div>
        
        <p className="text-lg md:text-xl text-white mt-3 md:mt-4">
          Click to copy TON address 📋✨
        </p>
      </div>
    </div>
  );
}