// =====================
// CARROUSEL PROJETS
// Carrousel 3D infini — les cartes tournent en boucle
// getOffset() → calcule la position relative de chaque carte
// Le modulo garantit qu'on reste toujours dans [0, n-1]
// =====================
function setupCarousel(data, trackId, dotsId, prevId, nextId) {
  const track = document.getElementById(trackId);
  const dotsEl = document.getElementById(dotsId);
  const n = data.length;
  let current = 0;

  // Crée une carte et un dot pour chaque projet
  data.forEach((item, i) => {
    track.appendChild(createCard(item, i));
    dotsEl.appendChild(createDot(i, () => goTo(i)));
  });

  // Crée une carte HTML avec icône, titre, tags et hint
  function createCard(item, i) {
    const card = document.createElement("div");
    card.className = "carousel-card";
    card.dataset.index = i;
    card.innerHTML = `
      <i class="card-icon ${item.icon}"></i>
      <div class="card-title">${item.title}</div>
      <div class="card-tags">${item.tags.map((t) => `<span class="card-tag">${t}</span>`).join(" ")}</div>
      <p class="card-hint">🖱 Clique pour le détail</p>
    `;
    // Clic sur la carte active → modale / clic sur une autre → navigation
    card.addEventListener("click", () => {
      parseInt(card.dataset.index) === current
        ? openModal(item)
        : goTo(parseInt(card.dataset.index));
    });
    return card;
  }

  // Crée un dot de navigation
  function createDot(i, onClick) {
    const dot = document.createElement("div");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", onClick);
    return dot;
  }

  // Calcule l'offset circulaire de la carte i par rapport à current
  // Ramène toujours dans [-n/2, n/2] pour l'effet infini
  function getOffset(i) {
    let offset = i - current;
    if (offset > n / 2) offset -= n;
    if (offset < -n / 2) offset += n;
    return offset;
  }

  // Met à jour les classes CSS selon la position de chaque carte
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

  // Navigue vers la carte à l'index donné — boucle infinie
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
