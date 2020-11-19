import Http from '../services/http.service';
import Render from '../services/render.service';
import Panier from '../services/panier.service';

export default function ProduitController(params) {
    if (params.get('categorie') === 'camera') {
        Http.getCameraFromId(params.get('id')).then((response) => {
            response.json()
                .then((data) => {
                    Render('produit', {produit: data});
                })
        });
    }
    if (params.get('categorie') === 'teddy') {
        Http.getTeddyFromId(params.get('id')).then((response) => {
            response.json()
                .then((data) => {
                    Render('produit', {produit: data});
                })
        });
    }
    if (params.get('categorie') === 'furniture') {
        Http.getFurnitureFromId(params.get('id')).then((response) => {
            response.json()
                .then((data) => {
                    Render('produit', {produit: data});
                })
        });
    }
    window.addPanier = function(id) {
        Panier.up(id);
    };
}

