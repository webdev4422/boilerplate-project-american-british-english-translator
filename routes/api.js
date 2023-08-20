'use strict'

const Translator = require('../components/translator.js')

module.exports = function (app) {
  const translator = new Translator()

  app.route('/api/translate').post((req, res) => {
    const { locale, text } = req.body

    if (text === '') {
      return res.json({ error: 'No text to translate' })
    }

    if (locale != 'american-to-british' && locale != 'british-to-american') {
      return res.json({ error: 'Invalid value for locale field' })
    }

    if (!locale || !text) {
      return res.json({ error: 'Required field(s) missing' })
    }

    const translation = translator.translate(text)
    return res.json({ text: text, translation: translation })
  })
}
