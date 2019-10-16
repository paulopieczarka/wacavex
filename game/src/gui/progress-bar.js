import Component from './component'

class ProgressBar extends Component {
  constructor (value, options = {}) {
    super({ width: 156, height: 24 })
    const { maxValue, color, label } = options
    this.maxValue = maxValue || 100
    this.label = label || undefined
    this.color = color || 'white'
    this.background = 'rgba(0, 0, 0, .8)'
  }

  render (ctx, canvas) {
    super.render(ctx, canvas)
    ctx.save()
    ctx.fillStyle = this.color
    ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, this.height - 4)

    if (this.label) {
      ctx.fillStyle = 'white'
      ctx.lineWidth = 3
      ctx.font = `bolder ${ctx.font.replace(/\d+px/, '11px')}`
      ctx.strokeText(`${this.label}`, this.x+4, this.y+5, this.width - 8)
      ctx.fillText(`${this.label}`, this.x+4, this.y+5, this.width - 8)
    }
    ctx.restore()
  }

  _computePosition (canvas) {
    if (this.y === undefined) {
      super._computePosition(canvas)
      this.y += 5
    }
  }
}

export default ProgressBar
