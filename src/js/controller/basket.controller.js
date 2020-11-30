import Render from '../services/render.service';
import Basket from '../services/basket.service';

export default function BasketController() {
    const products = Basket.getAllProducts();
    if (products.length > 0) {
        const totalPrice = Basket.getTotalPrice();
        Render('basket', {products, totalPrice});
        initializeEvent();
    } else {
        const empty = true;
        Render('basket', {empty})
    }
}
function initializeEvent() {
    const deleteProduct = document.getElementsByClassName('basket__item__customization__delete');
    for (const product of deleteProduct) {
        product.addEventListener('click', event => {
            const id = event.target['value'];
            const selectCustomization = document.getElementById('select__'+id);
            const customization = selectCustomization['value'];
            const hiddenShop = document.getElementById('shop__'+id);
            const shop = hiddenShop['value'];
            Basket.deleteProduct(id, customization, shop);
            BasketController();
        });
    }
    const validatePanier = document.getElementById('basket__form__submit');
    validatePanier.addEventListener('click', event => {
        const form = document.getElementById('basket__form');
        const formData = new FormData(form);
        const errors = Basket.verifForm(formData);
        if (errors.length > 0) {
            Render('basket__error', {errors});
        } else {

        }
        event.preventDefault();
    });
}