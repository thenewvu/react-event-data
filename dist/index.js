(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react);
    global.index = mod.exports;
  }
})(this, function (exports, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  class EventData extends _react.Component {
    constructor(...args) {
      var _temp;

      return _temp = super(...args), _initialiseProps.call(this), _temp;
    }

  }
  exports.default = EventData;

  var _initialiseProps = function () {
    this.render = () => (0, _react.cloneElement)(_react.Children.only(this.props.children), this.enhancedProp);

    this.onEvent = (...args) => _react.Children.only(this.props.children).props.onPress(this.props.data, ...args);

    this.enhancedProp = { [this.props.event]: this.onEvent };
  };
});