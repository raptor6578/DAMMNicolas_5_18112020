import * as Mustache from "mustache";

/**
 * Cette fonction permet d'envoyer des données vers une template MustacheJS
 *
 * @param {string} id - id html du block ou envoyer les données
 * @param {Object} data - objet javascript contenant les données à afficher dans la template
 */
export default function Render(id, data) {
    const template = document.getElementById(`${id}__template`).innerHTML;
    const rendered = Mustache.render(template, data);
    document.getElementById(id).innerHTML = rendered;
}