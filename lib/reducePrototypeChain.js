"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

exports.reducePrototypeChain = reducePrototypeChain;
exports.reduceInheritanceChain = reduceInheritanceChain;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * takes an object and reduces its prototype chain with
 * a given callback
 *
 * @param  {Object}    instance to be reduced
 * @param  {Reducer}   reducer  function
 * @param  {*}         carry    to be reduced into
 * @param  {Function?} stop     constructor to break reducer
 * @return {*}
 */
function reducePrototypeChain(instance, reducer, carry) {
  var stop = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Object;

  var proto = (0, _getPrototypeOf2.default)(instance);

  if (proto === stop.prototype) return carry;

  var result = reducer(carry, proto, instance);

  return reducePrototypeChain(proto, reducer, result, stop);
}

/**
 * takes a class and reduces its prototype chain with
 * a given callback
 *
 * @param  {Function}  constr  constructor function of class
 * @param  {Reducer}   reducer function
 * @param  {*}         carry   to be reduced into
 * @param  {Function?} stop    constructor to break reducer
 * @return {*}
 */
/*
 * This file is part of CoreWorker.
 *
 * CoreWorker is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CoreWorker is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with CoreWorker.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Copyright 2017 TeeAge-Beatz UG (haftungsbeschränkt)
 */

function reduceInheritanceChain(constr, reducer, carry) {
  var stop = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Object;

  return reducePrototypeChain((0, _create2.default)(constr.prototype, {}), reducer, carry, stop);
}

//# sourceMappingURL=reducePrototypeChain.js.map