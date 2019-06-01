/**
 * Ball in the Chamber (v2.0.5) (Global Mode)
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

/// <reference path="../node_modules/@types/p5/global.d.ts" />
/// <reference path="frameResize.ts" />

"use strict";

import * as p5 from "node_modules/@types/p5/index";

const BALLS = 4, balls = Array<Ball>(BALLS).fill(null!),
      CHAMBERS = 8, chambers = Array<Chamber>(CHAMBERS).fill(null!),
      BG = 0o350, OUTLINE = 0, WEIGHT = 2;

let bg: p5.Color;

setup; draw; // workaround to remove unused warnings.

function setup() {
  createCanvas(640, 440).mousePressed(() => balls.forEach(b => b.respawn()));

  adjustFrameSize(); // workaround to resize <iframe> to have room for canvas.

  ellipseMode(CENTER).rectMode(CORNER).colorMode(RGB);
  stroke(OUTLINE).strokeWeight(WEIGHT);

  bg = color(BG);

  for (let i = 0; i < BALLS; balls[i++] = new Ball().respawn());

  const bo = round(WEIGHT/2), dim = Chamber.DIM + bo,
        wx = width - dim, hy = height - dim,
        cx = wx >> 1, cy = hy >> 1;

  chambers[0] = new Chamber(bo, bo, 'red');          // NW
  chambers[1] = new Chamber(wx, bo, 'springgreen');  // NE
  chambers[2] = new Chamber(bo, hy, 'blue');         // SW
  chambers[3] = new Chamber(wx, hy, 'pink');         // SE
  chambers[4] = new Chamber(cx, bo, 'yellow');       // N
  chambers[5] = new Chamber(cx, hy, 'cyan');         // S
  chambers[6] = new Chamber(bo, cy, 'orange');       // W
  chambers[7] = new Chamber(wx, cy, 'magenta');      // E
}

function draw() {
  background(bg);

  for (const b of balls) {
    for (const c of chambers)  if (b.colliding(c)) {
      b.c = c.c;
      break;
    }

    b.script();
  }

  for (const c of chambers)  c.display();
}

class Ball {
  static readonly DIM = 25;
  static readonly RAD = Ball.DIM >> 1;
  static readonly MIN_SPD = 2;
  static readonly MAX_SPD = 6 + 1;

  protected static get INIT_FILL(): p5.Color {
    delete (<any> this).INIT_FILL;
    return (<any> this).INIT_FILL = color(0xff);
  }

  c = Ball.INIT_FILL;

  constructor(public x=Ball.DIM, public y=Ball.DIM, public vx=1, public vy=1) {}

  respawn() {
    const { DIM, MIN_SPD, MAX_SPD, INIT_FILL } = Ball,
          d = DIM << 1, w = width - d, h = height - d;

    this.x = ~~random(d, w);
    this.y = ~~random(d, h);

    this.vx = ~~random(MIN_SPD, MAX_SPD) * (random() < .5 && -1 || 1);
    this.vy = ~~random(MIN_SPD, MAX_SPD) * (random() < .5 && -1 || 1);

    this.c = INIT_FILL;

    return this;
  }

  script() {
    return this.update().display();
  }

  update() {
    const { RAD } = Ball;
    if ((this.x += this.vx) > width  - RAD || this.x < RAD)  this.vx *= -1;
    if ((this.y += this.vy) > height - RAD || this.y < RAD)  this.vy *= -1;
    return this;
  }

  display() {
    fill(this.c).circle(this.x, this.y, Ball.DIM);
    return this;
  }

  colliding(c: Chamber) {
    const { RAD } = c.constructor as typeof Chamber; // const RAD = Chamber.RAD;
    return sq(c.x + RAD - this.x) + sq(c.y + RAD - this.y) < sq(RAD + Ball.RAD);
  }
}

class Chamber {
  static readonly DIM = 40;
  static readonly RAD = Chamber.DIM >> 1;

  c: p5.Color;

  constructor(public x=0, public y=0, c: any=0) {
    this.c = color(c);
  }

  display() {
    fill(this.c).square(this.x, this.y, Chamber.DIM);
    return this;
  }
}
