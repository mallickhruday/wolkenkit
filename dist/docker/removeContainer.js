'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var getEnvironmentVariables = require('./getEnvironmentVariables'),
    shell = require('../shell');

var removeContainer =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(options) {
    var configuration, env, container, environmentVariables;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (options) {
              _context.next = 2;
              break;
            }

            throw new Error('Options are missing.');

          case 2:
            if (options.configuration) {
              _context.next = 4;
              break;
            }

            throw new Error('Configuration is missing.');

          case 4:
            if (options.env) {
              _context.next = 6;
              break;
            }

            throw new Error('Environment is missing.');

          case 6:
            if (options.container) {
              _context.next = 8;
              break;
            }

            throw new Error('Container is missing.');

          case 8:
            configuration = options.configuration, env = options.env, container = options.container;
            _context.next = 11;
            return getEnvironmentVariables({
              configuration: configuration,
              env: env
            });

          case 11:
            environmentVariables = _context.sent;
            _context.next = 14;
            return shell.exec("docker rm --force --volumes \"".concat(container.name, "\""), {
              env: environmentVariables
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function removeContainer(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = removeContainer;