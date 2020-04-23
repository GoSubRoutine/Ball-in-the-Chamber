###
 * Ball in the Chamber (v3.1.0) (Instance Mode)
 * Rareware0192 (2015-May-06)
 * Mod GoToLoop (2019-Jun-30)
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
###

import Ball from "../classes/ball.js"
import Chamber from "../classes/chamber.js"

import autoResizeFrame from "../utils/frameResize.js"

console.log `import`.meta

export default sketch = (p) ->
    BALLS = 4
    balls = do Array(BALLS).fill

    CHAMBERS = 8
    chambers = do Array(CHAMBERS).fill

    BG = 0o350
    OUTLINE = 0
    WEIGHT = 2

    { width: SW, height: SH } = screen
    W = if frameElement then SW * 30 >> 6 else SW * 63 >> 6
    H = if frameElement then SH * 71 >> 8 else SH * 23 >> 5

    p.setup = ->
        @size W, H

        # workaround to resize <iframe> to have room for canvas:
        do autoResizeFrame

        @ellipseMode @CENTER
        @rectMode @CORNER
        @colorMode @RGB

        @stroke OUTLINE
        @strokeWeight WEIGHT

        balls[i] = new Ball(@).respawn()  for i of balls

        bo = @round WEIGHT/2
        di = Chamber.DIM + bo
        wx = @width  - di
        hy = @height - di
        cx = wx >> 1
        cy = hy >> 1

        chambers[0] = new Chamber @, bo, bo, 0xffFF0000  # NW (red)
        chambers[1] = new Chamber @, wx, bo, 0xff00FF7F  # NE (springgreen)
        chambers[2] = new Chamber @, bo, hy, 0xff0000FF  # SW (blue)
        chambers[3] = new Chamber @, wx, hy, 0xffFFC0CB  # SE (pink)
        chambers[4] = new Chamber @, cx, bo, 0xffFFFF00  # N  (yellow)
        chambers[5] = new Chamber @, cx, hy, 0xff00FFFF  # S  (cyan)
        chambers[6] = new Chamber @, bo, cy, 0xffFA9600  # W  (orange)
        chambers[7] = new Chamber @, wx, cy, 0xffFF00FF  # E  (magenta)


    p.draw = ->
        @background BG

        for b from balls
            for c from chambers then if b.colliding c
                b.c = c.c
                break

            do b.script

        do c.display  for c from chambers

        return


    p.mousePressed = ->
        do b.respawn  for b from balls
        return
