// =====================
// MODALE
// Affiche le détail d'un projet au clic sur une carte
// Lightbox → agrandit l'image au clic
// Fermeture via ✕ ou clic sur l'overlay
// =====================
function setupModal() {
  const overlay = document.getElementById("modal");

  document
    .getElementById("modal-close")
    .addEventListener("click", () => overlay.classList.remove("open"));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("open");
  });

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
    // Image disponible → affichage + lightbox au clic
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
