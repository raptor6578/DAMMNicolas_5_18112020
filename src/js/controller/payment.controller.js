import Render from '../services/render.service';
import Confirmation from '../services/confirmation.service';

export default function PaymentController() {
    // Vérification de l'état de la commande
    if (Confirmation.confirmation.status) {
        Render('payment', {confirmation: Confirmation.confirmation});
        // Event du bouton "cancel" permettant d'annuler la commande
        const paymentOrderedCancel = document.getElementById('payment__ordered__cancel');
        paymentOrderedCancel.addEventListener('click', () => {
            Confirmation.orderCancel();
            window.location.href = "/";
        });
    } else {
        // La commande n'est pas validée on redirige vers la page d'accueil
        window.location.href = "/";
    }
}

