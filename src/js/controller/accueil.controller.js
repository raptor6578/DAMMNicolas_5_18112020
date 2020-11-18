import Http from '../services/http.service';
import Render from '../services/render.service';

export default function AccueilController(params) {
    Http.getAllCameras().then((response) => {
        response.json()
            .then((data) => {
                Render('camera__items', {items: data});
            })
    });

    Http.getAllTeddies().then((response) => {
        response.json()
            .then((data) => {
                Render('teddy__items', {items: data});
            })
    });

    Http.getAllFurniture().then((response) => {
        response.json()
            .then((data) => {
                Render('furniture__items', {items: data});
            })
    });
}

