class Product {
    constructor(data) {
        this.shop = data.shop;
        this.totalArticles = data.totalArticles;
        this.customization = [data.customization];
        this.totalPrice = data.totalPrice;
        this.productData = data.productData;
    }
}

export default Product;