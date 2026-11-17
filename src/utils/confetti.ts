import confetti from 'canvas-confetti';

export function firePastelConfetti() {
  // Soft pastel colors matching the aesthetic
  const pastelColors = ['#D8B4FE', '#BBF7D0', '#BAE6FD', '#FED7AA', '#FEF08A', '#FECDD3'];

  confetti({
    particleCount: 50,
    spread: 70,
    origin: { y: 0.65 },
    colors: pastelColors,
    ticks: 200,
    gravity: 0.8,
    scalar: 1.1,
    shapes: ['circle', 'square'],
    disableForReducedMotion: true
  });
}

export function fireBigCelebration() {
  const pastelColors = ['#D8B4FE', '#86EFAC', '#7DD3FC', '#FDBA74', '#FDE047', '#FDA4AF'];
  const end = Date.now() + 1.2 * 1000;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: pastelColors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: pastelColors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
