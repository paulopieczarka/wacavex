export const STATE_NONE = Symbol('mouse-state-none')
export const STATE_PRESSED = Symbol('mouse-state-pressed')
export const STATE_DOWN= Symbol('mouse-state-down')
export const STATE_UP = Symbol('mouse-state-up')

class Mouse {
  constructor () {
    this.x = 0
    this.y = 0
    this.buttonState = {}

    window.addEventListener('mousemove', this._handleMouseMove.bind(this), false)
    window.addEventListener('mousedown', this._handleMouseDown.bind(this), false)
    window.addEventListener('mouseup', this._handleMouseUp.bind(this), false)
  }

  isButtonPressed (button) {
    return this.buttonState[button] === STATE_PRESSED
  }

  isButtonDown (button) {
    return this.buttonState[button] === STATE_DOWN || this.buttonState[button] === STATE_PRESSED
  }

  isButtonUp (button) {
    return this.buttonState[button] === STATE_UP
  }

  _handleMouseDown ({ which }) {
    this.buttonState[which] = STATE_PRESSED
  }

  _handleMouseUp ({ which }) {
    this.buttonState[which] = STATE_UP
  }

  _handleMouseMove (e) {
    this.x = e.pageX
    this.y = e.pageY
  }

  pool () {
    Object.keys(this.buttonState).forEach((key) => {
      if (this.buttonState[key] === STATE_PRESSED) {
        this.buttonState[key] = STATE_DOWN
      } else if (this.buttonState[key] === STATE_UP) {
        delete this.buttonState[key]
      }
    })
  }
}

export default Mouse
