// Permet de charger une template via fetch
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