import * as Mustache from "mustache";

export default function render(id, data) {
    const template = document.getElementById(`${id}__template`).innerHTML;
    const rendered = Mustache.render(template, { items: data });
    document.getElementById(id).innerHTML = rendered;
}