class Color {
  static fromHex (hexColor, alpha = 1) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor)
    return new Color(
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
      alpha
    )
  }

  constructor (r, g, b, alpha = 1) {
    this.r = r
    this.g = g
    this.b = b
    this.alpha = alpha
  }

  get (alpha) {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha === undefined ? this.alpha : alpha})`
  }
}

export default Color
