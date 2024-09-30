// test/test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');  // Import the server
const { expect } = chai;

chai.use(chaiHttp);

describe('Search Functionality', function() {
  after(function(done) {
    server.close(done);  // Close the server after tests
  });

  it('should return search results for sports', function(done) {
    chai.request(server)
      .get('/search-by-sport')
      .end(function(err, res) {
        if (err) return done(err);
        expect(res).to.have.status(200);  // Check that the response has status 200
        expect(res).to.be.html;  // Ensure the response is HTML
        done();
      });
  });
});
