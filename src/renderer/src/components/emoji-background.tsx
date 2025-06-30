import React from 'react'

export interface EmojiBackgroundProps {
  emojis: string[]
  count?: number
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

const DEFAULT_COUNT = 18

const EmojiBackground: React.FC<EmojiBackgroundProps> = ({ emojis, count = DEFAULT_COUNT }) => {
  const emojiList = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = (i + 0.5) * (100 / count) + randomBetween(-2, 2)
      const top = randomBetween(-10, -20)
      const size = randomBetween(16, 48)
      const duration = randomBetween(8, 24)
      const delay = randomBetween(0, 8)
      const emoji = emojis[i % emojis.length]
      return { left, top, size, duration, delay, emoji }
    })
  }, [emojis, count])

  return (
    <div
      className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden"
      aria-hidden="true"
    >
      {emojiList.map((item, idx) => (
        <span
          key={idx}
          className="absolute select-none pointer-events-none"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            fontSize: item.size,
            opacity: 0.7,
            filter: 'blur(0.5px)',
            animation: `emoji-fall ${item.duration}s linear ${item.delay}s infinite`
          }}
        >
          {item.emoji}
        </span>
      ))}
      <style>{`
        @keyframes emoji-fall {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(100vh) scale(1.1) rotate(20deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default EmojiBackground
