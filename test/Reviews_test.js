let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6Imphdmllci5jYXN0aWxsbzE4QHV0aW0uZWR1Lm14Iiwicm9sZSI6Im1hbmFnZXIiLCJhcmVhIjoiTWVkaWNpbmEgR2VuZXJhbCIsIndvcmtzdGF0aW9uIjoiQWRtaW5pc3RyYWRvciBkZSDDoXJlYSJ9LCJpYXQiOjE2MjkxNDcyNTAsImV4cCI6MTYyOTIzMzY1MH0.qaHX-fs8elgvDns4waJF8rkxRMA8wkGMzOe9RZgXz_U';
const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRvbGVkb19hbGF0cmlzdGVAaG9sYS5jb20iLCJyb2xlIjoidXNlciIsImFyZWEiOiJNZWRpY2luYSBHZW5lcmFsIiwid29ya3N0YXRpb24iOiJNw6lkaWNvIn0sImlhdCI6MTYyOTE0ODI1MCwiZXhwIjoxNjI5MjM0NjUwfQ.PPBNqMlU9l6oNQBxSltCWizBMLybvxGH8JYZ1Lzf0Bc';
describe('Test de Revisiones', () => {

  describe("Registrar Revisiones",() => {
    it("Debe permitir registrar revisiones del paciente", (done) => {
      chai.request(url)
      .post('/reviews')
      .set({ 'Authorization': `jwt ${token}` })
      .send({ indications: "Realizar chequeo general", annotations: ".", UserId: 1, PatientId: 1, })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });
    it("Debe rechazar registrar una revisión si no tiene autorización", (done) => {
      chai.request(url)
      .post('/reviews')
      .set({ 'Authorization': `jwt ${token}J` })
      .send({ indications: "Realizar chequeo general", annotations: ".", UserId: 1, PatientId: 1, })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });
    it("Debe rechazar registrar una revisión si faltan datos de la revisión", (done) => {
      chai.request(url)
      .post('/reviews')
      .set({ 'Authorization': `jwt ${token}` })
      .send({ indications: "", annotations: ".", UserId: 1, PatientId: 1, })
      .end(function(err, res){
        expect(res).to.have.status(400);
        done();
      });
    }); 
  });

  describe('Leer revisiones asignadas al usuario autenticado', () => {
    it("Debe permitir leer las revisiones del paciente indicado", (done) => {
      chai.request(url)
      .get('/review-patients')
      .set({ 'Authorization': `jwt ${token1}` })
      .end(function(err, res){
        expect(res).to.have.status(200);
        done();
      });
    });
    it("Debe rechazar leer las revisiones asignadas al usuario con token inválido", (done) => {
      chai.request(url)
      .get('/review-patients')
      .set({ 'Authorization': `jwt ${token1}J` })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });
    it("Se deben de devolver las propiedades de las revisiones asignadas al usuario", (done) => {
      chai.request(url)
      .get('/review-patients')
      .set({ 'Authorization': `jwt ${token1}` })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property('indications');
        expect(res.body[0]).to.have.property('annotations');
        done();
      });
    });
  });

  describe('Leer por el administrador de área autenticado las revisiones asignadas', () => {
    it("Debe permitir leer todas las revisiones asignadas", (done) => {
      chai.request(url)
      .get('/review-patients-manager')
      .set({ 'Authorization': `jwt ${token}` })
      .end(function(err, res){
        expect(res).to.have.status(200);
        done();
      });
    });
    it("Debe rechazar leer todas las revisiones asignadas si cuenta con token inválido", (done) => {
      chai.request(url)
      .get('/review-patients-manager')
      .set({ 'Authorization': `jwt ${token}J` })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });
    it("Se deben de devolver las propiedades de las revisiones asignadas", (done) => {
      chai.request(url)
      .get('/review-patients-manager')
      .set({ 'Authorization': `jwt ${token}` })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body[1]).to.have.property('indications');
        expect(res.body[1]).to.have.property('annotations');
        done();
      });
    });
  });

  describe("Actualizar Revisiones",() => {
    const idPatient = 7;
    it("Debe permitir actualizar la revisión por un usuario", (done) => {
      chai.request(url)
      .put(`/reviews/${idPatient}`)
      .set({ 'Authorization': `jwt ${token1}` })
      .send({ annotations: "He realizado el chequeo general y el paciente se encuentra estable" })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });
    it("Debe rechazar actualizar la revisión con token inválido", (done) => {
      chai.request(url)
      .put(`/reviews/${idPatient}`)
      .set({ 'Authorization': `jwt ${token1}L` })
      .send({ annotations: "He realizado el chequeo general y el paciente se encuentra estable" })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });
    it("No debe permitir actualizar la revisión de un paciente que no existe", (done) => {
      chai.request(url)
      .put(`/reviews/${idPatient * 3}`)
      .set({ 'Authorization': `jwt ${token1}` })
      .send({ annotations: "He realizado el chequeo general y el paciente se encuentra estable" })
      .end(function(err, res){
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');
        done();
      });
    });
    
  });

  describe('Actualizar pacientes por el administrador de área', () => {
    const idUser = 8;
    it("Debe permitir actualizar la revisión por el administrador", (done) => {
      chai.request(url)
      .put(`/reviews-manager/${idUser}`)
      .set({ 'Authorization': `jwt ${token}` })
      .send({ indications: "Realizar chequeo general", annotations: ".", UserId: 1, PatientId: 1 })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });
    it("Debe rechazar actualizar la revisión con token inválido", (done) => {
      chai.request(url)
      .put(`/reviews-manager/${idUser}`)
      .set({ 'Authorization': `jwt ${token}S` })
      .send({ indications: "Realizar chequeo general", annotations: ".", UserId: 1, PatientId: 1 })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });
    it("No debe permitir actualizar la revisión de un paciente que no existe", (done) => {
      chai.request(url)
      .put(`/reviews-manager/${idUser*3}`)
      .set({ 'Authorization': `jwt ${token}` })
      .send({ indications: "Realizar chequeo general", annotations: ".", UserId: 1, PatientId: 1 })
      .end(function(err, res){
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');
        done();
      });
    });
  });



  describe('Eliminar revisión de un paciente', () => {
    const idUser = 9;
    it("Debe permitir eliminar un paciente", (done) => {
      chai.request(url)
      .delete(`/reviews-manager/${idUser}`)
      .set({ 'Authorization': `jwt ${token}` })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });
    it("Debe rechazar eliminar un paciente con token sin autorización", (done) => {
      chai.request(url)
      .delete(`reviews-manager/${idUser}`)
      .set({ 'Authorization': `jwt ${token}S` })
      .end(function(err, res){
        expect(res).to.have.status(403);
        done();
      });
    });
    it("Debe mostrar mensaje de error si no existe el paciente", (done) => {
      chai.request(url)
      .delete(`reviews-manager/${idUser*3}`)
      .set({ 'Authorization': `jwt ${token}` })
      .end(function(err, res){
        expect(res).to.have.status(403);
        done();
      });
    });
  });

});