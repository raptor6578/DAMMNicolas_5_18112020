import Http from '../services/http.service';
import Render from '../services/render.service';
import Basket from '../services/basket.service';
import Confirmation from '../services/confirmation.service';
import ProductDataModel from "../models/productData.model";

/**
 * Controller de la route "product"
 *
 * @param {string} params - paramètres se trouvant dans l'URL
 */

export default function ProductController(params) {
    let productData;

    /* Initialisation des events */
    const initializeEventTemplate = () => {

        /* Element html du bouton d'ajout */
        const addProduct = document.getElementById('product__button');

        /* Si une commande a été validée et qu'elle est en attente de paiement on désactive le bouton ajouter */
        if (Confirmation.confirmation.status) {
            addProduct.disabled = true;
        }

        /* EventListener permettant de détecter le clic sur le bouton ajouter */
        addProduct.addEventListener('click', event => {

            /* Personnalisation du produit qu'on récupère dans la balise "select" */
            const selectCustomization = document.getElementById('product__customization');
            const customization = selectCustomization.value;

            /* Boutique d'ou provient le produit */
            const shop = event.target['value'];

            /* Ajout du produit au panier */
            Basket.setProduct(productData, customization, shop);
        });
    };

    /* Vérification de la provenance du produit pour le récupérer à partir de la boutique concernée
       Utilisation de la méthode approprié pour la boutique concernée
       Formatage des données de l'API à partir du model ProductData et envoi des données à la template */
    switch (params.get('shop')) {
        case 'camera':
            Http.getCameraFromId(params.get('id')).then((response) => {
                response.json()
                    .then((data) => {
                        productData = new ProductDataModel(data);
                        Render('product', {productData, shop: 'camera'});
                        initializeEventTemplate();
                    })
            });
            break;
        case 'teddy':
            Http.getTeddyFromId(params.get('id')).then((response) => {
                response.json()
                    .then((data) => {
                        productData = new ProductDataModel(data);
                        Render('product', {productData, shop: 'teddy'});
                        initializeEventTemplate();
                    })
            });
            break;
        case 'furniture':
            Http.getFurnitureFromId(params.get('id')).then((response) => {
                response.json()
                    .then((data) => {
                        productData = new ProductDataModel(data);
                        Render('product', {productData, shop: 'furniture'});
                        initializeEventTemplate();
                    })
            });
            break;
    }
}

