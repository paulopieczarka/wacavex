import Entity from './entity'

class EntityAlive extends Entity {
  constructor ({ name, x, y, width, height, color }) {
    super({ name, x, y, width, height, color })
    this.health = 1.0
    this.velocity = 0
  }

  // @Override
  update (keyboard, canvas, delta) {
    super.update(keyboard, canvas, delta)

    this.x += this.velocity * Math.cos(this.rotation) * delta
    this.y += this.velocity * Math.sin(this.rotation) * delta

    if (this.velocity > 0) {
      this.velocity = Math.max(this.velocity - 15.0 * delta, 0)
    } else if (this.velocity < 0) {
      this.velocity = Math.min(this.velocity + 15.0 * delta, 0)
    }
  }

  moveForward (speed) {
    this.velocity += speed
    if (this.velocity >= this.maxSpeed()) {
      this.velocity = this.maxSpeed()
    } else if (this.velocity < 0) {
      this.velocity = 0
    }
  }

  moveBackward (speed) {
    this.velocity -= speed
    if (this.velocity <= this.maxSpeed()) {
      this.velocity = -this.maxSpeed()
    } else if (this.velocity > 0) {
      this.velocity = 0
    }
  }

  isAlive () {
    return true
  }

  maxSpeed () {
    return 1.2
  }
}

export default EntityAlive
