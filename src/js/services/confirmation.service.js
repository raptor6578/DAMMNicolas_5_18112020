import Basket from './basket.service';

class Confirmation {
    constructor() {
        this.confirmation = JSON.parse(localStorage.getItem('confirmation'));
        if (this.confirmation && this.confirmation.status) {
            const basketLink = document.getElementById('basket__link');
            basketLink.style.display = 'none';
            const paymentLink = document.getElementById('payment__link');
            paymentLink.style.display = 'inline-block';
        } else {
            this.confirmation = {
                status: false
            }
        }
    }
    // Enregistrer l'objet "confirmation" dans le localStorage en format json
    saveConfirmation() {
        localStorage.setItem('confirmation', JSON.stringify(this.confirmation));
    }
    // Annuler la commande
    orderCancel() {
        this.confirmation = {
            status: false
        };
        this.saveConfirmation();
        Basket.cancelBasket();
    }
    // Confirmer une boutique
    setConfirmation(contact, products, orderId, shop, totalArticles, totalPrice) {
        if (contact && products && orderId && shop) {
            const lastPictures = Basket.getLastPicturesByShop(shop);
            this.confirmation[shop] = { contact, products, orderId, shop, lastPictures, totalArticles, totalPrice };
            this.saveConfirmation();
        }
    }
    // Passer confirmation.status a true ou false permet de connaitre l'état de la commande
    orderCompleted(status) {
        this.confirmation.status = status;
        this.saveConfirmation();
    }

}
export default new Confirmation()