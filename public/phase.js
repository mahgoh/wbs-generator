class WBSPhase extends WBSElement {
  constructor(ctx, data) {
    super(ctx, data)
  }

  calculatePosition() {
    this.posX = this.spacing + this.index[0] * (this.width + this.spacing)
    this.posY = 2 * this.spacing + this.height
  }

  drawLines() {
    let x = this.posX + this.spacing * 0.25
    let y = this.posY + this.height

    let maxPosY = 0
    let packages = elements.filter(
      (element) => element.index[0] === this.index[0] && element.layer === 2
    )
    packages.forEach((element) => {
      if (element.posY > maxPosY) maxPosY = element.posY
    })

    let height = maxPosY - y + 0.5 * ELEMENT_HEIGHT

    this.ctx.strokeStyle = this.color[3]
    this.ctx.beginPath()
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(x, y + height)
    this.ctx.closePath()
    this.ctx.stroke()

    let x2 = this.posX + this.width * 0.5
    let y2 = this.posY

    this.ctx.beginPath()
    this.ctx.moveTo(x2, y2)
    this.ctx.lineTo(x2, y2 - this.spacing * 0.5)
    this.ctx.closePath()
    this.ctx.stroke()
  }
}
