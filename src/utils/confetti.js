const COLORS = ['#F4A1D7', '#4CCCE2', '#6C28A8', '#66B447', '#F2B632', '#E85F5F', '#194F69'];

export function launchConfetti(count = 40) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * -10}vh`;
    particle.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    particle.style.setProperty('--fall-duration', `${1.5 + Math.random() * 1.5}s`);
    particle.style.animationDelay = `${Math.random() * 0.5}s`;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 3000);
  }
}
