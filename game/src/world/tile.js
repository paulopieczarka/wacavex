class Tile {
  static list = Array()
  static SaltWater = new Tile(0, 'Salt Water', 'blue', { isWater: true })
  static Grass = new Tile(1, 'Grass', 'green')
  static Sand = new Tile(2, 'Sand', 'green')

  constructor (id, name, color, { isSolid, isWater } = {}) {
    this.id = id
    this.name = name
    this.color = color || 'hotpink'
    this.isSolid = isSolid || false
    this.isWater = isWater || false

    // Add to list
    Tile.list[id] = { ...this }
  }
}

export default Tile
