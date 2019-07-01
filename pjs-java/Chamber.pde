class Chamber {
  static final short DIM = 40, RAD = DIM >> 1;

  final int x, y;
  final color c;

  Chamber(final int x, final int y, final color c) {
    this.x = x;
    this.y = y;
    this.c = c;
  }

  void display() {
    fill(c);
    rect(x, y, DIM, DIM);
  }
}
