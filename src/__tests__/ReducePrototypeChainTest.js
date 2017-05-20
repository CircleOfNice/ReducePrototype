/*
 * This file is part of ReducePrototype.
 *
 * ReducePrototype is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ReducePrototype is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with ReducePrototype.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Copyright 2017 CRCL UG (haftungsbeschränkt)
 */

// @flow

import { reducePrototypeChain, reduceInheritanceChain } from "../reducePrototypeChain";
import { expect } from "chai";
import { Duplex } from "stream";
import EventEmitter from "events";

describe("reducePrototypeChainTest", function() {
    it("reduces a whole objects prototype chain", function() {
        const instance = new Duplex();
        const cb       = (dest, proto) => dest.concat(Object.getOwnPropertyNames(proto));
        const result   = reducePrototypeChain(instance, cb, []);

        expect(result).to.eql([
            "constructor",
            "write",
            "cork",
            "uncork",
            "setDefaultEncoding",
            "_write",
            "_writev",
            "end",
            "constructor",
            "push",
            "unshift",
            "isPaused",
            "setEncoding",
            "read",
            "_read",
            "pipe",
            "unpipe",
            "on",
            "addListener",
            "resume",
            "pause",
            "wrap",
            "constructor",
            "pipe",
            "constructor",
            "domain",
            "_events",
            "_maxListeners",
            "setMaxListeners",
            "getMaxListeners",
            "emit",
            "addListener",
            "on",
            "prependListener",
            "once",
            "prependOnceListener",
            "removeListener",
            "removeAllListeners",
            "listeners",
            "listenerCount",
            "eventNames"
        ]);
    });

    it("reduces a a prototype chain until a specific constructor occurs in the chain", function() {
        const instance = new Duplex();
        const cb       = (dest, proto) => dest.concat(Object.getOwnPropertyNames(proto));

        expect(reducePrototypeChain(instance, cb, [], EventEmitter)).to.eql([
            "constructor",
            "write",
            "cork",
            "uncork",
            "setDefaultEncoding",
            "_write",
            "_writev",
            "end",
            "constructor",
            "push",
            "unshift",
            "isPaused",
            "setEncoding",
            "read",
            "_read",
            "pipe",
            "unpipe",
            "on",
            "addListener",
            "resume",
            "pause",
            "wrap",
            "constructor",
            "pipe"
        ]);
    });

    it("reduces a whole classes inheritance chain.", function() {
        const cb       = (dest, proto) => dest.concat(Object.getOwnPropertyNames(proto));
        const result   = reduceInheritanceChain(Duplex, cb, []);

        expect(result).to.eql([
            "constructor",
            "write",
            "cork",
            "uncork",
            "setDefaultEncoding",
            "_write",
            "_writev",
            "end",
            "constructor",
            "push",
            "unshift",
            "isPaused",
            "setEncoding",
            "read",
            "_read",
            "pipe",
            "unpipe",
            "on",
            "addListener",
            "resume",
            "pause",
            "wrap",
            "constructor",
            "pipe",
            "constructor",
            "domain",
            "_events",
            "_maxListeners",
            "setMaxListeners",
            "getMaxListeners",
            "emit",
            "addListener",
            "on",
            "prependListener",
            "once",
            "prependOnceListener",
            "removeListener",
            "removeAllListeners",
            "listeners",
            "listenerCount",
            "eventNames"
        ]);
    });

    it("reduces a classes inheritance chain until a specific constructor occurs in it.", function() {
        const cb = (dest, proto) => dest.concat(Object.getOwnPropertyNames(proto));

        expect(reduceInheritanceChain(Duplex, cb, [], EventEmitter)).to.eql([
            "constructor",
            "write",
            "cork",
            "uncork",
            "setDefaultEncoding",
            "_write",
            "_writev",
            "end",
            "constructor",
            "push",
            "unshift",
            "isPaused",
            "setEncoding",
            "read",
            "_read",
            "pipe",
            "unpipe",
            "on",
            "addListener",
            "resume",
            "pause",
            "wrap",
            "constructor",
            "pipe"
        ]);
    });
});
