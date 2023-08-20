const americanOnly = require('./american-only.js')
const americanToBritishSpelling = require('./american-to-british-spelling.js')
const americanToBritishTitles = require('./american-to-british-titles.js')
const britishOnly = require('./british-only.js')

class Translator {
  translateToBritish(text) {
    let textX = text.split(' ')
    let lengthX = textX.length // Keep length separate, cuz infinity loop

    for (let i = 0; i < lengthX; i++) {
      // Handle spelling
      if (americanToBritishSpelling.hasOwnProperty(textX[i])) {
        let translation = `<span class=\"highlight\">${americanToBritishSpelling[textX[i]]}</span>`
        textX.splice(i, 1, translation)
      }

      // Handle time
      if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(textX[i])) {
        let time = textX[i].split(':').join('.')
        let translation = `<span class=\"highlight\">${time}</span>`
        textX.splice(i, 1, translation)
      }

      // Handle title
      if (americanToBritishTitles.hasOwnProperty(textX[i].toLowerCase())) {
        let title = americanToBritishTitles[textX[i].toLowerCase()]
        title = title.at(0).toUpperCase() + title.slice(1, 2)
        let translation = `<span class=\"highlight\">${title}</span>`
        textX.splice(i, 1, translation)
      }
    }

    textX = textX.join(' ')

    // Check if text was translated and start with upper case
    if (text == textX && text.at(0) == text.at(0).toUpperCase()) {
      return 'Everything looks good to me!'
    }

    return textX
  }
}

module.exports = Translator
