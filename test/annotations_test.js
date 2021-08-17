let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6Imphdmllci5jYXN0aWxsbzE4QHV0aW0uZWR1Lm14Iiwicm9sZSI6Im1hbmFnZXIiLCJhcmVhIjoiTWVkaWNpbmEgR2VuZXJhbCIsIndvcmtzdGF0aW9uIjoiQWRtaW5pc3RyYWRvciBkZSDDoXJlYSJ9LCJpYXQiOjE2MjkxNDcyNTAsImV4cCI6MTYyOTIzMzY1MH0.qaHX-fs8elgvDns4waJF8rkxRMA8wkGMzOe9RZgXz_U';

describe('Test de anotaciones', () => {
  describe("Registrar anotaciones de pacientes al personal",() => {
    it("Debe permitir registrar asignación de pacientes a personal", (done) => {
      chai.request(url)
      .post('/annotations')
      .set({ 'Authorization': `jwt ${token}` })
      .send({ title: "anotación 2", annotation: "El paciente no presenta nigún sistoma de alergias", patientId: 1 })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });
    it("Debe rechazar registrar anotaciones del personal sobre los pacientes si no tiene autorización", (done) => {
      chai.request(url)
      .post('/annotations')
      .set({ 'Authorization': `jwt ${token}J` })
      .send({ title: "anotación 2", annotation: "El paciente no presenta nigún sistoma de alergias", patientId: 1 })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });
    it("Debe rechazar registrar una anotación si faltan datos de la anotación", (done) => {
      chai.request(url)
      .post('/annotations')
      .set({ 'Authorization': `jwt ${token}` })
      .send({ title: "anotación 2", annotation: "El paciente no presenta nigún sistoma de alergias" })
      .end(function(err, res){
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');
        done();
      });
    }); 
  });
});