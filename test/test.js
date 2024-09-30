const chai = require('chai');
const chaiHttp = require('chai-http');
const { server, startServer } = require('../server');
const { expect } = chai;

chai.use(chaiHttp);

describe('API Tests', function() {
  this.timeout(5000);

  before(async function() {
    // Start the server before all tests
    await startServer(3000);
  });

  after(function(done) {
    // Close the server after all tests
    server.close((err) => {
      if (err && err.code !== 'ERR_SERVER_NOT_RUNNING') {
        return done(err);
      }
      done();
    });
  });

  describe('Search Functionality', function() {
    it('should return search results for sports', function(done) {
      chai.request(server)
        .get('/search-by-sport')
        .end(function(err, res) {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          done();
        });
    });
  });

  describe('Player Listing and Details', function() {
    it('should display a list of players for a specific sport', function(done) {
      chai.request(server)
        .get('/sports-list/Football')
        .end(function(err, res) {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body.players).to.be.an('array').that.is.not.empty;
          done();
        });
    });

    it('should handle no players found scenario', function(done) {
      chai.request(server)
        .get('/sports-list/UnknownSport')
        .end(function(err, res) {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body.players).to.be.an('array').that.is.empty;
          done();
        });
    });

    it('should provide details for a specific player when requested', function(done) {
      chai.request(server)
        .get('/player-details/1')
        .end(function(err, res) {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.include.keys(['name', 'age', 'sport', 'contact']);
          done();
        });
    });
  });

  // Added Usability Tests
  describe('Usability Tests', function() {
    it('should ensure all navigation links are accessible', function(done) {
      chai.request(server)
        .get('/')
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.text).to.include('href="/login"');      // Check for login link
          expect(res.text).to.include('href="/dashboard"');  // Check for dashboard link
          done();
        });
    });

    it('should maintain visual consistency across main pages', function(done) {
      chai.request(server)
        .get('/')
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.text).to.include('<link rel="stylesheet" href="/style.css">');
          done();
        });
    });
  });
});
