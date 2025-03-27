document.addEventListener("DOMContentLoaded", () => {
    // on demande de détecter la soumission du formulaire (qui se fait quand l'User click sur le boutton "ajouter un film")
    const movieForm = document.getElementById("movie-form");

    //Fonction de validation des données du formulaire
    function validateFormData(movie) {
        if (!movie.title.trim()) {
            // On utilise cette expression pour valider que le champ title n'est ni vide ni composé uniquement d'espaces, sinon j'affiche : Le titre est requis
            alert("Le titre est requis");
            return false; // return False car on est dans une situation d'erreur. Il faut tout arrêter
        }
        if (!movie.description.trim()) {
            alert("La description est requise");
            return false;
        }
        if (!movie.date) {
            // S'il n'y a pas de date , alors tu m'affiches l'alerte. -> pas de trim car trim est uniquement pour les chaînes de caractère
            alert("La date est requise");
            return false;
        }
        if (!movie.color) {
            alert("Veuillez choisir une couleur pour la bordure");
            return false;
        }
        return true;
    }

    function storeMovieInLocalStorage(movie) {
        // Récupérer les files (si présent) du localStorage
        const storeData = localStorage.getItem("movies");
        const movies = storeData ? JSON.parse(storeData) : [];
        console.log(movies);
        movies.push(movie);

        //Sauvegarder dans le local
        localStorage.setItem("movies", JSON.stringify(movies));
    }

    // Ajouter au gestionnaire d'événement la soumission du formulaire
    movieForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        //Récupérer les valeurs des champs du formulaire
        const title = document.getElementById("movie-title").value;
        let img = document.getElementById("movie-img").value;

        const description = document.getElementById("movie-description").value;
        const date = document.getElementById("movie-date").value;
        const color = document.getElementById("movie-color").value;

        // Créer : movie = img: ,title: ,description: ,date: ,color:
        const movie = { img, title, description, date, color };

        //Valider les données
        if (validateFormData(movie)) {
            // Stockage dans le localStorage
            storeMovieInLocalStorage(movie);

            // JSON = JavaScript Objet Notation => c'est un format de fichier textuelle

            //Redirection vers l'index.html
            window.location.href = "index.html";
        }
    });
});

// ressource : https://css-tricks.com/scroll-triggered-animation-vanilla-javascript/ //
