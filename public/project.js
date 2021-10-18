class WBSProject extends WBSElement {
  constructor(ctx, data) {
    super(ctx, data)
    this.textAlign = 'center'
  }

  calculatePosition() {
    this.posX = this.vw / 2 - this.width / 2
    this.posY = this.spacing
  }

  drawLines() {
    let x = this.posX + this.width * 0.5
    let y = this.posY + this.height
    let y2 = y + this.spacing * 0.5
    this.ctx.strokeStyle = this.color[3]
    this.ctx.beginPath()
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(x, y2)
    this.ctx.closePath()
    this.ctx.stroke()

    let x2 = this.spacing + this.width * 0.5
    let x3 = this.phaseCount * (this.spacing + this.width) - this.width * 0.5
    this.ctx.beginPath()
    this.ctx.moveTo(x2, y2)
    this.ctx.lineTo(x3, y2)
    this.ctx.closePath()
    this.ctx.stroke()
  }
}
