import Tile from './tile'
import { Noise } from '../util'

class WorldGenerator {
  constructor (world) {
    this.world = world
  }

  async generate () {
    await generateWater(this.world)
    await generateTerrain(this.world)
    await processRegions(this.world)

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

async function generateTerrain (world) {
  const { size } = world

  const noiseScale = 30
  const octaves = 6
  const persistance = 0.5
  const lacunarity = 2

  const noiseMap = Noise.generateNoiseMap(size, size, noiseScale, octaves, persistance, lacunarity)

  for (let i=0; i < world.size; i++) {
    for (let j=0; j < world.size; j++) {
      world.depth[i][j] = Math.min(.3 - (noiseMap[i][j] * noiseMap[i][j] / 2), .3)
      if (noiseMap[i][j] < .6) {
        world.setTile(i, j, Tile.SaltWater)
        
      } else if (noiseMap[i][j] < .65) {
        world.setTile(i, j, Tile.Sand)
      } else if (noiseMap[i][j] > .92) {
        world.setTile(i, j, Tile.Ice)
      } else {
        world.setTile(i, j, Tile.Grass)
      }
    }
  }
}

async function processRegions (world) {
  const { size } = world

  const map = []
  for (let i=0; i < world.size; i++) {
    map[i] = []
    for (let j=0; j < world.size; j++) {
      map[i][j] = world.getTile(i, j) === Tile.SaltWater ? 0 : 1
    }
  }

  // Process regions
  function getRegionTiles (startX, startY) {
    const tiles = []
    const mapFlags = Array(size).fill([]).map(() => Array(size).fill(0))
    let tileType = map[startX][startY]

    const queue = []
    queue.unshift({ x: startX, y: startY })
    mapFlags[startX][startY] = 1

    while (queue.length > 0) {
      const tile = queue.shift()
      tiles.push({ ...tile })

      for (let i=tile.x-1; i <= tile.x+1; i++) {
        for (let j=tile.y-1; j <= tile.y+1; j++) {
          if (i >= 0 && i < size && j >= 0 && j < size && (j == tile.y || i == tile.x)) {
            if (mapFlags[i][j] === 0 && map[i][j] === tileType) {
              mapFlags[i][j] = 1
              queue.unshift({ x: i, y: j })
            }
          }
        }
      }
    }

    return tiles
  }

  function getRegions (tileType) {
    const regions = []
    const mapFlags = Array(size).fill([]).map(() => Array(size).fill(0))

    for (let i=0; i < size; i++) {
      for (let j=0; j < size; j++) {
        if (mapFlags[i][j] === 0 && map[i][j] === tileType) {
          const regionTiles = getRegionTiles(i, j)
          regions.push(regionTiles)
          regionTiles.forEach((coords) => {
            mapFlags[coords.x][coords.y] = 1
          })
        }
      }
    }

    return regions
  }

  const regions = getRegions(1)
  regions.forEach((region, i) => {
    if ((region.length < 200 || region.length > 1000) && Math.random() > 0.0001) {
      region.forEach(({ x, y }) => world.setTile(x, y, Tile.SaltWater))
      regions.splice(i, 1)
    }
  })

  world.setRegions(regions)
}

export default WorldGenerator
