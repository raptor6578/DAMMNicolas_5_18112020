import Http from '../services/http.service';
import Render from '../services/render.service';
import ProductData from "../models/productData.model";

export default function HomeController() {
    // Récupération des donnnées via l'API
    Http.getAllCameras().then((response) => {
        response.json()
            .then((data) => {
                const items = [];
                //Création d'objets correspondants au model "ProductData"
                for (const item of data) items.push(new ProductData(item));
                //Envoi du tableau de données vers la template
                Render('camera__items', {items});
            })
    });

    Http.getAllTeddies().then((response) => {
        response.json()
            .then((data) => {
                const items = [];
                for (const item of data) items.push(new ProductData(item));
                Render('teddy__items', {items});
            })
    });

    Http.getAllFurniture().then((response) => {
        response.json()
            .then((data) => {
                const items = [];
                for (const item of data) items.push(new ProductData(item));
                Render('furniture__items', {items});
            })
    });
}

