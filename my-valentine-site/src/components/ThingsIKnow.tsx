import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';


import 'swiper/css';

import 'swiper/css/navigation';

import 'swiper/css/effect-fade';

import factsData from '../assets/data/aboutYouContent.json';
import cuteBear from '../assets/graphics/cute-bear.webp';

interface Fact {
  id: number;
  icon: string;
  title: string; 
  fact: string;
  image: string;
}

const typedFacts: Fact[] = factsData;

export default function ThingsIKnow() {
  return (
    // Reduced outer padding so the massive carousel has room to breathe
    <div
      className="w-full py-8 md:py-12 relative flex justify-center bg-cover bg-center bg-fixed bg-no-repeat bg-black/80 bg-blend-overlay"
      style={{ backgroundImage: `url(${cuteBear})` }}
    >
       
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        // FIX 1: Removed max-w-6xl. Now it takes up 96% of the screen width (up to 1800px)
        className="w-[96%] max-w-[1800px] relative"
      >
        <Swiper
          modules={[Navigation, EffectFade, Autoplay]}
          effect={'fade'}
          speed={1000}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          // FIX 2: Massive height increase! 85vh makes it take almost the whole monitor height.
          className="h-[80vh] md:h-[88vh] min-h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl"
          style={{
            '--swiper-navigation-color': 'var(--color-val-cream)',
            '--swiper-navigation-size': '28px',
          } as React.CSSProperties}
        >
          {typedFacts.map((item) => (
            <SwiperSlide key={item.id} className="relative h-full w-full bg-black">
              
              {/* THE BACKGROUND IMAGE */}
              <img 
                src={item.image} 
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
               />

              {/* THE DARK GRADIENT OVERLAY */}
              {/* Made the gradient slightly taller to accommodate the massive height */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />

              {/* THE CONTENT CONTAINER */}
              {/* FIX 3: Increased padding significantly so text doesn't hug the edges of huge screens */}
              <div className="absolute inset-0 z-10 px-12 md:px-32 py-16 md:py-24 flex flex-col justify-center">
                <div className="max-w-4xl"> {/* Increased max-width for the text box */}
                  
                  {/* Eyebrow Text */}
                  <p className="text-xl md:text-2xl text-[var(--color-val-coral)] font-montserrat tracking-[0.2em] uppercase font-extrabold mb-6 drop-shadow-md">
                    Things I Know
                  </p>
                  
                  {/* FIX 4: Scaled up the Title for Desktop (md:text-8xl) */}
                  <h3 className="text-6xl md:text-8xl font-montserrat font-black text-[var(--color-val-pink)] mb-8 leading-tight drop-shadow-xl">
                    {item.title}
                  </h3>
                  
                  {/* FIX 5: Scaled up the Fact Text for readability on large screens */}
                  <p className="text-2xl md:text-3xl text-[var(--color-val-cream)] font-lora leading-relaxed opacity-90 drop-shadow-md">
                    {item.fact}
                  </p>
                </div>
              </div>

              {/* THE GIANT ICON (Bottom Right) */}
              {/* Scaled the icon up to be even more massive on desktop */}
              <div className="absolute bottom-10 right-10 md:bottom-16 md:right-24 z-10 pointer-events-none">
                <span className="text-[7rem] md:text-[14rem] leading-none opacity-20 grayscale brightness-200 drop-shadow-2xl">
                  {item.icon}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Swiper Arrow Styles */}
        <style>
          {`
            .swiper-button-next,
            .swiper-button-prev {
              background-color: rgba(245, 119, 153, 0.4) !important;
              width: 60px !important;
              height: 60px !important;
              border-radius: 50%;
              backdrop-filter: blur(8px);
              transition: all 0.3s ease;
              margin: 0 20px; /* Pushes the arrows slightly inward on huge screens */
            }
            .swiper-button-next:hover,
            .swiper-button-prev:hover {
              background-color: var(--color-val-pink) !important;
              transform: scale(1.1); /* Adds a nice little pop when she hovers */
            }
          `}
        </style>
      </motion.div>
    </div>
  );
}