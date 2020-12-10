import Http from '../services/http.service';
import Render from '../services/render.service';
import ProductData from "../models/productData.model";

/**
 * Controller de la route "home"
 */
export default function HomeController() {

    /* Récupération de tous les produits de la boutique des caméras */
    Http.getAllCameras().then((response) => {
        response.json()
            .then((data) => {
                const items = [];

                /* Création d'objets correspondants au model "ProductData" et enregistrement dans le tableau "items" */
                for (const item of data) items.push(new ProductData(item));

                /* Envoi du tableau de données vers la template */
                Render('camera__items', {items});
            })
    });

    /* Récupération de tous les produits de la boutique des ours en peluche */
    Http.getAllTeddies().then((response) => {
        response.json()
            .then((data) => {
                const items = [];

                /* Création d'objets correspondants au model "ProductData" et enregistrement dans le tableau "items" */
                for (const item of data) items.push(new ProductData(item));

                /* Envoi du tableau de données vers la template */
                Render('teddy__items', {items});
            })
    });

    /* Récupération de tous les produits de la boutique des meubles */
    Http.getAllFurniture().then((response) => {
        response.json()
            .then((data) => {
                const items = [];

                /* Création d'objets correspondants au model "ProductData" et enregistrement dans le tableau "items" */
                for (const item of data) items.push(new ProductData(item));

                /* Envoi du tableau de données vers la template */
                Render('furniture__items', {items});
            })
    });
}

