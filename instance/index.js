"use strict";
(async () => {
    const { default: sketch } = await import("./sketch/sketch.js");
    console.log(sketch);
    new p5(sketch);
})();
