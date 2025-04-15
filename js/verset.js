document.addEventListener("DOMContentLoaded", () => {
    const fetchVerseBtn = document.getElementById("getVerse"); // Correction de l'ID
    const verseResult = document.getElementById("verset");

    async function fetchVerse() {
        // fonction qui va chercher un verset aléatoire du Coran
        try {
            verseResult.innerHTML =
                '<div class="loading">Chargement du verset...</div>'; // Message de chargement
            const url = "https://api.quranhub.com/v1/ayah/random"; // Lien pour obtenir un verset aléatoire
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
                <h3 class="card-title">Verset du Jour</h3>
                <p class="card-text">${verse}</p>
            </div> 
        </div>`;
    }

    fetchVerse(); // Appel de la fonction pour récupérer le verset
});
