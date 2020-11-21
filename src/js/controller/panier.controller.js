import Render from '../services/render.service';
import Panier from '../services/panier.service';
import Http from '../services/http.service';
import Formatter from '../services/formatter.service';

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
}