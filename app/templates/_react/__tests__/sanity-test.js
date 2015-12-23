jest.autoMockOff();

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

describe('Sanity Check', function () {
  describe('false', function () {
    it('is false', function () {
      expect(false).toBe(false);
    });
  });

  describe('true', function () {
    it('is true', function () {
      expect(true).toBe(true);
    });
  });

  describe('Sample.jsx', function () {
    let Sample = require('./Sample/Sample');
    let sample;

    beforeEach(function () {
    });

    it('is a React Component', function () {
      expect(TestUtils.isCompositeComponent(Sample.prototype))
      .toBe(true);
    });

    it('has Hello on the page', function () {
      sample = TestUtils.renderIntoDocument(<Sample />);
      let h1 = TestUtils.findRenderedDOMComponentWithTag(sample, 'h1');

      expect(ReactDOM.findDOMNode(h1).textContent).toEqual('Hello');
    });
  });
});
