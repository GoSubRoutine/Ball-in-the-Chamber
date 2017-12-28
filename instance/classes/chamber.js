"use strict";
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
