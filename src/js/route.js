import Route from './services/route.service';
import AccueilController from './controller/accueil.controller';
import PanierController from './controller/panier.controller';
import ProduitController from "./controller/produit.controller";
import ConfirmationController from "./controller/confirmation.controller";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

switch (urlParams.get('route')) {
    case 'panier':
        Route('panier', PanierController);
        break;
    case 'produit':
        Route('produit', ProduitController);
        break;
    case 'confirmation':
        Route('confirmation', ConfirmationController);
        break;
    default:
       Route('accueil', AccueilController);
       break;
}