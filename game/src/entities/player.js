import EntityAlive from './entity-alive'
import Assets from '../assets'

class Player extends EntityAlive {
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
  update (keyboard, delta) {
    super.update(keyboard, delta)

    if (keyboard.isKeyDown('w')) {
      this.moveForward(0.05)
    }

    if (keyboard.isKeyDown('s')) {
      this.moveBackward(0.05)
    }

    if (keyboard.isKeyDown('a')) {
      this.rotation -= .1
    }

    if (keyboard.isKeyDown('d')) {
      this.rotation += .1
    }
  }

  // @Override
  maxSpeed () {
    return 3.7
  }  
}

export default Player
