import Render from "./services/render.service";
import Basket from "./services/basket.service";

/**
 * Code à appliquer sur l'ensemble du site
 */

Render('basket__count', {count: Basket.countTotalArticles()});