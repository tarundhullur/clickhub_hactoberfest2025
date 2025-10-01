function pulseGlow() {
  const button = document.querySelector('.neon-glow-button');
  const text = document.querySelector('.neon-text');
  
  // Add pulse animation class
  button.classList.add('pulse-active');
  
  // Create electric spark effect
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const spark = document.createElement('div');
      spark.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #00ffff;
        border-radius: 50%;
        box-shadow: 0 0 10px #00ffff;
        pointer-events: none;
        z-index: 1000;
        left: ${Math.random() * button.offsetWidth}px;
        top: ${Math.random() * button.offsetHeight}px;
        animation: sparkFade 0.5s ease-out forwards;
      `;
      
      button.appendChild(spark);
      
      setTimeout(() => {
        if (spark.parentNode) {
          spark.parentNode.removeChild(spark);
        }
      }, 500);
    }, i * 50);
  }
  
  // Remove pulse class after animation
  setTimeout(() => {
    button.classList.remove('pulse-active');
  }, 500);
}

// Add sparkFade animation to head
const style = document.createElement('style');
style.textContent = `
  @keyframes sparkFade {
    0% {
      opacity: 1;
      transform: scale(0);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.5);
    }
  }
`;
document.head.appendChild(style);