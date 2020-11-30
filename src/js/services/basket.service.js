import BasketModel from '../models/basket.model';
import ProductModel from '../models/product.model';

class Basket {
    constructor() {
        const storage = JSON.parse(localStorage.getItem('basket'));
        this.basket = new BasketModel(storage);
        this.countTotalArticles();

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
   countTotalArticles() {
        return this.basket.totalArticles;
   }
   getAllProducts() {
        let products = Object.assign(this.basket.camera, this.basket.teddy);
        products = Object.assign(products, this.basket.furniture);
        return Object.values(products);
   }
   getAllProductsByShop(shop) {
        if (shop) return Object.values(this.basket[shop]);
   }
   getTotalPrice() {
        return this.basket.totalPrice;
   }
   saveBasket() {
       localStorage.setItem('basket', JSON.stringify(this.basket));
   }
   verifForm(formData) {
        const errors = [];
        if (!formData.get('firstName')) errors.push('Vous devez renseigner un prénom.');
        if (!formData.get('lastName')) errors.push('Vous devez renseigner un nom.');
        if (!formData.get('address')) errors.push('Vous devez renseigner votre adresse.');
        if (!formData.get('city')) errors.push('Vous devez renseigner votre ville.');
        if (!formData.get('email')) errors.push('Vous devez renseigner votre email.');
        return errors;
   }
}
export default new Basket();