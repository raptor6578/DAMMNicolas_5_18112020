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
    postCamera(form) {
        return fetch(`${process.env.URL_CAMERA}/order`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST", body: form });
    }
    postTeddy(form) {
        return fetch(`${process.env.URL_TEDDY}/order`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST", body: form });
    }
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