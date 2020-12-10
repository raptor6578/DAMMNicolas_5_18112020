/**
 * Model du panier contenant les produits de chaque boutique
 *
 * @param {Object} [data] - Données provenant du localStorage
 * @param {Object.<string, Product>} data.camera - Panier "camera" chaque "Product" a pour clé l'id du produit
 * @param {Object.<string, Product>} data.teddy - Panier "teddy" chaque "Product"" a pour clé l'id du produit
 * @param {Object.<string, Product>} data.furniture - Panier "furniture" chaque "Product"" a pour clé l'id du produit
 * @param {number} data.totalPrice - Prix total pour toute les boutiques
 * @param {number} data.totalArticles - Nombre total d'articles pour toute les boutiques
 */
class Basket {
    constructor(data) {
        data && data.camera ? this.camera = data.camera : this.camera = {};
        data && data.teddy ? this.teddy = data.teddy : this.teddy = {};
        data && data.furniture ? this.furniture = data.furniture : this.furniture = {};
        data && data.totalPrice ? this.totalPrice = data.totalPrice : this.totalPrice = 0;
        data && data.totalArticles ? this.totalArticles = data.totalArticles : this.totalArticles = 0;
    }
}

export default Basket;