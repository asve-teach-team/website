document.addEventListener("DOMContentLoaded", () => {
    // On demande de détecter la soumission du formulaire de connexion
    const loginForm = document.querySelector(".form");

    // Fonction de validation des données du formulaire
    function validateFormData(email, password) {
        if (!email.trim()) {
            alert("L'email est requis");
            return false;
        }
        if (!password.trim()) {
            alert("Le mot de passe est requis");
            return false;
        }
        return true;
    }

    // Ajoute au gestionnaire d'événement la soumission du formulaire
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        // Récupére les valeurs des champs du formulaire
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector(
            'input[type="password"]'
        ).value;

        // Valide les données
        if (validateFormData(email, password)) {
            // Ici, on peux vérifier les informations dans le localStorage ou faire une requête à un serveur

            // Pour le moment, on affiche l'alerte :
            alert("Connexion réussie !");

            // Redirection vers une autre page après la connexion réussie
            // window.location.href = "page_de_destination.html"; //
        }
    });
});
