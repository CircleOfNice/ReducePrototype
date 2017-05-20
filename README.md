# ReducePrototype

This package contains two little helper functions to work with the prototype chain of an object or a class.

# Usage

Just use the functions as if you would reduce any other iterable, with the exception, that a fourh parameter
sets a constructor which stops the iteration if it's prototype occurs.

```js

class A {
    test() {}
}

class B {
    test2() {}
}

class C extends A {
    test3() {}
}

const instance = new C();

// now we have the methods test, test2 and test3 in our array
const allMethods = reducePrototypeChain(instance, (dest, proto) => dest.concat(Object.getOwnPropertyNames(proto)), [])
    .filter(key => instance[key] instanceof Function)
    .map(key => instance[key]);

// now we have the methods test2 and test3 in our array
const bAndCMethods = reducePrototypeChain(C, (dest, proto) => dest.concat(Object.getOwnPropertyNames(proto)), [], A)
    .filter(key => instance[key] instanceof Function)
    .map(key => instance[key])
```

# Testing

You can test `reducePrototype` with mocha by executing ```make test``` in the root directory of the project.

# Contributing

If you want to contribute to this repository, please ensure ...
  - to use ```make``` for development (it validates the source code and transpiles it to ```/lib```).
  - to follow the existing coding style.
  - to use the linting tools that are listed in the ```package.json``` (which you get for free when using ```make```).
  - to add and/or customize unit tests for any changed code.
  - to reference the corresponding issue in your pull request with a small description of your changes.

All contributors are listed in the ```AUTHORS``` file, sorted by the time of their first contribution.
