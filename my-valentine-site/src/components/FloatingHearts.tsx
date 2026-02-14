import { useEffect, useState } from 'react';

type Heart = {
  id: number;
  x: number; // left in px
  y: number; // top in px
  color: string;
  delay: number;
};

const COLORS = ['#F57799', '#FB9B8F', '#FDC3A1'];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    let idCounter = 1;

    const onPointerDown = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // spawn 3 hearts with tiny horizontal offsets and staggered delays
      const newHearts: Heart[] = [0, 1, 2].map((i) => ({
        id: idCounter++,
        x: x + (i - 1) * 8,
        y,
        color: COLORS[(Math.abs(idCounter + i) % COLORS.length)],
        delay: i * 80,
      }));

      setHearts((prev) => [...prev, ...newHearts]);

      // cleanup hearts after they have flown and are bobbing for a while
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
      }, 20000); // remove after 20s so they appear to float forever for a while
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  return (
    // Fixed container that doesn't block pointer events
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="heart absolute -translate-x-1/2"
          style={{
            left: h.x,
            top: h.y,
            color: h.color,
            animationDelay: `${h.delay}ms, ${h.delay + 1000}ms`,
          }}
          aria-hidden
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21s-7-4.35-9.33-6.63C-0.06 10.8 4.94 6 8.5 8.5 10.4 9.95 12 12 12 12s1.6-2.05 3.5-3.5C19.06 6 24.06 10.8 21.33 14.37 19 16.65 12 21 12 21z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
