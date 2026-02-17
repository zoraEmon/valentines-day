import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import our modular chunks
import AudioPlayerWidget from './AudioPlayerWidget';
import FinalMessage from './WishMessage';
import { useOurSong } from '../hooks/useOurSong';

// 1. IMPORT THE IMAGE DIRECTLY
// Make sure this matches the exact name of the file in your src/assets/ folder
import bouquetImg from '/flower-bouquet.png'; 

export default function Bouquet() {
  // State to track if she has accepted the flower
  const [hasReceivedFlower, setHasReceivedFlower] = useState(false);
  
  // 2. DESTRUCTURE 'progress' FROM OUR HOOK
  const { isPlaying, toggleMusic, progress } = useOurSong();

  const handleReceive = () => {
    setHasReceivedFlower(true);
    // Automatically start playing the song when she receives the flower!
    if (!isPlaying) {
      toggleMusic(); 
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-24 relative overflow-hidden">
      
      {/* THE BOUQUET IMAGE */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: -10 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: 'spring', duration: 1.5, bounce: 0.4 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* 3. USE THE IMPORTED IMAGE VARIABLE HERE */}
        <img 
          src={bouquetImg} 
          alt="A bouquet for you" 
          className="w-72 md:w-[450px] drop-shadow-2xl mb-12"
        />

        {/* AnimatePresence swaps the Button with the Final Message smoothly */}
        <AnimatePresence mode="wait">
          {!hasReceivedFlower ? (
            
            // THE REVEAL BUTTON
            <motion.button
              key="receive-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }} // Soft fade out
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReceive}
              className="px-10 py-4 bg-[var(--color-val-pink)] text-white rounded-full font-montserrat font-bold text-xl md:text-2xl shadow-xl hover:bg-[var(--color-val-coral)] transition-colors border-4 border-white"
            >
              Receive the flower 🌸
            </motion.button>
            
          ) : (
            
            // THE MESSAGE & AUDIO PLAYER (Revealed after click)
            <motion.div
              key="final-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col items-center"
            >
              <FinalMessage />
              {/* 4. PASS THE PROGRESS TO THE WIDGET */}
              <AudioPlayerWidget 
                isPlaying={isPlaying} 
                onToggle={toggleMusic} 
                progress={progress} 
              />
            </motion.div>
            
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}