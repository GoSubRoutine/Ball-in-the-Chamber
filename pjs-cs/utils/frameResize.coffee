console.log `import`.meta

export default adjustFrameSize = ->
  if frameElement
    frameElement.height = frameElement.frameBorder = 0
    frameElement.height = getDocHeight() + 'px'
    frameElement.width  = getDocWidth()  + 'px'


export getDocWidth = ->
  Math.max(
    document.body.scrollWidth, document.documentElement.scrollWidth
    document.body.offsetWidth, document.documentElement.offsetWidth
    document.body.clientWidth, document.documentElement.clientWidth
  )


export getDocHeight = ->
  Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight
    document.body.offsetHeight, document.documentElement.offsetHeight
    document.body.clientHeight, document.documentElement.clientHeight
  )
