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
           produits = produits + this.panier[key];
        }
        Render('panier__count', {count: produits});
    }
    up(id) {
        this.panier[id] ? this.panier[id]++ : this.panier[id] = 1;
        this.count();
        this.savePanier();
    }
    down(id) {
        this.panier[id] = this.panier[id] > 1 ? this.panier[id]-- : delete(this.panier[id]);
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