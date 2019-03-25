"use strict";

type p5 = new (sketch: (p: any) => void) => p5;
declare const p5: p5

(async () => {
  const { default: sketch } = await import("./sketch/sketch.js");
  console.log(sketch);
  new p5(sketch);
})();
