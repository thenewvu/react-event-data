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

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  class EventData extends _react.Component {
    constructor(props) {
      super(props);
      this.createEnhancedProps();
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.event !== this.props.event) {
        this.createEnhancedProps();
      }
    }

    render() {
      const target = _react.Children.only(this.props.children);
      return (0, _react.cloneElement)(target, this.enhancedProp);
    }

    createEnhancedProps() {
      const _props = this.props,
            { children, event, data } = _props,
            rest = _objectWithoutProperties(_props, ['children', 'event', 'data']);
      this.enhancedProp = Object.assign({
        [event]: (...args) => {
          const target = _react.Children.only(children);
          const eventHandle = target.props[event];
          if (typeof eventHandle === 'function') {
            eventHandle(data, ...args);
          }
        }
      }, rest);
    }
  }
  exports.default = EventData;
});