import * as p5 from "../../node_modules/@types/p5/index";

console.log(import.meta);

export default class Chamber {
  static readonly DIM = 40;
  static readonly RAD = Chamber.DIM >> 1;

  c: p5.Color;

  constructor(public p: p5, public x=0, public y=0, c: any=0) {
    this.c = p.color(c);
  }

  display() {
    this.p.fill(this.c).square(this.x, this.y, Chamber.DIM);
    return this;
  }
}
