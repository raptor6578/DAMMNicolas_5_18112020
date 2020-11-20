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
    up(id, customization) {
        this.panier[id] ? this.panier[id]['count']++ : this.panier[id] = {count: 1};
        this.panier[id]['customization'] ? this.panier[id]['customization'].push(customization) :
            this.panier[id]['customization'] = [ customization ];
        this.count();
        this.savePanier();
        console.log(this.panier)
    }
    down(id) {
        this.panier[id]['count'] = this.panier[id]['count'] > 1 ? this.panier[id]['count']-- : delete(this.panier[id]);
        this.count();
        this.savePanier();
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
}
export default new Panier();