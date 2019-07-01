console.log `import`.meta

export default class Chamber
    DIM: @DIM = 40
    RAD: @RAD = @DIM >> 1

    constructor: (@p, @x = 0, @y = 0, @c = 0) ->

    display: ->
        @p.fill @c
        @p.rect @x, @y, @DIM, @DIM
        @
