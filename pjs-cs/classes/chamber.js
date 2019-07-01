var Chamber;

console.log(import.meta);

export default Chamber = (function() {
  class Chamber {
    constructor(p, x = 0, y = 0, c = 0) {
      this.p = p;
      this.x = x;
      this.y = y;
      this.c = c;
    }

    display() {
      this.p.fill(this.c);
      this.p.rect(this.x, this.y, this.DIM, this.DIM);
      return this;
    }

  };

  Chamber.prototype.DIM = Chamber.DIM = 40;

  Chamber.prototype.RAD = Chamber.RAD = Chamber.DIM >> 1;

  return Chamber;

}).call(this);
