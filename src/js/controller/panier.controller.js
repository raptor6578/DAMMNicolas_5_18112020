import Render from '../services/render.service';
import Panier from '../services/panier.service';
import Http from '../services/http.service';

export default function PanierController() {
    const initializeEventTemplate = () => {
        const deleteProduct = document.getElementsByClassName('panier__item__customization__delete');
        for (let i = 0; i < deleteProduct.length; i++) {
            deleteProduct[i].addEventListener('click', event => {
                const customization = document.getElementById(event.target['value']);
                console.log(event.target['value']+' '+customization.value);
                //Panier.down(event.target['value'], customization.value);
                //initializeTemplate();
            });
        }
    };
    const initializeTemplate = () => {
        const panier = Panier.getPanier();
        for (const id in panier) {
            if (panier.hasOwnProperty(id)) {
                switch (panier[id]['type']) {
                    case 'camera':
                        Http.getCameraFromId(id).then(response => {
                            response.json()
                                .then((data) => {
                                    panier[id] = Object.assign(panier[id], data);
                                    Render('panier', {panier: Object.values(panier)});
                                    initializeEventTemplate();
                                })
                        });
                        break;
                    case 'teddy':
                        Http.getTeddyFromId(id).then(response => {
                            response.json()
                                .then((data) => {
                                    panier[id] = Object.assign(panier[id], data);
                                    Render('panier', {panier: Object.values(panier)});
                                    initializeEventTemplate();
                                })
                        });
                        break;
                    case 'furniture':
                        Http.getFurnitureFromId(id).then(response => {
                            response.json()
                                .then((data) => {
                                    panier[id] = Object.assign(panier[id], data);
                                    Render('panier', {panier: Object.values(panier)});
                                    initializeEventTemplate();
                                })
                        });
                        break;
                }
            }
        }
        console.log(panier);
    };
    initializeTemplate();
}