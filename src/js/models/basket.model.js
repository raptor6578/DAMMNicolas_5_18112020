class Basket {
    constructor(data) {
        data && data.camera ? this.camera = data.camera : this.camera = {};
        data && data.teddy ? this.teddy = data.teddy : this.teddy = {};
        data && data.furniture ? this.furniture = data.furniture : this.furniture = {};
        data && data.totalPrice ? this.totalPrice = data.totalPrice : this.totalPrice = 0;
        data && data.totalArticles ? this.totalArticles = data.totalArticles : this.totalArticles = 0;
    }
}

export default Basket;