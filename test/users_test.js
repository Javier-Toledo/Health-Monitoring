let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6Imphdmllci5jYXN0aWxsbzE4QHV0aW0uZWR1Lm14Iiwicm9sZSI6Im1hbmFnZXIiLCJhcmVhIjoiTWVkaWNpbmEgR2VuZXJhbCIsIndvcmtzdGF0aW9uIjoiQWRtaW5pc3RyYWRvciBkZSDDoXJlYSJ9LCJpYXQiOjE2Mjg2NTQyNzUsImV4cCI6MTYyODc0MDY3NX0.9KDa9ZjyvuThX_ZEdLRS9cq1GQUe2QZ0SSCe-u5WAYg';
const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6Imphdmllci5jYXN0aWxsbzE4QHV0aW0uZWR1Lm14Iiwicm9sZSI6Im1hbmFnZXIiLCJhcmVhIjoiTWVkaWNpbmEgR2VuZXJhbCJ9LCJpYXQiOjE2Mjg2NTY0NDYsImV4cCI6MTYyODc0Mjg0Nn0.Yn__AwcM7IxTZzD5o3wJyrJfJujCcYfxUT1GwFL8ucY';
const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6Imphdmllci5jYXN0aWxsbzE4QHV0aW0uZWR1Lm14Iiwicm9sZSI6Im1hbmFnZXIiLCJ3b3Jrc3RhdGlvbiI6IkFkbWluaXN0cmFkb3IgZGUgw6FyZWEifSwiaWF0IjoxNjI4NjU3MDczLCJleHAiOjE2Mjg3NDM0NzN9.MKF5jRAvHDeHIBtp9BIb8CCjdbJnjJgsoSW_jZdLWvg';

describe('Test de usuarios', () => {

  describe("Listar usuarios por área",() => {

    it("Debe permitir leer y mostrar usuarios", (done) => {
      chai.request(url)
      .get('/users-area')
      .set({ 'Authorization': `jwt ${token}` })
      .end(function(err, res){
        expect(res).to.have.status(200);
        done();
      });
    });

    it("Debe rechazar leer y mostrar usuarios con token inválido", (done) => {
      chai.request(url)
      .get('/users-area')
      .set({ 'Authorization': `jwt ${token}J` })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });

    it("Debe mostrar mensaje de error si falla al leerlos", (done) => {
      chai.request(url)
      .get('/users-area')
      .set({ 'Authorization': `jwt ${token1}` })
      .end(function(err, res){
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
    });
    
  });

  describe('Listar administradores de área', () => {

    it("Debe permitir leer y mostrar administradores de área", (done) => {
      chai.request(url)
      .get('/admin-area')
      .set({ 'Authorization': `jwt ${token}` })
      .end(function(err, res){
        expect(res).to.have.status(200);
        done();
      });
    });

    it("Debe rechazar leer y mostrar administradores de área con token inválido", (done) => {
      chai.request(url)
      .get('/admin-area')
      .set({ 'Authorization': `jwt ${token}J` })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });

    it("Debe mostrar mensaje de error si falla al leerlos", (done) => {
      chai.request(url)
      .get('/admin-area')
      .set({ 'Authorization': `jwt ${token2}` })
      .end(function(err, res){
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
    });

  });

  describe('Actualizar usuario', () => { let idUser = 12; let idUser1 = 45;
    it("Debe permitir actualizar el usuario", (done) => {
      chai.request(url)
      .put(`/users/${idUser}`)
      .set({ 'Authorization': `jwt ${token}` })
      .send({
        firtsName: "Pedro", lastNames: "Alatriste Gonzales", email: "alatriste0107@gmail.com", password: "Toledo1008",
        workstation: "Médico", occupation: "cirujano", area: "Medicina General", })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });
    it("Debe rechazar actualizar el usuario con token inválido", (done) => {
      chai.request(url)
      .put(`/users/${idUser}`)
      .set({ 'Authorization': `jwt ${token}S` })
      .send({
        firtsName: "Pedro", lastNames: "Alatriste Gonzales", email: "alatriste0107@gmail.com", password: "Toledo1008",
        workstation: "Médico", occupation: "cirujano", area: "Medicina General", })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });
    it("Debe mostrar mensaje de error si no existe el usuario", (done) => {
      chai.request(url)
      .put(`/users/${idUser1}`)
      .set({ 'Authorization': `jwt ${token}` })
      .send({
        firtsName: "Pedro", lastNames: "Alatriste Gonzales", email: "alatriste0107@gmail.com", password: "Toledo1008",
        workstation: "Médico", occupation: "cirujano", area: "Medicina General", })
      .end(function(err, res){
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        done();
      });
    });
  });

  describe('Actualizar área de usuario', () => {
    let idUser = 12;
    let idUser1 = 45;
    it("Debe permitir actualizar el área del usuario", (done) => {
      chai.request(url)
      .put(`/users-update-area/${idUser}`)
      .set({ 'Authorization': `jwt ${token}` })
      .send({ area: "Medicina General" })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });

    it("Debe rechazar actualizar área deel usuario con token inválido", (done) => {
      chai.request(url)
      .put(`/users-update-area/${idUser}`)
      .set({ 'Authorization': `jwt ${token}S` })
      .send({ area: "Medicina General" })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });

    it("Debe mostrar mensaje de error si no existe el usuario", (done) => {
      chai.request(url)
      .put(`/users-update-area/${idUser1}`)
      .set({ 'Authorization': `jwt ${token}` })
      .send({ area: "Medicina General" })
      .end(function(err, res){
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('message');
        done();
      });
    });
  });

  describe('Eliminar usuario', () => {
    let idUser = 12;
    let idUser1 = 45;
    it("Debe permitir eliminar un usuario", (done) => {
      chai.request(url)
      .delete(`/users/${idUser}`)
      .set({ 'Authorization': `jwt ${token}` })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });

    it("Debe rechazar eliminar un usuario con token sin autorización", (done) => {
      chai.request(url)
      .delete(`/users/${idUser}`)
      .set({ 'Authorization': `jwt ${token}S` })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });

    it("Debe mostrar mensaje de error si no existe el usuario", (done) => {
      chai.request(url)
      .delete(`/users/${idUser1}`)
      .set({ 'Authorization': `jwt ${token}` })
      .end(function(err, res){
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');
        done();
      });
    });

  });

});