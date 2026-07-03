document.addEventListener("DOMContentLoaded", () => {
  // On attend que tout le HTML soit chargé avant d'exécuter le JS

  // =====================
  // CHARGEMENT DES DONNÉES
  // =====================
  // fetch() va chercher le fichier JSON et le convertit en objet JS (.json())
  // Une fois les données prêtes, on appelle init() avec ces données
  fetch("data/data-dev.json")
    .then((res) => res.json())
    .then((data) => init(data));

  // =====================
  // INITIALISATION
  // =====================
  // Point d'entrée unique — appelle toutes les fonctions dans le bon ordre
  function init(data) {
    setupScroll(); // Gère le scroll par section
    setupScrollButton(); // Gère le bouton retour en haut
    setupSkills(data.skills); // Génère le nuage de compétences
    // Crée le carrousel des projets
    setupCarousel(
      data.projects,
      "track-projects",
      "dots-projects",
      "prev-projects",
      "next-projects",
      "project",
    );
    // Crée le carrousel des formations
    setupCarousel(
      data.formations,
      "track-formations",
      "dots-formations",
      "prev-formations",
      "next-formations",
      "formation",
    );
    setupModal(); // Gère la modale de détail
  }

  // =====================
  // SCROLL PAR SECTION
  // =====================
  function setupScroll() {
    const sections = document.querySelectorAll("section"); // Récupère toutes les sections
    let currentIndex = 0; // Index de la section actuellement visible
    let isScrolling = false; // Verrou pour éviter de scroller trop vite

    // IntersectionObserver surveille quand une section entre dans le viewport
    // Quand c'est le cas, on ajoute la classe 'section-visible' pour déclencher l'animation CSS
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("section-visible");
        });
      },
      { threshold: 0.1 },
    ); // 0.1 = déclenche quand 10% de la section est visible

    // On prépare chaque section : on lui ajoute 'section-hidden' (état de départ)
    // et on la passe à l'observer pour surveiller son apparition
    sections.forEach((section) => {
      section.classList.add("section-hidden");
      observer.observe(section);
    });

    // On écoute la molette de la souris
    window.addEventListener("wheel", (e) => {
      if (isScrolling) return; // Si on est déjà en train de scroller, on ignore

      // deltaY > 0 = molette vers le bas → section suivante
      // deltaY < 0 = molette vers le haut → section précédente
      if (e.deltaY > 0 && currentIndex < sections.length - 1) currentIndex++;
      else if (e.deltaY < 0 && currentIndex > 0) currentIndex--;

      // On scrolle vers la section ciblée
      sections[currentIndex].scrollIntoView({ behavior: "smooth" });

      // On active le verrou pendant 800ms pour éviter les scrolls multiples
      isScrolling = true;
      setTimeout(() => {
        isScrolling = false;
      }, 800);
    });

    // Au rechargement de la page, on revient tout en haut
    window.onbeforeunload = () => window.scrollTo(0, 0);
  }

  // =====================
  // BOUTON RETOUR EN HAUT
  // =====================
  function setupScrollButton() {
    const btnTop = document.getElementById("btn-top");

    // À chaque mouvement de molette, on vérifie si on est descendu
    // toggle() ajoute ou retire la classe selon la condition (true/false)
    window.addEventListener("wheel", () => {
      btnTop.classList.toggle("visible", window.scrollY > 0);
    });
  }

  // =====================
  // NUAGE DE COMPÉTENCES
  // =====================
  function setupSkills(skills) {
    const cloud = document.querySelector(".skills-cloud");
    cloud.innerHTML = ""; // On vide le conteneur au cas où

    // Pour chaque skill du JSON, on crée une div et on l'ajoute au conteneur
    skills.forEach((skill) => {
      const div = document.createElement("div");
      div.classList.add("skill");
      div.textContent = skill;
      cloud.appendChild(div);
    });

    // On surveille l'entrée de la section skills dans le viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Quand la section est visible, on anime chaque skill avec un délai progressif
            // i * 200 = chaque skill apparaît 200ms après le précédent → effet cascade
            cloud.querySelectorAll(".skill").forEach((skill, i) => {
              setTimeout(() => skill.classList.add("show"), i * 200);
            });
          }
        });
      },
      { threshold: 0.3 },
    ); // Déclenche quand 30% de la section est visible

    observer.observe(document.getElementById("section-skills"));
  }

  // =====================
  // CARROUSEL
  // =====================
  // Cette fonction est réutilisée pour les projets ET les formations
  // On lui passe les données et les IDs des éléments HTML concernés
  function setupCarousel(data, trackId, dotsId, prevId, nextId, type) {
    const track = document.getElementById(trackId); // La piste des cartes
    const dotsEl = document.getElementById(dotsId); // Les points de navigation
    const n = data.length; // Nombre total de cartes
    let current = 0; // Index de la carte active

    // On crée une carte et un dot pour chaque élément du tableau
    data.forEach((item, i) => {
      track.appendChild(createCard(item, i, type));
      dotsEl.appendChild(createDot(i, () => goTo(i)));
    });

    // Crée une carte HTML selon son type (projet ou formation)
    function createCard(item, i, type) {
      const card = document.createElement("div");
      card.className = "carousel-card";
      card.dataset.index = i; // On stocke l'index sur la carte pour y accéder au clic

      if (type === "project") {
        // Carte projet : icône + titre + tags + hint
        card.innerHTML = `
          <i class="card-icon ${item.icon}"></i>
          <div class="card-title">${item.title}</div>
          <div class="card-tags">${item.tags.map((t) => `<span class="card-tag">${t}</span>`).join(" ")}</div>
          <p class="card-hint">🖱 Clique pour le détail</p>
        `;
        card.addEventListener("click", () => {
          // Si on clique sur la carte active → ouvre la modale
          // Sinon → navigue vers cette carte
          parseInt(card.dataset.index) === current
            ? openModal(item)
            : goTo(parseInt(card.dataset.index));
        });
      } else {
        // Carte formation : titre + école + année
        card.innerHTML = `
          <div class="card-title">${item.title}</div>
          <div class="formation-school">${item.school}</div>
          <div class="formation-year">${item.year}</div>
        `;
        // Au clic sur une carte formation → navigue vers elle
        card.addEventListener("click", () =>
          goTo(parseInt(card.dataset.index)),
        );
      }
      return card;
    }

    // Crée un point de navigation (dot)
    function createDot(i, onClick) {
      const dot = document.createElement("div");
      dot.className = "dot" + (i === 0 ? " active" : ""); // Le premier dot est actif par défaut
      dot.addEventListener("click", onClick);
      return dot;
    }

    // Calcule la position relative d'une carte par rapport à la carte active
    // C'est la clé du carrousel infini — l'offset est toujours dans [-n/2, n/2]
    // Exemple avec 6 cartes : carte 0 et carte 5 ont un offset de -1 (et non 5)
    function getOffset(i) {
      let offset = i - current;
      if (offset > n / 2) offset -= n; // Trop loin à droite → on ramène à gauche
      if (offset < -n / 2) offset += n; // Trop loin à gauche → on ramène à droite
      return offset;
    }

    // Met à jour les classes CSS de chaque carte selon sa position
    // C'est le CSS qui gère ensuite la position visuelle (translateX, scale, rotateY...)
    function updatePositions() {
      track.querySelectorAll(".carousel-card").forEach((card, i) => {
        const offset = getOffset(i);
        card.className = "carousel-card"; // On repart d'une classe propre
        if (offset === 0)
          card.classList.add("pos-active"); // Carte centrale
        else if (offset === 1)
          card.classList.add("pos-right"); // 1ère à droite
        else if (offset === -1)
          card.classList.add("pos-left"); // 1ère à gauche
        else if (offset === 2)
          card.classList.add("pos-far-right"); // 2ème à droite
        else if (offset === -2)
          card.classList.add("pos-far-left"); // 2ème à gauche
        else card.classList.add("pos-hidden"); // Hors champ
      });
      // On met à jour le dot actif
      dotsEl
        .querySelectorAll(".dot")
        .forEach((d, i) => d.classList.toggle("active", i === current));
    }

    // Navigue vers la carte à l'index donné
    // Le modulo (%) + le + n garantit qu'on reste toujours dans [0, n-1]
    // Exemple : goTo(-1) avec 6 cartes → current = 5 (on boucle)
    function goTo(index) {
      current = ((index % n) + n) % n;
      updatePositions();
    }

    // Flèches de navigation
    document
      .getElementById(nextId)
      .addEventListener("click", () => goTo(current + 1));
    document
      .getElementById(prevId)
      .addEventListener("click", () => goTo(current - 1));

    updatePositions(); // On initialise les positions au chargement
  }

  // =====================
  // MODALE
  // =====================
  function setupModal() {
    const overlay = document.getElementById("modal");

    // Fermeture via le bouton ✕
    document
      .getElementById("modal-close")
      .addEventListener("click", () => overlay.classList.remove("open"));

    // Fermeture en cliquant en dehors de la modale (sur l'overlay)
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.remove("open");
    });
  }

  // Remplit et ouvre la modale avec les données du projet cliqué
  function openModal(p) {
    document.getElementById("m-title").textContent = p.title;
    document.getElementById("m-desc").textContent = p.desc;
    document.getElementById("m-link").href = p.link;
    document.getElementById("m-img").style.background = p.color;
    document.getElementById("modal").classList.add("open"); // Affiche la modale
  }
});
