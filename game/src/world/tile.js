import Color from '../util/color'

class Tile {
  static list = Array()
  static SaltWater = new Tile(0, 'Salt Water', Color.fromHex('#5199FF'), { isWater: true })
  static Grass = new Tile(1, 'Grass', Color.fromHex('#00FF00'))
  static Sand = new Tile(2, 'Sand', Color.fromHex('#FFFF00'))
  static Ice = new Tile(3, 'Ice', Color.fromHex('#FFFFFF'))

  constructor (id, name, color, { isSolid, isWater } = {}) {
    this.id = id
    this.name = name
    this.color = color || new Color(255, 0, 255)
    this.isSolid = isSolid || false
    this.isWater = isWater || false

    // Add to list
    Tile.list[id] = { ...this }
  }
}

export default Tile
