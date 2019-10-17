import Color from '../util/color'
import Item from './item'

class Tile {
  static SaltWater = (new Tile(0, 'Salt Water')).setColor('#5199FF').setWater()
  static Grass = (new Tile(1, 'Grass')).setColor('#00FF00').setElevation(2)
  static Sand = (new Tile(2, 'Sand')).setColor('#FFFF00').setElevation(1)
  static Ice = (new Tile(3, 'Ice')).setColor('#FFFFFF').setElevation(10).setResource(Item.Water, 20)
  static Tree = (new Tile(4, 'Tree')).setColor('#59C672').setSolid().setResource(Item.Wood, 10)
  static Stone = (new Tile(5, 'Stone')).setColor('#6D7A84').setSolid().setElevation(8).setResource(Item.Stone, 10)
  static Iron = (new Tile(6, 'Iron')).setColor('#947FA2').setSolid().setElevation(9).setResource(Item.Iron, 5)

  constructor (id, name) {
    this.id = id
    this.name = name
    this.color = new Color(255, 255, 255)
    this.isSolid = false
    this.isWater = false
    this.elevation = 0
    this.resource = undefined
  }

  setColor (color) {
    if (typeof color === 'string') {
      this.color = Color.fromHex(color)
    } else {
      this.color = color
    }

    return this
  }

  setSolid (solid = true) {
    this.isSolid = solid
    return this
  }

  setWater (water = true) {
    this.isWater = water
    return this
  }

  setElevation (elevation = 1) {
    this.elevation = elevation
    return this
  }

  setResource (item, amount = 1) {
    this.resource = ({ item, amount })
    return this
  }
}

export default Tile
