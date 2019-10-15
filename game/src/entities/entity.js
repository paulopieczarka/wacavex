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
    this.world = undefined
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
      g.ctx.translate(Math.floor(this.posX), Math.floor(this.posY))
      g.ctx.rotate(this.rotation)
      g.ctx.drawImage(this.sprite, Math.floor(-this.width/2), Math.floor(-this.height/2), this.width, this.height)
      g.ctx.rotate(-this.rotation)
      g.ctx.translate(-Math.floor(this.posX), -Math.floor(this.posY))

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

  setWorld (world) {
    this.world = world
  }

  getFloorTile () {
    const tileX = Math.floor(this.x / 32)
    const tileY = Math.floor(this.y / 32)
    return this.world.getTile(tileX, tileY)
  }
}

export default Entity
