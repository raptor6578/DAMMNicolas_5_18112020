class ProductData {
    constructor(data) {
        this._id = data._id;
        this.name = data.name;
        this.price = data.price / 100;
        this.description = data.description;
        this.imageUrl = data.imageUrl;
        if (data['lenses']) this.customization = data['lenses'];
        if (data['colors']) this.customization = data['colors'];
        if (data['varnish']) this.customization = data['varnish'];
    }
}

export default ProductData;