"use strict";

(async () => {
  const { default: sketch } = await import("./sketch/sketch.js");
  console.log(sketch);
  // @ts-ignoref: Cannot find name 'p5'.
  new p5(sketch);
})();
