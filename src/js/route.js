import Route from './services/route.service';
import HomeController from './controller/home.controller';
import BasketController from './controller/basket.controller';
import ProductController from "./controller/product.controller";
import PaymentController from "./controller/payment.controller";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

switch (urlParams.get('route')) {
    case 'basket':
        Route('basket', BasketController);
        break;
    case 'product':
        Route('product', ProductController);
        break;
    case 'payment':
        Route('payment', PaymentController);
        break;
    default:
       Route('home', HomeController);
       break;
}