function buttonClick() {
  const button = document.querySelector('.neon-button');
  const text = document.querySelector('.neon-text');
  
  // Create click effect
  button.style.transform = 'scale(0.95)';
  text.style.color = '#ffffff';
  
  // Add temporary intense glow
  text.style.textShadow = `
    0 0 10px #00ffff,
    0 0 20px #00ffff,
    0 0 30px #00ffff,
    0 0 40px #00ffff
  `;
  
  // Reset after animation
  setTimeout(() => {
    button.style.transform = '';
    text.style.color = '#00ffff';
    text.style.textShadow = '';
  }, 150);
  
  // Optional: Add some feedback
  console.log('Neon button clicked! ⚡');
}