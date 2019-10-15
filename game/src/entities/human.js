import EntityAlive from './entity-alive'

class EntityHuman extends EntityAlive {
  constructor ({ x, y }) {
    super({ name: 'Human', x, y })
  }
}

export default EntityHuman
