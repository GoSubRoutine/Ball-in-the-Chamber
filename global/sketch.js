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
///<reference path="../node_modules/@types/p5/global.d.ts"/>
///<reference path="frameResize.ts"/>
"use strict";
const BALLS = 4, balls = Array(BALLS).fill(null), CHAMBERS = 8, chambers = Array(CHAMBERS).fill(null), BG = 0o350;
let bg;
setup;
draw; // workaround to remove unused warnings.
function setup() {
    createCanvas(640, 440);
    frameRate(60);
    adjustFrameSize(); // workaround to resize <iframe> to have room for canvas.
    ellipseMode(CENTER).rectMode(CORNER).colorMode(RGB);
    strokeWeight(Ball.BOLD).stroke(Ball.STROKE);
    bg = color(BG);
    balls[0] = new Ball(50, 50, 4, 2);
    balls[1] = new Ball(50, 80, 3, 5);
    balls[2] = new Ball(100, 150, 4, 5);
    balls[3] = new Ball(300, 300, 6, 2);
    chambers[0] = new Chamber(1, 1, 'red');
    chambers[1] = new Chamber(599, 1, 'lightgreen');
    chambers[2] = new Chamber(1, 399, 'blue');
    chambers[3] = new Chamber(599, 399, 'pink');
    chambers[4] = new Chamber(300, 1, 'yellow');
    chambers[5] = new Chamber(300, 399, 'cyan');
    chambers[6] = new Chamber(1, 199, 'orange');
    chambers[7] = new Chamber(599, 199, 'magenta');
}
function draw() {
    background(bg);
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
}
class Ball {
    constructor(x = 0, y = 0, vx = 1, vy = 1) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.c = Ball.INIT_FILL;
    }
    static get STROKE() {
        // @ts-ignore: The operand of a delete operator cannot be a read-only property.
        delete this.STROKE;
        // @ts-ignore: Cannot assign to 'STROKE' because it is a read-only property.
        return this.STROKE = color(0);
    }
    static get INIT_FILL() {
        // @ts-ignore: The operand of a delete operator cannot be a read-only property.
        delete this.INIT_FILL;
        // @ts-ignore: Cannot assign to 'STROKE' because it is a read-only property.
        return this.INIT_FILL = color(0xff);
    }
    script() {
        return this.update().display();
    }
    update() {
        const { RAD } = Ball;
        if ((this.x += this.vx) > width - RAD || this.x < RAD)
            this.vx *= -1;
        if ((this.y += this.vy) > height - RAD || this.y < RAD)
            this.vy *= -1;
        return this;
    }
    display() {
        fill(this.c).ellipse(this.x, this.y, Ball.DIM);
        return this;
    }
    colliding(c) {
        const { RAD } = c.constructor;
        return sq(c.x + RAD - this.x) + sq(c.y + RAD - this.y) < sq(RAD + Ball.RAD);
    }
}
Ball.DIM = 25;
Ball.RAD = Ball.DIM >> 1;
Ball.BOLD = 2;
class Chamber {
    constructor(x = 0, y = 0, c) {
        this.x = x;
        this.y = y;
        this.c = c;
    }
    static get STROKE() {
        // @ts-ignore: The operand of a delete operator cannot be a read-only property.
        delete this.STROKE;
        // @ts-ignore: Cannot assign to 'STROKE' because it is a read-only property.
        return this.STROKE = color(0);
    }
    display() {
        fill(this.c).square(this.x, this.y, Chamber.DIM);
        return this;
    }
}
Chamber.DIM = 40;
Chamber.RAD = Ball.DIM >> 1;
Chamber.BOLD = 2;
