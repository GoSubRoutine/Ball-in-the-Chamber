/**
 * Ball in the Chamber (v2.0.1) (Instance Mode)
 * GoToLoop (2017-Nov-13)
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
import Ball from "../classes/ball.js";
import Chamber from "../classes/chamber.js";
import adjustFrameSize from "../utils/frameResize.js";
console.log(import.meta);
export default function sketch(p) {
    const BALLS = 4, balls = Array(BALLS).fill(null), CHAMBERS = 8, chambers = Array(CHAMBERS).fill(null), BG = 0o350, OUTLINE = 0, WEIGHT = 2;
    let bg;
    p.setup = function () {
        this.createCanvas(640, 440).mousePressed(() => balls.forEach(b => b.respawn()));
        adjustFrameSize(); // workaround to resize <iframe> to have room for canvas.
        this.ellipseMode(this.CENTER).rectMode(this.CORNER).colorMode(this.RGB);
        this.stroke(OUTLINE).strokeWeight(WEIGHT);
        bg = this.color(BG);
        for (let i = 0; i < BALLS; balls[i++] = new Ball(this).respawn())
            ;
        const bo = this.round(WEIGHT / 2), dim = Chamber.DIM + bo, wx = this.width - dim, hy = this.height - dim, cx = wx >> 1, cy = hy >> 1;
        chambers[0] = new Chamber(this, bo, bo, 'red');
        chambers[1] = new Chamber(this, wx, bo, 'lightgreen');
        chambers[2] = new Chamber(this, bo, hy, 'blue');
        chambers[3] = new Chamber(this, wx, hy, 'pink');
        chambers[4] = new Chamber(this, cx, bo, 'yellow');
        chambers[5] = new Chamber(this, cx, hy, 'cyan');
        chambers[6] = new Chamber(this, bo, cy, 'orange');
        chambers[7] = new Chamber(this, wx, cy, 'magenta');
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
