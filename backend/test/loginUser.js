const expect = require('chai').expect;
const request = require ('request');
const URL = 'http://localhost:8090/user';

describe('User API', () => {
  describe('Login User', () => {
    describe('Login user validation ERROR', () => {
      describe('Login  user validate email', () => {
        const payload = {
         email:"",
         password:"pasi12344"
        }
  
        it('Status', done => {
          request.post(`${URL}/login`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
  
        it('Message', done => {
          request.post(`${URL}/login`, {
            json: payload
          }, (_, response) => {
            expect(response.body.message).to.equal('Invalid Email')
            done()
          })
        })
      })

      describe('User enter incorrect password', () => {
        const payload = {

         email:"pasi@gmail.com",
         password:"pasi12344"
          
        }
  
        it('Status', done => {
          request.post(`${URL}/login`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
  
        it('Message', done => {
          request.post(`${URL}/login`, {
            json: payload
          }, (_, response) => {
            expect(response.body.message).to.equal('Incorrect Password ')
            done()
          })
        })
      })
    })
  })
})