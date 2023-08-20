'use strict'

const Translator = require('../components/translator.js')

module.exports = function (app) {
  const translator = new Translator()

  app.route('/api/translate').post((req, res) => {
    const { locale, text } = req.body
    let translation

    // Check errors
    if (text === '') {
      return res.json({ error: 'No text to translate' })
    }

    if (locale != 'american-to-british' && locale != 'british-to-american') {
      return res.json({ error: 'Invalid value for locale field' })
    }

    if (!locale || !text) {
      return res.json({ error: 'Required field(s) missing' })
    }

    // Translate to British
    if (locale == 'american-to-british') {
      translation = translator.translateToBritish(text)
    }
    // Translate to American
    if (locale == 'british-to-american') {
      translation = translator.translateToAmerican(text)
    }

    return res.json({ text: text, translation: translation })
  })
}
