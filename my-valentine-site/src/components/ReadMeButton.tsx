import { motion } from 'framer-motion';

interface ReadMeButtonProps {
  onClick: () => void;
}

export default function ReadMeButton({ onClick }: ReadMeButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      onClick={onClick}
      className="mt-8 px-8 py-3 bg-[var(--color-val-pink)] text-white text-lg font-bold rounded-full shadow-lg hover:bg-[var(--color-val-coral)] transition-colors"
    >
      Read Me 💌
    </motion.button>
  );
}