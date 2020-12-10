import Render from '../services/render.service';
import Basket from '../services/basket.service';
import Http from '../services/http.service';
import Confirmation from '../services/confirmation.service';

/**
 * Controller de la route "Basket"
 */
export default function BasketController() {

    /* Si la commande a déjà été confirmée on redirige vers la route "payment" */
    if (Confirmation.confirmation.status) {
        window.location.href = "/?route=payment";
    }

    /* Sinon on récupere les produits du panier pour les envoyer vers la template */
    const products = Basket.getAllProducts();
    if (products.length > 0) {
        const totalPrice = Basket.getTotalPrice();
        Render('basket', {products, totalPrice});
        initializeEventTemplate();
    } else {

        /* Si le panier est vide on le signal à la template */
        const empty = true;
        Render('basket', {empty})
    }
}

/**
 * Initialisation des "EventListener"
 */
function initializeEventTemplate() {

    /* Class des boutons qui permettent de supprimer un produit du panier   */
    const deleteProduct = document.getElementsByClassName('basket__item__customization__delete');

    /* Boucle sur les éléments pour créer des "EventListener" permettant de détecter le clic */
    for (const product of deleteProduct) {
        product.addEventListener('click', event => {

            /* Id du produit se trouvant dans l'attribut "value" du bouton */
            const id = event.target['value'];

            /* Personnalisation à supprimer se trouvant dans la balise "select" */
            const selectCustomization = document.getElementById('select__'+id);
            const customization = selectCustomization['value'];

            /* Boutique d'ou provient le produit se trouvant dans un input "hidden" */
            const hiddenShop = document.getElementById('shop__'+id);
            const shop = hiddenShop['value'];

            /* Suppression du produit avec la méthode "deleteProduct" disponible dans le service "basket" */
            Basket.deleteProduct(id, customization, shop);
            BasketController();
        });
    }

    /* Bouton du formulaire de confirmation */
    const validateBasket = document.getElementById('basket__form__submit');

    /* EventListener permettant de détecter le clic sur le bouton de confirmation du formulaire */
    validateBasket.addEventListener('click', event => {

        /* Création de l'objet "FormData" à partir du formulaire HTML */
        const form = document.getElementById('basket__form');
        const formData = new FormData(form);

        /* Vérification des erreurs, si le formulaire contient des erreurs on les affiches
           Si tout est ok, on envoi les données a l'API */
        const errors = Basket.verifForm(formData);
        if (errors) {
            Render('basket__error', {errors});
        } else {
            const object = {};
            object.contact = {};
            formData.forEach((value, key) => object.contact[key] = value);

            /* Produits ajoutés à partir des 3 boutiques */
            const productsCamera = Basket.getAllIdByShop('camera');
            const productsTeddy = Basket.getAllIdByShop('teddy');
            const productsFurniture = Basket.getAllIdByShop('furniture');
            let countPost = 0;
            let totalShop = 0;

            /* Création d'une promesse permettant de vérifier que toute les commandes ont été validées par l'API */
            const postShop = new Promise((resolve, reject) => {

                /* On vérifie que des produits sont bien en attente pour la boutique des caméras */
                if (productsCamera) {
                    totalShop++;
                    object.products = productsCamera;
                    const json = JSON.stringify(object);

                    /* Envoi des données de la commande vers la boutique des caméras */
                    Http.postCamera(json)
                        .then(response => response.json()
                            .then(data => {
                                Confirmation.setConfirmation(data.contact,
                                    data.products,
                                    data.orderId,
                                    'camera',
                                    Basket.getTotalArticlesByShop('camera'),
                                    Basket.getTotalPriceByShop('camera'));
                                countPost++;

                                /* Si toutes les commandes ont été validées par l'API on "resolve" la promesse */
                                if (countPost === totalShop) {
                                    resolve();
                                }
                            }));
                }

                /* On vérifie que des produits sont bien en attente pour la boutique des ours en peluche */
                if (productsTeddy) {
                    totalShop++;
                    object.products = productsTeddy;
                    const json = JSON.stringify(object);
                    Http.postTeddy(json)
                        .then(response => response.json()
                            .then(data => {
                                Confirmation.setConfirmation(data.contact,
                                    data.products,
                                    data.orderId,
                                    'teddy',
                                    Basket.getTotalArticlesByShop('teddy'),
                                    Basket.getTotalPriceByShop('teddy'));
                                countPost++;

                                /* Si toutes les commandes ont été validées par l'API on "resolve" la promesse */
                                if (countPost === totalShop) {
                                    resolve();
                                }
                            }));
                }

                /* On vérifie que des produits sont bien en attente pour la boutique des meubles */
                if (productsFurniture) {
                    totalShop++;
                    object.products = productsFurniture;
                    const json = JSON.stringify(object);
                    Http.postFurniture(json)
                        .then(response => response.json()
                            .then(data => {
                                Confirmation.setConfirmation(data.contact,
                                    data.products,
                                    data.orderId,
                                    'furniture',
                                    Basket.getTotalArticlesByShop('furniture'),
                                    Basket.getTotalPriceByShop('furniture'));
                                countPost++;

                                /* Si toutes les commandes ont été validées par l'API on "resolve" la promesse */
                                if (countPost === totalShop) {
                                    resolve();
                                }
                            }));
                }
            });

            /* Une fois les commandes validées par l'API, validation de la commande dans notre service "confirmation"
               et redirection vers la route "payment" */
            postShop.then(() => {
                Confirmation.orderCompleted(true);
                window.location.href = "/?route=payment";
            })
        }
        event.preventDefault();
    });
}