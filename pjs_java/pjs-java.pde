/**
 * Ball in the Chamber (v3.1.0) (Java Mode / Pjs)
 * Rareware0192 (2015-May-06)
 * Mod GoToLoop (2019-May-27)
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

import static pjs.window.*;

static final int BALLS = 4;
final Ball[] balls = new Ball[BALLS];

static final int CHAMBERS = 8;
final Chamber[] chambers = new Chamber[CHAMBERS];

static final color BG = 0350, OUTLINE = 0;
static final float WEIGHT = 2;

static final boolean JAVA = 1/2 != 1/2.;

void settings() {
  final int W = JAVA? displayWidth  : screen.width;
  final int H = JAVA? displayHeight : screen.height;

  if (JAVA)               size(W * 3 >> 2, H * 3 >> 2);
  else if (frameElement)  size(W * 30 >> 6, H * 71 >> 8);
  else                    size(W * 63 >> 6, H * 3 >> 2);
}

void setup() {
  if (!JAVA)  settings();
  if (adjustFrameSize)  adjustFrameSize();

  ellipseMode(CENTER);
  rectMode(CORNER);
  colorMode(RGB);

  stroke(OUTLINE);
  strokeWeight(WEIGHT);

  for (int i = 0; i < BALLS; balls[i++] = new Ball().respawn());

  final int
    bo = round(WEIGHT/2), dim = Chamber.DIM + bo,
    wx = width - dim, hy = height - dim,
    cx = wx >> 1, cy = hy >> 1;

  chambers[0] = new Chamber(bo, bo, #FF0000); // NW (red)
  chambers[1] = new Chamber(wx, bo, #00FF7F); // NE (springgreen)
  chambers[2] = new Chamber(bo, hy, #0000FF); // SW (blue)
  chambers[3] = new Chamber(wx, hy, #FFC0CB); // SE (pink)
  chambers[4] = new Chamber(cx, bo, #FFFF00); // N  (yellow)
  chambers[5] = new Chamber(cx, hy, #00FFFF); // S  (cyan)
  chambers[6] = new Chamber(bo, cy, #FA9600); // W  (orange)
  chambers[7] = new Chamber(wx, cy, #FF00FF); // E  (magenta)
}

void draw() {
  background(BG);

  for (final Ball b : balls) {
    for (final Chamber c : chambers)  if (b.colliding(c)) {
      b.c = c.c;
      break;
    }

    b.script();
  }

  for (final Chamber c : chambers)  c.display();
}

void mousePressed() {
  for (final Ball b : balls)  b.respawn();
}

static final int sq(final int n) {
  return n * n;
}
