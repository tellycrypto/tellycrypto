const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  }
});

const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.getElementById("mobileMenu");

navToggle?.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  navToggle.classList.toggle("active", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    navToggle?.classList.remove("active");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    const target = href ? document.querySelector(href) : null;

    if (!target) {
      return;
    }

    event.preventDefault();
    const navHeight = navbar ? navbar.offsetHeight : 0;
    window.scrollTo({
      top: target.offsetTop - navHeight,
      behavior: "smooth"
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => sectionObserver.observe(section));

const audioFab = document.getElementById("audioFab");
const audioToggle = document.getElementById("audioToggle");
const floatingAudio = document.getElementById("floatingAudio");
const playIcon = document.querySelector(".audio-icon-play");
const pauseIcon = document.querySelector(".audio-icon-pause");

function syncAudioUI(isPlaying) {
  if (!audioFab || !audioToggle || !playIcon || !pauseIcon) {
    return;
  }

  audioFab.classList.toggle("is-playing", isPlaying);
  audioToggle.setAttribute("aria-pressed", String(isPlaying));
  audioToggle.setAttribute("aria-label", isPlaying ? "Pause TellyCrypto song" : "Play TellyCrypto song");
  playIcon.classList.toggle("hidden", isPlaying);
  pauseIcon.classList.toggle("hidden", !isPlaying);
}

audioToggle?.addEventListener("click", async () => {
  if (!floatingAudio) {
    return;
  }

  if (floatingAudio.paused) {
    try {
      await floatingAudio.play();
    } catch (error) {
      syncAudioUI(false);
    }
  } else {
    floatingAudio.pause();
  }
});

floatingAudio?.addEventListener("pause", () => syncAudioUI(false));
floatingAudio?.addEventListener("play", () => syncAudioUI(true));
floatingAudio?.addEventListener("ended", () => {
  floatingAudio.currentTime = 0;
  syncAudioUI(false);
});

if (floatingAudio) {
  floatingAudio.pause();
  floatingAudio.currentTime = 0;
  syncAudioUI(false);
}
