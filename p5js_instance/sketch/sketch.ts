/**
 * Ball in the Chamber (v3.1.0) (Instance Mode)
 * Rareware0192 (2015-May-06)
 * Mod GoToLoop (2017-Nov-13)
 *
 * Discourse.Processing.org/t/types-p5-not-find-like-class-in-typescript/9475
 * GitHub.com/GoSubRoutine/Ball-in-the-Chamber
 * GoSubRoutine.GitHub.io/Ball-in-the-Chamber
 *
 * Forum.Processing.org/two/discussion/24978/
 * issues-passing-an-instance-of-one-class-into-another-class-in-p5-js#Item_7
 *
 * Forum.Processing.org/two/discussion/10680/collision-colors#Item_14
 * Studio.ProcessingTogether.com/sp/pad/export/ro.9qPrLGrYGkr2o
 * Bl.ocks.org/GoSubRoutine/d0b7d3058d84970e83cf8685f8e69777
 */

import * as p5 from "p5/index";

import Ball from "../classes/ball.js";
import Chamber from "../classes/chamber.js";

import autoResizeFrame from "../utils/frameResize.js";

console.log(import.meta);

export default function sketch(p: p5) {
  const BALLS = 4, balls = Array<Ball>(BALLS).fill(null!),
        CHAMBERS = 8, chambers = Array<Chamber>(CHAMBERS).fill(null!),
        BG = 0o350, OUTLINE = 0, WEIGHT = 2,
        { width: SW, height: SH } = screen,
        W = frameElement && SW * 30 >> 6 || SW * 63 >> 6,
        H = frameElement && SH * 71 >> 8 || SH * 23 >> 5;

  let bg: p5.Color;

  p.setup = function (this: typeof p) {
    this.createCanvas(W, H).mousePressed(() => balls.forEach(b => b.respawn()));

    autoResizeFrame(); // workaround to resize <iframe> to have room for canvas.

    this.ellipseMode(this.CENTER).rectMode(this.CORNER).colorMode(this.RGB);
    this.stroke(OUTLINE).strokeWeight(WEIGHT);

    bg = this.color(BG);

    for (let i = 0; i < BALLS; balls[i++] = new Ball(this).respawn());

    const bo = this.round(WEIGHT/2), dim = Chamber.DIM + bo,
          wx = this.width - dim, hy = this.height - dim,
          cx = wx >> 1, cy = hy >> 1;

    chambers[0] = new Chamber(this, bo, bo, 'red');          // NW
    chambers[1] = new Chamber(this, wx, bo, 'springgreen');  // NE
    chambers[2] = new Chamber(this, bo, hy, 'blue');         // SW
    chambers[3] = new Chamber(this, wx, hy, 'pink');         // SE
    chambers[4] = new Chamber(this, cx, bo, 'yellow');       // N
    chambers[5] = new Chamber(this, cx, hy, 'cyan');         // S
    chambers[6] = new Chamber(this, bo, cy, 'orange');       // W
    chambers[7] = new Chamber(this, wx, cy, 'magenta');      // E
  };

  p.draw = function (this: typeof p) {
    this.background(bg);

    for (const b of balls) {
      for (const c of chambers)  if (b.colliding(c)) {
        b.c = c.c;
        break;
      }

      b.script();
    }

    for (const c of chambers)  c.display();
  }.bind(p);
}
