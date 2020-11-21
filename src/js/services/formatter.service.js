class Formatter {
    item(data, arg) {
        if (arg === 'multiple') {
            data = this.price(data, 'multiple');
        } else {
            data = this.price(data);
            data = this.customization(data);
        }
        return data;
    }
    price(data, arg) {
        if (arg === 'multiple') {
            for (const id in data) {
                if (data.hasOwnProperty(id)) {
                    data[id]['price'] = data[id]['price'] / 100;
                }
            }
        } else {
            data['price'] = data['price'] / 100;
        }
        return data;
    }
    totalPriceGlobal(data) {
        let count = 0;
        for (const id in data) {
            if (data.hasOwnProperty(id)) {
                count += data[id]['price'];
            }
        }
        return count;
    }
    totalPriceProduct(data) {
        data['price'] = data['price'] * data['count'];
        return data;
    }
    customization(data) {
        if (data['lenses']) {
            data['customization'] = data['lenses'];
            delete data['lenses'];
        }
        if (data['colors']) {
            data['customization'] = data['colors'];
            delete data['colors'];
        }
        if (data['varnish']) {
            data['customization'] = data['varnish'];
            delete data['varnish'];
        }
        return data;
    }
}
export default new Formatter();