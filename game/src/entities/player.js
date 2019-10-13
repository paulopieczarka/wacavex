import EntityAlive from './entity-alive'

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
  }

  // @Override
  get posX () { return this.x }

  // @Override
  get posY () { return this.y }

  // @Override
  update (keyboard, delta) {
    super.update(keyboard, delta)

    if (keyboard.isKeyDown('w')) {
      this.moveForward(1)
    }

    if (keyboard.isKeyDown('s')) {
      this.moveBackward(1)
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
    return 5.7
  }  
}

export default Player
