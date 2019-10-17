import WorldGenerator from './world-generator'
import Player from '../entities/player'
import Camera from '../camera'
import Region from './region'
import { OffscreenCanvas } from '../util'
import {
  TILE_SIZE,
  TILE_ELEVATION_SIZE,
  HALF_TILE_SIZE
} from '../constants'

class World {
  constructor ({ name, size }) {
    this.name = name
    this.size = size || 512
    this.generated = false
    this.tiles = []
    this.depth = []
    this.entities = []
    this.regions = []
    this.mouse = undefined

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
      g.text({ x: 300, y: 300, text: 'Generating world!!' })
      return
    }

    const { size } = this
    const xStart = Math.max(Math.floor((-Camera.x)/32) - 1, 0)
    const yStart = Math.max(Math.floor((-Camera.y)/32) - 1, 0)
    const xEnd = xStart + Math.floor(canvas.width/32) + 4
    const yEnd = yStart + Math.floor(canvas.height/32) + 4

    let hoverTile = undefined
    for (let i=xStart; i < xEnd; i++) {
      for (let j=yStart; j < yEnd; j++) {
        const tile = this.tiles[i][j]
        const depth = this.depth[i][j]
        const x = Math.floor(Camera.x + i * TILE_SIZE)
        const y = Math.floor(Camera.y + j * TILE_SIZE)
        g.ctx.fillStyle = tile.color.get(1 - depth)
        g.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE)

        if (!this.tiles[i][j].isWater) {
          if (j < (size - 1) && this.tiles[i][j]['elevation'] > this.tiles[i][j+1]['elevation']) {
            g.ctx.fillStyle = 'rgba(0, 0, 0, .1)'
            g.ctx.fillRect(x, y+TILE_SIZE-TILE_ELEVATION_SIZE, TILE_SIZE, TILE_ELEVATION_SIZE)
          }
        }

        if (this.mouse) {
          if (this.mouse.x >= x && this.mouse.x <= x+TILE_SIZE) {
            if (this.mouse.y >= y && this.mouse.y <= y+TILE_SIZE) {
              this.mouse['tile'] = ({ x: i, y: j, worldPosX: x, worldPosY: y })
            }
          }
        }
      }
    }

    if (this.mouse && this.mouse['tile']) {
      g.ctx.strokeStyle = 'rgba(0, 0, 0, .5)'
      g.ctx.lineWidth = 1
      g.ctx.beginPath()
      g.ctx.rect(this.mouse['tile']['worldPosX'], this.mouse['tile']['worldPosY'], TILE_SIZE, TILE_SIZE)
      g.ctx.stroke()
    }

    this.regions.forEach((region) => region.render(g, canvas))

    this.entities.forEach((entity) => entity.render(g, canvas))
    
    if (this.mouseTile) {
      g.ctx.strokeStyle = 'rgba(0, 0, 0, .5)'
      g.ctx.beginPath()
      g.ctx.rect(
        Camera.x + (this.mouseTile.x * 32),
        Camera.y + (this.mouseTile.y * 32),
        TILE_SIZE,
        TILE_SIZE
      )
      g.ctx.stroke()

      g.text({
        x: 300,
        y: 300,
        text: `Tile(${this.mouseTile.x},${this.mouseTile.y}) => ${this.mouseTile.tile.name}`
      })
    }
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

  update ({ mouse, keyboard }, canvas, delta) {
    const { entities } = this
    entities.forEach((entity, i) => {
      entity.update({ mouse, keyboard }, canvas, delta)
      if (entity._destroy) {
        entities.splice(i, 1)
      }
    })

    if (this.mouse && this.mouse['tile']) {
      if (mouse.isButtonPressed(1)) {
        const { tile: coords } = this.mouse
        const tile = this.getTile(coords.x, coords.y)
        console.log('Hit:', tile.name, '=>', tile.resource)
      }
    }

    this.mouse = ({ x: mouse.x, y: mouse.y })
  }
}

export default World
