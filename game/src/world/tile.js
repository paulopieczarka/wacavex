import Color from '../util/color'

class Tile {
  static list = Array()
  static SaltWater = new Tile(0, 'Salt Water', Color.fromHex('#5199FF'), { isWater: true })
  static Grass = new Tile(1, 'Grass', Color.fromHex('#00FF00'), { elevation: 2 })
  static Sand = new Tile(2, 'Sand', Color.fromHex('#FFFF00'), { elevation: 1 })
  static Ice = new Tile(3, 'Ice', Color.fromHex('#FFFFFF'), { elevation: 10 })
  static Tree = new Tile(4, 'Tree', Color.fromHex('#59C672'), { isSolid: true, elevation: 10 })
  static Stone = new Tile(5, 'Stone', Color.fromHex('#6D7A84'), { isSolid: true, elevation: 8 })
  static Iron = new Tile(6, 'Iron', Color.fromHex('#947FA2'), { isSolid: true, elevation: 9 })

  constructor (id, name, color, { isSolid, isWater, elevation } = {}) {
    this.id = id
    this.name = name
    this.color = color || new Color(255, 0, 255)
    this.isSolid = isSolid || false
    this.isWater = isWater || false
    this.elevation = elevation || 0

    // Add to list
    Tile.list[id] = { ...this }
  }
}

export default Tile
