"use strict";
(async function() {
  var sketch;
  ({
    default: sketch
  } = (await import("./sketch/sketch.js")));
  console.log(sketch);
  return new Processing(pjs, sketch);
})();
