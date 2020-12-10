/**
 * Model des données retournées par l'API
 *
 * @param {Object} data - objet contenant le produit retourné par l'API du serveur
 * @param {string} data._id - id du produit
 * @param {string} data.name - nom du produit
 * @param {number} data.price - prix en centime
 * @param {string} data.description - description du produit
 * @param {string} data.imageUrl - image du produit
 * @param {string[]} data.lenses - lentilles pour les caméras
 * @param {string[]} data.colors - couleurs des ours en peluche
 * @param {string[]} data.vernis - vernis des meubles
 */
class ProductData {
    constructor(data) {
        this._id = data._id;
        this.name = data.name;
        this.price = data.price / 100;
        this.description = data.description;
        this.imageUrl = data.imageUrl;
        if (data['lenses']) this.customization = data['lenses'];
        if (data['colors']) this.customization = data['colors'];
        if (data['varnish']) this.customization = data['varnish'];
    }
}

export default ProductData;