import Basket from './basket.service';

class Confirmation {
    constructor() {
        this.confirmation = JSON.parse(localStorage.getItem('confirmation'));
        if (this.confirmation.status) {
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
    saveConfirmation() {
        localStorage.setItem('confirmation', JSON.stringify(this.confirmation));
    }
    orderCancel() {
        this.confirmation = {
            status: false
        };
        this.saveConfirmation();
        Basket.cancelBasket();
    }
    setConfirmation(contact, products, orderId, shop, totalArticles, totalPrice) {
        if (contact && products && orderId && shop) {
            this.confirmation[shop] = { contact, products, orderId, shop, totalArticles, totalPrice };
            this.saveConfirmation();
        }
    }
    orderCompleted(status) {
        this.confirmation.status = status;
        this.saveConfirmation();
    }

}
export default new Confirmation()