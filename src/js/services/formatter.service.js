class Formatter {
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
    };
}
export default new Formatter();