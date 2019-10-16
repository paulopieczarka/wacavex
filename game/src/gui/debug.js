import Camera from '../camera'

class DebugGUI {
  constructor (game) {
    this.game = game
    this.world = game.world
  }

  render (g, canvas) {
    const { fps } = this.game
    const { width, height } = canvas
    const { entities, regions } = this.world

    const x = width - 10
    g.ctx.textAlign = 'end'
    g.text({ x, y: 10, text: `Window: ${width}x${height} (${fps} fps)` })
    g.text({ x, y: 35, text: `Camera: ${Math.floor(Camera.x)}, ${Math.floor(Camera.y)}` })
    g.text({ x, y: 60, text: `Regions: ${regions.length} // Entities: ${entities.length}` })
    g.ctx.textAlign = 'start'
  }
}

export default DebugGUI
