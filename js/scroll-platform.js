document.addEventListener("DOMContentLoaded", () => {
    // on demande de détecter l'animation qui se fait quand l'User scroll vers le bas

    // Sélection des éléments nécessaires
    const targets = document.querySelectorAll(".section"); // Sélectionne toutes les sections à animer

    // Options de l'Intersection Observer
    const observerOptions = {
        root: null, // Utilise la fenêtre du navigateur comme racine
        rootMargin: "0px", // Pas de marge autour de la racine
        threshold: 0.2, // 20% de la section doit être visible pour déclencher l'animation
    };

    // Fonction pour gérer l'animation des sections
    const setAnim = (entries, observer) => {
        entries.forEach((entry) => {
            const elem = entry.target; // Récupère l'élément observé
            if (entry.isIntersecting) {
                // Vérifie si l'élément est visible
                elem.classList.add("visible"); // Ajoute la classe 'visible' pour déclencher l'animation
            }
            // Ne retire pas la classe 'visible' pour garder la section affichée
        });
    };

    // Création de l'instance de l'Intersection Observer
    const observer = new IntersectionObserver(setAnim, observerOptions);

    // Observation de chaque section
    targets.forEach((target) => {
        observer.observe(target); // Commence à observer chaque section
    });
});
