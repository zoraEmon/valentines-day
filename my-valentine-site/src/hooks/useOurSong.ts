import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';

// Import the song directly
import songFile from '/Di_Ako_Mawawala.mp3'; 

const bgMusic = new Howl({
  src: [songFile],
  volume: 0.6,
  loop: true,
  html5: true, 
});

export function useOurSong() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // <-- NEW: Track the song's progress percentage
  const animationRef = useRef<number | null>(null);

  // This function runs continuously while the song is playing to update the progress bar
  const updateProgress = () => {
    if (bgMusic.playing()) {
      const currentSeek = bgMusic.seek() as number;
      const totalDuration = bgMusic.duration();
      
      if (totalDuration > 0) {
        setProgress((currentSeek / totalDuration) * 100);
      }
      // Ask the browser to run this again on the next frame for a buttery smooth bar
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      bgMusic.pause();
      // Stop updating the progress bar when paused
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    } else {
      bgMusic.play();
      // Start updating the progress bar when playing
      animationRef.current = requestAnimationFrame(updateProgress);
    }
    setIsPlaying(!isPlaying);
  };

  // Cleanup when the component unmounts
  useEffect(() => {
    return () => {
      bgMusic.unload();
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Return the progress so our widget can use it!
  return { isPlaying, toggleMusic, progress };
}