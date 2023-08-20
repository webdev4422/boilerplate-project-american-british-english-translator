const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert
const server = require('../server.js')

chai.use(chaiHttp)

let Translator = require('../components/translator.js')
const translator = new Translator()

suite('Functional Tests', () => {
  test('#1 Translation with text and locale fields: POST request to /api/translate', (done) => {
    const text = 'I ate yogurt for breakfast.'
    const locale = 'american-to-british'
    chai
      .request(server)
      .post('/api/translate')
      .send({
        text: text,
        locale: locale,
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.property(res.body, 'text')
        assert.property(res.body, 'translation')
        assert.equal(res.body.text, text)
        assert.equal(res.body.translation, translator.translateToBritish(text))
        done()
      })
  })

  test('#2 Translation with text and invalid locale field: POST request to /api/translate', (done) => {
    const text = 'I ate yogurt for breakfast.'
    const locale = 'american-to-french'
    chai
      .request(server)
      .post('/api/translate')
      .send({
        text,
        locale,
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'Invalid value for locale field')
        done()
      })
  })

  test('#3 Translation with missing text field: POST request to /api/translate', (done) => {
    const locale = 'american-to-british'
    chai
      .request(server)
      .post('/api/translate')
      .send({
        locale,
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'Required field(s) missing')
        done()
      })
  })

  test('#4 Translation with missing locale field: POST request to /api/translate', (done) => {
    const text = 'I ate yogurt for breakfast.'
    chai
      .request(server)
      .post('/api/translate')
      .send({
        text,
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'Required field(s) missing')
        done()
      })
  })

  test('#5 Translation with empty text: POST request to /api/translate', (done) => {
    const text = ''
    const locale = 'american-to-british'
    chai
      .request(server)
      .post('/api/translate')
      .send({
        text,
        locale,
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'No text to translate')
        done()
      })
  })

  test('#6 Translation with text that needs no translation: POST request to /api/translate', (done) => {
    const text = "I don't need to translate."
    const locale = 'british-to-american'
    chai
      .request(server)
      .post('/api/translate')
      .send({
        text,
        locale,
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.text, text)
        assert.equal(res.body.translation, 'Everything looks good to me!')
        done()
      })
  })
})
