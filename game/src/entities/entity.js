import Camera from '../camera'

class Entity {
  constructor ({ name, x, y, width, height, color }) {
    this.name = name
    this.x = x
    this.y = y
    this.rotation = 0
    this.width = width || 16
    this.height = height || 16
    this.color = color || 'orange'
  }

  render (g, canvas) {
    g.rect({
      x: this.posX,
      y: this.posY,
      width: this.width,
      height: this.height,
      style: this.color,
      rotation: this.rotation
    })
  }

  update (keyboard, delta) { }

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
