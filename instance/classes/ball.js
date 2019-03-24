console.log(import.meta);
export default class Ball {
    constructor(p, x = Ball.DIM, y = Ball.DIM, vx = 1, vy = 1) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.c = Ball.INIT_FILL || (Ball.INIT_FILL = p.color(0xff));
    }
    respawn() {
        const { DIM, MIN_SPD, MAX_SPD } = Ball, { p } = this, d = DIM << 1, w = p.width - d, h = p.height - d;
        this.x = ~~p.random(d, w);
        this.y = ~~p.random(d, h);
        this.vx = ~~p.random(MIN_SPD, MAX_SPD) * (p.random() < .5 && -1 || 1);
        this.vy = ~~p.random(MIN_SPD, MAX_SPD) * (p.random() < .5 && -1 || 1);
        this.c = Ball.INIT_FILL;
        return this;
    }
    script() {
        return this.update().display();
    }
    update() {
        const { RAD } = Ball, { width: w, height: h } = this.p;
        if ((this.x += this.vx) > w - RAD || this.x < RAD)
            this.vx *= -1;
        if ((this.y += this.vy) > h - RAD || this.y < RAD)
            this.vy *= -1;
        return this;
    }
    display() {
        this.p.fill(this.c).ellipse(this.x, this.y, Ball.DIM);
        return this;
    }
    colliding(c) {
        const { RAD } = c.constructor, { sq } = this.p;
        return sq(c.x + RAD - this.x) + sq(c.y + RAD - this.y) < sq(RAD + Ball.RAD);
    }
}
Ball.DIM = 25;
Ball.RAD = Ball.DIM >> 1;
Ball.MIN_SPD = 2;
Ball.MAX_SPD = 6 + 1;
