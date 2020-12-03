class Confirmation {
    constructor() {
        this.confirmation = JSON.parse(localStorage.getItem('confirmation'));
        if (!this.confirmation) this.confirmation = {
            status: false
        }
    }
    saveConfirmation() {
        localStorage.setItem('confirmation', JSON.stringify(this.confirmation));
    }
    setConfirmation(contact, products, orderId, shop) {
        if (contact && products && orderId && shop) {
            this.confirmation[shop] = { contact, products, orderId, shop };
            this.saveConfirmation();
        }
    }
    orderCompleted(status) {
        this.confirmation.status = status;
        this.saveConfirmation();
    }
}
export default new Confirmation()