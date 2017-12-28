/// <reference path="../typings/p5.d.ts"/>

namespace ball_chamber {
  export class Chamber {
    static readonly DIM = 40;
    static readonly RAD = Chamber.DIM >> 1;
    static readonly BOLD = 2;

    static STROKE: p5.Color;

    constructor(public p: p5, public x=0, public y=0, public c: any) {
      Chamber.STROKE instanceof p5.Color || (Chamber.STROKE = p.color(0));
    }

    display() {
      this.p.fill(this.c).rect(this.x, this.y, Chamber.DIM, Chamber.DIM);
      return this;
    }
  }
}
