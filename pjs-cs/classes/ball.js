var Ball;

console.log(import.meta);

export default Ball = (function() {
  class Ball {
    constructor(p1, x = Ball.DIM, y = Ball.DIM, vx = 1, vy = 1, c1 = this.INIT_FILL) {
      this.p = p1;
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.c = c1;
    }

    respawn() {
      var DIM, INIT_FILL, MAX_SPD, MIN_SPD, d, h, p, w;
      ({p, DIM, MIN_SPD, MAX_SPD, INIT_FILL} = this);
      d = DIM << 1;
      w = p.width - d;
      h = p.height - d;
      this.x = ~~p.random(d, w);
      this.y = ~~p.random(d, h);
      this.vx = (p.random() < .5 && -1 || 1) * ~~p.random(MIN_SPD, MAX_SPD);
      this.vy = (p.random() < .5 && -1 || 1) * ~~p.random(MIN_SPD, MAX_SPD);
      this.c = INIT_FILL;
      return this;
    }

    script() {
      return this.update().display();
    }

    update() {
      var RAD, h, w;
      ({
        p: {
          width: w,
          height: h
        },
        RAD
      } = this);
      if ((this.x += this.vx) > w - RAD || this.x < RAD) {
        this.vx *= -1;
      }
      if ((this.y += this.vy) > h - RAD || this.y < RAD) {
        this.vy *= -1;
      }
      return this;
    }

    display() {
      this.p.fill(this.c);
      this.p.ellipse(this.x, this.y, this.DIM, this.DIM);
      return this;
    }

    colliding(c) {
      var RAD;
      ({RAD} = c.constructor);
      return (c.x + RAD - this.x) ** 2 + (c.y + RAD - this.y) ** 2 < this.p.sq(RAD + this.RAD);
    }

  };

  Ball.prototype.DIM = Ball.DIM = 25;

  Ball.prototype.RAD = Ball.RAD = Ball.DIM >> 1;

  Ball.prototype.MIN_SPD = Ball.MIN_SPD = 2;

  Ball.prototype.MAX_SPD = Ball.MAX_SPD = 6 + 1;

  Ball.prototype.INIT_FILL = Ball.INIT_FILL = -1;

  return Ball;

}).call(this);
