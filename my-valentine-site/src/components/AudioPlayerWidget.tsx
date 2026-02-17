
import { motion } from 'framer-motion';

// ADDED: progress property to our interface
interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  progress: number; 
}

export default function AudioPlayerWidget({ isPlaying, onToggle, progress }: AudioPlayerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="flex flex-col bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-xl border-2 border-white max-w-sm w-full mx-auto"
    >
      <div className="flex items-center gap-4 w-full">
        {/* Album Art / Icon */}
        <motion.div 
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-val-pink)] to-[var(--color-val-peach)] flex items-center justify-center shadow-inner flex-shrink-0 border-4 border-white"
        >
          <span className="text-2xl">💖</span>
        </motion.div>

        {/* Track Info */}
        <div className="flex-1 text-left">
          <h4 className="font-montserrat font-bold text-[var(--color-val-pink)] text-lg leading-tight">
            Our Song
          </h4>
          <p className="font-lora text-sm text-gray-500 font-medium">You & Me</p>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={onToggle}
          className="w-14 h-14 rounded-full bg-[var(--color-val-coral)] text-white flex items-center justify-center hover:bg-[var(--color-val-pink)] transition-colors shadow-lg flex-shrink-0"
        >
          {isPlaying ? (
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
      </div>

      {/* Real-Time Progress Bar */}
      <div className="w-full bg-[var(--color-val-cream)] rounded-full h-1.5 mt-4 overflow-hidden shadow-inner">
        <div 
          className="bg-[var(--color-val-pink)] h-1.5 rounded-full"
          // We removed the Framer Motion animation and replaced it with a direct style binding to the real progress percentage!
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        />
      </div>
    </motion.div>
  );
}