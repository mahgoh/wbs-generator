const SPACING = 50
const ELEMENT_HEIGHT = 40
const VW = window.innerWidth
const VH = window.innerHeight
const COLORS = [
  ['#415c2c', '#ffffff', false, '#839c70'],
  ['#368733', '#ffffff', false, '#839c70'],
  ['#dddddd', '#222222', '#dddddd', '#839c70'],
  ['#ffffff', '#222222', '#dddddd', '#839c70'],
]
// const TEXT_SHIFT = [0, 20, 40, 40] // whole wbs
const TEXT_SHIFT = [0, 30, 50, 50]
const FONTS = ['17px sans-serif', '17px sans-serif', '14px sans-serif', '12px sans-serif']

let elements = []
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

async function loadData() {
  return await fetch('/public/data2.json').then((res) => res.json())
}

async function setup() {
  canvas.width = VW
  canvas.height = VH

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, VW, VH)
  ctx.lineWidth = 2

  const data = await loadData()
  const filtered = data.filter((element) => element.layer < 4)

  const phaseCount = data.filter((element) => element.layer === 1).length
  const elementWidth = Math.floor((VW - (phaseCount + 1) * SPACING) / phaseCount)
  // const elementWidth = 260

  const parsed = filtered.map((element) => parseElement(ctx, element, elementWidth, phaseCount))

  parsed
    .filter((element) => element.layer === 3)
    .forEach((activity) => {
      parsed
        .find(
          (element) =>
            element.index[0] == activity.index[0] && element.index[1] == activity.index[1]
        )
        .addActivity(activity)
    })

  elements = parsed.filter((element) => element.layer < 3)

  elements.forEach((element) => element.calculatePosition())
  elements.forEach((element) => element.draw())
  console.log(elements)
  save()
}

function parseElement(ctx, element, elementWidth, phaseCount) {
  element.width = elementWidth
  element.height = ELEMENT_HEIGHT
  element.spacing = SPACING
  element.phaseCount = phaseCount
  element.color = COLORS[element.layer]
  element.font = FONTS[element.layer]
  element.vw = VW
  element.vh = VH

  switch (element.layer) {
    case 0:
      return new WBSProject(ctx, element)
    case 1:
      return new WBSPhase(ctx, element)
    case 2:
      return new WBSPackage(ctx, element)
    case 3:
      return new WBSActivity(ctx, element)
    default:
      return false
  }
}

function save() {
  const anchor = document.createElement('a')
  anchor.setAttribute('style', 'position: fixed;top:0;left:0')
  anchor.setAttribute('download', 'download')
  anchor.setAttribute('href', canvas.toDataURL())
  anchor.innerHTML = 'Save'
  document.body.appendChild(anchor)
}

setup()
