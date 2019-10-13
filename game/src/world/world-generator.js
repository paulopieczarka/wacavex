import Tile from './tile'

class WorldGenerator {
  constructor (world) {
    this.world = world
  }

  async generate () {
    await generateWater(this.world)

    return Promise.resolve(true)
  }
}

async function generateWater (world) {
  for (let i=0; i < world.size; i++) {
    for (let j=0; j < world.size; j++) {
      world.setTile(i, j, Tile.SaltWater)
    }
  }
}

export default WorldGenerator
