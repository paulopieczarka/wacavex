import Camera from '../camera'

class Entity {
  constructor ({ name, x, y, width, height, color }) {
    this.name = name
    this.x = x
    this.y = y
    this.rotation = 0
    this.width = width || 16
    this.height = height || 16
    this.scale = 1.0
    this.color = color || 'orange'
    this.sprite = undefined
  }

  render (g, canvas) {
    if (!this.sprite) {
      g.rect({
        x: this.posX,
        y: this.posY,
        width: this.width * this.scale,
        height: this.height * this.scale,
        style: this.color,
        rotation: this.rotation
      })
    } else {
      g.ctx.translate(this.posX, this.posY)
      g.ctx.rotate(this.rotation)
      g.ctx.drawImage(this.sprite, -this.sprite.width/2, -this.sprite.height/2, this.width, this.height)
      g.ctx.rotate(-this.rotation)
      g.ctx.translate(-this.posX, -this.posY)

    }
  }

  update (keyboard, canvas, delta) { }

  get posX () {
    return this.x + Camera.x
  }

  get posY () {
    return this.y + Camera.y
  }

  isAlive () {
    return false
  }
}

export default Entity
