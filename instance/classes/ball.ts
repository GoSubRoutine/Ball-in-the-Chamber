import * as p5 from "../../node_modules/@types/p5/index";
import Chamber from "./chamber";
console.log(import.meta);

export default class Ball {
  static readonly DIM = 25;
  static readonly RAD = Ball.DIM >> 1;
  static readonly MIN_SPD = 2;
  static readonly MAX_SPD = 6 + 1;

  static INIT_FILL: p5.Color;
  c: typeof Ball.INIT_FILL;

  constructor(public p: p5, public x=Ball.DIM, public y=Ball.DIM, public vx=1, public vy=1) {
    Ball.INIT_FILL || (Ball.INIT_FILL = p.color(0xff));
    this.c = Ball.INIT_FILL;
  }

  respawn() {
    const { DIM, MIN_SPD, MAX_SPD } = Ball, { p } = this,
          d = DIM << 1, w = p.width - d, h = p.height - d;

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
    if ((this.x += this.vx) > w - RAD || this.x < RAD)  this.vx *= -1;
    if ((this.y += this.vy) > h - RAD || this.y < RAD)  this.vy *= -1;
    return this;
  }

  display() {
    this.p.fill(this.c).ellipse(this.x, this.y, Ball.DIM);
    return this;
  }

  colliding(c: Chamber) {
    const { RAD } = c.constructor as typeof Chamber, { sq } = this.p;
    return sq(c.x + RAD - this.x) + sq(c.y + RAD - this.y) < sq(RAD + Ball.RAD);
  }
}
