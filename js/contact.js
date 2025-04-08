document.addEventListener("DOMContentLoaded", () => {
    // On demande de détecter la soumission du formulaire de contact
    const contactForm = document.querySelector(".form-contact");

    // Fonction de validation des données du formulaire
    function validateFormData(nom, prenom, email, message) {
        if (!nom.trim()) {
            alert("Le nom est requis");
            return false;
        }
        if (!prenom.trim()) {
            alert("Le prénom est requis");
            return false;
        }
        if (!email.trim()) {
            alert("L'email est requis");
            return false;
        }
        if (!message.trim()) {
            alert("Le message est requis");
            return false;
        }
        if (!validateEmail(email)) {
            alert("Veuillez entrer une adresse email valide.");
            return false;
        }
        return true;
    }

    // Fonction pour valider l'email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Fonction pour envoyer le formulaire
    async function sendForm(formData) {
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi du formulaire");
            }

            const result = await response.json();
            alert(result.message || "Votre message a été envoyé avec succès !");
        } catch (error) {
            console.error("Erreur:", error);
            alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
        }
    }

    // Ajoute au gestionnaire d'événement la soumission du formulaire
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        // Récupère les valeurs des champs du formulaire
        const nom = contactForm.querySelector('input[type="text"]').value;
        const prenom = contactForm.querySelector(
            'input[type="text"]:nth-of-type(2)'
        ).value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector(
            'input[type="text"]:nth-of-type(3)'
        ).value;

        // Valide les données
        if (validateFormData(nom, prenom, email, message)) {
            // Crée un objet avec les données du formulaire
            const formData = { nom, prenom, email, message };
            sendForm(formData);
        }
    });
});
