document.addEventListener("DOMContentLoaded", () => {
    const fetchVerseBtn = document.getElementById("getVerse"); // Correction de l'ID
    const verseResult = document.getElementById("verset");

    async function fetchVerse() {
        // fonction qui va chercher un verset aléatoire du Coran
        try {
            verseResult.innerHTML =
                '<div class="loading">Chargement du verset...</div>'; // Message de chargement
            const arabicVerses = ["12:2", "13:37", "16:103", "20:113", "26:195", "39:28", "41:3", "41:44", "42:7", "43:3", "46:12", "50:30"];
            const verse = arabicVerses[Math.floor(Math.random() * arabicVerses.length)].replace(":", "%3A");
            const url = "https://api.quranhub.com/v1/ayah/" + verse; // Lien pour obtenir un verset aléatoire
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(
                    "Erreur de récupération des données du verset !"
                );
            }
            const verseData = await response.json();
            displayVerse(verseData.data.text); // Affichage du verset
        } catch (e) {
            verseResult.innerHTML = `<div class="alert alert-danger">${e.message}</div>`; // Affichage d'une alerte en cas d'erreur
        }
    }

    function displayVerse(verse) {
        verseResult.innerHTML = `
        <div class="card mx-auto shadow-lg">
            <div class="card-body">
                <h3 class="card-title">Réflexion Spirituelle : Verset Aléatoire</h3>
                <p class="card-text verset-text">${verse}</p>
            </div> 
        </div>`;
    }

    fetchVerse(); // Appel de la fonction pour récupérer le verset
});
