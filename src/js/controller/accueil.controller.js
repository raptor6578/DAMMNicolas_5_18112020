import Http from '../services/http.service';
import Render from '../services/render.service';

export default function AccueilController(params) {
    Http.getAllCameras().then((response) => {
        response.json()
            .then((data) => {
                Render('camera__items', data);
            })
    });

    Http.getAllTeddies().then((response) => {
        response.json()
            .then((data) => {
                Render('teddy__items', data);
            })
    });

    Http.getAllFurniture().then((response) => {
        response.json()
            .then((data) => {
                Render('furniture__items', data);
            })
    });
}

