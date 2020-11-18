class Http {
    getAllCameras() {
        return fetch(process.env.URL_CAMERA);
    }
    getAllTeddies() {
        return fetch(process.env.URL_TEDDY);
    }
    getAllFurniture() {
        return fetch(process.env.URL_FURNITURE);
    }
    getCameraFromId(id) {
        return fetch(`${process.env.URL_CAMERA}/${id}`);
    }
    getTeddyFromId(id) {
        return fetch(`${process.env.URL_TEDDY}/${id}`);
    }
    getFurnitureFromId(id) {
        return fetch(`${process.env.URL_FURNITURE}/${id}`);
    }
}

export default new Http()