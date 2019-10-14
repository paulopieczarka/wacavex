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

    this.__renderOffscren()

    this.spawn(this.player)
    this.generated = true
  }

  __renderOffscren () {
    const { size } = this
    const width = size * TILE_SIZE
    const height = size * TILE_SIZE

    if (window.OffscreenCanvas) {
      this.offscreenCanvas = new OffscreenCanvas(width, height)
    } else {
      console.warn('OffscreenCanvas not supported!')
      this.offscreenCanvas = document.createElement('canvas')
      this.offscreenCanvas.width = width
      this.offscreenCanvas.height = height
    }

    const ctx = this.offscreenCanvas.getContext('2d')

    for (let i=0; i < size; i++) {
      for (let j=0; j < size; j++) {
        const tile = this.tiles[i][j]
        const depth = this.depth[i][j]
        const x = i * TILE_SIZE
        const y = j * TILE_SIZE
        ctx.fillStyle = tile.color.get(1 - depth)
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE)
      }
    }
  }

  render (g, canvas) {
    if (!this.generated) {
      g.text({ x: 0, y: 0, text: 'Generating world!!' })
      return
    }

    g.ctx.drawImage(
      this.offscreenCanvas,
      -Camera.x,
      -Camera.y,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    )

    this.entities.forEach((entity) => entity.render(g, canvas))
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
