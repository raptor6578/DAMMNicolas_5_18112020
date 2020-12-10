import Render from '../services/render.service';
import Confirmation from '../services/confirmation.service';

/**
 * Controller de la route "payement"
 */
export default function PaymentController() {

    /* Vérification de l'état de la commande */
    if (Confirmation.confirmation.status) {
        Render('payment', {confirmation: Confirmation.confirmation});

        /* Event du bouton "cancel" permettant d'annuler la commande */
        const paymentOrderedCancel = document.getElementById('payment__ordered__cancel');
        paymentOrderedCancel.addEventListener('click', () => {
            Confirmation.orderCancel();
            window.location.href = "/";
        });
    /* La commande n'est pas encore validée l'accès à cette page est interdit on redirige vers la page d'accueil */
    } else {
        window.location.href = "/";
    }
}

