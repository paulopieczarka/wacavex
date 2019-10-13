const DEFAULT_FONT_SIZE = 16
const DEFAULT_FONT = `${DEFAULT_FONT_SIZE}px monospace`

class Graphics {
  constructor (ctx) {
    this.ctx = ctx
  }

  rect ({ x, y, width, height, style, rotation }) {
    this.ctx.save()
    this.ctx.translate(x+width/2, y+height/2)
    this.ctx.rotate(rotation || 0)
    this.ctx.fillStyle = style || 'white'
    this.ctx.fillRect(-width/2, -height/2, width, height)
    this.ctx.restore()
  }

  text ({ x, y, text, style }) {
    this.ctx.font = DEFAULT_FONT
    this.ctx.fillStyle = style || 'white'
    this.ctx.fillText(text, x, y+DEFAULT_FONT_SIZE)
  }
}

export default Graphics
