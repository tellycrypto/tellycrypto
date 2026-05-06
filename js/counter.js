function animateCounter(element) {
  const target = parseInt(element.dataset.count || "0", 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = window.setInterval(() => {
    current = Math.min(current + step, target);
    element.textContent = Math.floor(current).toString();

    if (current >= target) {
      window.clearInterval(timer);
    }
  }, 16);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".trust-num[data-count]").forEach((element) => counterObserver.observe(element));
