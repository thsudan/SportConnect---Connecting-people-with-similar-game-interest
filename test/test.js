const chai = require('chai');
const chaiHttp = require('chai-http');
const { server, startServer } = require('../server');
const { expect } = chai;

chai.use(chaiHttp);

describe('Search Functionality', function() {
  this.timeout(5000); 

  before(async function() {
    // Start the server before test
    await startServer(3000);
  });

  after(function(done) {
    // Close the server after tests
    server.close((err) => {
      if (err && err.code !== 'ERR_SERVER_NOT_RUNNING') {
        return done(err);
      }
      done();
    });
  });

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
