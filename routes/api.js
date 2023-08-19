'use strict'

const Translator = require('../components/translator.js')

module.exports = function (app) {
  const translator = new Translator()

  app.route('/api/translate').post((req, res) => {
    // {"text":"color","translation":"<span class=\"highlight\">colour</span>"}
    console.log('OK')
    res.end()
  })
}
