
export const KEY_NONE = Symbol('key-none')
export const KEY_DOWN = Symbol('key-down')
export const KEY_PRESSED = Symbol('key-pressed')
export const KEY_UP = Symbol('key-up')

class Keyboard {
  constructor () {
    this.keyState = {}
    
    window.addEventListener('keydown', this._keyDownHandler.bind(this), false)
    window.addEventListener('keyup', this._keyUpHandler.bind(this), false)
  }

  isKeyPressed (code) {
    return this.keyState[code] === KEY_PRESSED 
  }

  isKeyDown (code) {
    return this.keyState[code] === KEY_PRESSED || this.keyState[code] === KEY_DOWN
  }

  isKeyUp (code) {
    return this.keyState[code] === KEY_UP
  }

  _keyDownHandler ({ key }) {
    if (!this.keyState[key] || this.keyState[key] === KEY_NONE) {
      this.keyState[key] = KEY_PRESSED
    }
  }

  _keyUpHandler ({ key }) {
    this.keyState[key] = KEY_UP
  }

  poll () {
    Object.keys(this.keyState).forEach((code) => {
      if (this.keyState[code] === KEY_UP) {
        delete this.keyState[code]
      } else if (this.keyState[code] === KEY_PRESSED) {
        this.keyState[code] = KEY_DOWN
      }
    })
  }
}

export default Keyboard