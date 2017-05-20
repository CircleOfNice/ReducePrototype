"use strict";

var _getOwnPropertyNames = require("babel-runtime/core-js/object/get-own-property-names");

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _reducePrototypeChain = require("../reducePrototypeChain");

var _chai = require("chai");

var _stream = require("stream");

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

describe("reducePrototypeChainTest", function () {
    it("reduces a whole objects prototype chain", function () {
        var instance = new _stream.Duplex();
        var cb = function cb(dest, proto) {
            return dest.concat((0, _getOwnPropertyNames2.default)(proto));
        };
        var result = (0, _reducePrototypeChain.reducePrototypeChain)(instance, cb, []);

        (0, _chai.expect)(result).to.eql(["constructor", "write", "cork", "uncork", "setDefaultEncoding", "_write", "_writev", "end", "constructor", "push", "unshift", "isPaused", "setEncoding", "read", "_read", "pipe", "unpipe", "on", "addListener", "resume", "pause", "wrap", "constructor", "pipe", "constructor", "domain", "_events", "_maxListeners", "setMaxListeners", "getMaxListeners", "emit", "addListener", "on", "prependListener", "once", "prependOnceListener", "removeListener", "removeAllListeners", "listeners", "listenerCount", "eventNames"]);
    });

    it("reduces a a prototype chain until a specific constructor occurs in the chain", function () {
        var instance = new _stream.Duplex();
        var cb = function cb(dest, proto) {
            return dest.concat((0, _getOwnPropertyNames2.default)(proto));
        };

        (0, _chai.expect)((0, _reducePrototypeChain.reducePrototypeChain)(instance, cb, [], _events2.default)).to.eql(["constructor", "write", "cork", "uncork", "setDefaultEncoding", "_write", "_writev", "end", "constructor", "push", "unshift", "isPaused", "setEncoding", "read", "_read", "pipe", "unpipe", "on", "addListener", "resume", "pause", "wrap", "constructor", "pipe"]);
    });

    it("reduces a whole classes inheritance chain.", function () {
        var cb = function cb(dest, proto) {
            return dest.concat((0, _getOwnPropertyNames2.default)(proto));
        };
        var result = (0, _reducePrototypeChain.reduceInheritanceChain)(_stream.Duplex, cb, []);

        (0, _chai.expect)(result).to.eql(["constructor", "write", "cork", "uncork", "setDefaultEncoding", "_write", "_writev", "end", "constructor", "push", "unshift", "isPaused", "setEncoding", "read", "_read", "pipe", "unpipe", "on", "addListener", "resume", "pause", "wrap", "constructor", "pipe", "constructor", "domain", "_events", "_maxListeners", "setMaxListeners", "getMaxListeners", "emit", "addListener", "on", "prependListener", "once", "prependOnceListener", "removeListener", "removeAllListeners", "listeners", "listenerCount", "eventNames"]);
    });

    it("reduces a classes inheritance chain until a specific constructor occurs in it.", function () {
        var cb = function cb(dest, proto) {
            return dest.concat((0, _getOwnPropertyNames2.default)(proto));
        };

        (0, _chai.expect)((0, _reducePrototypeChain.reduceInheritanceChain)(_stream.Duplex, cb, [], _events2.default)).to.eql(["constructor", "write", "cork", "uncork", "setDefaultEncoding", "_write", "_writev", "end", "constructor", "push", "unshift", "isPaused", "setEncoding", "read", "_read", "pipe", "unpipe", "on", "addListener", "resume", "pause", "wrap", "constructor", "pipe"]);
    });
});

//# sourceMappingURL=ReducePrototypeChainTest.js.map