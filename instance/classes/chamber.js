console.log(import.meta);
export default class Chamber {
    constructor(p, x = 0, y = 0, c = 0) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.c = p.color(c);
    }
    display() {
        this.p.fill(this.c).square(this.x, this.y, Chamber.DIM);
        return this;
    }
}
Chamber.DIM = 40;
Chamber.RAD = Chamber.DIM >> 1;
