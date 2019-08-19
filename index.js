"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var dpContext = (0, _react.createContext)();

var DropableButton =
/*#__PURE__*/
function (_Component) {
  _inherits(DropableButton, _Component);

  function DropableButton(props) {
    var _this;

    _classCallCheck(this, DropableButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropableButton).call(this, props));
    _this.state = {
      opened: _this.props.opened || false
    };
    _this.dom = (0, _react.createRef)();
    return _this;
  }

  _createClass(DropableButton, [{
    key: "close",
    value: function close() {
      this.setState({
        opened: false
      });
    }
  }, {
    key: "open",
    value: function open() {
      this.setState({
        opened: true
      });
    }
  }, {
    key: "getClassName",
    value: function getClassName(className) {
      var _this$props = this.props,
          _this$props$text = _this$props.text,
          text = _this$props$text === void 0 ? '' : _this$props$text,
          _this$props$disabled = _this$props.disabled,
          disabled = _this$props$disabled === void 0 ? false : _this$props$disabled;
      return "r-button".concat(disabled ? ' disabled' : '').concat(text === '' ? ' r-button-icon' : '').concat(className ? ' ' + className : '');
    }
  }, {
    key: "getValue",
    value: function getValue(value) {
      if (typeof value === 'function') {
        return value(this.props);
      }

      return value;
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(e) {
      if (!(0, _jquery.default)(e.target).hasClass('r-button') && !(0, _jquery.default)(e.target).hasClass('main-icon')) {
        return;
      }

      var _this$props2 = this.props,
          items = _this$props2.items,
          _this$props2$callback = _this$props2.callback,
          callback = _this$props2$callback === void 0 ? function () {} : _this$props2$callback,
          _this$props2$type = _this$props2.type,
          type = _this$props2$type === void 0 ? 'list' : _this$props2$type;

      if (type === 'filter' || type === 'sort') {
        this.open();
      } else {
        if (items && items.length > 0) {
          this.open();
        } else {
          callback(this.props);
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var dom = (0, _jquery.default)(this.dom.current);
      var position = dom.css('position');
      position = position === 'static' ? 'relative' : position;
      dom.css('position', position);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          disabled = _this$props3.disabled,
          iconClass = _this$props3.iconClass,
          style = _this$props3.style,
          _this$props3$items = _this$props3.items,
          items = _this$props3$items === void 0 ? [] : _this$props3$items,
          _this$props3$type = _this$props3.type,
          type = _this$props3$type === void 0 ? 'list' : _this$props3$type,
          _this$props3$text = _this$props3.text,
          text = _this$props3$text === void 0 ? '' : _this$props3$text,
          _this$props3$rtl = _this$props3.rtl,
          rtl = _this$props3$rtl === void 0 ? false : _this$props3$rtl,
          className = _this$props3.className;
      var opened = this.state.opened;
      var contextValue = { ...this.props
      };
      contextValue.close = this.close.bind(this);
      var props = {
        className: this.getClassName(this.getValue(className)),
        style: _jquery.default.extend({}, {
          direction: rtl ? 'rtl' : 'ltr'
        }, this.getValue(style)),
        ref: this.dom,
        disabled: disabled
      };
      return _react.default.createElement(dpContext.Provider, {
        value: contextValue
      }, _react.default.createElement("button", _extends({}, props, {
        onMouseDown: this.mouseDown.bind(this),
        disabled: disabled
      }), iconClass && _react.default.createElement("div", {
        className: 'icon main-icon ' + this.getValue(iconClass)
      }), text, type === 'list' && opened && items.length > 0 && _react.default.createElement(Popup, null), type === 'filter' && opened && _react.default.createElement(Popup, null), type === 'sort' && opened && _react.default.createElement(Popup, null)));
    }
  }]);

  return DropableButton;
}(_react.Component);

exports.default = DropableButton;

var Popup =
/*#__PURE__*/
function (_Component2) {
  _inherits(Popup, _Component2);

  function Popup(props) {
    var _this2;

    _classCallCheck(this, Popup);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Popup).call(this, props));
    _this2.dom = (0, _react.createRef)();
    return _this2;
  }

  _createClass(Popup, [{
    key: "update",
    value: function update() {
      var rtl = this.context.rtl;
      var popup = (0, _jquery.default)(this.dom.current);
      var popupWidth = popup.width();
      var bodyWidth = window.innerWidth;
      var popupLeft = popup.offset().left;
      var popupRight = popupLeft + popupWidth;

      if (rtl && popupLeft < 0) {
        popup.css('right', popupLeft - 2);
      } else if (!rtl && popupRight > bodyWidth) {
        popup.css('left', bodyWidth - popupRight - 2);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.update();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.update();
    }
  }, {
    key: "getStyle",
    value: function getStyle(style) {
      var rtl = this.context.rtl;
      return _jquery.default.extend({}, _defineProperty({
        position: 'absolute',
        zIndex: 1000,
        top: '100%',
        direction: rtl ? 'rtl' : 'ltr'
      }, rtl ? 'right' : 'left', 0), style);
    }
  }, {
    key: "getBackDropStyle",
    value: function getBackDropStyle() {
      return {
        height: '100%',
        width: '100%',
        right: 0,
        top: 0,
        position: 'fixed'
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context = this.context,
          close = _this$context.close,
          _this$context$popupSt = _this$context.popupStyle,
          popupStyle = _this$context$popupSt === void 0 ? {} : _this$context$popupSt;
      return _react.default.createElement("div", {
        className: "r-button-popup",
        ref: this.dom,
        style: this.getStyle(popupStyle)
      }, _react.default.createElement("div", {
        className: "back-drop",
        onMouseDown: close,
        style: this.getBackDropStyle()
      }), _react.default.createElement(ForDrop, null));
    }
  }]);

  return Popup;
}(_react.Component);

_defineProperty(Popup, "contextType", dpContext);

var ForDrop =
/*#__PURE__*/
function (_Component3) {
  _inherits(ForDrop, _Component3);

  function ForDrop() {
    _classCallCheck(this, ForDrop);

    return _possibleConstructorReturn(this, _getPrototypeOf(ForDrop).apply(this, arguments));
  }

  _createClass(ForDrop, [{
    key: "add",
    value: function add() {
      var _obj;

      var _this$context2 = this.context,
          items = _this$context2.items,
          onchange = _this$context2.onchange,
          operators = _this$context2.operators,
          targets = _this$context2.targets,
          value = _this$context2.value,
          type = _this$context2.type;
      var obj = (_obj = {}, _defineProperty(_obj, operators.field, operators.default), _defineProperty(_obj, targets.field, targets.default), _obj);

      if (type === 'filter') {
        obj[value.field] = '';
      }

      items.push(obj);
      onchange(items, this.context);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context3 = this.context,
          items = _this$context3.items,
          type = _this$context3.type,
          addText = _this$context3.addText,
          rtl = _this$context3.rtl;
      var selective = type === 'filter' || type === 'sort';
      var Items = items.map(function (item, i) {
        var props = {
          key: i,
          item: item,
          index: i
        };

        if (selective) {
          return _react.default.createElement(SelectiveItem, props);
        } else {
          return _react.default.createElement(_react.Fragment, {
            key: i
          }, _react.default.createElement(ListItem, props), _react.default.createElement("br", null));
        }
      });
      return _react.default.createElement("div", {
        className: "for-drop"
      }, Items, selective && _react.default.createElement("div", {
        key: 346546334,
        onMouseDown: this.add.bind(this),
        style: {
          margin: '0 27px',
          padding: '0 12px',
          color: '#fff',
          background: 'blue',
          borderRadius: '4px',
          fontSize: '12px',
          float: rtl ? 'right' : 'left',
          height: '24px',
          lineHeight: '24px',
          cursor: 'pointer'
        }
      }, addText));
    }
  }]);

  return ForDrop;
}(_react.Component);

_defineProperty(ForDrop, "contextType", dpContext);

var ListItem =
/*#__PURE__*/
function (_Component4) {
  _inherits(ListItem, _Component4);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(ListItem).apply(this, arguments));
  }

  _createClass(ListItem, [{
    key: "mouseDown",
    value: function mouseDown() {
      var item = this.props.item;
      var _this$context4 = this.context,
          close = _this$context4.close,
          callback = _this$context4.callback;

      if (item.disabled) {
        return;
      }

      if (item.callback) {
        item.callback(item, this.context);
      } else if (callback) {
        callback(item, this.context);
      }

      if (item.close !== false) {
        close();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var item = this.props.item;
      var _this$context5 = this.context,
          checkIconClass = _this$context5.checkIconClass,
          checkable = _this$context5.checkable,
          rtl = _this$context5.rtl;
      var itemCallback = item.callback,
          iconClass = item.iconClass,
          disabled = item.disabled;

      var Item = _react.default.createElement("div", {
        onClick: itemCallback,
        className: 'list-item' + (disabled ? ' disabled' : ''),
        onMouseDown: this.mouseDown.bind(this),
        style: {
          cursor: disabled ? 'not-allowed' : 'pointer',
          textAlign: rtl ? 'right' : 'left',
          float: 'left'
        }
      }, checkable && _react.default.createElement("div", {
        className: 'icon ' + checkIconClass,
        style: {
          opacity: item.checked ? 1 : 0
        }
      }), item.iconClass && _react.default.createElement("div", {
        className: 'icon ' + iconClass
      }), item.text);

      return _react.default.createElement(_react.Fragment, null, item.splitter && _react.default.createElement("div", {
        className: "splitter"
      }, item.splitter), Item);
    }
  }]);

  return ListItem;
}(_react.Component);

_defineProperty(ListItem, "contextType", dpContext);

var SelectiveItem =
/*#__PURE__*/
function (_Component5) {
  _inherits(SelectiveItem, _Component5);

  function SelectiveItem(props) {
    var _this3;

    _classCallCheck(this, SelectiveItem);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(SelectiveItem).call(this, props));
    _this3.state = {
      filterText: ''
    };
    return _this3;
  }

  _createClass(SelectiveItem, [{
    key: "getIconStyle",
    value: function getIconStyle() {
      var rtl = this.context.rtl;
      var disabled = this.props.item.disabled;
      return {
        height: '24px',
        width: '24px',
        color: disabled ? '#ccc' : undefined,
        lineHeight: '24px',
        float: rtl ? 'right' : 'left',
        textAlign: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer'
      };
    }
  }, {
    key: "change",
    value: function change(e, field) {
      var _this4 = this;

      var _this$context6 = this.context,
          onchange = _this$context6.onchange,
          items = _this$context6.items;
      var index = this.props.index;

      if (items[index].disabled) {
        return;
      }

      if (field === 'value') {
        var value = e.target.value;
        items[index][field] = value;
        this.setState({
          filtertext: value
        });
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
          onchange(items, _this4.context);
        }, 800);
      } else if (field) {
        items[index][field] = e.target.value;
        onchange(items, this.context);
      } else {
        items.splice(index, 1);
        onchange(items, this.context);
      }
    }
  }, {
    key: "keydown",
    value: function keydown() {
      clearTimeout(this.timer);
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var item = this.props.item;
      var _this$context7 = this.context,
          type = _this$context7.type,
          operators = _this$context7.operators,
          targets = _this$context7.targets,
          value = _this$context7.value;
      return _react.default.createElement("div", {
        className: 'selective-item'
      }, _react.default.createElement("div", {
        className: "fas fa-times",
        onMouseDown: function onMouseDown(e) {
          _this5.change(e);
        },
        style: this.getIconStyle()
      }), _react.default.createElement(Select, {
        value: item[targets.field],
        onchange: function onchange(e) {
          _this5.change(e, targets.field);
        },
        options: targets.items,
        disabled: item.disabled
      }), _react.default.createElement(Select, {
        value: item[operators.field],
        onchange: function onchange(e) {
          _this5.change(e, operators.field);
        },
        options: operators.items,
        disabled: item.disabled
      }), type === 'filter' && _react.default.createElement("input", {
        type: "text",
        className: "filter-value",
        onChange: function onChange(e) {
          _this5.change(e, value.field);
        },
        onKeyDown: this.keydown.bind(this),
        value: item[value.field],
        disabled: item.disabled,
        style: {
          cursor: item.disabled ? 'not-allowed' : 'unset'
        }
      }));
    }
  }]);

  return SelectiveItem;
}(_react.Component);

_defineProperty(SelectiveItem, "contextType", dpContext);

var Select =
/*#__PURE__*/
function (_Component6) {
  _inherits(Select, _Component6);

  function Select() {
    _classCallCheck(this, Select);

    return _possibleConstructorReturn(this, _getPrototypeOf(Select).apply(this, arguments));
  }

  _createClass(Select, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          onchange = _this$props4.onchange,
          options = _this$props4.options,
          value = _this$props4.value,
          disabled = _this$props4.disabled;
      return _react.default.createElement("select", {
        disabled: disabled,
        value: value,
        onChange: onchange,
        style: {
          cursor: disabled ? 'not-allowed' : 'pointer'
        }
      }, options.map(function (option, i) {
        return _react.default.createElement("option", {
          value: option.value,
          key: i
        }, option.text);
      }));
    }
  }]);

  return Select;
}(_react.Component);