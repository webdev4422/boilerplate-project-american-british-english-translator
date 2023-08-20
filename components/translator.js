const americanOnly = require('./american-only.js')
const americanToBritishSpelling = require('./american-to-british-spelling.js')
const americanToBritishTitles = require('./american-to-british-titles.js')
const britishOnly = require('./british-only.js')

class Translator {
  translateToBritish(text) {
    let textX = text.split(/([,.\s])/)
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
    }
    textX = textX.join('')

    // Handle title
    textX = textX.split(' ')
    for (let i = 0; i < textX.length; i++) {
      for (const [key, value] of Object.entries(americanToBritishTitles)) {
        // const regex = new RegExp(`\\b${key}\\b`, 'gi')
        if (textX[i].toLowerCase().match(key)) {
          textX[i] = `<span class="highlight">${value[0].toUpperCase() + value.slice(1, 2)}</span>`
        }
      }
    }
    textX = textX.join(' ')

    // Handle american only
    for (const [key, value] of Object.entries(americanOnly)) {
      const regex = new RegExp(`\\b${key}\\b`, 'gi')
      textX = textX.replace(regex, `<span class="highlight">${value}</span>`)
    }

    // Check if text was translated and start with upper case
    if (text == textX && text.at(0) == text.at(0).toUpperCase()) {
      return 'Everything looks good to me!'
    }

    return textX
  }

  translateToAmerican(text) {
    let textX = text.split(/([,.\s])/)
    let lengthX = textX.length

    for (let i = 0; i < lengthX; i++) {
      // Handle spelling
      Object.keys(americanToBritishSpelling).forEach((key) => {
        if (americanToBritishSpelling[key] == textX[i]) {
          let objKey = Object.keys(americanToBritishSpelling).find(
            (key) => americanToBritishSpelling[key] === textX[i]
          )
          let translation = `<span class=\"highlight\">${objKey}</span>`
          textX.splice(i, 1, translation)
          console.log(translation)
        }
      })

      // Handle time
      if (/^([0-1]?[0-9]|2[0-3]).[0-5][0-9]$/.test(textX[i])) {
        let time = textX[i].split('.').join(':')
        let translation = `<span class=\"highlight\">${time}</span>`
        textX.splice(i, 1, translation)
      }
    }
    textX = textX.join('')

    // Handle title
    textX = textX.split(' ')
    for (let i = 0; i < textX.length; i++) {
      for (const [key, value] of Object.entries(americanToBritishTitles)) {
        // const regex = new RegExp(`\\b${key}\\b`, 'gi')
        if (textX[i].toLowerCase().match(value)) {
          textX[i] = `<span class="highlight">${key[0].toUpperCase() + key.slice(1, 2)}</span>`
        }
      }
    }
    textX = textX.join(' ')

    // Handle british only
    for (const [key, value] of Object.entries(britishOnly)) {
      const regex = new RegExp(`\\b${key}\\b`, 'gi')
      textX = textX.replace(regex, `<span class="highlight">${value}</span>`)
    }

    // Check if text was translated and start with upper case
    if (text == textX && text.at(0) == text.at(0).toUpperCase()) {
      return 'Everything looks good to me!'
    }

    return textX
  }
}

module.exports = Translator
