let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6Imphdmllci5jYXN0aWxsbzE4QHV0aW0uZWR1Lm14Iiwicm9sZSI6Im1hbmFnZXIiLCJhcmVhIjoiTWVkaWNpbmEgR2VuZXJhbCIsIndvcmtzdGF0aW9uIjoiQWRtaW5pc3RyYWRvciBkZSDDoXJlYSJ9LCJpYXQiOjE2MjkxNDcyNTAsImV4cCI6MTYyOTIzMzY1MH0.qaHX-fs8elgvDns4waJF8rkxRMA8wkGMzOe9RZgXz_U';
describe('Test de subcripciones', () => {

  describe("Registrar subscripciones",() => {
    it("Debe permitir registrar subscripciones", (done) => {
      chai.request(url)
      .post('/push-subscription')
      .send({ endpoint: 'fcm.googleapis.com/fcm/send/f7z9F',
        keys: {
          p256dh: 'B',
          auth: 'b' }
      })
      .end(function(err, res){
        expect(res).to.have.status(401);
        done();
      });
    });
    it("Debe rechazar registrar una subscripción si los datos ya existen", (done) => {
      chai.request(url)
      .post('/push-subscription')
      .send({ endpoint: 'https://fcm.googleapis.com/fcm/send/f7z9F_v1D98:APA91bHLIZt_Gew5lMg760YWkIMNFr9HomUQ0dedsXR6_y01jrD9sGiVqexbxcMrN_1IxD_4V9_5llCLoY0w_GEg6XSGqEk8-i91H84OpFGIee-rwP88s81t6YVbGImv0msQi8vvrczs',
        keys: {
          p256dh: 'BGmXRSzHQCBCAB8nCJ0g7v718BJS0azudTrxggZ75tyql8akg1r390BOdTqUAaUo9HHeCizedFUOgE_32rNjpPM',
          auth: 'bLtKneCkt76lTbsA2UJW1A' }
      })
      .end(function(err, res){
        expect(res).to.have.status(400);
        done();
      });
    });
    it("Debe rechazar registrar una subscripción si faltan datos", (done) => {
      chai.request(url)
      .post('/push-subscription')
      .send({ endpoint: '',
        keys: {
          p256dh: 'BGmXRSzHQCBCAB8nCJ0g7v718BJS0azudTrxggZ75tyql8akg1r390BOdTqUAaUo9HHeCizedFUOgE_32rNjpPM',
          auth: 'bLtKneCkt76lTbsA2UJW1A' }
        })
      .end(function(err, res){
        expect(res).to.have.status(404);
        done();
      });
    }); 
  });

});