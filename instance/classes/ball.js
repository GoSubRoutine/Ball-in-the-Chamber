"use strict";
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
