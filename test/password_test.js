let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';

describe('Test de recuperación de contraseña', () => {
  describe("Recuperar contraseña",() => {
    it("Debe permitir recuperar contraseña", (done) => {
      chai.request(url)
      .post('/recover-password')
      .send({ email: "alatriste010777@gmail.com" })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });
    it("Debe rechazar recuperar contraseña sin enviar correo ", (done) => {
      chai.request(url)
      .post('/recover-password')
      .send({ email: "" })
      .end(function(err, res){
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');
        done();
      });
    });
    it("Debe rechazar recuperar contraseña con correo inválido", (done) => {
      chai.request(url)
      .post('/recover-password')
      .send({ email: "toledo_alatriset@pepe.com" })
      .end(function(err, res){
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');
        done();
      });
    });
    
  });

  describe('validar token para recuperar contraseña', () => {

    it("Debe permitir Validar token de recuperación de contraseña", (done) => {
      chai.request(url)
      .post('/validate-token-password')
      .send({ token: '$2b$10$Rie7f8VNr6mOse1K91NqTuNzYMhtprk0fnTFz1o1P2RHXoVl10pj2' })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('isValid');
        expect(res.body).to.have.property('message');
        done();
      });
    });

    it("Debe rechazar validar token si esta expirado", (done) => {
      chai.request(url)
      .post('/validate-token-password')
      .send({ token: '$2b$10$YzwElh46NMyKLHkqPEptgui49loVw3LZ1PB.jpxHem7ytfzghMyXW' })
      .end(function(err, res){
        expect(res).to.have.status(400);
        done();
      });
    });

    it("Debe rechazar validar token si este no existe", (done) => {
      chai.request(url)
      .post('/validate-token-password')
      .send({ token: "$2b$10$DBsl1PqURfTJLml.N5AD..TjPEZZ6Bu5PzBceVBw5VKyBBmS" })
      .end(function(err, res){
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
    });

  });


  describe('Cambiar contraseña', () => {
    it("Debe permitir cambiar la contraseña", (done) => {
      chai.request(url)
      .post('/update-password')
      .send({
        token: '$2b$10$Rie7f8VNr6mOse1K91NqTuNzYMhtprk0fnTFz1o1P2RHXoVl10pj2',
        password: 'Chava123'
      })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });
    it("Debe rechazar cambiar la contraseña si el token esta expirado", (done) => {
      chai.request(url)
      .post('/update-password')
      .send({
        token: '$2b$10$YzwElh46NMyKLHkqPEptgui49loVw3LZ1PB.jpxHem7ytfzghMyXW',
        password: 'Chava123'
      })
      .end(function(err, res){
        expect(res).to.have.status(400);
        done();
      });
    });
    it("Debe rechazar cambiar la contraseña si no se envía", (done) => {
      chai.request(url)
      .post('/update-password')
      .send({
        token: "$2b$10$fsFekjuSiCnozMFW38pHEuvgREUxJQfo1.SXryXvk7hkfeNhCp",
        password: ""
      })
      .end(function(err, res){
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
    });

  });

});
