import confetti from "canvas-confetti";
import { Howl } from "howler";

import soundEffect1 from "../assets/audio/click_effect.wav";

// --- Object for the tap sound effect ---
const tapSound = new Howl({
    src: [soundEffect1],
    volume: 0.5,
});

export const playTapSound = () => {
    tapSound.play();
}

export const triggerConfetti = (x: number, y: number, isFinale: boolean) => {
    if (isFinale) {
    // The big burst on the 3rd tap
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { x, y },
      colors: ['#F57799', '#FB9B8F', '#FDC3A1', '#FFF7CD'],
      scalar: 1.2,
    });
    } else {
    // Smaller bursts on the 1st and 2nd taps
    confetti({
        particleCount: 20,
        spread: 60,
        origin: { x, y },
        colors: ['#F57799', '#FB9B8F', '#FFF7CD'], // Using your Pink, Coral, and Cream hex codes
        scalar: 0.8,
    });
    }
}
