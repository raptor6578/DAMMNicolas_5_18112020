import Http from '../services/http.service';
import Render from '../services/render.service';
import Formatter from '../services/formatter.service';

export default function AccueilController() {
    Http.getAllCameras().then((response) => {
        response.json()
            .then((data) => {
                Render('camera__items', {items: Formatter.price(data, 'multiple')});
            })
    });

    Http.getAllTeddies().then((response) => {
        response.json()
            .then((data) => {
                Render('teddy__items', {items: Formatter.price(data, 'multiple')});
            })
    });

    Http.getAllFurniture().then((response) => {
        response.json()
            .then((data) => {
                Render('furniture__items', {items: Formatter.price(data, 'multiple')});
            })
    });
}

