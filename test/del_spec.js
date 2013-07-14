var level  = require("level-test")()
  , graph  = require("levelgraph")
  , jsonld = require("../")
  , JSONLD = require("jsonld");

describe("jsonld.del", function() {
  
  var db, manu, tesla;

  beforeEach(function() {
    db = jsonld(graph(level()), { base: "http://levelgraph.io/" });
    manu = fixture("manu.json");
    tesla = fixture("tesla.json");
  }); 

  afterEach(function(done) {
    db.close(done);
  });

  it("should accept a done callback", function(done) {
    db.jsonld.put(manu, done);
  });

  it("should del a basic object", function(done) {
    db.jsonld.put(manu, function() {
      db.jsonld.del(manu, function() {
        db.get({}, function(err, triples) {
          // getting the full db
          expect(triples).to.have.property("length", 0);
          done();
        });
      });
    });
  });

  it("should del a complex object", function(done) {
    db.jsonld.put(tesla, function() {
      db.jsonld.del(tesla, function() {
        db.get({}, function(err, triples) {
          // getting the full db
          expect(triples).to.have.property("length", 0);
          done();
        });
      });
    });
  });
});
