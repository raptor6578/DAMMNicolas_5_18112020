/**
 * Class contenant les méthodes nécéssaires pour communiquer avec l'API
 */
class Http {

    /**
     * La méthode permet de retourner tous les produits de la boutique des caméras
     *
     * @returns {Promise<Response>}
     */
    getAllCameras() {
        return fetch(process.env.URL_CAMERA);
    }

    /**
     * La méthode permet de retourner tous les produits de la boutique des ours en peluche
     *
     * @returns {Promise<Response>}
     */
    getAllTeddies() {
        return fetch(process.env.URL_TEDDY);
    }

    /**
     * La méthode permet de retourner tous les produits de la boutique des meubles
     *
     * @returns {Promise<Response>}
     */
    getAllFurniture() {
        return fetch(process.env.URL_FURNITURE);
    }

    /**
     * La méthode permet de retourner les données d'un produit de la boutique des caméras
     *
     * @param {string} id - id du produit concerné
     * @returns {Promise<Response>}
     */
    getCameraFromId(id) {
        return fetch(`${process.env.URL_CAMERA}/${id}`);
    }

    /**
     * La méthode permet de retourner les données d'un produit de la boutique des ours en peluche
     *
     * @param {string} id - id du produit concerné
     * @returns {Promise<Response>}
     */
    getTeddyFromId(id) {
        return fetch(`${process.env.URL_TEDDY}/${id}`);
    }

    /**
     * La méthode permet de retourner les données d'un produit de la boutique des meubles
     *
     * @param {string} id - id du produit concerné
     * @returns {Promise<Response>}
     */
    getFurnitureFromId(id) {
        return fetch(`${process.env.URL_FURNITURE}/${id}`);
    }

    /**
     * La méthode permet de confirmer la commande de la boutique des caméras
     *
     * @param {JSON} form
     * @returns {Promise<Response>}
     */
    postCamera(form) {
        return fetch(`${process.env.URL_CAMERA}/order`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST", body: form });
    }

    /**
     * La méthode permet de confirmer la commande de la boutique des ours en peluche
     *
     * @param {JSON} form
     * @returns {Promise<Response>}
     */
    postTeddy(form) {
        return fetch(`${process.env.URL_TEDDY}/order`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST", body: form });
    }

    /**
     * La méthode permet de confirmer la commande de la boutique des meubles
     *
     * @param {JSON} form
     * @returns {Promise<Response>}
     */
    postFurniture(form) {
        return fetch(`${process.env.URL_FURNITURE}/order`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST", body: form });
    }
}


export default new Http();