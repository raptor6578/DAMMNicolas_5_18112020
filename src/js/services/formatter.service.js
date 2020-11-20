class Formatter {
    item(data, arg) {
        if (arg === 'multiple') {
            for (const id in data) {
                if (data.hasOwnProperty(id)) {
                    data[id]['price'] = data[id]['price'] / 100;
                }
            }
        } else {
            data['price'] = data['price'] / 100;
            const customization = (data, oldname) => {
                if (data[oldname]) {
                    data['customization'] = data[oldname];
                    delete data[oldname];
                }
                return data;
            };
            if (data['lenses']) {
                data = customization(data, 'lenses');
            }
            if (data['colors']) {
                data = customization(data, 'colors');
            }
            if (data['varnish']) {
                data = customization(data, 'varnish');
            }
        }
        return data;
    };

}
export default new Formatter();