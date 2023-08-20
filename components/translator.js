const americanOnly = require('./american-only.js')
const americanToBritishSpelling = require('./american-to-british-spelling.js')
const americanToBritishTitles = require('./american-to-british-titles.js')
const britishOnly = require('./british-only.js')

class Translator {
  translate(text) {
    let textX = text.split(' ')
    let lengthX = textX.length // Keep length separate, cuz infinity loop

    for (let i = 0; i < lengthX; i++) {
      if (americanToBritishSpelling.hasOwnProperty(textX[i])) {
        let translation = `<span class=\"highlight\">${americanToBritishSpelling[textX[i]]}</span>`
        textX.splice(i, 1, translation)
      }
    }
    textX = textX.join(' ')

    if (text == textX && text.at(0) == text.at(0).toUpperCase()) {
      return 'Everything looks good to me!'
    }

    return textX
  }
}

module.exports = Translator
