const fs = require('fs')
const csv = require('csv-parser')
let results = []

fs.createReadStream('data/smartbreed.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const parsedElements = results.map((result) => {
      return {
        name: result.Name,
        layer: parseInt(result.Gliederungsebene),
        tag: result.Gliederungsnummer,
        index: result.Gliederungsnummer.split('.').map((number) => parseInt(number) - 1),
      }
    })

    // let tree = parsedElements.shift()

    // parsedElements.forEach((element) => {
    //   switch (element.layer) {
    //     case 1:
    //       tree.children[element.tags[0]] = element
    //       break
    //     case 2:
    //       tree.children[element.tags[0]].children[element.tags[1]] = element
    //       break
    //     case 3:
    //       tree.children[element.tags[0]].children[element.tags[1]].children[
    //         element.tags[2]
    //       ] = element
    //       break
    //     default:
    //       break
    //   }
    // })

    fs.writeFileSync('data/smartbreed.json', JSON.stringify(parsedElements, null, 2), 'utf8')
  })
