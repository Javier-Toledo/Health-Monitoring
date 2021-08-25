let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6Imphdmllci5jYXN0aWxsbzE4QHV0aW0uZWR1Lm14Iiwicm9sZSI6Im1hbmFnZXIiLCJhcmVhIjoiTWVkaWNpbmEgR2VuZXJhbCIsIndvcmtzdGF0aW9uIjoiQWRtaW5pc3RyYWRvciBkZSDDoXJlYSJ9LCJpYXQiOjE2MjkyMzgzODAsImV4cCI6MTYyOTMyNDc4MH0.zkvYm4SUc2Y-NdVBDxVf52CT8jPot9bZIJZNZI1oNaY';
describe('Test de mensajes', () => {

  describe('Leer mensajes por usuario', () => {
    it("Debe permitir leer los mensajes", (done) => {
      chai.request(url)
      .get('/messages-user')
      .set({ 'Authorization': `jwt ${token}` })
      .end(function(err, res){
        expect(res).to.have.status(200);
        done();
      });
    });
    it("Debe rechazar leer los mensajes al usuario con token inválido", (done) => {
      chai.request(url)
      .get('/messages-user')
      .set({ 'Authorization': `jwt ${token}J` })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });
    it("Se deben de devolver las propiedades de los mensajes al usuario", (done) => {
      chai.request(url)
      .get('/messages-user')
      .set({ 'Authorization': `jwt ${token}` })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property('user');
        expect(res.body[0]).to.have.property('idMessages');
        done();
      });
    });
  });

  describe("Eliminar mensajes",() => {
    const id = 3;
    it("Debe permitir eliminar los mensajes", (done) => {
      chai.request(url)
      .delete(`/messages/${id}`)
      .set({ 'Authorization': `jwt ${token}` })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });
    it("Debe rechazar eliminar los mensajes con token inválido", (done) => {
      chai.request(url)
      .put(`/messages/${id}`)
      .set({ 'Authorization': `jwt ${token}L` })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });
    it("No debe permitir eliminar un mensaje que no existe", (done) => {
      chai.request(url)
      .put(`/messages/${id * 3}`)
      .set({ 'Authorization': `jwt ${token}` })
      .end(function(err, res){
        expect(res).to.have.status(404);
        done();
      });
    });
    
  });

});