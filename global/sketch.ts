/**
 * Ball in the Chamber (v1.0.1) (Global Mode)
 * GoToLoop (2017-Nov-13)
 *
 * Forum.Processing.org/two/discussion/24978/
 * issues-passing-an-instance-of-one-class-into-another-class-in-p5-js#Item_7
 *
 * Bl.ocks.org/GoSubRoutine/d0b7d3058d84970e83cf8685f8e69777
 *
 * Forum.Processing.org/two/discussion/10680/collision-colors#Item_14
 * Studio.ProcessingTogether.com/sp/pad/export/ro.9qPrLGrYGkr2o
 */

///<reference path="p5.global-mode.d.ts"/>
///<reference path="frameResize.ts"/>

"use strict";

const BALLS = 4, balls = Array<Ball>(BALLS),
      CHAMBERS = 8, chambers = Array<Chamber>(CHAMBERS),
      BG = 0o350;

let bg: p5.Color;

function setup() {
  createCanvas(640, 440);
  frameRate(60);

  expandFrame(); // workaround to resize <iframe> to have room for canvas.

  // @ts-ignore: Cannot find name 'ellipseMode'. Did you mean 'ellipsoid'?
  ellipseMode(CENTER).rectMode(CORNER).colorMode(RGB);
  strokeWeight(Ball.BOLD).stroke(Ball.STROKE);

  bg = color(BG);

  balls[0] = new Ball(50,  50,  4, 2);
  balls[1] = new Ball(50,  80,  3, 5);
  balls[2] = new Ball(100, 150, 4, 5);
  balls[3] = new Ball(300, 300, 6, 2);

  chambers[0] = new Chamber(1,   1,   'red');
  chambers[1] = new Chamber(599, 1,   'lightgreen');
  chambers[2] = new Chamber(1,   399, 'blue');
  chambers[3] = new Chamber(599, 399, 'pink');
  chambers[4] = new Chamber(300, 1,   'yellow');
  chambers[5] = new Chamber(300, 399, 'cyan');
  chambers[6] = new Chamber(1,   199, 'orange');
  chambers[7] = new Chamber(599, 199, 'magenta');
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
  static readonly BOLD = 2;

  static get STROKE(): p5.Color {
    // @ts-ignore: The operand of a delete operator cannot be a read-only property.
    delete this.STROKE;
    // @ts-ignore: Cannot assign to 'STROKE' because it is a constant or a read-only property.
    return this.STROKE = color(0);
  }

  static get INIT_FILL(): p5.Color {
    // @ts-ignore: The operand of a delete operator cannot be a read-only property.
    delete this.INIT_FILL;
    // @ts-ignore: Cannot assign to 'STROKE' because it is a constant or a read-only property.
    return this.INIT_FILL = color(0xff);
  }

  c = Ball.INIT_FILL;

  constructor(public x=0, public y=0, public vx=1, public vy=1) {}

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
    // @ts-ignore: Property 'ellipse' does not exist on type 'void'.
    fill(this.c).ellipse(this.x, this.y, Ball.DIM);
    return this;
  }

  colliding(c: Chamber) {
    const { RAD } = c.constructor as typeof Chamber;
    return sq(c.x + RAD - this.x) + sq(c.y + RAD - this.y) < sq(RAD + Ball.RAD);
  }
}

class Chamber {
  static readonly DIM = 40;
  static readonly RAD = Ball.DIM >> 1;
  static readonly BOLD = 2;

  static get STROKE(): p5.Color {
    // @ts-ignore: The operand of a delete operator cannot be a read-only property.
    delete this.STROKE;
    // @ts-ignore: Cannot assign to 'STROKE' because it is a constant or a read-only property.
    return this.STROKE = color(0);
  }

  constructor(public x=0, public y=0, public c: any) {}

  display() {
    // @ts-ignore: Property 'rect' does not exist on type 'void'.
    fill(this.c).rect(this.x, this.y, Chamber.DIM, Chamber.DIM);
    return this;
  }
}
