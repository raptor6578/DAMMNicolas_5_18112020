/**
 * Model du produit dans le panier
 * @param {Object} data - Données permettant de manipuler le produit dans le panier
 * @param {string} data.shop - La boutique d'ou provient le produit
 * @param {number} data.totalArticles - Total d'articles du même produit
 * @param {string[]} data.customization - Personnalisation du produit
 * @param {number} data.totalPrice - prix total du même produit
 * @param {ProductData} data.productData - data retournées par l'API correspondant au model ProductData
 */
class Product {
    constructor(data) {
        this.shop = data.shop;
        this.totalArticles = data.totalArticles;
        this.customization = [data.customization];
        this.totalPrice = data.totalPrice;
        this.productData = data.productData;
    }
}

export default Product;