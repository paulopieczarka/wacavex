import Entity from './entity'

class EntityBoat extends Entity {
  constructor ({ name, x, y, width, height, color }) {
    super({ name, x, y, width, height, color })
    this.health = 100.0
    this.topSpeed = 150.0
    this.acceleration = 25.0
    this.braking = 18.0
    this.armor = 14.0
    this.velocity = 0
    this.isAccelerating = false
  }

  // @Override
  render (g, canvas) {
    super.render(g, canvas)
  }

  // @Override
  update (keyboard, canvas, delta) {
    super.update(keyboard, canvas, delta)

    // Move boat
    this.x += this.velocity * Math.cos(this.rotation) * delta
    this.y += this.velocity * Math.sin(this.rotation) * delta

    // Boat braking effect
    if (!this.isAccelerating && this.velocity > 0) {
      this.velocity -= this.getBraking() * delta
      if (this.velocity < 0) {
        this.velocity = 0
      }
    }

    // Land collisiton detection
    if (!this.getFloorTile().isWater) {
      this.velocity -= Math.pow(this.getBraking(), 2) * delta
      if (this.velocity < 0) {
        this.velocity = 0
      }
    }

    this.isAccelerating = false
  }

  accelerate (delta) {
    this.isAccelerating = true
    this.velocity += this.getAcceleration() * delta
    if (this.velocity > this.topSpeed) {
      this.velocity = this.topSpeed
    }
  }

  getTopSpeed () {
    return this.topSpeed
  }

  getAcceleration () {
    return this.acceleration
  }

  getBraking () {
    return this.braking
  }

  getArmor () {
    return this.armor
  }
}

export default EntityBoat
