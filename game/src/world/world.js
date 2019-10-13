import WorldGenerator from './world-generator'
import Player from '../entities/player'
import Camera from '../camera'

const TILE_SIZE = 32

class World {
  constructor ({ name, size }) {
    this.name = name
    this.size = size || 512
    this.generated = false
    this.tiles = []
    this.depth = []
    this.entities = []

    // Create player at world middle
    const center = (this.size * TILE_SIZE) / 2
    this.player = new Player({ x: center, y: center })

    // Generate world
    this.generate()
  }

  async generate () {
    // Start tiles matrix
    for (let i=0; i < this.size; i++) {
      this.tiles[i] = []
      this.depth[i] = []
      for (let j=0; j < this.size; j++) {
        this.tiles[i][j] = 0
        this.depth[i][j] = 0
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
    const xStartIndex = Math.max(Math.floor((Camera.x * (-1)) / TILE_SIZE), 0)
    const yStartIndex = Math.max(Math.floor((Camera.y * (-1)) / TILE_SIZE), 0)
    const xEndIndex = Math.min(xStartIndex + Math.floor(canvas.width / TILE_SIZE) + 2, size)
    const yEndIndex = Math.min(yStartIndex + Math.floor(canvas.height / TILE_SIZE) + 2, size)

    for (let i=xStartIndex; i < xEndIndex; i++) {
      for (let j=yStartIndex; j < yEndIndex; j++) {
        g.rect(tileRect(tiles[i][j], i, j, this.depth[i][j]))
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

function tileRect (tile, i, j, depth = 0) {
  const alpha = 1 - depth
  return ({
    x: Math.floor((i * TILE_SIZE) + Camera.x),
    y: Math.floor((j * TILE_SIZE) + Camera.y),
    width: TILE_SIZE,
    height: TILE_SIZE,
    style: tile.color.get(alpha)
  })
}

export default World
