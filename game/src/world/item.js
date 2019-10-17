class Item {
  static Water = (new Item(0, 'Water'))
  static Wood = (new Item(1, 'Wood'))
  static Stone = (new Item(2, 'Stone'))
  static Iron = (new Item(3, 'Iron'))

  constructor (id, name) {
    this.id = id
    this.name = name
  }
}

export default Item
