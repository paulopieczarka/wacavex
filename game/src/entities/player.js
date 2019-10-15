import Assets from '../assets'
import EntityBoat from './entity-boat'
import EntityHuman from './human'
import { TILE_SIZE, START_CREW_SIZE } from '../constants'

class Player extends EntityBoat {
  constructor ({ x, y }) {
    super({
      x: x || 0,
      y: x || 0,
      name: 'Player',
      width: 32,
      height: 32,
      color: 'orange'
    })

    this.sprite = Assets.get('boat_v2')
    this.crew = undefined
    this.crewSize = START_CREW_SIZE || 0
    this.visionRadius = 2
  }

  // @Override
  update (keyboard, canvas, delta) {
    super.update(keyboard, canvas, delta)

    if (keyboard.isKeyDown('KeyW')) {
      this.accelerate(delta)
    }

    if (keyboard.isKeyDown('KeyS')) {
      //this.moveBackward(25.0 * delta)
    }

    if (keyboard.isKeyDown('KeyA')) {
      this.rotation -= 2.0 * delta
    }

    if (keyboard.isKeyDown('KeyD')) {
      this.rotation += 2.0 * delta
    }

    if (keyboard.isKeyPressed('Space')) {
      console.log('Spawn entities!')
      this._spawnCrew()
    }
  }
  
  _spawnCrew () {
    if (this.crew) {
      this.crew.forEach((entity) => entity.destroy())
      this.crew = undefined
      return
    }

    const tx = this.tilePosX
    const ty = this.tilePosY
    
    // TODO: refact
    // TODO: search by distance
    let land = undefined
    const radius = this.visionRadius
    for (let i=Math.max(0, tx-radius); i <= Math.min(tx+radius, this.world.size-1); i++) {
      for (let j=Math.max(0, ty-radius); j <= Math.min(ty+radius, this.world.size-1); j++) {
        if (!this.world.getTile(i, j).isWater) {
          land = { x: i, y: j }
          break
        }
      }

      if (land) break
    }

    if (land) {
      this.crew = []
      for (let i=0; i < this.crewSize; i++) {
        const x = (land.x * TILE_SIZE) + (Math.random() * TILE_SIZE)
        const y = (land.y * TILE_SIZE) + (Math.random() * TILE_SIZE)
        const member = new EntityHuman({ x, y})
        this.world.spawn(member)
        this.crew.push(member)
      }
    } else {
      // TODO: event alert event
    }
  }
}

export default Player
