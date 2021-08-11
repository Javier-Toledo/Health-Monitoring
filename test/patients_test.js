let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6Imphdmllci5jYXN0aWxsbzE4QHV0aW0uZWR1Lm14Iiwicm9sZSI6Im1hbmFnZXIiLCJhcmVhIjoiTWVkaWNpbmEgR2VuZXJhbCIsIndvcmtzdGF0aW9uIjoiQWRtaW5pc3RyYWRvciBkZSDDoXJlYSJ9LCJpYXQiOjE2Mjg2NTQyNzUsImV4cCI6MTYyODc0MDY3NX0.9KDa9ZjyvuThX_ZEdLRS9cq1GQUe2QZ0SSCe-u5WAYg';
const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRvbGVkb19hbGF0cmlzdGVAaG9sYS5jb20iLCJyb2xlIjoidXNlciIsImFyZWEiOiJNZWRpY2luYSBHZW5lcmFsIiwid29ya3N0YXRpb24iOiJNw6lkaWNvIn0sImlhdCI6MTYyODY3MTEyNiwiZXhwIjoxNjI4NzU3NTI2fQ.KrFwPPvuGH2hU3cheyfXKe8_XwhFLSI-ArEeH0zkt44';
describe('Test de pacientes', () => {

  describe("Registrar pacientes",() => {

    it("Debe permitir registrar pacientes", (done) => {
      chai.request(url)
      .post('/patients')
      .set({ 'Authorization': `jwt ${token}` })
      .send({
        firtsName: "Rigo",
        lastName: "Mendez Peres",
        bloodPressure: "140/90",
        oxygenSaturation: "98",
        respiration: "10",
        heartRate: "80",
        glucose: "140/199",
        centralVenousPressure: "10",
        basalWater: "2000",
        insensibleLosses: "200",
        volumeLiquids: "80",
        area: "Medicina General",
      })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });

    it("Debe rechazar registrar un paciente si no tiene autorización", (done) => {
      chai.request(url)
      .post('/patients')
      .set({ 'Authorization': `jwt ${token}J` })
      .send({
        firtsName: "Rigo",
        lastName: "Mendez Peres",
        bloodPressure: "140/90",
        oxygenSaturation: "98",
        respiration: "10",
        heartRate: "80",
        glucose: "140/199",
        centralVenousPressure: "10",
        basalWater: "2000",
        insensibleLosses: "200",
        volumeLiquids: "80",
        area: "Medicina General",
      })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });

    it("Debe rechazar registrar un paciente si faltan datos del paciente", (done) => {
      chai.request(url)
      .post('/patient')
      .set({ 'Authorization': `jwt ${token}` })
      .send({
        firtsName: "Rigo",
      })
      .end(function(err, res){
        expect(res).to.have.status(404);
        done();
      });
    });
    
  });

  describe("Actualizar pacientes",() => {
    
    const idUser = 6;
    it("Debe permitir actualizar pacientes", (done) => {
      chai.request(url)
      .put(`/patients/${idUser}`)
      .set({ 'Authorization': `jwt ${token}` })
      .send({
        bloodPressure: "140/90",
        oxygenSaturation: "98",
        respiration: "10",
        heartRate: "80",
        glucose: "140/199",
        centralVenousPressure: "10",
        basalWater: "2000",
        insensibleLosses: "200",
        volumeLiquids: "80"
      })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });

    it("Debe rechazar actualizar paciente con token inválido", (done) => {
      chai.request(url)
      .put(`/patients/${idUser}`)
      .set({ 'Authorization': `jwt ${token}L` })
      .send({
        bloodPressure: "140/90",
        oxygenSaturation: "98",
        respiration: "10",
        heartRate: "80",
        glucose: "140/199",
        centralVenousPressure: "10",
        basalWater: "2000",
        insensibleLosses: "200",
        volumeLiquids: "80"
      })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });

    it("No deben de actualizarse los datos de un paciente que no existe", (done) => {
      chai.request(url)
      .put(`/patients/${idUser * 3}`)
      .set({ 'Authorization': `jwt ${token}` })
      .send({
        bloodPressure: "140/90",
        oxygenSaturation: "98",
        respiration: "10",
        heartRate: "80",
        glucose: "140/199",
        centralVenousPressure: "10",
        basalWater: "2000",
        insensibleLosses: "200",
        volumeLiquids: "80"
      })
      .end(function(err, res){
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');
        done();
      });
    });
    
  });

  describe('Leer los pacientes que tiene a su cargo cada usuario', () => {

    it("Debe permitir leer los pacientes a cargo del usuario autenticado", (done) => {
      chai.request(url)
      .get('/patient-user')
      .set({ 'Authorization': `jwt ${token1}` })
      .end(function(err, res){
        expect(res).to.have.status(200);
        done();
      });
    });

    it("Debe rechazar leer los pacientes a cargo del usuario con token inválido", (done) => {
      chai.request(url)
      .get('/patient-user')
      .set({ 'Authorization': `jwt ${token1}J` })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });

    it("Se deben de traer las propiedades del usuario", (done) => {
      chai.request(url)
      .get('/patient-user')
      .set({ 'Authorization': `jwt ${token1}` })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property('firtsName');
        expect(res.body[0]).to.have.property('lastName');
        expect(res.body[0]).to.have.property('area');
        done();
      });
    });

  });

  describe('Actualizar pacientes por el administrador de área', () => {
    
    const idUser = 6;
    it("Debe permitir actualizar el usuario", (done) => {
      chai.request(url)
      .put(`/patients-manager/${idUser}`)
      .set({ 'Authorization': `jwt ${token}` })
      .send({
        firtsName: "Rigo",
        lastName: "Mendez Peres",
        bloodPressure: "140/90",
        oxygenSaturation: "98",
        respiration: "10",
        heartRate: "80",
        glucose: "140/199",
        centralVenousPressure: "10",
        basalWater: "2000",
        insensibleLosses: "200",
        volumeLiquids: "80",
        area: "Medicina General",
        status: "1"
      })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });

    it("Debe rechazar actualizar el usuario con token inválido", (done) => {
      chai.request(url)
      .put(`/patients-manager/${idUser}`)
      .set({ 'Authorization': `jwt ${token}S` })
      .send({
        firtsName: "Rigo",
        lastName: "Mendez Peres",
        bloodPressure: "140/90",
        oxygenSaturation: "98",
        respiration: "10",
        heartRate: "80",
        glucose: "140/199",
        centralVenousPressure: "10",
        basalWater: "2000",
        insensibleLosses: "200",
        volumeLiquids: "80",
        area: "Medicina General",
        status: "1"
      })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });

    it("Debe mostrar mensaje de error si no existe el usuario", (done) => {
      chai.request(url)
      .put(`/patients-manager/${idUser*3}`)
      .set({ 'Authorization': `jwt ${token}` })
      .send({
        firtsName: "Rigo",
        lastName: "Mendez Peres",
        bloodPressure: "140/90",
        oxygenSaturation: "98",
        respiration: "10",
        heartRate: "80",
        glucose: "140/199",
        centralVenousPressure: "10",
        basalWater: "2000",
        insensibleLosses: "200",
        volumeLiquids: "80",
        area: "Medicina General",
        status: "1"
      })
      .end(function(err, res){
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');
        done();
      });
    });

  });

  describe('Actualizar área de paciente', () => {
    
    const idUser = 6;
    it("Debe permitir actualizar el área del paciente", (done) => {
      chai.request(url)
      .put(`/patients-update-area/${idUser}`)
      .set({ 'Authorization': `jwt ${token}` })
      .send({
        area: "Medicina General",
      })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });

    it("Debe rechazar actualizar área del paciente con token inválido", (done) => {
      chai.request(url)
      .put(`/patients-update-area/${idUser}`)
      .set({ 'Authorization': `jwt ${token}S` })
      .send({
        area: "Medicina General",
      })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });

    it("Debe mostrar mensaje de error si no existe el paciente", (done) => {
      chai.request(url)
      .put(`/patients-update-area/${idUser*3}`)
      .set({ 'Authorization': `jwt ${token}` })
      .send({
        area: "Medicina General",
      })
      .end(function(err, res){
        expect(res).to.have.status(404);
        
        expect(res.body).to.have.property('message');
        done();
      });
    });

  });

  describe('Eliminar paciente', () => {
    
    const idUser = 6;
    
    it("Debe permitir eliminar un paciente", (done) => {
      chai.request(url)
      .delete(`/patients/${idUser}`)
      .set({ 'Authorization': `jwt ${token}` })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        done();
      });
    });
    

    it("Debe rechazar eliminar un paciente con token sin autorización", (done) => {
      chai.request(url)
      .delete(`patients/${idUser}`)
      .set({ 'Authorization': `jwt ${token}S` })
      .end(function(err, res){
        expect(res).to.have.status(403);
        done();
      });
    });

    it("Debe mostrar mensaje de error si no existe el paciente", (done) => {
      chai.request(url)
      .delete(`patients/${idUser*3}`)
      .set({ 'Authorization': `jwt ${token}` })
      .send({
        firtsName: "Pedro",
        lastNames: "Alatriste Gonzales",
        email: "alatriste0107@gmail.com",
        password: "Toledo1008",
        workstation: "Médico",
        occupation: "cirujano",
        area: "Medicina General",
      })
      .end(function(err, res){
        expect(res).to.have.status(403);
        done();
      });
    });

  });

});