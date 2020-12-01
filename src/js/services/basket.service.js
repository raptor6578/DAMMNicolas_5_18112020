import BasketModel from '../models/basket.model';
import ProductModel from '../models/product.model';
import Render from "./render.service";

class Basket {
    constructor() {
        const storage = JSON.parse(localStorage.getItem('basket'));
        this.basket = new BasketModel(storage);
        this.countTotalArticles();

    }
    saveBasket() {
        localStorage.setItem('basket', JSON.stringify(this.basket));
    }
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
   countTotalArticles() {
       Render('basket__count', {count: this.basket.totalArticles});
   }
   getAllProducts() {
        let products = {};
        Object.assign(products, this.basket.camera);
        Object.assign(products, this.basket.teddy);
        Object.assign(products, this.basket.furniture);
        return Object.values(products);
   }
   getAllIdByShop(shop) {
        const id = [];
        for (const product of Object.values(this.basket[shop])) {
            const totalArticles = product.totalArticles;
            for (let i=0;i<totalArticles;i++) {
                id.push(product.productData._id);
            }
        }
        return id;
   }
   getTotalPrice() {
        return this.basket.totalPrice;
   }
   verifForm(formData) {
        const errors = [];
        if (!formData.get('firstName')) errors.push('Vous devez renseigner un prénom.');
        if (!formData.get('lastName')) errors.push('Vous devez renseigner un nom.');
        if (!formData.get('address')) errors.push('Vous devez renseigner votre adresse.');
        if (!formData.get('city')) errors.push('Vous devez renseigner votre ville.');
        if (!formData.get('email')) errors.push('Vous devez renseigner votre email.');
        if (errors.length > 0) {
            return errors;
        } else {
            return false;
        }
   }
}
export default new Basket();