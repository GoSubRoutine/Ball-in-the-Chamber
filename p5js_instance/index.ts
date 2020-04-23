"use strict";

(async () => {
  const { default: sketch } = await import("./sketch/sketch.js");
  console.log(sketch);
  new (<any> window).p5(sketch);
})();
