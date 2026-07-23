// =====================
// POINT D'ENTRÉE PRINCIPAL
// On attend que tout le HTML soit chargé (DOMContentLoaded)
// avant d'exécuter le JS
// =====================
document.addEventListener("DOMContentLoaded", () => {
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }

  // Petit délai pour laisser le navigateur finir sa restauration
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 50);
  // =====================
  // CHARGEMENT DES DONNÉES
  // fetch() charge le fichier JSON externe
  // .then() → chaîne de promesses :
  //   1. on convertit la réponse en objet JS (.json())
  //   2. on appelle init() avec les données
  // =====================
  fetch("data/data-dev.json")
    .then((res) => res.json())
    .then((data) => init(data));

  // =====================
  // INITIALISATION
  // Point d'entrée unique — orchestre toutes les fonctions
  // currentIndex est déclaré ici pour être partagé entre
  // setupScroll et setupScrollButton via closure
  // =====================
  function init(data) {
    let currentIndex = 0;

    setupScroll();
    setupScrollButton();
    setupSkills(data.skills);
    setupCarousel(
      data.projects,
      "track-projects",
      "dots-projects",
      "prev-projects",
      "next-projects",
    );
    setupTimeline(data.formations);
    setupParcours(data.parcours);
    setupModal();

    // =====================
    // SCROLL PAR SECTION
    // setupScroll et setupScrollButton sont déclarées dans
    // scroll.js mais appelées ici car elles ont besoin
    // de currentIndex via closure
    // =====================
    function setupScroll() {
      const sections = document.querySelectorAll("section");
      let isScrolling = false;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting)
              entry.target.classList.add("section-visible");
          });
        },
        { threshold: 0.1 },
      );

      sections.forEach((section) => {
        section.classList.add("section-hidden");
        observer.observe(section);
      });

      window.addEventListener("wheel", (e) => {
        if (isScrolling) return;
        if (e.deltaY > 0 && currentIndex < sections.length - 1) currentIndex++;
        else if (e.deltaY < 0 && currentIndex > 0) currentIndex--;
        sections[currentIndex].scrollIntoView({ behavior: "smooth" });
        isScrolling = true;
        setTimeout(() => {
          isScrolling = false;
        }, 800);
      });

      window.onbeforeunload = () => window.scrollTo(0, 0);
    }

    function setupScrollButton() {
      const btnTop = document.getElementById("btn-top");
      window.addEventListener("wheel", (e) => {
        if (e.deltaY > 0) {
          btnTop.classList.add("visible");
        } else if (e.deltaY < 0 && currentIndex === 0) {
          btnTop.classList.remove("visible");
        }
      });
    }
  }
});
