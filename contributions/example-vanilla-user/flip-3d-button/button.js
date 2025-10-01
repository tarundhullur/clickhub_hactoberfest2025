// Initialize the 3D flip button
document.addEventListener('DOMContentLoaded', function() {
  const flipButton = document.querySelector('.flip-button');
  
  if (flipButton) {
    // Add click handler
    flipButton.addEventListener('click', function() {
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.classList.add('ripple');
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      // Add ripple styles
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.5)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.pointerEvents = 'none';
      
      this.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
      
      console.log('3D Flip button clicked! 🎯');
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      .flip-button {
        position: relative;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);
  }
});