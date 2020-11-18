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
}

export default new Http()