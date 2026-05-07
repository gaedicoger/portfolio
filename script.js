document.addEventListener("DOMContentLoaded", () => {
  const btnTop = document.getElementById("btn-top");
  const sections = document.querySelectorAll("section");

  let currentIndex = 0;
  let isScrolling = false;

  // Animations d'entrée
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  sections.forEach((section) => {
    section.classList.add("section-hidden");
    observer.observe(section);
  });

  // Scroll par section
  window.addEventListener("wheel", (e) => {
    if (isScrolling) return;

    if (e.deltaY > 0 && currentIndex < sections.length - 1) {
      currentIndex++;
    } else if (e.deltaY < 0 && currentIndex > 0) {
      currentIndex--;
    }

    sections[currentIndex].scrollIntoView({ behavior: "smooth" });
    console.log("currentIndex :", currentIndex);
    console.log("classe du bouton :", btnTop.classList);

    // Bouton retour en haut — ICI à l'intérieur
    if (currentIndex > 0) {
      btnTop.classList.add("visible");
    } else {
      btnTop.classList.remove("visible");
    }

    isScrolling = true;
    setTimeout(() => {
      isScrolling = false;
    }, 800);
  });

  // Retour en haut au rechargement
  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };

  // Affichage des compéténces en cascade :

  const skillsSection = document.getElementById("section-skills");
  const skills = document.querySelectorAll(".skill");

  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skills.forEach((skill, i) => {
            setTimeout(() => {
              skill.classList.add("show");
            }, i * 200);
          });
        }
      });
    },
    { threshold: 0.3 },
  );

  skillsObserver.observe(skillsSection);

  // Données projets
  const projects = [
    {
      title: "Portfolio Dev",
      tags: ["HTML/CSS", "JS"],
      desc: "Mon portfolio multi-profil avec animations et scroll snap.",
      link: "https://github.com",
      color: "linear-gradient(135deg,#fde8ec,#ffc0cb)",
    },
    {
      title: "App Météo",
      tags: ["JS", "API"],
      desc: "App météo temps réel avec géolocalisation.",
      link: "https://github.com",
      color: "linear-gradient(135deg,#e3f2fd,#90caf9)",
    },
    {
      title: "Base de données",
      tags: ["mySQL"],
      desc: "Modélisation et requêtes d'une BDD relationnelle.",
      link: "https://github.com",
      color: "linear-gradient(135deg,#e8f5e9,#a5d6a7)",
    },
    {
      title: "Base de données",
      tags: ["mySQL"],
      desc: "Modélisation et requêtes d'une BDD relationnelle.",
      link: "https://github.com",
      color: "linear-gradient(135deg,#e8f5e9,#a5d6a7)",
    },
    {
      title: "Base de données",
      tags: ["mySQL"],
      desc: "Modélisation et requêtes d'une BDD relationnelle.",
      link: "https://github.com",
      color: "linear-gradient(135deg,#e8f5e9,#a5d6a7)",
    },
  ];

  // Données formations —
  const formations = [
    {
      title: "Bac littéraire",
      school: "Lycée Saint-Louis Châteaulin",
      year: "2006",
    },
    {
      title: "Licence Histoire de l'art et Archéologie",
      school: "UBO Quimper",
      year: "2009",
    },
    {
      title: "Master MEEF spécialité professorat des écoles",
      school: "Université d'Artois",
      year: "2012",
    },
    {
      title: "Certificat de compétences Gestion de projet",
      school: "CCI",
      year: "2021",
    },
    {
      title: "Certificat de compétences Formateur en entreprise",
      school: "CCI",
      year: "2022",
    },
    { title: "Adobe première pro Montage vidéo", school: "ENI", year: "2025" },
    { title: "Developpeur web", school: "Ada tech school", year: "En cours" },
  ];

  function createCarousel(data, trackId, dotsId, prevId, nextId, type) {
    const track = document.getElementById(trackId);
    const dotsEl = document.getElementById(dotsId);
    const n = data.length;
    let current = 0;

    data.forEach((item, i) => {
      const card = document.createElement("div");
      card.className = "carousel-card";
      card.dataset.index = i;

      if (type === "project") {
        card.innerHTML = `
        <div class="card-img" style="background:${item.color}"></div>
        <div class="card-title">${item.title}</div>
        <div class="card-tags">${item.tags.map((t) => `<span class="card-tag">${t}</span>`).join("")}</div>
        <p class="card-hint">🖱 Clique pour le détail</p>
      `;
        card.addEventListener("click", () => {
          const idx = parseInt(card.dataset.index);
          if (idx === current) openModal(item);
          else goTo(idx);
        });
      } else {
        card.innerHTML = `
        <div class="card-title">${item.title}</div>
        <div class="formation-school">${item.school}</div>
        <div class="formation-year">${item.year}</div>
      `;
        card.addEventListener("click", () =>
          goTo(parseInt(card.dataset.index)),
        );
      }

      track.appendChild(card);

      const dot = document.createElement("div");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", () => goTo(i));
      dotsEl.appendChild(dot);
    });

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

  // Modale
  function openModal(p) {
    document.getElementById("m-title").textContent = p.title;
    document.getElementById("m-desc").textContent = p.desc;
    document.getElementById("m-link").href = p.link;
    document.getElementById("m-img").style.background = p.color;
    document.getElementById("modal").classList.add("open");
  }
  document
    .getElementById("modal-close")
    .addEventListener("click", () =>
      document.getElementById("modal").classList.remove("open"),
    );
  document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modal"))
      document.getElementById("modal").classList.remove("open");
  });

  // Lancement des deux carrousels
  createCarousel(
    projects,
    "track-projects",
    "dots-projects",
    "prev-projects",
    "next-projects",
    "project",
  );
  createCarousel(
    formations,
    "track-formations",
    "dots-formations",
    "prev-formations",
    "next-formations",
    "formation",
  );
});
