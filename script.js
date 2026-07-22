// Navigation pour les sections du site
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const navIndicator = document.querySelector(".nav-indicator");
const navLinksList = document.querySelector(".nav-links");
const scrollProgressBar = document.querySelector(".scroll-progress");

// Déplace l'indicateur glissant sous le lien actif : ancre visuellement la position dans le parcours
function moveNavIndicator(link) {
  if (!navIndicator || !navLinksList || !link) return;
  const linkRect = link.getBoundingClientRect();
  const containerRect = navLinksList.getBoundingClientRect();
  navIndicator.style.left = `${linkRect.left - containerRect.left}px`;
  navIndicator.style.width = `${linkRect.width}px`;
}

// Scroll permet de détecter la section active et de mettre à jour les liens de navigation
// Le lien correspondant à la section actuellement visible est mis en surbrillance
let scrollTicking = false;

function handleScroll() {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  let activeLink = null;
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
      activeLink = link;
    }
  });
  if (activeLink) moveNavIndicator(activeLink);

  if (scrollProgressBar) {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollY / scrollHeight) * 100 : 0;
    scrollProgressBar.style.width = `${progress}%`;
  }

  scrollTicking = false;
}

window.addEventListener("scroll", () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(handleScroll);
});

// Position initiale (au chargement, avant le premier scroll de l'utilisateur)
handleScroll();
window.addEventListener("resize", () => {
  const current = document.querySelector(".nav-link.active");
  if (current) moveNavIndicator(current);
});

// Içi on ajoute un comportement de scroll smooth lorsque l'utilisateur clique sur un lien de navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    if (this.classList.contains("nav-link")) {
      navLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");
      moveNavIndicator(this);
    }
  });
});

// Cette partie du code gère l'animation des barres de compétences lorsque la section des compétences devient visible à l'écran
const skillBars = document.querySelectorAll(".skill-progress");
const skillsSection = document.querySelector(".skills");

const animateSkills = () => {
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    bar.style.width = width;
  });
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateSkills();
    }
  });
});

observer.observe(skillsSection);


// Mobile menu
const hamburger = document.querySelector(".hamburger");
const navLinksContainer = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinksContainer.classList.toggle("active");
});

// L'animation de la section d'introduction, qui affiche les différents rôles de manière dynamique
const typingText = document.querySelector(".typing-text");
const texts = [
  "Développeur Front End",
  "UI / UX Designer",
  "Developpeur Back End",
  "Data IA",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

// La fonction typeWriter gère l'animation de saisie et de suppression du texte dans la section d'introduction. Elle alterne entre les différents rôles définis dans le tableau texts, créant un effet de machine à écrire.
// Le texte est affiché caractère par caractère, puis supprimé avant de passer au rôle suivant. La vitesse de saisie et de suppression est ajustée pour créer une animation fluide.
function typeWriter() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500;
  }

  setTimeout(typeWriter, typeSpeed);
}

typeWriter();

/* ============================================================
   PREMIUM ENHANCEMENTS
   ============================================================ */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const isFinePointer = window.matchMedia("(pointer: fine)").matches;

// --- Texte cinétique : le nom du hero se met au point lettre par lettre ---
// Intention : premier instant "wow" du site, seul moment où l'on se permet
// une animation de texte marquée, car c'est la signature du visiteur qui arrive.
if (!prefersReducedMotion) {
  document.querySelectorAll(".hero-name .name-part").forEach((part, partIndex) => {
    const text = part.textContent;
    part.textContent = "";
    text.split("").forEach((char, charIndex) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = char === " " ? " " : char;
      span.style.animationDelay = `${500 + partIndex * 260 + charIndex * 32}ms`;
      part.appendChild(span);
    });
  });
  const heroNameEl = document.querySelector(".hero-name");
  if (heroNameEl) heroNameEl.classList.add("split-active");
}

// --- Révélation au scroll : chaque famille d'éléments a sa propre signature ---
// Intention : éviter l'effet "copier-coller" d'une seule animation partout,
// tout en gardant un vocabulaire de mouvement cohérent (même easing, même durée).
const revealVariants = [
  { selector: ".section-header", variant: "blur" },
  { selector: ".about-card", variant: "left" },
  { selector: ".stat-item", variant: null },
  { selector: ".skill-category", variant: "tilt" },
  { selector: ".project-card:not(.project-extra)", variant: null },
  { selector: ".contact-card", variant: "right" },
  { selector: ".form", variant: null },
];

revealVariants.forEach(({ selector, variant }) => {
  document.querySelectorAll(selector).forEach((el) => {
    el.classList.add("reveal");
    if (variant) el.setAttribute("data-reveal", variant);
  });
});

if (prefersReducedMotion) {
  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.add("is-visible");
  });
} else {
  const groupIndexes = new WeakMap();

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const parent = el.parentElement;
        let index = groupIndexes.get(parent);
        if (index === undefined) {
          index = 0;
          groupIndexes.set(parent, 0);
        }
        el.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
        groupIndexes.set(parent, index + 1);
        el.classList.add("is-visible");
        revealObserver.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });
}

// --- Parallaxe légère du hero au mouvement de la souris ---
// Note : limitée à la photo. Appliquer un transform en direct sur .hero-text
// entrait en conflit avec les lettres à dégradé animées (background-clip: text),
// provoquant un artefact de rendu (compositing Chrome) sur le nom.
if (!prefersReducedMotion && isFinePointer) {
  const hero = document.querySelector(".hero");
  const heroImage = document.querySelector(".hero-image");

  if (hero && heroImage) {
    let rafId = null;

    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        heroImage.style.transform = `translate3d(${x * 14}px, ${y * 12}px, 0)`;
        rafId = null;
      });
    });

    hero.addEventListener("mouseleave", () => {
      heroImage.style.transform = "";
    });
  }
}

// --- Magnétisme raffiné : suivi fluide du curseur, puis rebond élastique au relâché ---
// Intention : le bouton "adhère" légèrement à l'intention de clic (suivi instantané,
// sans transition, pour rester réactif) puis revient avec un ressort naturel
// (transition avec dépassement) qui signale une interaction soignée plutôt que mécanique.
if (!prefersReducedMotion && isFinePointer) {
  const magneticElements = document.querySelectorAll(".btn, .social-link");

  magneticElements.forEach((el) => {
    let rafId = null;
    let settleTimeout = null;

    el.addEventListener("mousemove", (e) => {
      el.classList.remove("is-settling");
      el.classList.add("is-magnetic");
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
        rafId = null;
      });
    });

    el.addEventListener("mouseleave", () => {
      el.classList.remove("is-magnetic");
      el.classList.add("is-settling");
      el.style.transform = "";
      clearTimeout(settleTimeout);
      settleTimeout = setTimeout(() => {
        el.classList.remove("is-settling");
      }, 650);
    });
  });
}

// --- Tilt 3D subtil sur les cartes de projet ---
if (!prefersReducedMotion && isFinePointer) {
  document.querySelectorAll(".project-card").forEach((card) => {
    let rafId = null;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        card.style.transform = `perspective(1000px) rotateX(${y * -4}deg) rotateY(${
          x * 4
        }deg) translateY(-10px)`;
        rafId = null;
      });
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// --- Affichage progressif des projets ("Voir plus / Voir moins") ---
const projectsToggle = document.getElementById("projectsToggle");
const extraProjects = document.querySelectorAll(".project-card.project-extra");

if (projectsToggle && extraProjects.length) {
  let expanded = false;

  projectsToggle.addEventListener("click", () => {
    expanded = !expanded;
    projectsToggle.classList.toggle("is-open", expanded);
    projectsToggle.querySelector("span").textContent = expanded
      ? "Voir moins de projets"
      : "Voir plus de projets";

    extraProjects.forEach((card, i) => {
      if (expanded) {
        card.classList.add("is-shown");
        card.classList.add("reveal");
        requestAnimationFrame(() => {
          card.style.transitionDelay = `${i * 90}ms`;
          card.classList.add("is-visible");
        });
      } else {
        card.classList.remove("is-visible");
        setTimeout(() => {
          card.classList.remove("is-shown");
        }, 400);
      }
    });

    if (!expanded) {
      projectsToggle.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

// --- Reflet de verre sur les cartes secondaires (profondeur légère, sans tilt) ---
// Intention : les cartes projet ont déjà un tilt 3D marqué ; les autres cartes
// (about, compétences, contact, formulaire, stats) reçoivent un traitement plus
// calme pour ne pas saturer la page de mouvement — juste une lueur qui suit le curseur.
if (!prefersReducedMotion && isFinePointer) {
  const sheenSelectors =
    ".about-card, .skill-category, .contact-card, .stat-item, .form";

  document.querySelectorAll(sheenSelectors).forEach((el) => {
    el.classList.add("sheen-card");
    let rafId = null;

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;

      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${mx}%`);
        el.style.setProperty("--my", `${my}%`);
        rafId = null;
      });
    });
  });
}

// --- Compteur animé des statistiques : donne du poids aux chiffres clés ---
// Intention : un chiffre qui "arrive" en comptant retient davantage l'attention
// qu'un texte statique, et suggère que ces stats sont des données vivantes.
const statNumbers = document.querySelectorAll(".stat-number");

if (statNumbers.length) {
  const animateCount = (el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/^(\d+)(.*)$/);
    if (!match) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2];

    if (prefersReducedMotion) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );

  statNumbers.forEach((el) => countObserver.observe(el));
}

// --- Curseur personnalisé : point + halo, suivi fluide, réagit aux zones interactives ---
// Intention : signature discrète de studio haut de gamme, jamais gratuite car elle
// remplace simplement le curseur système — désactivée sur tactile et mouvement réduit.
if (!prefersReducedMotion && isFinePointer) {
  const cursorDot = document.createElement("div");
  cursorDot.className = "cursor-dot";
  const cursorRing = document.createElement("div");
  cursorRing.className = "cursor-ring";
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorRing);
  document.body.classList.add("cursor-ready");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.body.classList.add("cursor-visible");
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  document.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-visible");
  });

  const interactiveSelector =
    "a, button, .project-card, .btn, input, textarea, .hamburger";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursorRing.classList.add("is-active");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursorRing.classList.remove("is-active");
    }
  });

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  };

  requestAnimationFrame(animateRing);
}