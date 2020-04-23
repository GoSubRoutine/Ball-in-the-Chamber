"use strict";
var frame_utils;
(function (frame_utils) {
    function expandFrame() {
        const frame = frameElement;
        if (frame) {
            frame.width = scrollWidth() + 'px';
            frame.height = scrollHeight() + 'px';
        }
    }
    frame_utils.expandFrame = expandFrame;
    function scrollWidth() {
        return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);
    }
    frame_utils.scrollWidth = scrollWidth;
    function scrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    }
    frame_utils.scrollHeight = scrollHeight;
})(frame_utils || (frame_utils = {}));
/// <reference path="../typings/p5.d.ts"/>
var ball_chamber;
/// <reference path="../typings/p5.d.ts"/>
(function (ball_chamber) {
    class Chamber {
        constructor(p, x = 0, y = 0, c) {
            this.p = p;
            this.x = x;
            this.y = y;
            this.c = c;
            Chamber.STROKE instanceof p5.Color || (Chamber.STROKE = p.color(0));
        }
        display() {
            this.p.fill(this.c).rect(this.x, this.y, Chamber.DIM, Chamber.DIM);
            return this;
        }
    }
    Chamber.DIM = 40;
    Chamber.RAD = Chamber.DIM >> 1;
    Chamber.BOLD = 2;
    ball_chamber.Chamber = Chamber;
})(ball_chamber || (ball_chamber = {}));
/// <reference path="chamber.ts"/>
var ball_chamber;
/// <reference path="chamber.ts"/>
(function (ball_chamber) {
    class Ball {
        constructor(p, x = 0, y = 0, vx = 1, vy = 1) {
            this.p = p;
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
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
            if ((this.x += this.vx) > w - RAD || this.x < RAD)
                this.vx *= -1;
            if ((this.y += this.vy) > h - RAD || this.y < RAD)
                this.vy *= -1;
            return this;
        }
        display() {
            this.p.fill(this.c).ellipse(this.x, this.y, Ball.DIM);
            return this;
        }
        colliding(c) {
            const { RAD } = c.constructor, { sq } = this.p;
            return sq(c.x + RAD - this.x) + sq(c.y + RAD - this.y) < sq(RAD + Ball.RAD);
        }
    }
    Ball.DIM = 25;
    Ball.RAD = Ball.DIM >> 1;
    Ball.BOLD = 2;
    Ball.STROKE = 0;
    Ball.INIT_FILL = 0xff;
    ball_chamber.Ball = Ball;
})(ball_chamber || (ball_chamber = {}));
/**
 * Ball in the Chamber (v1.0.1) (Instance Mode)
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
/// <reference path="../utils/frameResize.ts"/>
/// <reference path="../classes/ball.ts"/>
var ball_chamber;
/**
 * Ball in the Chamber (v1.0.1) (Instance Mode)
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
/// <reference path="../utils/frameResize.ts"/>
/// <reference path="../classes/ball.ts"/>
(function (ball_chamber) {
    var expandFrame = frame_utils.expandFrame;
    var Ball = ball_chamber.Ball;
    var Chamber = ball_chamber.Chamber;
    function sketch(p) {
        const BALLS = 4, balls = Array(BALLS), CHAMBERS = 8, chambers = Array(CHAMBERS), BG = 0o350;
        let bg;
        p.setup = function () {
            this.createCanvas(640, 440);
            this.frameRate(60);
            expandFrame(); // workaround to resize <iframe> to have room for canvas.
            this.ellipseMode(this.CENTER).rectMode(this.CORNER).colorMode(this.RGB);
            this.strokeWeight(Ball.BOLD).stroke(Ball.STROKE);
            bg = this.color(BG);
            balls[0] = new Ball(this, 50, 50, 4, 2);
            balls[1] = new Ball(this, 50, 80, 3, 5);
            balls[2] = new Ball(this, 100, 150, 4, 5);
            balls[3] = new Ball(this, 300, 300, 6, 2);
            chambers[0] = new Chamber(this, 1, 1, 'red');
            chambers[1] = new Chamber(this, 599, 1, 'lightgreen');
            chambers[2] = new Chamber(this, 1, 399, 'blue');
            chambers[3] = new Chamber(this, 599, 399, 'pink');
            chambers[4] = new Chamber(this, 300, 1, 'yellow');
            chambers[5] = new Chamber(this, 300, 399, 'cyan');
            chambers[6] = new Chamber(this, 1, 199, 'orange');
            chambers[7] = new Chamber(this, 599, 199, 'magenta');
        };
        p.draw = function () {
            this.background(bg);
            for (const b of balls) {
                for (const c of chambers)
                    if (b.colliding(c)) {
                        b.c = c.c;
                        break;
                    }
                b.script();
            }
            for (const c of chambers)
                c.display();
        }.bind(p);
    }
    ball_chamber.sketch = sketch;
})(ball_chamber || (ball_chamber = {}));
/// <reference path="sketch/sketch.ts"/>
// @ts-ignore: Expected 0 arguments, but got 1.
new p5(ball_chamber.sketch);
