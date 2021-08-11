let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:5000';

describe('Registro y autenticación de usuarios', () => {

  describe("Registrar usuario",() => {

    it("Debe registrar nuevo usuario", (done) => {
      chai.request(url)
      .post('/users')
      .send({
        firtsName: "Pedro",
        lastNames: "Alatriste",
        email: "alatriste010777@gmail.com",
        password: "Toledo1008",
        workstation: "Médico",
        occupation: "cirujano",
        area: "Medicina General",
      })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('message');
        done();
      });
    });

    it("Debe rechazar registrar usuario existente", (done) => {
      chai.request(url)
      .post('/users')
      .send({
        firtsName: "Pedro",
        lastNames: "Alatriste",
        email: "alatriste0107@gmail.com",
        password: "Toledo1008",
        workstation: "Médico",
        occupation: "cirujano",
        area: "Medicina General",
      })
      .end(function(err, res){
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');
        done();
      });
    });

    it("Debe rechazar registrar usuario sin correo y contraseña", (done) => {
      chai.request(url)
      .post('/users')
      .send({
        firtsName: "Pedro",
        lastNames: "Alatriste",
        email: "",
        password: "",
        workstation: "Médico",
        occupation: "cirujano",
        area: "Medicina General",
      })
      .end(function(err, res){
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');
        done();
      });
    });

  });
  

  describe("Validar cuenta de usuario",() => {

    it("Debe permitir validar cuenta de usuario", (done) => {
      chai.request(url)
      .post('/validate-token-account')
      .send({
        token: "$2b$10$DBsl1PqURfTJLml.N5AD..TjPEZZ6Bu5PzBceVBw5VKyBBmS71"
      })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });

    it("Debe rechazar validar cuenta si el token ha expirado", (done) => {
      chai.request(url)
      .post('/users')
      .send({
        token: "$2b$10$DBsl1PqURfTJLml.N5AD..TjPEZZ6Bu5PzBceVBw5VKyBBmS70fbO"
      })
      .end(function(err, res){
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');
        done();
      });
    });

    it("Debe rechazar validar cuenta si el token no existe", (done) => {
      chai.request(url)
      .post('/users')
      .send({
        token: "$2b$10$DBsl1PqURfTJLml.N5AD..TjPEZZ6Bu5PzBceVBw5VKyBBmS"
      })
      .end(function(err, res){
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');
        done();
      });
    });

  });
  

  describe("Autenticar usuario",() => {

    it("Debe autenticar un usuario", (done) => {
      chai.request(url)
      .post('/login')
      .send({
        email: "javier.castillo18@utim.edu.mx",
        password: "Toledo1008",
      })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('token');
        done();
      });
    });

    it("Debe rechazar autenticar un usuario con contraseña inválida", (done) => {
      chai.request(url)
      .post('/login')
      .send({
        email: "javier.castillo18@utim.edu.mx",
        password: "Toledo10088",
      })
      .end(function(err, res){
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
    });

    it("Debe rechazar autenticar un usuario con correo inválido", (done) => {
      chai.request(url)
      .post('/login')
      .send({
        email: "javiercastillo18@utim.edu.mx",
        password: "Toledo1008",
      })
      .end(function(err, res){
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
    });

  });

});
