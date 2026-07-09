# 🎨 Portfolio — Gaédic Oger

> Développeuse Fullstack en construction

Portfolio personnel multi-profil développé en HTML / CSS / JavaScript vanilla, sans framework.

🔗 **[Voir le portfolio en ligne](https://gaedicoger.github.io/portfolio/)**

---

## 🛠️ Technologies utilisées

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=flat&logo=fontawesome&logoColor=white)

- **HTML5** — structure sémantique
- **CSS3** — animations, transitions, variables CSS, Flexbox
- **JavaScript Vanilla** — interactions, IntersectionObserver, fetch JSON
- **Font Awesome** — icônes
- **Google Fonts** — police Permanent Marker
- **Polices custom** — Open Sauce One (Bold & Light)

---

## ✨ Fonctionnalités

- 🖼️ **Section présentation** — cartes photo avec effet de lévitation au hover
- 💡 **Nuage de compétences** — animation en cascade à l'entrée dans le viewport
- 🎠 **Carrousel 3D infini** — navigation par section Projets avec effet roue et perspective
- 🔍 **Modale de détail** — affichage des projets avec lightbox sur les images
- 📅 **Frise chronologique** — formations et certifications en défilement horizontal
- 📜 **Scroll snap** — navigation section par section à la molette
- ✨ **Animations d'entrée** — chaque section s'anime à l'arrivée dans le viewport
- ⬆️ **Bouton retour en haut** — apparaît dynamiquement au scroll
- 🔌 **Données JSON** — contenu externalisé dans `data/data-dev.json`
- 🎨 **Background circuit** — SVG style circuit imprimé en fond de page
- 🧭 **Tooltips nav** — indicateurs de profil au survol des icônes

---

## 📁 Structure des fichiers

```
portfolio/
├── index.html              # Structure HTML principale
├── script.js               # Toutes les interactions JS
├── data/
│   └── data-dev.json       # Données du profil dev (projets, formations, skills)
├── css/
│   ├── base.css            # Reset, variables, polices, typographie
│   ├── nav.css             # Header, nav, tooltips, bouton retour en haut
│   ├── sections.css        # Sections, animations scroll, background circuit
│   ├── presentation.css    # Cartes de présentation, indicateur scroll
│   ├── skills.css          # Nuage de compétences
│   ├── projets.css         # Carrousel, cartes, modale, lightbox
│   ├── formations.css      # Frise chronologique
│   └── footer.css          # Footer, liens sociaux
├── fonts/
│   ├── open-sauce.one-bold.ttf
│   └── open-sauce.one-light.ttf
└── images/
    ├── entry/              # Photos des cartes de présentation
    └── projets/            # Screenshots des projets
```

---

## 🚀 Lancer le projet en local

Ce projet utilise `fetch()` pour charger les données JSON — il nécessite donc un serveur local.

**Avec VS Code :**

1. Installer l'extension **Live Server**
2. Clic droit sur `index.html` → **Open with Live Server**

**Avec Node.js :**

```bash
npx serve .
```

---

## 🔮 À venir

- 🎨 Profil **Artiste** — fil photo et contact
- 📚 Profil **Ingénieure pédagogique** — projets péda et certifications liées
- 📱 Version **responsive mobile**

---

## 👩‍💻 Auteure

**Gaédic Oger** — Développeuse Fullstack en formation à [Ada Tech School](https://adatechschool.fr/) Nantes

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gaedic-oger/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/gaedicoger)
