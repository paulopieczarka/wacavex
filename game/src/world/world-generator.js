import Tile from './tile'

class WorldGenerator {
  constructor (world) {
    this.world = world
  }

  async generate () {
    await generateWater(this.world)
    await generateLand(this.world)
    await generateSand(this.world)
    await processDepth(this.world)

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

async function generateLand (world) {
  const { size } = world

  const randomFillPercent = 0.24
  const map = Array(size)
  
  // Random fill map
  for (let i=0; i < size; i++) {
    map[i] = Array(size)
    for (let j=0; j < size; j++) {
      if (i === 0 || i === size-1 || j === 0 || i === size-1) {
        map[i][j] = 1
      } else {
        map[i][j] = (Math.random() < randomFillPercent) ? 1 : 0
      }
    }
  }

  // Smooth map
  function isInMapRange (x, y) {
    if (x >= 0 && x < size) {
      if (y >= 0 && y < size) {
        return true
      }
    }

    return false
  }

  function getSurroundLandCount (x, y) {
    let landCount = 0
    for (let xNeighbour=x-1; xNeighbour <= x+1; xNeighbour++) {
      for (let yNeighbour=y-1; yNeighbour <= y+1; yNeighbour++) {
        if (xNeighbour !== x || yNeighbour !== y) {
          if (isInMapRange(xNeighbour, yNeighbour)) {
            landCount += map[xNeighbour][yNeighbour]
          }
        } else {
          landCount += 1
        }
      }
    }

    return landCount
  }

  for (let k=0; k < 5; k++) {
    for (let i=0; i < size; i++) {
      for (let j=0; j < size; j++) {
        const neighbourLandTiles = getSurroundLandCount(i, j)

        if (neighbourLandTiles > 4) {
          map[i][j] = 1
        } else if (neighbourLandTiles < 4) {
          map[i][j] = 0
        }
      }
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
          if (isInMapRange(i, j) && (j == tile.y || i == tile.x)) {
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
  const landThresholdSize = 100
  regions.forEach(region => {
    if (region.length < landThresholdSize) {
      region.forEach(({ x, y }) => map[x][y] = 0)
    }
  })

  // Set world tiles
  for (let i=0; i < size; i++) {
    for (let j=0; j < size; j++) {
      if (map[i][j] === 1) {
        world.setTile(i, j, Tile.Grass)
      }
    }
  }
}

async function generateSand (world) {
  const { size } = world

  for (let i=0; i < size; i++) {
    for (let j=0; j < size; j++) {
      if (world.getTile(i, j) !== Tile.SaltWater) {
        for (let x=i-1; x <= i+1; x++) {
          for (let y=j-1; y <= j+1; y++) {
            if (x >= 0 && x < size && y >= 0 && y < size) {
              if (world.getTile(x, y) === Tile.SaltWater) {
                world.setTile(i, j, Tile.Sand)
              }
            }
          }
        }
      }
    }
  }
}

async function processDepth (world) {
  const { size } = world

  for (let k=0; k < 3; k++) {
    for (let i=0; i < size; i++) {
      for (let j=0; j < size; j++) {
        if (world.getTile(i, j) === Tile.SaltWater) {
          let depth = 0
          for (let x=i-1; x <= i+1; x++) {
            for (let y=j-1; y <= j+1; y++) {
              if (x >= 0 && x < size && y >= 0 && y < size) {
                if (world.getTile(x, y) === Tile.Sand) {
                  depth += .00025
                }
                
                if (x !== i && y !== i) {
                  depth += world.depth[x][y] / 3
                }
              }
            }
          }
  
          world.depth[i][j] = Math.min(depth, .3)
        }
      }
    }
  }
}

export default WorldGenerator
