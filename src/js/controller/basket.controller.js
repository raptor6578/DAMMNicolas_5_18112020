import Render from '../services/render.service';
import Basket from '../services/basket.service';

export default function BasketController() {
    const products = Basket.getAllProducts();
    const totalPrice = Basket.getTotalPrice();
    Render('basket', {products, totalPrice});
    initializeEvent();
}
function initializeEvent() {
    const deleteProduct = document.getElementsByClassName('basket__item__customization__delete');
    for (let i = 0; i < deleteProduct.length; i++) {
        deleteProduct[i].addEventListener('click', event => {
            const id = event.target['value'];
            const selectCustomization = document.getElementById('select__'+id);
            const valueCustomization = selectCustomization['value'];
            const hiddenShop = document.getElementById('shop__'+id);
            const valueShop = hiddenShop['value'];
            console.log(id+' '+valueCustomization+ ' '+valueShop);
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