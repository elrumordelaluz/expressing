var capitalize = require('../capitalize');

var chai = require('chai');
var expect = chai.expect;

describe('capitalize', function() {
  it('capitalize single words', function() {
    expect(capitalize('express')).to.equal('Express');
    expect(capitalize('cats')).to.equal('Cats');
  });
});
