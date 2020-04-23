
/*
 * Ball in the Chamber (v3.1.0) (Instance Mode)
 * Rareware0192 (2015-May-06)
 * Mod GoToLoop (2019-Jun-30)
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
var sketch;

import Ball from "../classes/ball.js";

import Chamber from "../classes/chamber.js";

import autoResizeFrame from "../utils/frameResize.js";

console.log(import.meta);

export default sketch = function(p) {
  var BALLS, BG, CHAMBERS, H, OUTLINE, SH, SW, W, WEIGHT, balls, chambers;
  BALLS = 4;
  balls = Array(BALLS).fill();
  CHAMBERS = 8;
  chambers = Array(CHAMBERS).fill();
  BG = 0xe8;
  OUTLINE = 0;
  WEIGHT = 2;
  SW = screen.width, SH = screen.height;
  W = frameElement ? SW * 30 >> 6 : SW * 63 >> 6;
  H = frameElement ? SH * 71 >> 8 : SH * 3 >> 2;
  p.setup = function() {
    var bo, cx, cy, di, hy, i, wx;
    this.size(W, H);
    autoResizeFrame();
    this.ellipseMode(this.CENTER);
    this.rectMode(this.CORNER);
    this.colorMode(this.RGB);
    this.stroke(OUTLINE);
    this.strokeWeight(WEIGHT);
    for (i in balls) {
      balls[i] = new Ball(this).respawn();
    }
    bo = this.round(WEIGHT / 2);
    di = Chamber.DIM + bo;
    wx = this.width - di;
    hy = this.height - di;
    cx = wx >> 1;
    cy = hy >> 1;
    chambers[0] = new Chamber(this, bo, bo, 0xffFF0000);
    chambers[1] = new Chamber(this, wx, bo, 0xff00FF7F);
    chambers[2] = new Chamber(this, bo, hy, 0xff0000FF);
    chambers[3] = new Chamber(this, wx, hy, 0xffFFC0CB);
    chambers[4] = new Chamber(this, cx, bo, 0xffFFFF00);
    chambers[5] = new Chamber(this, cx, hy, 0xff00FFFF);
    chambers[6] = new Chamber(this, bo, cy, 0xffFA9600);
    return chambers[7] = new Chamber(this, wx, cy, 0xffFF00FF);
  };
  p.draw = function() {
    var b, c;
    this.background(BG);
    for (b of balls) {
      for (c of chambers) {
        if (b.colliding(c)) {
          b.c = c.c;
          break;
        }
      }
      b.script();
    }
    for (c of chambers) {
      c.display();
    }
  };
  return p.mousePressed = function() {
    var b;
    for (b of balls) {
      b.respawn();
    }
  };
};
