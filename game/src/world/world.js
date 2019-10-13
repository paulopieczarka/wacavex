import WorldGenerator from "./world-generator"
import Player from "../entities/player"

const TILE_SIZE = 16

class World {
  constructor ({ name, size }) {
    this.name = name
    this.size = size || 512
    this.generated = false
    this.tiles = []
    this.entities = []
    this.player = new Player({ x: 0, y: 0 })

    // Generate world
    this.generate()
  }

  async generate () {
    // Start tiles matrix
    for (let i=0; i < this.size; i++) {
      this.tiles[i] = []
      for (let j=0; j < this.size; j++) {
        this.tiles[i][j] = 0
      }
    }

    // Generate
    const generator = new WorldGenerator(this)
    await generator.generate()

    this.spawn(this.player)
    this.generated = true
  }

  render (g, canvas) {
    if (!this.generated) {
      g.text({ x: 0, y: 0, text: 'Generating world!!' })
      return
    }

    const { size, tiles, entities } = this
    const maxTileH = Math.min(Math.floor(canvas.width / TILE_SIZE) + 2, size)
    const maxTileV = Math.min(Math.floor(canvas.height / TILE_SIZE) + 2, size)

    for (let i=0; i < maxTileH; i++) {
      for (let j=0; j < maxTileV; j++) {
        g.rect(tileRect(tiles[i][j], i, j))
      }
    }

    entities.forEach((entity) => entity.render(g, canvas))
  }

  setTile (x, y, tile) {
    this.tiles[x][y] = tile
  }

  getTile (x, y) {
    return this.tiles[x][y]
  }

  spawn (entity) {
    this.entities.push(entity)
  }

  update (keyboard, delta) {
    const { entities } = this
    entities.forEach((entity) => entity.update(keyboard, delta))
  }
}

function tileRect (tile, i, j) {
  return ({
    x: i * TILE_SIZE,
    y: j * TILE_SIZE,
    width: TILE_SIZE - 1,
    height: TILE_SIZE - 1,
    style: tile.color
  })
}

export default World
