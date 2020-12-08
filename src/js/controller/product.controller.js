import Http from '../services/http.service';
import Render from '../services/render.service';
import Basket from '../services/basket.service';
import Confirmation from '../services/confirmation.service';
import ProductDataModel from "../models/productData.model";

export default function ProductController(params) {
    let productData;
    // Initialisation des events
    const initializeEventTemplate = () => {
        const addProduct = document.getElementById('product__button');
        if (Confirmation.confirmation.status) {
            addProduct.disabled = true;
        }
        // Ajout d'un produit dans le panier
        addProduct.addEventListener('click', event => {
            const selectCustomization = document.getElementById('product__customization');
            const customization = selectCustomization.value;
            const shop = event.target['value'];
            Basket.setProduct(productData, customization, shop);
        });
    };
    // Vérification de la provenance du produit pour le récupérer à partir de la boutique concernée
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

