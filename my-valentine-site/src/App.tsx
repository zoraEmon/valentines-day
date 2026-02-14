import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Import our components
import Envelope from './components/Envelope';
import FloatingHearts from './components/FloatingHearts';
import Letter from './components/Letter';
import ThingsIKnow from './components/ThingsIKnow'; 

type AppStage = 'envelope' | 'letter';

export default function App() {
  const [stage, setStage] = useState<AppStage>('envelope');

  const handleTransitionToLetter = () => {
    setStage('letter');
  };

  return (
    <main 
      // FIX: We use a dynamic className to change the background based on the stage!
      // bg-cover ensures the image fills the screen. bg-fixed ensures it doesn't move when scrolling.
      className={`min-h-screen overflow-x-hidden font-lora flex flex-col bg-cover bg-center bg-fixed transition-all duration-1000 ${
        stage === 'envelope' 
          ? 'bg-[var(--color-val-peach)]' 
          : 'bg-[url("src/assets/graphics/valentine-ui.jpg")]' // Ensure this matches your file name exactly!
      }`}
    >
      <FloatingHearts />
      
      <AnimatePresence mode="wait">
        
        {stage === 'envelope' && (
          <motion.div
            key="envelope-stage"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="w-full flex-1 flex items-center justify-center min-h-screen"
          >
            <Envelope onOpenComplete={handleTransitionToLetter} />
          </motion.div>
        )}

        {stage === 'letter' && (
          <motion.div
            key="letter-stage"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full"
          >
            <Letter />
            <ThingsIKnow />
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}