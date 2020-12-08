import Render from '../services/render.service';
import Basket from '../services/basket.service';
import Http from '../services/http.service';
import Confirmation from '../services/confirmation.service';

export default function BasketController() {
    // Si la commande est confirmée on redirige vers la route "payment"
    if (Confirmation.confirmation.status) {
        window.location.href = "/?route=payment";
    }
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
// Initialisation des "EventListener"
function initializeEventTemplate() {
    //Suppression d'un produit
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
    // Validation du panier
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
            const productsCamera = Basket.getAllIdByShop('camera');
            const productsTeddy = Basket.getAllIdByShop('teddy');
            const productsFurniture = Basket.getAllIdByShop('furniture');
            let countPost = 0;
            let totalShop = 0;
            // Création d'une promesse permettant de vérifier que toute les commandes ont été validées par l'API
            const postShop = new Promise((resolve, reject) => {
                if (productsCamera) {
                    totalShop++;
                    object.products = productsCamera;
                    const json = JSON.stringify(object);
                    Http.postCamera(json)
                        .then(response => response.json()
                            .then(data => {
                                Confirmation.setConfirmation(data.contact,
                                    data.products,
                                    data.orderId,
                                    'camera',
                                    Basket.getTotalArticlesByShop('camera'),
                                    Basket.getTotalPriceByShop('camera'));
                                countPost++;
                                if (countPost === totalShop) {
                                    resolve();
                                }
                            }));
                }
                if (productsTeddy) {
                    totalShop++;
                    object.products = productsTeddy;
                    const json = JSON.stringify(object);
                    Http.postTeddy(json)
                        .then(response => response.json()
                            .then(data => {
                                Confirmation.setConfirmation(data.contact,
                                    data.products,
                                    data.orderId,
                                    'teddy',
                                    Basket.getTotalArticlesByShop('teddy'),
                                    Basket.getTotalPriceByShop('teddy'));
                                countPost++;
                                if (countPost === totalShop) {
                                    resolve();
                                }
                            }));
                }
                if (productsFurniture) {
                    totalShop++;
                    object.products = productsFurniture;
                    const json = JSON.stringify(object);
                    Http.postFurniture(json)
                        .then(response => response.json()
                            .then(data => {
                                Confirmation.setConfirmation(data.contact,
                                    data.products,
                                    data.orderId,
                                    'furniture',
                                    Basket.getTotalArticlesByShop('furniture'),
                                    Basket.getTotalPriceByShop('furniture'));
                                countPost++;
                                if (countPost === totalShop) {
                                    resolve();
                                }
                            }));
                }
            });
            // Validation de la commande et redirection vers la route "payment"
            postShop.then(() => {
                Confirmation.orderCompleted(true);
                window.location.href = "/?route=payment";
            })
        }
        event.preventDefault();
    });
}