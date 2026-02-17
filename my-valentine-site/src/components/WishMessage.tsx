import { motion } from 'framer-motion';

export default function FinalMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="text-center px-6 max-w-3xl mx-auto mb-10"
    >
      <h2 className="text-5xl md:text-7xl font-montserrat font-bold text-[var(--color-val-pink)] mb-6 drop-shadow-sm">
        For You, My Love 💐
      </h2>
      <p className="text-xl md:text-3xl text-gray-800 font-lora leading-relaxed">
        Thank you for being the most amazing part of my life. I love you more than words could ever say. Happy Valentine's Day, Love Love ko!
      </p>
    </motion.div>
  );
}