import Render from './render.service'

class Panier {
    constructor() {
        const storage = JSON.parse(localStorage.getItem('panier'));
        storage ? this.panier = storage : this.panier = {};
        this.count();
    }
    count() {
        let produits = 0;
        for (const key in this.panier) {
            if (this.panier.hasOwnProperty(key)) {
                produits = produits + this.panier[key]['count'];
            }
        }
        Render('panier__count', {count: produits});
    }
    up(id, type, customization) {
        this.panier[id] ? this.panier[id]['count']++ : this.panier[id] = {count: 1, type};
        this.panier[id]['customization'] ? this.panier[id]['customization'].push(customization) :
            this.panier[id]['customization'] = [ customization ];
        this.count();
        this.savePanier();
    }
    down(id, customization) {
       if (this.panier[id]
           && this.panier[id]['customization'].includes(customization)) {
           const i = this.panier[id]['customization'].indexOf(customization);
           this.panier[id]['customization'].splice(i, 1);
           if (this.panier[id]['count'] > 1) {
               this.panier[id]['count']--
           } else {
               delete (this.panier[id]);
           }
           this.savePanier();
       }
    }
    remove(id) {
        if (this.panier[id]) {
            delete (this.panier[id]);
            this.count();
            this.savePanier();
        }
    }
    savePanier() {
        localStorage.setItem('panier', JSON.stringify(this.panier));
    }
    getPanier() {
        return this.panier;
    }
}
export default new Panier();