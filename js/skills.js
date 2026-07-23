// =====================
// NUAGE DE COMPÉTENCES
// Génère les tags depuis le JSON
// Animation en cascade au scroll via IntersectionObserver
// i * 200 → chaque tag apparaît 200ms après le précédent
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
