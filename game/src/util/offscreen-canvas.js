class OffscreenCanvas {
  static create (width, height) {
    if (window.OffscreenCanvas) {
      return new window.OffscreenCanvas(width, height)
    }
    
    console.warn('OffscreenCanvas not supported!')
    const offscreenCanvas = document.createElement('canvas')
    offscreenCanvas.width = width
    offscreenCanvas.height = height
    return offscreenCanvas
  }
}

export default OffscreenCanvas
