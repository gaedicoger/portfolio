// =====================
// FRISE SERPENTIN PARCOURS
// Organise les expériences en rangées de 4
// qui alternent gauche/droite comme un jeu de plateau
// Seules les expériences pro sont affichées
// (visible: true ET type !== "formation")
// =====================
function setupParcours(parcours) {
  const track = document.getElementById("serpentin-track");

  // Filtre : visible ET pas une formation
  const visible = parcours.filter(
    (item) => item.visible && item.type !== "formation",
  );

  const plateau = document.createElement("div");
  plateau.className = "plateau";

  // Découpe en rangées de 4
  const rowSize = 4;
  const rows = [];
  for (let i = 0; i < visible.length; i += rowSize) {
    rows.push(visible.slice(i, i + rowSize));
  }

  rows.forEach((rowItems, rowIndex) => {
    // Alternance : rangées paires → gauche/droite, impaires → droite/gauche
    const isReverse = rowIndex % 2 !== 0;

    const row = document.createElement("div");
    row.className = `row${isReverse ? " reverse" : ""}`;

    rowItems.forEach((item, i) => {
      // Crée la carte
      const card = document.createElement("div");
      card.className = `exp-card ${item.type}`;
      card.innerHTML = `
        <div class="exp-periode">${item.periode}</div>
        <div class="exp-poste">${item.poste}</div>
        <div class="exp-structure">${item.structure}</div>
      `;
      row.appendChild(card);

      // Connecteur entre les cartes (sauf après la dernière)
      if (i < rowItems.length - 1) {
        const connector = document.createElement("div");
        connector.className = "connector";
        row.appendChild(connector);
      }
    });

    plateau.appendChild(row);

    // Virage entre deux rangées (sauf après la dernière)
    // Virage à droite si rangée gauche→droite, à gauche sinon
    if (rowIndex < rows.length - 1) {
      const turn = document.createElement("div");
      turn.className = `turn${isReverse ? " left" : ""}`;
      plateau.appendChild(turn);
    }
  });

  track.appendChild(plateau);

  // Animation d'entrée — chaque carte s'anime avec un délai progressif
  // unobserve() → on arrête d'observer une fois la carte visible
  const cards = track.querySelectorAll(".exp-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(cards).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 300);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  cards.forEach((card) => {
    observer.observe(card);
  });

  track.querySelectorAll(".exp-card").forEach((card) => {
    observer.observe(card);
  });
}
