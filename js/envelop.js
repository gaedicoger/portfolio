// =====================
// ENVELOPPE FLOTTANTE
// Au clic → copie l'adresse email dans le presse-papier
// Toast → confirmation visuelle pendant 2 secondes
// =====================
const envelope = document.getElementById("floating-envelope");
const toast = document.getElementById("copy-toast");

envelope.addEventListener("click", () => {
  navigator.clipboard.writeText("oger.gaedic@gmail.com");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
});