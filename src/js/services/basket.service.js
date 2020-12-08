import BasketModel from '../models/basket.model';
import ProductModel from '../models/product.model';
import Render from "./render.service";

class Basket {
    constructor() {
        const storage = JSON.parse(localStorage.getItem('basket'));
        this.basket = new BasketModel(storage);
        this.countTotalArticles();
    }
    // Enregistrement du panier
    saveBasket() {
        localStorage.setItem('basket', JSON.stringify(this.basket));
    }
    // Vider le panier
    cancelBasket() {
        this.basket = new BasketModel({});
        this.saveBasket();
    }
    // Enregistrer un produit
    setProduct(productData, customization, shop) {
       if (this.basket[shop][productData._id]) {
           this.basket[shop][productData._id].totalArticles++;
           this.basket[shop][productData._id].customization.push(customization);
           this.basket[shop][productData._id].totalPrice += productData.price;
       } else {
           this.basket[shop][productData._id] = new ProductModel({
               shop,
               totalArticles: 1,
               customization,
               totalPrice: productData.price,
               productData
           });
       }
       this.basket.totalArticles++;
       this.basket.totalPrice += productData.price;
       this.countTotalArticles();
       this.saveBasket();
   }
   // Supprimer un produit
   deleteProduct(id, customization, shop) {
        if (this.basket[shop][id]
            && this.basket[shop][id].customization.includes(customization)) {
            const index = this.basket[shop][id].customization.indexOf(customization);
            this.basket[shop][id].customization.splice(index, 1);
            this.basket.totalArticles--;
            this.basket.totalPrice -= this.basket[shop][id].productData.price;
            if (this.basket[shop][id].totalArticles > 1) {
                this.basket[shop][id].totalArticles--;
                this.basket[shop][id].totalPrice -= this.basket[shop][id].productData.price;
            } else {
                delete this.basket[shop][id];
            }
            this.countTotalArticles();
            this.saveBasket();
        } else {
            return false;
        }
   }
   // Afficher le nombre de produits dans le panier à côté du bouton "Panier"
   countTotalArticles() {
       Render('basket__count', {count: this.basket.totalArticles});
   }
   // Retourner tous les produits dans un tableau
   getAllProducts() {
        let products = {};
        Object.assign(products, this.basket.camera);
        Object.assign(products, this.basket.teddy);
        Object.assign(products, this.basket.furniture);
        return Object.values(products);
   }
   // Retourner tous les Id d'une boutique (dupliquer l'id si totalArticles > 1)
   getAllIdByShop(shop) {
        if (Object.keys(this.basket[shop]).length > 0) {
            const id = [];
            for (const product of Object.values(this.basket[shop])) {
                const totalArticles = product.totalArticles;
                for (let i = 0; i < totalArticles; i++) {
                    id.push(product.productData._id);
                }
            }
            return id;
        } else {
            return false;
        }
   }
   // Retourner les 4 dernières images des produits ajouté a une boutique pour la page "confirmation"
   getLastPicturesByShop(shop) {
        const lastPictures = [];
        let count = 0;
        for (const id of Object.keys(this.basket[shop])) {
            count++;
            lastPictures.push({
                imageUrl: this.basket[shop][id].productData.imageUrl,
                count
            });
            if (count === 4) break;
        }
        return lastPictures;
   }
   // Retourner le prix total du panier
   getTotalPrice() {
        return this.basket.totalPrice;
   }
   getTotalPriceByProduct(shop, id) {
        return this.basket[shop][id].totalPrice;
   }
   // Retourner le prix total d'une boutique
   getTotalPriceByShop(shop) {
        let totalPrice = 0;
        for (const id of Object.keys(this.basket[shop])) {
            totalPrice += this.basket[shop][id].totalPrice;
        }
        return totalPrice;
   }
   // Retourner le nombre total d'article dans une boutique
   getTotalArticlesByShop(shop) {
        let totalArticles = 0;
        for (const id of Object.keys(this.basket[shop])) {
            totalArticles += this.basket[shop][id].totalArticles;
        }
        return totalArticles;
   }
   // Vérifier le formulaire de confirmation
   verifForm(formData) {
        const errors = [];
        if (!formData.get('firstName')) errors.push('Vous devez renseigner un prénom.');
        if (!formData.get('lastName')) errors.push('Vous devez renseigner un nom.');
        if (!formData.get('address')) errors.push('Vous devez renseigner votre adresse.');
        if (!formData.get('city')) errors.push('Vous devez renseigner votre ville.');
        if (!formData.get('email')) errors.push('Vous devez renseigner votre email.');
        if (!/\S+@\S+\.\S+/.test(formData.get('email'))) errors.push('Votre adresse email est invalide.');
        if (errors.length > 0) {
            return errors;
        } else {
            return false;
        }
   }
}
export default new Basket();