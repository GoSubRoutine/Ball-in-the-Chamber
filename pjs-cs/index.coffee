"use strict"

do ->
  { default: sketch } = await import("./sketch/sketch.js")
  console.log sketch
  new Processing pjs, sketch
