import * as Mustache from "mustache";

//Permet d'envoyer un objet vers une template
export default function Render(id, data) {
    const template = document.getElementById(`${id}__template`).innerHTML;
    const rendered = Mustache.render(template, data);
    document.getElementById(id).innerHTML = rendered;
}