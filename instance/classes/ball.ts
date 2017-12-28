/// <reference path="chamber.ts"/>

namespace ball_chamber {
  export class Ball {
    static readonly DIM = 25;
    static readonly RAD = Ball.DIM >> 1;
    static readonly BOLD = 2;

    static STROKE: number | p5.Color = 0;
    static INIT_FILL: number | p5.Color = 0xff;

    c: p5.Color;

    constructor(public p: p5, public x=0, public y=0, public vx=1, public vy=1) {
      const { STROKE, INIT_FILL } = Ball;
      STROKE instanceof p5.Color || (Ball.STROKE = p.color(STROKE));
      INIT_FILL instanceof p5.Color || (Ball.INIT_FILL = p.color(INIT_FILL));
      this.c = INIT_FILL;
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
}
