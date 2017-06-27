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

const NODE_MAJOR_VERSION = Number(process.version.split(".")[0].slice(1));

describe("reducePrototypeChainTest", function() {
    it("reduces a whole objects prototype chain", function() {
        const instance       = new Duplex();
        const cb             = (dest, proto) => dest.concat(Object.getOwnPropertyNames(proto));
        const result         = reducePrototypeChain(instance, cb, []);
        const expectedResult = () => {
            if(NODE_MAJOR_VERSION < 8) return [
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
            ];

            return [
                "constructor",
                "write",
                "cork",
                "uncork",
                "setDefaultEncoding",
                "_write",
                "_writev",
                "end",
                "destroyed",
                "_destroy",
                "constructor",
                "destroyed",
                "destroy",
                "_undestroy",
                "_destroy",
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
            ];
        };

        expect(result).to.eql(expectedResult());
    });

    it("reduces a a prototype chain until a specific constructor occurs in the chain", function() {
        const instance       = new Duplex();
        const cb             = (dest, proto) => dest.concat(Object.getOwnPropertyNames(proto));
        const expectedResult = () => {
            if(NODE_MAJOR_VERSION < 8) return [
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
            ];

            return [
                "constructor",
                "write",
                "cork",
                "uncork",
                "setDefaultEncoding",
                "_write",
                "_writev",
                "end",
                "destroyed",
                "_destroy",
                "constructor",
                "destroyed",
                "destroy",
                "_undestroy",
                "_destroy",
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
            ];
        };

        expect(reducePrototypeChain(instance, cb, [], EventEmitter)).to.eql(expectedResult());
    });

    it("reduces a whole classes inheritance chain.", function() {
        const cb       = (dest, proto) => dest.concat(Object.getOwnPropertyNames(proto));
        const result   = reduceInheritanceChain(Duplex, cb, []);
        const expectedResult = () => {
            if(NODE_MAJOR_VERSION < 8) return [
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
            ];

            return [
                "constructor",
                "write",
                "cork",
                "uncork",
                "setDefaultEncoding",
                "_write",
                "_writev",
                "end",
                "destroyed",
                "_destroy",
                "constructor",
                "destroyed",
                "destroy",
                "_undestroy",
                "_destroy",
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
            ];
        };

        expect(result).to.eql(expectedResult());
    });

    it("reduces a classes inheritance chain until a specific constructor occurs in it.", function() {
        const cb             = (dest, proto) => dest.concat(Object.getOwnPropertyNames(proto));
        const expectedResult = () => {
            if(NODE_MAJOR_VERSION < 8) return [
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
            ];

            return [
                "constructor",
                "write",
                "cork",
                "uncork",
                "setDefaultEncoding",
                "_write",
                "_writev",
                "end",
                "destroyed",
                "_destroy",
                "constructor",
                "destroyed",
                "destroy",
                "_undestroy",
                "_destroy",
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
            ];
        };

        expect(reduceInheritanceChain(Duplex, cb, [], EventEmitter)).to.eql(expectedResult());
    });
});
