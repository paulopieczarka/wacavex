import Entity from './entity'

class EntityAlive extends Entity {
  constructor ({ name, x, y }) {
    super({ name, x, y, width: 8, height: 8, color: 'white' })
    this.health = 100.0
  }
}

export default EntityAlive
