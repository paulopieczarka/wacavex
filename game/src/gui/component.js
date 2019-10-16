
export class Constraint { constructor (spacing) { this.spacing = spacing || 0 }; getX () { return 0 }; getY () { return 0 }; }

export class ConstraintLeft extends Constraint { getX (canvas) { return this.spacing }; }
export class ConstraintRight extends Constraint { getX (canvas) { return (canvas.width - this.spacing) }; }
export class ConstraintTop extends Constraint { getY (canvas) { return this.spacing }; }
export class ConstraintBottom extends Constraint { getY (canvas) { return (canvas.height - this.spacing) }; }
export class ConstraintComponent extends Constraint { constructor (spacing, component) { super(spacing); this.component = component; } }
export class ConstraintComponentBottom extends Constraint {
  constructor (spacing, component) { super(spacing); this.component = component; }
  getY (canvas) { return (this.component.x + this.component.height + this.spacing); }
}

class Component {
  constructor ({ width, height, visible, background }) {
    this.x = undefined
    this.y = undefined
    this.width = width || 0
    this.height = height || 0
    this.visible = visible || true
    this.background = background || 'darkgray'
    this.constraints = []
  }

  render (ctx, canvas) {
    if (this.visible) {
      this._computePosition(canvas)
      ctx.fillStyle = this.background
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }

  animate (delta) {

  }

  addConstraint (constraint) {
    this.constraints.push(constraint)
    return this
  }

  _computePosition (canvas) {
    if (this.x) { return }

    this.x = 0; this.y = 0
    this.constraints.forEach(constraint => {
      this.x += constraint.getX(canvas)
      this.y += constraint.getY(canvas)
    })
  }
}

export default Component
