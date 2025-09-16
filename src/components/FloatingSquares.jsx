'use client';

const SQUARES_CONFIG = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: 20 + ((i * 17) % 50), // Deterministic size between 20-70px
  left: (i * 23) % 100, // Deterministic position
  top: (i * 17) % 100,
  duration: 4 + ((i * 13) % 8), // Deterministic duration between 4-12s
  delay: (i * 7) % 2, // Deterministic delay
  hue: (i * 37) % 360, // Deterministic color
}));

const FloatingSquares = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {SQUARES_CONFIG.map((square) => (
        <div
          key={square.id}
          className="absolute rounded-lg floating-square"
          style={{
            width: `${square.size}px`,
            height: `${square.size}px`,
            left: `${square.left}%`,
            top: `${square.top}%`,
            backgroundColor: `hsla(${square.hue}, 70%, 70%, 0.2)`,
            backdropFilter: 'blur(2px)',
            animationDuration: `${square.duration}s`,
            animationDelay: `${square.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default FloatingSquares;
