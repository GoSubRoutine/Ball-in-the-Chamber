class Ball {
  static final short DIM = 25, RAD = DIM >> 1;
  static final short MIN_SPD = 2, MAX_SPD = 6 + 1;
  static final color INIT_FILL = -1;

  int x = DIM, y = DIM, vx = 1, vy = 1;
  color c = INIT_FILL;

  Ball respawn() {
    final int d = DIM << 1, w = width - d, h = height - d;

    x = (int) random(d, w);
    y = (int) random(d, h);

    vx = (int) random(MIN_SPD, MAX_SPD) * (random(1) < .5? -1 : 1);
    vy = (int) random(MIN_SPD, MAX_SPD) * (random(1) < .5? -1 : 1);

    c = INIT_FILL;

    return this;
  }

  Ball script() {
    return update().display();
  }

  Ball update() {
    if ((x += vx) > width  - RAD | x < RAD)  vx *= -1;
    if ((y += vy) > height - RAD | y < RAD)  vy *= -1;
    return this;
  }

  Ball display() {
    fill(c);
    ellipse(x, y, DIM, DIM);
    return this;
  }

  boolean colliding(final Chamber c) {
    return sq(c.x + Chamber.RAD - x) + sq(c.y + Chamber.RAD - y)
      < sq(Chamber.RAD + RAD);
  }
}
