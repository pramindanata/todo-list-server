const expect = require('expect.js');

describe('# Demo Testing', () => {
  it('Return "Hello World"', () => {
    const string = 'Hello World';

    expect(string).to.be('Hello World');
  });
});
