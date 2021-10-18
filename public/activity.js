class WBSActivity extends WBSElement {
  constructor(ctx, data) {
    super(ctx, data)
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

    const activities = elements.find(
      (element) => element.index[0] === this.index[0] && element.index[1] === this.index[1]
    ).activities

    for (let n = 0; n < this.index[2]; n++) {
      topMargin += activities.find(
        (element) =>
          element.index[0] === this.index[0] &&
          element.index[1] === this.index[1] &&
          element.index[2] === n
      ).height
    }

    this.posX = 1.5 * this.spacing + this.index[0] * (this.width + this.spacing)
    this.posY = 2.5 * this.spacing + ELEMENT_HEIGHT * 3 + topMargin
  }
}
