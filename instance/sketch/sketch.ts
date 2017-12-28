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

namespace ball_chamber {
  import expandFrame = frame_utils.expandFrame;

  import Ball = ball_chamber.Ball;
  import Chamber = ball_chamber.Chamber;

  export function sketch(p: p5) {
    const BALLS = 4, balls = Array<Ball>(BALLS),
          CHAMBERS = 8, chambers = Array<Chamber>(CHAMBERS),
          BG = 0o350;

    let bg: p5.Color;

    p.setup = function () {
      this.createCanvas(640, 440);
      this.frameRate(60);

      expandFrame(); // workaround to resize <iframe> to have room for canvas.

      this.ellipseMode(this.CENTER).rectMode(this.CORNER).colorMode(this.RGB);
      this.strokeWeight(Ball.BOLD).stroke(Ball.STROKE);

      bg = this.color(BG);

      balls[0] = new Ball(this, 50,  50,  4, 2);
      balls[1] = new Ball(this, 50,  80,  3, 5);
      balls[2] = new Ball(this, 100, 150, 4, 5);
      balls[3] = new Ball(this, 300, 300, 6, 2);

      chambers[0] = new Chamber(this, 1,   1,   'red');
      chambers[1] = new Chamber(this, 599, 1,   'lightgreen');
      chambers[2] = new Chamber(this, 1,   399, 'blue');
      chambers[3] = new Chamber(this, 599, 399, 'pink');
      chambers[4] = new Chamber(this, 300, 1,   'yellow');
      chambers[5] = new Chamber(this, 300, 399, 'cyan');
      chambers[6] = new Chamber(this, 1,   199, 'orange');
      chambers[7] = new Chamber(this, 599, 199, 'magenta');
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
}
