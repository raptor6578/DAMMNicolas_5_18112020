import Basket from './basket.service';

/**
 * class permettant de gérer la confirmation du panier
 */
class Confirmation {

    /**
     * Le constructor crée un objet javascript à partir du localStorage
     * Cet objet peut être null si le localStorage n'existe pas
     * Si le panier a été confirmé on désactive le bouton "panier" et on affiche le bouton "ma commande"
     * Dans le cas contraire on passe le status de la confirmation à "false"
     */
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

    /**
     * La méthode permet de transformer l'objet "confirmation" en données json et de le sauvegarder dans le localStorage
     */
    saveConfirmation() {
        const json = JSON.stringify(this.confirmation);
        localStorage.setItem('confirmation', json);
    }

    /**
     * La méthode permet d'annuler la commande et de vider ensuite le panier
     */
    orderCancel() {
        this.confirmation = {
            status: false
        };
        this.saveConfirmation();
        Basket.cancelBasket();
    }

    /**
     * La méthode permet d'enregistrer la confirmation de la commande d'une boutique et d'enregistrer la reponse serveur
     *
     * @param {Object} contact - données entrées dans le formulaire de confirmation
     * @param {string[]} products - id des produits confirmés
     * @param {string} orderId - id de la commande
     * @param {string} shop - la boutique concernée par la commande
     * @param {number} totalArticles - nombre total de produits
     * @param {number} totalPrice - prix total de la commande
     */
    setConfirmation(contact, products, orderId, shop, totalArticles, totalPrice) {
        if (contact && products && orderId && shop) {
            const lastPictures = Basket.getLastPicturesByShop(shop);
            this.confirmation[shop] = { contact, products, orderId, shop, lastPictures, totalArticles, totalPrice };
            this.saveConfirmation();
        }
    }

    /**
     * La méthode permet de changer le status de la commande
     *
     * @param {boolean} status - status de la commande true ou false
     */
    orderCompleted(status) {
        this.confirmation.status = status;
        this.saveConfirmation();
    }

}
export default new Confirmation()