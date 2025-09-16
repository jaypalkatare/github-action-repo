const ShootingStarEffect = () => {
  const createShootingStar = (e) => {
    if (e.target === e.currentTarget) {
      // Create 6 stars in different directions
      for (let i = 0; i < 6; i++) {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        // Position at click point
        star.style.left = `${e.clientX}px`;
        star.style.top = `${e.clientY}px`;
        // Set random rotation for direction
        star.style.transform = `rotate(${i * 60}deg)`;
        document.body.appendChild(star);

        // Remove after animation
        setTimeout(() => {
          star.remove();
        }, 300);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-auto z-0"
      onClick={createShootingStar}
    />
  );
};

export default ShootingStarEffect;
