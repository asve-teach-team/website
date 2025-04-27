document.addEventListener("DOMContentLoaded", () => {
    const fetchVerseBtn = document.getElementById("getVerse"); // Correction de l'ID
    const verseResult = document.getElementById("verset");

    async function fetchVerse() {
        // fonction qui va chercher un verset aléatoire du Coran
        try {
            verseResult.innerHTML =
                '<div class="loading">Chargement du verset...</div>'; // Message de chargement
            // take only verse by subject - see https://www.alislam.org/quran/app/topics-a - use (verseNumber - 1) - topic 'arabic'
            const arabicVerses = ["12/2", "13/37", "16/103", "20/113", "26/195", "39/28", "41/3", "41/44", "42/7", "43/3", "46/12", "50/30"];
            const verse = arabicVerses[Math.floor(Math.random() * arabicVerses.length)];
            const url = "https://api.asve-vaureal.fr/quran/v1/verse/" + verse; // Lien pour obtenir un verset aléatoire
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(
                    `Response status: ${response.status}`
                );
            }
            const verseData = await response.json();
            displayVerse(verseData); // Affichage du verset
        } catch (e) {
            verseResult.innerHTML = `<div class="alert alert-danger">${e.message}</div>`; // Affichage d'une alerte en cas d'erreur
        }
    }

    function displayVerse(verse) {
        verseResult.innerHTML = `
        <div class="card mx-auto shadow-lg">
            <div class="card-body">
                <h3 class="card-title">Réflexion Spirituelle : Verset Aléatoire (${verse.surat}:${verse.verse})</h3>
                <img class="card-text verset-text" src="${verse.text.picture}" />
                <p class="card-text p-ayah-fr">${verse.text.fr}</p>
            </div> 
        </div>`;
    }

    fetchVerse(); // Appel de la fonction pour récupérer le verset
});
