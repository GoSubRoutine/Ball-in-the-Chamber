console.log `import`.meta

export default class Ball
    DIM: @DIM = 25
    RAD: @RAD = @DIM >> 1
    MIN_SPD: @MIN_SPD = 2
    MAX_SPD: @MAX_SPD = 6 + 1
    INIT_FILL: @INIT_FILL = -1

    constructor: (@p, @x = Ball.DIM, @y = Ball.DIM,
                  @vx = 1, @vy = 1, @c = @INIT_FILL) ->


    respawn: ->
        { p, DIM, MIN_SPD, MAX_SPD, INIT_FILL } = @

        d = DIM << 1
        w = p.width  - d
        h = p.height - d

        @x = ~~p.random d, w
        @y = ~~p.random d, h

        @vx = (do p.random < .5 and -1 or 1) * ~~p.random MIN_SPD, MAX_SPD
        @vy = (do p.random < .5 and -1 or 1) * ~~p.random MIN_SPD, MAX_SPD

        @c = INIT_FILL

        @


    script: -> do @update().display

    update: ->
        { p: { width: w, height: h }, RAD } = @
        @vx *= -1  if (@x += @vx) > w - RAD or @x < RAD
        @vy *= -1  if (@y += @vy) > h - RAD or @y < RAD
        @


    display: ->
        @p.fill @c
        @p.ellipse @x, @y, @DIM, @DIM
        @


    colliding: (c) ->
        { RAD } = c.constructor
        (c.x + RAD - @x) ** 2 + (c.y + RAD - @y) ** 2 < @p.sq RAD + @RAD
