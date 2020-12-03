import Render from '../services/render.service';
import Confirmation from '../services/confirmation.service';

export default function PaymentController() {
    if (Confirmation.confirmation.status) {
        console.log(Confirmation.confirmation)
        Render('payment', {});
        const paymentOrderedCancel = document.getElementById('payment__ordered__cancel');
        paymentOrderedCancel.addEventListener('click', () => {
            Confirmation.orderCancel();
            window.location.href = "/";
        });
    } else {
        window.location.href = "/";
    }
}

