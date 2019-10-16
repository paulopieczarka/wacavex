class GuiManager {
  static components = []

  static attach (component) {
    GuiManager.components.push(component)
  }

  static render (ctx, canvas) {
    GuiManager.components.forEach((component) => {
      component.render(ctx, canvas)
    })
  }

  static update (delta) {
    GuiManager.components.forEach((component) => {
      component.animate(delta)
    })
  }
}

export default GuiManager
