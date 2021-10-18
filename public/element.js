class WBSElement {
  constructor(ctx, data) {
    this.ctx = ctx

    this.name = data.name
    this.layer = data.layer
    this.tag = data.tag
    this.index = data.index
    this.width = data.width
    this.height = data.name.length > 30 ? data.height * 1.5 : data.height
    this.spacing = data.spacing
    this.phaseCount = data.phaseCount
    this.color = data.color
    this.font = data.font
    this.vw = data.vw
    this.vh = data.vh
    this.textAlign = 'left'
  }

  calculatePosition() {
    this.posX = 0
    this.posY = 0
  }

  drawRectangle() {
    this.ctx.fillStyle = this.color[0]
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    if (this.color[2]) {
      this.ctx.strokeStyle = this.color[2]
      this.ctx.strokeRect(this.posX, this.posY, this.width, this.height)
    }
  }

  drawText() {
    this.ctx.font = this.font
    this.ctx.textAlign = this.textAlign
    this.ctx.textBaseline = 'middle'
    this.ctx.fillStyle = this.color[1]

    this.textX = this.textAlign === 'left' ? this.posX + 10 : this.posX + this.width * 0.5
    this.textY = this.posY + ELEMENT_HEIGHT / 2

    // Check if text is larger than box width
    let measurements = ctx.measureText(this.name)

    if (parseInt(measurements.width) > this.width) console.warn(`Name larger than box: ${name}`)

    if (this.layer > 0) this.ctx.fillText(this.tag, this.textX, this.textY, this.width)

    if (this.name.length > 30) {
      let parts = this.name.match(/.{1,30}(\s|$)/g)

      this.ctx.fillText(parts[0], this.textX + TEXT_SHIFT[this.layer], this.textY)
      this.ctx.fillText(
        parts[1],
        this.textX + TEXT_SHIFT[this.layer],
        this.textY + ELEMENT_HEIGHT * 0.5
      )
    } else {
      this.ctx.fillText(this.name, this.textX + TEXT_SHIFT[this.layer], this.textY)
    }
  }

  draw() {
    this.calculatePosition()
    if (this.drawLines) this.drawLines()
    this.drawRectangle()
    this.drawText()
    if (this.drawActivities) this.drawActivities()
  }
}
