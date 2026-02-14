
interface EnvelopeBadgeProps {
  tapCount: number;
}

export default function EnvelopeBadge({ tapCount }: EnvelopeBadgeProps) {
  // Hide the badge if the envelope is fully open, or hasn't been tapped yet
  if (tapCount === 0 || tapCount >= 3) return null;

  return (
    <span className="absolute top-4 right-4 bg-[var(--color-val-pink)] text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
      {tapCount}/3
    </span>
  );
}