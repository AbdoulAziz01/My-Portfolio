// Navigation pour les sections du site
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

// Scroll permet de détecter la section active et de mettre à jour les liens de navigation
// Le lien correspondant à la section actuellement visible est mis en surbrillance
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
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

ique;
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
