class WBSPackage extends WBSElement {
  constructor(ctx, data) {
    super(ctx, data)

    this.activities = []
  }

  calculatePosition() {
    let topMargin = 0

    for (let i = 0; i < this.index[1]; i++) {
      topMargin +=
        elements.find((element) => element.index[0] === this.index[0] && element.index[1] === i)
          .height +
        1 +
        0.5 * this.spacing
    }

    this.posX = 1.5 * this.spacing + this.index[0] * (this.width + this.spacing)
    this.posY = 2.5 * this.spacing + ELEMENT_HEIGHT * 2 + topMargin
  }

  addActivity(activity) {
    this.activities.push(activity)
    this.calculateHeight()
  }

  calculateHeight() {
    let height = ELEMENT_HEIGHT
    this.activities.forEach((activity) => (height += activity.height))
    this.height = height
  }

  drawActivities() {
    this.activities.forEach((activity) => {
      activity.draw()
    })
  }

  drawLines() {
    let x = this.posX
    let y = this.posY + ELEMENT_HEIGHT * 0.5

    this.ctx.strokeStyle = this.color[3]
    this.ctx.beginPath()
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(x - 0.25 * this.spacing, y)
    this.ctx.closePath()
    this.ctx.stroke()
  }
}
