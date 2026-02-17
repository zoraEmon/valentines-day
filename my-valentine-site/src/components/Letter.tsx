import { motion } from 'framer-motion';
import letterData from '../assets/data/letterContent.json';

interface LetterSection {
  id: number;
  heading: string;
  text: string;
  images: string[];
}

const typedLetterData: LetterSection[] = letterData;

export default function Letter() {
  return (
    <div className="flex flex-col items-center w-full pb-32 overflow-x-hidden">
      
      {typedLetterData.map((section) => (
        <div 
          key={section.id} 
          // Flexbox is much more stable here. 
          // flex-col on mobile (stacked), flex-row on desktop (side-by-side)
          className="max-w-5xl mx-auto w-full flex flex-col md:flex-row gap-12 md:gap-20 items-center justify-center min-h-[60vh] my-20 px-6 md:px-12"
        >
          
          {/* ==========================================
              LEFT SIDE: THE 200x200 PICTURES
              flex-shrink-0 ensures the image never gets squished by the text
          ========================================== */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            // If there are multiple images, they will wrap nicely side-by-side
            className="flex-shrink-0 flex flex-wrap justify-center gap-6"
          >
            {section.images.map((imgSrc, imgIndex) => (
              <motion.img
                key={imgIndex}
                src={imgSrc}
                alt={`Memory ${section.id}-${imgIndex}`}
                // STRICT SIZING: Exactly 200px by 200px as requested!
                className="w-[300px] h-[300px] object-cover rounded-xl shadow-lg border-[8px] border-white bg-white"
                whileHover={{ 
                  scale: 1.05, 
                  rotate: imgIndex % 2 === 0 ? -3 : 3 
                }}
              />
            ))}
          </motion.div>

          {/* Text side! The flex-1 ensures it takes up all the remaining space and doesn't get squished by the images. */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            // flex-1 fixes the text squishing issue!
            className="flex-1 flex flex-col justify-center text-center md:text-left"
          >
            {section.heading && (
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[var(--color-val-pink)] mb-4 leading-tight">
                {section.heading}
              </h2>
            )}

            <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
              {section.text}
            </p>
          </motion.div>

        </div>
      ))}
      
    </div>
  );
}