document.addEventListener("DOMContentLoaded", () => {
  // =====================
  // CHARGEMENT DES DONNÉES
  // =====================
  fetch("data/data-dev.json")
    .then((res) => res.json())
    .then((data) => init(data));

  // =====================
  // INITIALISATION
  // =====================
  function init(data) {
    let currentIndex = 0; //Partagé entre deux fonctions
    setupScroll();
    setupScrollButton();
    setupSkills(data.skills);
    setupCarousel(
      data.projects,
      "track-projects",
      "dots-projects",
      "prev-projects",
      "next-projects",
      "project",
    );
    setupTimeline(data.formations);
    setupModal();

    // =====================
    // SCROLL PAR SECTION
    // =====================
    function setupScroll() {
      const sections = document.querySelectorAll("section");
      let currentIndex = 0;
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

    // =====================
    // BOUTON RETOUR EN HAUT
    // =====================
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

  // =====================
  // NUAGE DE COMPÉTENCES
  // =====================
  function setupSkills(skills) {
    const cloud = document.querySelector(".skills-cloud");
    cloud.innerHTML = "";

    skills.forEach((skill) => {
      const div = document.createElement("div");
      div.classList.add("skill");
      div.textContent = skill;
      cloud.appendChild(div);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cloud.querySelectorAll(".skill").forEach((skill, i) => {
              setTimeout(() => skill.classList.add("show"), i * 200);
            });
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(document.getElementById("section-skills"));
  }

  // =====================
  // CARROUSEL PROJETS
  // =====================
  function setupCarousel(data, trackId, dotsId, prevId, nextId, type) {
    const track = document.getElementById(trackId);
    const dotsEl = document.getElementById(dotsId);
    const n = data.length;
    let current = 0;

    data.forEach((item, i) => {
      track.appendChild(createCard(item, i, type));
      dotsEl.appendChild(createDot(i, () => goTo(i)));
    });

    function createCard(item, i, type) {
      const card = document.createElement("div");
      card.className = "carousel-card";
      card.dataset.index = i;

      card.innerHTML = `
        <i class="card-icon ${item.icon}"></i>
        <div class="card-title">${item.title}</div>
        <div class="card-tags">${item.tags.map((t) => `<span class="card-tag">${t}</span>`).join(" ")}</div>
        <p class="card-hint">🖱 Clique pour le détail</p>
      `;

      card.addEventListener("click", () => {
        parseInt(card.dataset.index) === current
          ? openModal(item)
          : goTo(parseInt(card.dataset.index));
      });

      return card;
    }

    function createDot(i, onClick) {
      const dot = document.createElement("div");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", onClick);
      return dot;
    }

    function getOffset(i) {
      let offset = i - current;
      if (offset > n / 2) offset -= n;
      if (offset < -n / 2) offset += n;
      return offset;
    }

    function updatePositions() {
      track.querySelectorAll(".carousel-card").forEach((card, i) => {
        const offset = getOffset(i);
        card.className = "carousel-card";
        if (offset === 0) card.classList.add("pos-active");
        else if (offset === 1) card.classList.add("pos-right");
        else if (offset === -1) card.classList.add("pos-left");
        else if (offset === 2) card.classList.add("pos-far-right");
        else if (offset === -2) card.classList.add("pos-far-left");
        else card.classList.add("pos-hidden");
      });
      dotsEl
        .querySelectorAll(".dot")
        .forEach((d, i) => d.classList.toggle("active", i === current));
    }

    function goTo(index) {
      current = ((index % n) + n) % n;
      updatePositions();
    }

    document
      .getElementById(nextId)
      .addEventListener("click", () => goTo(current + 1));
    document
      .getElementById(prevId)
      .addEventListener("click", () => goTo(current - 1));

    updatePositions();
  }

  // =====================
  // TIMELINE FORMATIONS
  // =====================
  function setupTimeline(formations) {
    const track = document.getElementById("timeline-track");
    let current = 0;
    const reversed = [...formations].reverse();
    const n = reversed.length;

    reversed.forEach((f, i) => {
      const card = document.createElement("div");
      card.className = "tcard" + (i === 0 ? " active" : "");
      card.dataset.index = i;
      card.innerHTML = `
        <div class="tcard-year">${f.year}</div>
        <div class="tcard-title">${f.title}</div>
        <div class="tcard-school">${f.school}</div>
      `;
      card.addEventListener("click", () => goTo(parseInt(card.dataset.index)));
      track.appendChild(card);
    });

    function updateTrack() {
      track.querySelectorAll(".tcard").forEach((c, i) => {
        c.classList.toggle("active", i === current);
      });
      const offset = Math.max(0, current - 1) * (220 + 24);
      track.style.transform = `translateX(-${offset}px)`;
    }

    function goTo(index) {
      current = Math.max(0, Math.min(index, n - 1));
      updateTrack();
    }

    document
      .getElementById("tnext")
      .addEventListener("click", () => goTo(current + 1));
    document
      .getElementById("tprev")
      .addEventListener("click", () => goTo(current - 1));

    updateTrack();
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

    // Fermeture en cliquant en dehors de la modale
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.remove("open");
    });

    // Fermeture lightbox au clic
    document.getElementById("lightbox").addEventListener("click", () => {
      document.getElementById("lightbox").classList.remove("open");
    });
  }

  // Remplit et ouvre la modale avec les données du projet cliqué
  function openModal(p) {
    document.getElementById("m-title").textContent = p.title;
    document.getElementById("m-desc").textContent = p.desc;
    document.getElementById("m-link").href = p.link;

    const modalImg = document.getElementById("m-img");

    if (p.img) {
      // Image disponible → on l'affiche et on active la lightbox
      modalImg.style.backgroundSize = "cover";
      modalImg.style.backgroundPosition = "top";
      modalImg.style.backgroundImage = `url(${p.img})`;
      modalImg.style.cursor = "zoom-in";
      modalImg.onclick = () => {
        document.getElementById("lightbox-img").src = p.img;
        document.getElementById("lightbox").classList.add("open");
      };
    } else {
      // Pas d'image → dégradé de couleur
      modalImg.style.backgroundImage = "none";
      modalImg.style.background = p.color;
      modalImg.style.cursor = "default";
      modalImg.onclick = null;
    }

    document.getElementById("modal").classList.add("open");
  }
});
