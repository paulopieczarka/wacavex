class Camera {
  static x = 0
  static y = 0
  static entity = null

  static follow (entity) {
    Camera.entity = entity
  }

  static update ({ keyboard }, canvas, delta) {
    if (Camera.entity) {
      const xOffset = canvas.width/2 - Camera.entity.width/2
      const yOffset = canvas.height/2 - Camera.entity.height/2
      Camera.x = -(Camera.entity.x - xOffset)
      Camera.y = -(Camera.entity.y - yOffset)
    }
  }
}

export default Camera
