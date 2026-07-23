// =====================
// TIMELINE FORMATIONS
// Frise horizontale défilante
// reversed → on affiche du plus récent au plus ancien
// offset → décalage en px pour centrer la carte active
// 220px = largeur carte, 24px = gap entre les cartes
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
