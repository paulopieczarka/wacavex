class Assets {
  static list = {}
  static loaded = false

  static add (key, path) {
    Assets.list[key] = path
  }

  static async __loadImage (key, path) {
    return new Promise((resolve) => {
      Assets.list[key] = new Image()
      Assets.list[key].onload = () => resolve(true)
      Assets.list[key].src = path
    })
  }
  
  static async load () {
    const st = Date.now()
    await Promise.all(
      Object.keys(Assets.list).map(async (key) => {
        return Assets.__loadImage(key, Assets.list[key])
      })
    )

    console.log(`Loaded ${Object.keys(Assets.list).length} assets (${Date.now() - st}ms).`)
    this.loaded = true
    return true
  }
  
  static get (key) {
    return Assets.list[key]
  }
}

export default Assets
