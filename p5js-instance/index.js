"use strict";
(async () => {
    const { default: sketch } = await import("./sketch/sketch.js");
    console.log(sketch);
    new window.p5(sketch);
})();
