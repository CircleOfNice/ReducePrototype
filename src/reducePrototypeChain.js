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

export type Reducer = (dest: *, proto: Object, instance: Object) => *;

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
export function reducePrototypeChain(instance: Object, reducer: Reducer, carry: any, stop?: Function = Object): any {
    const proto = Object.getPrototypeOf(instance);

    if(proto === stop.prototype) return carry;

    const result = reducer(carry, proto, instance);

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
export function reduceInheritanceChain(constr: Function, reducer: Reducer, carry: any, stop?: Function = Object): any {
    return reducePrototypeChain(Object.create(constr.prototype, {}), reducer, carry, stop);
}
