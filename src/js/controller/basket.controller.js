import Render from '../services/render.service';
import Basket from '../services/basket.service';
import Http from '../services/http.service';

export default function BasketController() {
    const products = Basket.getAllProducts();
    if (products.length > 0) {
        const totalPrice = Basket.getTotalPrice();
        Render('basket', {products, totalPrice});
        initializeEventTemplate();
    } else {
        const empty = true;
        Render('basket', {empty})
    }
}
function initializeEventTemplate() {
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
    const validateBasket = document.getElementById('basket__form__submit');
    validateBasket.addEventListener('click', event => {
        const form = document.getElementById('basket__form');
        const formData = new FormData(form);
        const errors = Basket.verifForm(formData);
        if (errors) {
            Render('basket__error', {errors});
        } else {
            const object = {};
            object.contact = {};
            formData.forEach((value, key) => object.contact[key] = value);
            object.products = Basket.getAllIdByShop('camera');
            const json = JSON.stringify(object);
            Http.postCamera(json)
                .then(response => response.json()
                    .then(data => console.log(data)));
        }
        event.preventDefault();
    });
}