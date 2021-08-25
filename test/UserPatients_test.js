let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6Imphdmllci5jYXN0aWxsbzE4QHV0aW0uZWR1Lm14Iiwicm9sZSI6Im1hbmFnZXIiLCJhcmVhIjoiTWVkaWNpbmEgR2VuZXJhbCIsIndvcmtzdGF0aW9uIjoiQWRtaW5pc3RyYWRvciBkZSDDoXJlYSJ9LCJpYXQiOjE2MjkxNDcyNTAsImV4cCI6MTYyOTIzMzY1MH0.qaHX-fs8elgvDns4waJF8rkxRMA8wkGMzOe9RZgXz_U';
describe('Test de asignación por horarios', () => {

  describe("Registrar asignación de pacientes a personal por el horario",() => {
    it("Debe permitir asignar pacientes a personal", (done) => {
      chai.request(url)
      .post('/user-patients')
      .set({ 'Authorization': `jwt ${token}` })
      .send({ UserId: 1, PatientId: 1, })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });
    it("Debe rechazar asignar pacientes a personal si no tiene autorización", (done) => {
      chai.request(url)
      .post('/user-patients')
      .set({ 'Authorization': `jwt ${token}J` })
      .send({ UserId: 1, PatientId: 1, })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });
    it("Debe rechazar asignar pacientes a personal si faltan datos de la asignación", (done) => {
      chai.request(url)
      .post('/user-patients')
      .set({ 'Authorization': `jwt ${token}` })
      .send({ PatientId: 1, })
      .end(function(err, res){
        expect(res).to.have.status(400);
        done();
      });
    }); 
  });

  describe('Leer asignaciones de pacientes a personal por el horario', () => {
    it("Debe permitir leer las asignaciones", (done) => {
      chai.request(url)
      .get('/user-patient')
      .set({ 'Authorization': `jwt ${token}` })
      .end(function(err, res){
        expect(res).to.have.status(200);
        done();
      });
    });
    it("Debe rechazar leer las asignaciones al usuario con token inválido", (done) => {
      chai.request(url)
      .get('/user-patient')
      .set({ 'Authorization': `jwt ${token}J` })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });
    it("Se deben de devolver las propiedades de las asignaciones al usuario", (done) => {
      chai.request(url)
      .get('/user-patient')
      .set({ 'Authorization': `jwt ${token}` })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property('UserId');
        expect(res.body[0]).to.have.property('PatientId');
        done();
      });
    });
  });

  describe("Actualizar asignaciones de pacientes a personal por el horario",() => {
    const id = 7;
    it("Debe permitir actualizar la asignación del paciente al personal", (done) => {
      chai.request(url)
      .put(`/user-patient/${id}`)
      .set({ 'Authorization': `jwt ${token}` })
      .send({ CheckTimes: 8, closingHour: 20 })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });
    it("Debe rechazar actualizar la revisión con token inválido", (done) => {
      chai.request(url)
      .put(`/user-patient/${id}`)
      .set({ 'Authorization': `jwt ${token}L` })
      .send({ CheckTimes: 8, closingHour: 20 })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });
    it("No debe permitir actualizar la revisión de un paciente que no existe", (done) => {
      chai.request(url)
      .put(`/user-patient/${id * 3}`)
      .set({ 'Authorization': `jwt ${token}` })
      .send({ CheckTimes: 8, closingHour: 20 })
      .end(function(err, res){
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');
        done();
      });
    });
    
  });

});