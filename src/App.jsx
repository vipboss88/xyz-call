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

const TransactionNotification = ({ amount, address }) => (
  <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 
                  animate-slide-up opacity-0 mb-2 max-w-[300px] transition-all duration-300">
    <div className="bg-green-500 rounded-full p-2 mr-3">
      <span className="text-white text-sm">✓</span>
    </div>
    <div className="flex-1">
      <p className="text-white text-sm font-semibold">
        {amount} SOL withdrawn
      </p>
      <p className="text-white text-xs opacity-75 truncate">
        {address}
      </p>
    </div>
  </div>
);// Main App component
export default function App() {
  const [isAddressTooltip, setIsAddressTooltip] = useState(false);
  const [scale, setScale] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const tonAddress = 'https://pump.fun/coin/Ft2gVKV65S9G5wUz5BqduTGajBMsdivQf4iQfMr7pump';

  // Original animation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setScale(prev => prev === 1 ? 1.1 : 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Random Solana address generator
  const generateSolanaAddress = () => {
    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let address = '';
    for (let i = 0; i < 32; i++) {
      address += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return address;
  };

  // Add random transactions
  useEffect(() => {
    const addTransaction = () => {
      const newTransaction = {
        id: Date.now(),
        amount: (Math.random() * 10).toFixed(2),
        address: generateSolanaAddress(),
      };

      setTransactions(prev => [newTransaction, ...prev].slice(0, 5));

      // Remove transaction after animation
      setTimeout(() => {
        setTransactions(prev => prev.filter(t => t.id !== newTransaction.id));
      }, 5000);
    };

    const interval = setInterval(addTransaction, 3000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tonAddress);
    setIsAddressTooltip(true);
    setTimeout(() => setIsAddressTooltip(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-500 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Original floating emojis code... */}
      {['🎵', '💫', '🌟', '✨', '🎶'].map((emoji, i) => (
        <FloatingEmoji key={i} emoji={emoji} delay={i * 0.5} />
      ))}
      
      {/* Main content... */}
      <div className="text-center relative w-full max-w-lg px-4">
        <div className="animate-spin text-5xl md:text-8xl mb-4 md:mb-6 inline-block">📞</div>
        
        <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 md:mb-12 animate-bounce"
            style={{
              textShadow: '2px 2px 0 #FF61D8, 4px 4px 0 #6B8AFF',
              transform: `scale(${scale})`,
              transition: 'transform 0.3s ease'
            }}>
          Nigga on Call!
        </h1>
        
        <a href="tel:+1234567890"
           className="inline-block px-8 py-4 md:px-16 md:py-8 text-2xl md:text-4xl font-bold text-white 
                    bg-gradient-to-r from-pink-500 to-yellow-500 
                    rounded-full shadow-lg hover:shadow-2xl 
                    hover:scale-105 md:hover:scale-110 transform transition-all duration-300 
                    animate-pulse mb-8 md:mb-12">
          CALL NOW! 🎵
        </a>
      </div>

      {/* Donation section... */}
      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl p-4 md:p-8 
                      w-full max-w-[90%] md:max-w-md hover:bg-opacity-30 transition-all duration-300 
                      transform hover:scale-102 md:hover:scale-105">
        <p className="text-xl md:text-2xl text-white mb-4 md:mb-6 animate-bounce">
          🎁 Support Us! 🎁
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
          Click to copy pump address 📋✨
        </p>
      </div>

      {/* Transaction notifications */}
      <div className="fixed bottom-4 left-4 space-y-2">
        {transactions.map(tx => (
          <TransactionNotification
            key={tx.id}
            amount={tx.amount}
            address={tx.address}
          />
        ))}
      </div>
    </div>
  );
}