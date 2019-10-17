class Mouse {
  constructor () {
    this.x = 0
    this.y = 0

    window.addEventListener('mousemove', this._handleMouseMove.bind(this), false)
  }

  _handleMouseMove (e) {
    this.x = e.pageX
    this.y = e.pageY
  }
}

export default Mouse
