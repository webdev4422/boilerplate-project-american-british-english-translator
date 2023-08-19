'use strict'

const Translator = require('../components/translator.js')

module.exports = function (app) {
  const translator = new Translator()

  app.route('/api/translate').post((req, res) => {
    const { locale, text } = req.body

    if (!locale || (!locale && !text)) {
      return res.json({ error: 'Required field(s) missing' })
    }

    if (locale != 'american-to-british' && locale != 'british-to-american') {
      return res.json({ error: 'Invalid value for locale field' })
    }

    if (!text) {
      return res.json({ error: 'No text to translate' })
    }
    // Failed:If text requires no translation, return "Everything looks good to me!" for the translation value.
    // {"text":"color","translation":"<span class=\"highlight\">colour</span>"}
    res.end()
  })
}
