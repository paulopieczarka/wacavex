import Assets from '../assets'
import EntityBoat from './entity-boat'

class Player extends EntityBoat {
  constructor ({ x, y }) {
    super({
      x: x || 0,
      y: x || 0,
      name: 'Player',
      width: 32,
      height: 16,
      color: 'orange'
    })

    this.sprite = Assets.get('boat')
  }

  // @Override
  update (keyboard, canvas, delta) {
    super.update(keyboard, canvas, delta)

    if (keyboard.isKeyDown('w')) {
      this.accelerate(delta)
    }

    if (keyboard.isKeyDown('s')) {
      //this.moveBackward(25.0 * delta)
    }

    if (keyboard.isKeyDown('a')) {
      this.rotation -= 2.0 * delta
    }

    if (keyboard.isKeyDown('d')) {
      this.rotation += 2.0 * delta
    }
  }  
}

export default Player
