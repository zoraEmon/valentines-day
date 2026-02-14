import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import envelopeAnimation from '../assets/graphics/love-letter/animations/12345.json';

// Import our new chunks
import { playTapSound, triggerConfetti } from '../utils/interactions';
import EnvelopeBadge from './EnvelopeBadge';
import ReadMeButton from './ReadMeButton';

interface EnvelopeProps {
  onOpenComplete: () => void;
}

export default function Envelope({ onOpenComplete }: EnvelopeProps) {
  const [tapCount, setTapCount] = useState(0);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const controls = useAnimation();

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tapCount >= 3) return; 

    const nextCount = tapCount + 1;
    setTapCount(nextCount);
    playTapSound();

    // Get exact cursor coordinates
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    if (nextCount < 3) {
      triggerConfetti(x, y, false);
      
      // Shake animation
      const intensity = nextCount * 10;
      controls.start({
        x: [0, -intensity, intensity, -intensity, intensity, 0],
        transition: { duration: 0.3 }
      });
    } else {
      triggerConfetti(x, y, true);
      lottieRef.current?.play(); // Play the Lottie file!
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div 
        animate={controls}
        onClick={handleTap}
        className="cursor-pointer relative w-80 h-80"
      >
        <Lottie 
          lottieRef={lottieRef}
          animationData={envelopeAnimation}
          autoplay={false} 
          loop={false}     
          className="w-full h-full pointer-events-none transform origin-center scale-[3]" 
        />
        
        <EnvelopeBadge tapCount={tapCount} />
      </motion.div>

      {tapCount === 3 && <ReadMeButton onClick={onOpenComplete} />}
    </div>
  );
}