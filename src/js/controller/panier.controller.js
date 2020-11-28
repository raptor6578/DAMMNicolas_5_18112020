import Render from '../services/render.service';
import Panier from '../services/panier.service';
import Http from '../services/http.service';
import Formatter from '../services/formatter.service';
import Route from '../services/route.service';
import ConfirmationController from "../controller/confirmation.controller";

export default function PanierController() {
    initializeTemplate();
}
function initializeTemplate() {
    const panier = Panier.getPanier();
    if (Object.values(panier).length) {
        for (const id in panier) {
            if (panier.hasOwnProperty(id)) {
                switch (panier[id]['type']) {
                    case 'camera':
                        Http.getCameraFromId(id)
                            .then(response => response.json()
                                .then((data) => initializeData(id, panier, data)));
                        break;
                    case 'teddy':
                        Http.getTeddyFromId(id)
                            .then(response => response.json()
                                .then((data) => initializeData(id, panier, data)));
                        break;
                    case 'furniture':
                        Http.getFurnitureFromId(id)
                            .then(response => response.json()
                                .then((data) => initializeData(id, panier, data)));
                        break;
                }
            }
        }
    } else {
        Render('panier', {empty: true});
    }
}
function initializeData(id, panier, data) {
    panier[id] = Object.assign(panier[id], data);
    panier[id] = Formatter.price(panier[id]);
    panier[id] = Formatter.totalPriceProduct(panier[id]);
    const totalPriceGlobal = Formatter.totalPriceGlobal(panier);
    Render('panier', {panier: Object.values(panier), totalPriceGlobal});
    initializeEventTemplate();
}
function initializeEventTemplate() {
    const deleteProduct = document.getElementsByClassName('panier__item__customization__delete');
    for (let i = 0; i < deleteProduct.length; i++) {
        deleteProduct[i].addEventListener('click', event => {
            const customization = document.getElementById(event.target['value']);
            Panier.down(event.target['value'], customization.value);
            initializeTemplate();
            Panier.count();
        });
    }
    const validatePanier = document.getElementById('panier__form__submit');
    validatePanier.addEventListener('click', event => {
        const form = document.getElementById('panier__form');
        const formData = new FormData(form);
        const errors = Panier.verifForm(formData);
        if (errors.length > 0) {
            Render('panier__error', {errors});
        } else {
            const object = {};
            formData.forEach((value, key) => object[key] = value);
            const json = JSON.stringify(object);
            Http.postCamera(json)
                .then(response => response.json().then(data => console.log(data)));
            Route('confirmation', ConfirmationController);
        }
        event.preventDefault();
    });
}