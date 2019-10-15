import WorldGenerator from './world-generator'
import Player from '../entities/player'
import Camera from '../camera'
import Region from './region'

const TILE_SIZE = 32

class World {
  constructor ({ name, size }) {
    this.name = name
    this.size = size || 512
    this.generated = false
    this.tiles = []
    this.depth = []
    this.entities = []
    this.regions = []

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
        const x = Math.floor(i * TILE_SIZE)
        const y = Math.floor(j * TILE_SIZE)
        ctx.fillStyle = tile.color.get(1 - depth)
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE)

        if (!this.tiles[i][j].isWater) {
          if (j < (size - 1) && this.tiles[i][j]['elevation'] > this.tiles[i][j+1]['elevation']) {
            ctx.fillStyle = 'rgba(0, 0, 0, .1)'
            ctx.fillRect(x, y+TILE_SIZE-TILE_SIZE/10, TILE_SIZE, TILE_SIZE/10)
          }
        }
        
      }
    }
  }

  render (g, canvas) {
    if (!this.generated) {
      g.text({ x: 300, y: 300, text: 'Generating world!!' })
      return
    }

    g.ctx.drawImage(
      this.offscreenCanvas,
      -Math.round(Camera.x),
      -Math.round(Camera.y),
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    )

    this.regions.forEach((region) => region.render(g, canvas))

    this.entities.forEach((entity) => entity.render(g, canvas))
  }

  setTile (x, y, tile) {
    this.tiles[x][y] = tile
  }

  getTile (x, y) {
    return this.tiles[x][y]
  }

  setRegions (regionsTiles) {
    this.regions = (
      regionsTiles.map(tiles => new Region({ tiles, world: this }))
    )
  }

  spawn (entity) {
    entity.setWorld(this)
    this.entities.push(entity)
  }

  update (keyboard, canvas, delta) {
    const { entities } = this
    entities.forEach((entity) => entity.update(keyboard, canvas, delta))
  }
}

export default World
