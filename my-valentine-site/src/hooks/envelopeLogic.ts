// src/hooks/useEnvelopeLogic.ts
import { useState, useRef } from 'react';
import { useAnimation } from 'framer-motion';
import { type LottieRefCurrentProps } from 'lottie-react';

// Import our side-effects from the utils we made earlier
import { playTapSound, triggerConfetti } from '../utils/interactions.ts';

export function useEnvelopeLogic() {
  // 1. Manage State & Refs
  const [tapCount, setTapCount] = useState(0);
  const controls = useAnimation();
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  // 2. The Core Interaction Logic
  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tapCount >= 3) return; // Stop listening if already open

    const nextCount = tapCount + 1;
    setTapCount(nextCount);
    playTapSound();

    // Calculate cursor position for confetti
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    if (nextCount < 3) {
      // Tap 1 & 2: Shake and small confetti
      triggerConfetti(x, y, false);
      
      const intensity = nextCount * 10;
      controls.start({
        x: [0, -intensity, intensity, -intensity, intensity, 0],
        transition: { duration: 0.3 }
      });
    } else {
      // Tap 3: Finale confetti and play Lottie
      triggerConfetti(x, y, true);
      lottieRef.current?.play(); 
    }
  };

  // 3. Return only what the UI needs to function
  return {
    tapCount,
    controls,
    lottieRef,
    handleTap
  };
}