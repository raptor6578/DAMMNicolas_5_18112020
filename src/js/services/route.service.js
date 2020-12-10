/**
 * Cette fonction permet de charger une template MustacheJS dans la balise <main> du fichier index.html
 * On récupère la template par l'intermédiaire de "fetch", un serveur HTTP est indispensable
 * C'est pour cela que webpack-dev-server est disponible a été installé dans ce projet.
 *
 * @param {string} route - la route correspond au nom du fichier mustache
 * @param controller - controller qu'on exécute une fois la page chargée
 */
export default function Route(route, controller) {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    fetch(`template/${route}.mustache`).then(response => {
        response.text()
            .then(data => {
                document.getElementById('route').innerHTML = data;
                controller(urlParams);
            })
    });
}