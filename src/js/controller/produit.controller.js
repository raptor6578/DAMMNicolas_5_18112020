import Http from '../services/http.service';
import Render from '../services/render.service';
import Panier from '../services/panier.service';
import Formatter from '../services/formatter.service';

export default function ProduitController(params) {
    const initializeEventTemplate = () => {
        const addProduit = document.getElementById('produit__boutton');
        addProduit.addEventListener('click', event => {
            const customization = document.getElementById('produit__customization');
            const type = document.getElementById('produit__type');
            Panier.up(event.target['value'], type.value, customization.value);
        });
    };
    if (params.get('categorie') === 'camera') {
        Http.getCameraFromId(params.get('id')).then((response) => {
            response.json()
                .then((data) => {
                    data['type'] = 'camera';
                    Render('produit', {produit: Formatter.item(data)});
                    initializeEventTemplate();
                })
        });
    }
    if (params.get('categorie') === 'teddy') {
        Http.getTeddyFromId(params.get('id')).then((response) => {
            response.json()
                .then((data) => {
                    data['type'] = 'teddy';
                    Render('produit', {produit: Formatter.item(data)});
                    initializeEventTemplate();
                })
        });
    }
    if (params.get('categorie') === 'furniture') {
        Http.getFurnitureFromId(params.get('id')).then((response) => {
            response.json()
                .then((data) => {
                    data['type'] = 'furniture';
                    Render('produit', {produit: Formatter.item(data)});
                    initializeEventTemplate();
                })
        });
    }
}

