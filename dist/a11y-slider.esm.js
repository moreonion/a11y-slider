
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var O = 'object';
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global_1 =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == O && globalThis) ||
  check(typeof window == O && window) ||
  check(typeof self == O && self) ||
  check(typeof commonjsGlobal == O && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

var path = global_1;

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var descriptors = !fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var document$1 = global_1.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var objectDefineProperty = {
	f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var hide = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var setGlobal = function (key, value) {
  try {
    hide(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  } return value;
};

var shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.2.1',
  mode:  'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

var Symbol$1 = global_1.Symbol;
var store = shared('wks');

var wellKnownSymbol = function (name) {
  return store[name] || (store[name] = nativeSymbol && Symbol$1[name]
    || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
};

var f$1 = wellKnownSymbol;

var wrappedWellKnownSymbol = {
	f: f$1
};

var defineProperty = objectDefineProperty.f;

var defineWellKnownSymbol = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbol.f(NAME)
  });
};

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
var f$2 = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

var objectPropertyIsEnumerable = {
	f: f$2
};

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings



var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
var f$3 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$3
};

var functionToString = shared('native-function-to-string', Function.toString);

var WeakMap = global_1.WeakMap;

var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};

var WeakMap$1 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (nativeWeakMap) {
  var store$1 = new WeakMap$1();
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;
  set = function (it, metadata) {
    wmset.call(store$1, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store$1, it) || {};
  };
  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    hide(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };
  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var redefine = createCommonjsModule(function (module) {
var getInternalState = internalState.get;
var enforceInternalState = internalState.enforce;
var TEMPLATE = String(functionToString).split('toString');

shared('inspectSource', function (it) {
  return functionToString.call(it);
});

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global_1) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else hide(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
});
});

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var indexOf = arrayIncludes.indexOf;


var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
	f: f$4
};

var f$5 = Object.getOwnPropertySymbols;

var objectGetOwnPropertySymbols = {
	f: f$5
};

// all object keys, includes non-enumerable and symbols
var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

var isForced_1 = isForced;

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      hide(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var nativeAssign = Object.assign;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
// should work with symbols and should have deterministic property order (V8 bug)
var objectAssign = !nativeAssign || fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
  while (argumentsLength > index) {
    var S = indexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
  assign: objectAssign
});

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod$1 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$1(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$1(true)
};

var correctPrototypeGetter = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if ( !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
  return O;
};

var html = getBuiltIn('document', 'documentElement');

var IE_PROTO$1 = sharedKey('IE_PROTO');

var PROTOTYPE = 'prototype';
var Empty = function () { /* empty */ };

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
  return createDict();
};

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

hiddenKeys[IE_PROTO$1] = true;

var defineProperty$1 = objectDefineProperty.f;



var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
  return IteratorConstructor;
};

var aPossiblePrototype = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis$1 = function () { return this; };

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
        if (objectSetPrototypeOf) {
          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
          hide(CurrentIteratorPrototype, ITERATOR$1, returnThis$1);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
    hide(IterablePrototype, ITERATOR$1, defaultIterator);
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

var charAt = stringMultibyte.charAt;



var STRING_ITERATOR = 'String Iterator';
var setInternalState = internalState.set;
var getInternalState = internalState.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  hide(ArrayPrototype, UNSCOPABLES, objectCreate(null));
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$1 = internalState.set;
var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$1(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$1(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

var ITERATOR$2 = wellKnownSymbol('iterator');
var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
var ArrayValues = es_array_iterator.values;

for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
      hide(CollectionPrototype, ITERATOR$2, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR$2] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG$1]) hide(CollectionPrototype, TO_STRING_TAG$1, COLLECTION_NAME);
    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
        hide(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
      }
    }
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var debounce=function(i,e,o){var t;return void 0===e&&(e=50),void 0===o&&(o={isImmediate:!1}),function(){for(var a=[],d=0;d<arguments.length;d++)a[d]=arguments[d];var n=this,m=o.isImmediate&&void 0===t;void 0!==t&&clearTimeout(t),t=setTimeout(function(){t=void 0,o.isImmediate||i.apply(n,a);},e),m&&i.apply(n,a);}};

var createElement = function createElement(html) {
  return new DOMParser().parseFromString(html, 'text/html').body.firstChild;
};
/**
 * a11yclick - Easily handle keyboard click events on non semantic button elements.
 * https://github.com/svinkle/a11yclick
 * @param {Object} event Click/keyboard event object.
 * @returns {Boolean} Returns true or false depending on event type and code.
 */

var a11yClick = function a11yClick(event) {

  var code = event.charCode || event.keyCode,
      type = event.type;

  if (type === 'click') {
    return true;
  } else if (type === 'keydown') {
    if (code === 32 || code === 13) {
      event.preventDefault();
      return true;
    }
  }

  return false;
}; // Cross browser custom event
// Some code from https://github.com/shystruk/custom-event-js

var crossCustomEvent = function crossCustomEvent(event, params) {
  var evt = document.createEvent('CustomEvent');
  params = params || {
    bubbles: false,
    cancelable: false,
    detail: undefined
  };
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
};

var SlideDirection;

(function (SlideDirection) {
  SlideDirection[SlideDirection["Prev"] = 0] = "Prev";
  SlideDirection[SlideDirection["Next"] = 1] = "Next";
})(SlideDirection || (SlideDirection = {}));

var SliderState;

(function (SliderState) {
  SliderState[SliderState["Enabled"] = 0] = "Enabled";
  SliderState[SliderState["Disabled"] = 1] = "Disabled";
})(SliderState || (SliderState = {}));

var A11YSlider =
/*#__PURE__*/
function () {
  function A11YSlider(element, options) {
    var _this = this;

    _classCallCheck(this, A11YSlider);

    this.slider = element;
    this.slides = element.children;
    this.sliderContainer = createElement('<div class="a11y-slider-container"></div>');
    this._activeClass = 'a11y-slider-active';
    this._visibleClass = 'a11y-slider-visible';
    this._dotsClass = 'a11y-slider-dots';
    this._sliderClass = 'a11y-slider';
    this._focusable = 'a, area, input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
    this.dots = null;
    this.activeSlide = this.slides[0];
    this.visibleSlides = [];
    this.sliderEnabled = SliderState.Disabled;
    this._hasCustomBtns = options && options.prevBtn || options && options.nextBtn ? true : false;
    this.options = {
      container: true,
      navBtns: true,
      prevBtn: options && options.prevBtn || createElement('<button class="a11y-slider-prev">Previous slide</button>'),
      nextBtn: options && options.nextBtn || createElement('<button class="a11y-slider-next">Next slide</button>'),
      dots: true,
      adaptiveHeight: false,
      skipLink: true
    }; // Set user-inputted options if available

    Object.assign(this.options, options); // Binding

    this._handlePrev = this._handlePrev.bind(this);
    this._handleNext = this._handleNext.bind(this);
    this._checkShouldEnableDebounced = debounce(this._checkShouldEnable.bind(this), 250);
    this._updateHeightDebounced = debounce(this._updateHeight.bind(this), 250);
    this._updateScrollPosition = debounce(function () {
      return _this.scrollToSlide(_this.activeSlide);
    }, 250);
    this._handleScroll = debounce(this._handleScroll.bind(this), 150); // May fire twice depending on browser
    // Initialize slider

    this._init();
  }

  _createClass(A11YSlider, [{
    key: "_init",
    value: function _init() {
      // Check if the slider should be initialized depending on slides shown
      this._checkShouldEnable(); // Enable/disable slider after resize


      window.addEventListener('resize', this._checkShouldEnableDebounced);

      this._dispatchEvent('init', {
        a11ySlider: this
      });
    }
  }, {
    key: "_checkShouldEnable",
    value: function _checkShouldEnable() {
      var _this2 = this;

      var shouldEnable = true; // If 1 or less slides exist then a slider is not needed

      if (this.slides.length <= 1) shouldEnable = false; // If there are no slides outside the slider's viewport a slider is not needed

      this._getActiveAndVisible(function (visibleSlides) {
        if (visibleSlides.length === _this2.slides.length) shouldEnable = false;
      }); // Enable/disable slider based on above requirements


      if (shouldEnable && this.sliderEnabled === SliderState.Disabled) {
        this._enableSlider();
      } else if (!shouldEnable && this.sliderEnabled === SliderState.Enabled) {
        this._disableSlider();
      }
    } // Enable all functionality for the slider. Should mirror _disableSlider()

  }, {
    key: "_enableSlider",
    value: function _enableSlider() {
      // Set slider to enabled
      this.sliderEnabled = SliderState.Enabled; // Add slider container to DOM and move slider into it if enabled

      if (this.options.container) {
        this.slider.insertAdjacentElement('beforebegin', this.sliderContainer);
        this.sliderContainer.insertAdjacentElement('afterbegin', this.slider);
      } // If prev/next buttons are enabled and user isn't using their own add it to the DOM


      if (this.options.navBtns && !this._hasCustomBtns) {
        if (this.options.prevBtn instanceof HTMLElement) {
          this.slider.insertAdjacentElement('beforebegin', this.options.prevBtn);
        }

        if (this.options.nextBtn instanceof HTMLElement) {
          this.slider.insertAdjacentElement('beforebegin', this.options.nextBtn);
        }
      } // TODO: Move add/removal of buttons into it's own function
      // Add event listeners for prev/next buttons. Possible for there to be multiple so need to loop through them all


      var prevBtns = this.options.prevBtn instanceof HTMLElement ? [this.options.prevBtn] : this.options.prevBtn;
      var nextBtns = this.options.nextBtn instanceof HTMLElement ? [this.options.nextBtn] : this.options.nextBtn;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = prevBtns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var prevBtn = _step.value;
          prevBtn.addEventListener('click', this._handlePrev, {
            passive: true
          });
          prevBtn.addEventListener('keypress', this._handlePrev, {
            passive: true
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = nextBtns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var nextBtn = _step2.value;
          nextBtn.addEventListener('click', this._handleNext, {
            passive: true
          });
          nextBtn.addEventListener('keypress', this._handleNext, {
            passive: true
          });
        } // Add dot navigation if enabled

      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (this.options.dots) this._generateDots(); // Add listener for when the slider stops moving

      this.slider.addEventListener('scroll', this._handleScroll, false); // Add all CSS needed

      this._setCSS(); // Adaptive height


      if (this.options.adaptiveHeight === true) {
        // Update slider's height based on content of slide
        this._updateHeight(this.activeSlide); // Also add resize listener for it


        window.addEventListener('resize', this._updateHeightDebounced.bind);
      } // On resize make sure to update scroll position as content may change in width/height


      window.addEventListener('resize', this._updateScrollPosition);
    } // Disable all functionality for the slider. Should mirror _enableSlider()

  }, {
    key: "_disableSlider",
    value: function _disableSlider() {
      this.sliderEnabled = SliderState.Disabled; // Remove slider from a11y-slider's container and then remove container from DOM

      if (document.body.contains(this.sliderContainer)) {
        this.sliderContainer.insertAdjacentElement('beforebegin', this.slider);
        this.sliderContainer.parentNode.removeChild(this.sliderContainer);
      } // Remove event listeners for prev/next buttons
      // Possible for there to be multiple so need to loop through them all


      var prevBtns = this.options.prevBtn instanceof HTMLElement ? [this.options.prevBtn] : this.options.prevBtn;
      var nextBtns = this.options.nextBtn instanceof HTMLElement ? [this.options.nextBtn] : this.options.nextBtn;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = prevBtns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var prevBtn = _step3.value;
          prevBtn.removeEventListener('click', this._handlePrev);
          prevBtn.removeEventListener('keypress', this._handlePrev); // Only remove generated buttons, not user-defined ones

          if (!this._hasCustomBtns) prevBtn.parentNode.removeChild(prevBtn);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = nextBtns[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var nextBtn = _step4.value;
          nextBtn.removeEventListener('click', this._handleNext);
          nextBtn.removeEventListener('keypress', this._handleNext); // Only remove generated buttons, not user-defined ones

          if (!this._hasCustomBtns) nextBtn.parentNode.removeChild(nextBtn);
        } // Will remove dots if they exist

      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      this._removeDots(); // Remove listener for when the slider stops moving


      this.slider.removeEventListener('scroll', this._handleScroll, false); // Remove all CSS

      this._removeCSS(); // Remove all adaptive height functionality


      this._updateHeight(false);

      window.removeEventListener('resize', this._updateHeightDebounced); // Remove scroll position update check

      window.removeEventListener('resize', this._updateScrollPosition);
    } // Add all CSS needed for the slider. Should mirror _removeCSS()

  }, {
    key: "_setCSS",
    value: function _setCSS() {
      // Update slider instance to get the correct elements
      this._getActiveAndVisible(); // Add main slider class if it doesn't have it already


      this.slider.classList.add(this._sliderClass); // Reset the more dynamic CSS first if it exists

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.slides[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var slide = _step5.value;
          slide.classList.remove(this._activeClass);
          slide.classList.remove(this._visibleClass);
        } // Add in active classes

      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      this.activeSlide.classList.add(this._activeClass); // Add in visible classes

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.visibleSlides[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _slide = _step6.value;

          _slide.classList.add(this._visibleClass);
        } // Trigger dot update

      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      this._updateDots(this.activeSlide); // Update all a11y functionality


      this._addA11Y();
    } // Remove all CSS needed for the slider. Should mirror _setCSS()

  }, {
    key: "_removeCSS",
    value: function _removeCSS() {
      // Remove class to slider
      this.slider.classList.remove(this._sliderClass); // Reset all the dynamic classes

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.slides[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var slide = _step7.value;
          slide.classList.remove(this._activeClass);
          slide.classList.remove(this._visibleClass);
        } // Remove all a11y functionality

      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      this._removeA11Y();
    } // Makes only the visible items focusable and readable by screenreaders. Should mirror _removeA11Y()

  }, {
    key: "_addA11Y",
    value: function _addA11Y() {
      // Reset all a11y functionality to default beforehand
      this._removeA11Y();

      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.slides[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var slide = _step8.value;
          var focusableItems = slide.querySelectorAll(this._focusable); // If slide is not visible make the slide wrapper not focusable

          if (!slide.classList.contains(this._visibleClass)) {
            slide.setAttribute('tabindex', '-1');
            slide.setAttribute('aria-hidden', 'true');
          }

          var _iteratorNormalCompletion9 = true;
          var _didIteratorError9 = false;
          var _iteratorError9 = undefined;

          try {
            for (var _iterator9 = focusableItems[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
              var focusableItem = _step9.value;

              if (!slide.classList.contains(this._visibleClass)) {
                focusableItem.setAttribute('tabindex', '-1');
              }
            }
          } catch (err) {
            _didIteratorError9 = true;
            _iteratorError9 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
                _iterator9.return();
              }
            } finally {
              if (_didIteratorError9) {
                throw _iteratorError9;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }
    } // Reset a11y attributes for slide wrapper. Should mirror _addA11Y()

  }, {
    key: "_removeA11Y",
    value: function _removeA11Y() {
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = this.slides[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var slide = _step10.value;
          var focusableItems = slide.querySelectorAll(this._focusable); // Remove a11y for each slide wrapper

          slide.removeAttribute('tabindex');
          slide.removeAttribute('aria-hidden'); // Reset a11y attributes for slide inner elements

          var _iteratorNormalCompletion11 = true;
          var _didIteratorError11 = false;
          var _iteratorError11 = undefined;

          try {
            for (var _iterator11 = focusableItems[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
              var focusableItem = _step11.value;
              focusableItem.removeAttribute('tabindex');
            }
          } catch (err) {
            _didIteratorError11 = true;
            _iteratorError11 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion11 && _iterator11.return != null) {
                _iterator11.return();
              }
            } finally {
              if (_didIteratorError11) {
                throw _iteratorError11;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return != null) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }
    }
  }, {
    key: "_generateDots",
    value: function _generateDots() {
      var _this3 = this;

      this.dots = createElement("<ul class=\"".concat(this._dotsClass, "\"></ul>"));

      var _loop = function _loop(i) {
        var dotLi = createElement('<li></li>');
        var dotBtn = createElement('<button type="button"></button>'); // Add text

        dotBtn.textContent = "Move slider to item #".concat(i + 1); // Event handlers to switch to slide

        var switchToSlide = function switchToSlide(event) {
          if (a11yClick(event) === true) _this3.scrollToSlide(_this3.slides[i]);
        }; // Add event listeners


        dotBtn.addEventListener('click', switchToSlide, {
          passive: true
        });
        dotBtn.addEventListener('keypress', switchToSlide, {
          passive: true
        }); // Append to UL

        dotLi.insertAdjacentElement('beforeend', dotBtn);

        _this3.dots.insertAdjacentElement('beforeend', dotLi);
      };

      for (var i = 0; i < this.slides.length; i++) {
        _loop(i);
      }

      this.slider.insertAdjacentElement('afterend', this.dots);
    }
  }, {
    key: "_removeDots",
    value: function _removeDots() {
      if (this.dots instanceof HTMLElement) {
        this.dots.parentNode.removeChild(this.dots);
      }
    }
  }, {
    key: "_updateDots",
    value: function _updateDots(activeSlide) {
      if (this.dots instanceof HTMLElement) {
        var activeIndex = Array.prototype.indexOf.call(activeSlide.parentNode.children, activeSlide); // Reset children active class if exist

        var _iteratorNormalCompletion12 = true;
        var _didIteratorError12 = false;
        var _iteratorError12 = undefined;

        try {
          for (var _iterator12 = this.dots.children[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            var dot = _step12.value;
            dot.querySelector('button').classList.remove('active');
          } // Add class to active dot

        } catch (err) {
          _didIteratorError12 = true;
          _iteratorError12 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion12 && _iterator12.return != null) {
              _iterator12.return();
            }
          } finally {
            if (_didIteratorError12) {
              throw _iteratorError12;
            }
          }
        }

        this.dots.children[activeIndex].querySelector('button').classList.add('active');
      }
    }
  }, {
    key: "_goPrevOrNext",
    value: function _goPrevOrNext(direction) {
      var _this4 = this;

      this._getActiveAndVisible(function (visibleSlides, activeSlide) {
        var firstSlide = _this4.slider.firstElementChild;
        var lastSlide = _this4.slider.lastElementChild;
        var firstVisibleSlide = visibleSlides[0];
        var lastVisibleSlide = visibleSlides[visibleSlides.length - 1];

        if (direction === SlideDirection.Next) {
          // Wrap to the first slide if we're currently on the last
          if (lastVisibleSlide === lastSlide) {
            _this4.scrollToSlide(firstSlide);
          } else {
            _this4.scrollToSlide(activeSlide.nextElementSibling);
          }
        } else if (direction === SlideDirection.Prev) {
          // Wrap to the last slide if we're currently on the first
          if (firstVisibleSlide === firstSlide) {
            _this4.scrollToSlide(lastSlide);
          } else {
            _this4.scrollToSlide(activeSlide.previousElementSibling);
          }
        }
      });
    }
  }, {
    key: "scrollToSlide",
    value: function scrollToSlide(targetSlide) {
      var modernBrowser = !!HTMLElement.prototype.scrollTo; // Dispatch custom event

      this._dispatchEvent('beforeChange', {
        currentSlide: this.activeSlide,
        nextSlide: targetSlide,
        a11ySlider: this
      }); // Update slider's height based on content of slide


      if (this.options.adaptiveHeight === true) this._updateHeight(targetSlide); // Move slider to specific item

      if (modernBrowser) {
        this.slider.scroll({
          left: targetSlide.offsetLeft,
          behavior: 'smooth'
        });
      } else {
        this.slider.scrollLeft = targetSlide.offsetLeft;
      } // Trigger dot update


      this._updateDots(targetSlide);
    }
    /**
     * If element is passed slider's height will match
     *  it otherwise the height of the slider is removed.
     */

  }, {
    key: "_updateHeight",
    value: function _updateHeight(target) {
      if (target instanceof HTMLElement) {
        var targetHeight = target.offsetHeight;
        this.slider.style.height = "".concat(targetHeight, "px");
      } else {
        this.slider.style.height = '';
      }
    }
  }, {
    key: "_getActiveAndVisible",
    value: function _getActiveAndVisible(callback) {
      var visibleSlides = []; // Only detects items in the visible viewport of the parent element

      var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = this.slides[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var slide = _step13.value;
          var sliderWidth = this.slider.clientWidth;
          var sliderPosition = this.slider.scrollLeft;
          var slideOffset = slide.offsetLeft;

          if (slideOffset >= sliderPosition && slideOffset < sliderPosition + sliderWidth) {
            visibleSlides.push(slide);
          }
        }
      } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion13 && _iterator13.return != null) {
            _iterator13.return();
          }
        } finally {
          if (_didIteratorError13) {
            throw _iteratorError13;
          }
        }
      }

      this.visibleSlides = visibleSlides;
      this.activeSlide = visibleSlides[0];
      callback && callback(this.visibleSlides, this.activeSlide);
    }
  }, {
    key: "_handlePrev",
    value: function _handlePrev(event) {
      if (a11yClick(event) === true) this._goPrevOrNext(SlideDirection.Prev);
    }
  }, {
    key: "_handleNext",
    value: function _handleNext(event) {
      if (a11yClick(event) === true) this._goPrevOrNext(SlideDirection.Next);
    }
  }, {
    key: "_handleScroll",
    value: function _handleScroll() {
      // Update CSS
      this._setCSS(); // Dispatch custom event


      this._dispatchEvent('afterChange', {
        currentSlide: this.activeSlide,
        a11ySlider: this
      });
    }
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent(eventName, detail) {
      var event = crossCustomEvent(eventName, {
        detail: detail
      });
      this.slider.dispatchEvent(event);
    }
    /**
     * Nuke the slider
     */

  }, {
    key: "destroy",
    value: function destroy() {
      // Undos everything from _enableSlider()
      this._disableSlider(); // Undos everything from init()


      window.removeEventListener('resize', this._checkShouldEnableDebounced); // Dispatch custom event

      this._dispatchEvent('destroy', {
        a11ySlider: this
      });
    }
  }]);

  return A11YSlider;
}();

export default A11YSlider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYTExeS1zbGlkZXIuZXNtLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3BhdGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZhaWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pZTgtZG9tLWRlZmluZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGlkZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtZ2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91aWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93cmFwcGVkLXdlbGwta25vd24tc3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLXRvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRkZW4ta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWRlZmluZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtYnVpbHQtaW4uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1sZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW51bS1idWcta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL293bi1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1mb3JjZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZXhwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtYXNzaWduLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QuYXNzaWduLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9odG1sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLWl0ZXJhdG9yLWNvbnN0cnVjdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS1pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy90cy1kZWJvdW5jZS9kaXN0L3NyYy9pbmRleC5qcyIsIi4uL3NyYy91dGlscy50cyIsIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgTyA9ICdvYmplY3QnO1xudmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgY2hlY2sodHlwZW9mIGdsb2JhbFRoaXMgPT0gTyAmJiBnbG9iYWxUaGlzKSB8fFxuICBjaGVjayh0eXBlb2Ygd2luZG93ID09IE8gJiYgd2luZG93KSB8fFxuICBjaGVjayh0eXBlb2Ygc2VsZiA9PSBPICYmIHNlbGYpIHx8XG4gIGNoZWNrKHR5cGVvZiBnbG9iYWwgPT0gTyAmJiBnbG9iYWwpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgRVhJU1RTID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gRVhJU1RTID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdGVFbGVtZW50KCdkaXYnKSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9XG4gIH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBQUkVGRVJSRURfU1RSSU5HKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpbnB1dC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG5cbnZhciBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gbmF0aXZlRGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwga2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIGhpZGUoZ2xvYmFsLCBrZXksIHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnbG9iYWxba2V5XSA9IHZhbHVlO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG5cbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IHNldEdsb2JhbChTSEFSRUQsIHt9KTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246ICczLjIuMScsXG4gIG1vZGU6IElTX1BVUkUgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxOSBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwidmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyBTdHJpbmcoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgKCsraWQgKyBwb3N0Zml4KS50b1N0cmluZygzNik7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gISFPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIENocm9tZSAzOCBTeW1ib2wgaGFzIGluY29ycmVjdCB0b1N0cmluZyBjb252ZXJzaW9uXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICByZXR1cm4gIVN0cmluZyhTeW1ib2woKSk7XG59KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcblxudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgc3RvcmUgPSBzaGFyZWQoJ3drcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPSBOQVRJVkVfU1lNQk9MICYmIFN5bWJvbFtuYW1lXVxuICAgIHx8IChOQVRJVkVfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuIiwiZXhwb3J0cy5mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG4iLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd3JhcHBlZC13ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChOQU1FKSB7XG4gIHZhciBTeW1ib2wgPSBwYXRoLlN5bWJvbCB8fCAocGF0aC5TeW1ib2wgPSB7fSk7XG4gIGlmICghaGFzKFN5bWJvbCwgTkFNRSkpIGRlZmluZVByb3BlcnR5KFN5bWJvbCwgTkFNRSwge1xuICAgIHZhbHVlOiB3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlLmYoTkFNRSlcbiAgfSk7XG59O1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5pdGVyYXRvcmAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN5bWJvbC5pdGVyYXRvclxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gTmFzaG9ybiB+IEpESzggYnVnXG52YXIgTkFTSE9STl9CVUcgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgIW5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoeyAxOiAyIH0sIDEpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZWAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6IG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG52YXIgc3BsaXQgPSAnJy5zcGxpdDtcblxuLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3Ncbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyB0aHJvd3MgYW4gZXJyb3IgaW4gcmhpbm8sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9yaGluby9pc3N1ZXMvMzQ2XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgcmV0dXJuICFPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PSAnU3RyaW5nJyA/IHNwbGl0LmNhbGwoaXQsICcnKSA6IE9iamVjdChpdCk7XG59IDogT2JqZWN0O1xuIiwiLy8gYFJlcXVpcmVPYmplY3RDb2VyY2libGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVxdWlyZW9iamVjdGNvZXJjaWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSW5kZXhlZE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGl0KSk7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcblxudmFyIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSW5kZXhlZE9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzKE8sIFApKSByZXR1cm4gY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKCFwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gc2hhcmVkKCduYXRpdmUtZnVuY3Rpb24tdG8tc3RyaW5nJywgRnVuY3Rpb24udG9TdHJpbmcpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBuYXRpdmVGdW5jdGlvblRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXRvLXN0cmluZycpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIC9uYXRpdmUgY29kZS8udGVzdChuYXRpdmVGdW5jdGlvblRvU3RyaW5nLmNhbGwoV2Vha01hcCkpO1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG5cbnZhciBrZXlzID0gc2hhcmVkKCdrZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4ga2V5c1trZXldIHx8IChrZXlzW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsInZhciBOQVRJVkVfV0VBS19NQVAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZScpO1xudmFyIG9iamVjdEhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcbnZhciBzZXQsIGdldCwgaGFzO1xuXG52YXIgZW5mb3JjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaGFzKGl0KSA/IGdldChpdCkgOiBzZXQoaXQsIHt9KTtcbn07XG5cbnZhciBnZXR0ZXJGb3IgPSBmdW5jdGlvbiAoVFlQRSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0KSB7XG4gICAgdmFyIHN0YXRlO1xuICAgIGlmICghaXNPYmplY3QoaXQpIHx8IChzdGF0ZSA9IGdldChpdCkpLnR5cGUgIT09IFRZUEUpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY2VpdmVyLCAnICsgVFlQRSArICcgcmVxdWlyZWQnKTtcbiAgICB9IHJldHVybiBzdGF0ZTtcbiAgfTtcbn07XG5cbmlmIChOQVRJVkVfV0VBS19NQVApIHtcbiAgdmFyIHN0b3JlID0gbmV3IFdlYWtNYXAoKTtcbiAgdmFyIHdtZ2V0ID0gc3RvcmUuZ2V0O1xuICB2YXIgd21oYXMgPSBzdG9yZS5oYXM7XG4gIHZhciB3bXNldCA9IHN0b3JlLnNldDtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIHdtc2V0LmNhbGwoc3RvcmUsIGl0LCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21nZXQuY2FsbChzdG9yZSwgaXQpIHx8IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21oYXMuY2FsbChzdG9yZSwgaXQpO1xuICB9O1xufSBlbHNlIHtcbiAgdmFyIFNUQVRFID0gc2hhcmVkS2V5KCdzdGF0ZScpO1xuICBoaWRkZW5LZXlzW1NUQVRFXSA9IHRydWU7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBoaWRlKGl0LCBTVEFURSwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpID8gaXRbU1RBVEVdIDoge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBnZXQ6IGdldCxcbiAgaGFzOiBoYXMsXG4gIGVuZm9yY2U6IGVuZm9yY2UsXG4gIGdldHRlckZvcjogZ2V0dGVyRm9yXG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgbmF0aXZlRnVuY3Rpb25Ub1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi10by1zdHJpbmcnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXQ7XG52YXIgZW5mb3JjZUludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmVuZm9yY2U7XG52YXIgVEVNUExBVEUgPSBTdHJpbmcobmF0aXZlRnVuY3Rpb25Ub1N0cmluZykuc3BsaXQoJ3RvU3RyaW5nJyk7XG5cbnNoYXJlZCgnaW5zcGVjdFNvdXJjZScsIGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gbmF0aXZlRnVuY3Rpb25Ub1N0cmluZy5jYWxsKGl0KTtcbn0pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICB2YXIgdW5zYWZlID0gb3B0aW9ucyA/ICEhb3B0aW9ucy51bnNhZmUgOiBmYWxzZTtcbiAgdmFyIHNpbXBsZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMuZW51bWVyYWJsZSA6IGZhbHNlO1xuICB2YXIgbm9UYXJnZXRHZXQgPSBvcHRpb25zID8gISFvcHRpb25zLm5vVGFyZ2V0R2V0IDogZmFsc2U7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICh0eXBlb2Yga2V5ID09ICdzdHJpbmcnICYmICFoYXModmFsdWUsICduYW1lJykpIGhpZGUodmFsdWUsICduYW1lJywga2V5KTtcbiAgICBlbmZvcmNlSW50ZXJuYWxTdGF0ZSh2YWx1ZSkuc291cmNlID0gVEVNUExBVEUuam9pbih0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8ga2V5IDogJycpO1xuICB9XG4gIGlmIChPID09PSBnbG9iYWwpIHtcbiAgICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgICBlbHNlIHNldEdsb2JhbChrZXksIHZhbHVlKTtcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAoIXVuc2FmZSkge1xuICAgIGRlbGV0ZSBPW2tleV07XG4gIH0gZWxzZSBpZiAoIW5vVGFyZ2V0R2V0ICYmIE9ba2V5XSkge1xuICAgIHNpbXBsZSA9IHRydWU7XG4gIH1cbiAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gIGVsc2UgaGlkZShPLCBrZXksIHZhbHVlKTtcbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5zb3VyY2UgfHwgbmF0aXZlRnVuY3Rpb25Ub1N0cmluZy5jYWxsKHRoaXMpO1xufSk7XG4iLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG52YXIgYUZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhcmlhYmxlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFyaWFibGUgPT0gJ2Z1bmN0aW9uJyA/IHZhcmlhYmxlIDogdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBtZXRob2QpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gYUZ1bmN0aW9uKHBhdGhbbmFtZXNwYWNlXSkgfHwgYUZ1bmN0aW9uKGdsb2JhbFtuYW1lc3BhY2VdKVxuICAgIDogcGF0aFtuYW1lc3BhY2VdICYmIHBhdGhbbmFtZXNwYWNlXVttZXRob2RdIHx8IGdsb2JhbFtuYW1lc3BhY2VdICYmIGdsb2JhbFtuYW1lc3BhY2VdW21ldGhvZF07XG59O1xuIiwidmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG4vLyBgVG9JbnRlZ2VyYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvaW50ZWdlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGlzTmFOKGFyZ3VtZW50ID0gK2FyZ3VtZW50KSA/IDAgOiAoYXJndW1lbnQgPiAwID8gZmxvb3IgOiBjZWlsKShhcmd1bWVudCk7XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gYFRvTGVuZ3RoYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvbGVuZ3RoXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gYXJndW1lbnQgPiAwID8gbWluKHRvSW50ZWdlcihhcmd1bWVudCksIDB4MUZGRkZGRkZGRkZGRkYpIDogMDsgLy8gMiAqKiA1MyAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIEhlbHBlciBmb3IgYSBwb3B1bGFyIHJlcGVhdGluZyBjYXNlIG9mIHRoZSBzcGVjOlxuLy8gTGV0IGludGVnZXIgYmUgPyBUb0ludGVnZXIoaW5kZXgpLlxuLy8gSWYgaW50ZWdlciA8IDAsIGxldCByZXN1bHQgYmUgbWF4KChsZW5ndGggKyBpbnRlZ2VyKSwgMCk7IGVsc2UgbGV0IHJlc3VsdCBiZSBtaW4obGVuZ3RoLCBsZW5ndGgpLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICB2YXIgaW50ZWdlciA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbnRlZ2VyIDwgMCA/IG1heChpbnRlZ2VyICsgbGVuZ3RoLCAwKSA6IG1pbihpbnRlZ2VyLCBsZW5ndGgpO1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgaWYgKChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSAmJiBPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4gIGluY2x1ZGVzOiBjcmVhdGVNZXRob2QodHJ1ZSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgIWhhcyhoaWRkZW5LZXlzLCBrZXkpICYmIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbi8vIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkZXMgbm9uLWVudW1lcmFibGUgYW5kIHN5bWJvbHNcbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignUmVmbGVjdCcsICdvd25LZXlzJykgfHwgZnVuY3Rpb24gb3duS2V5cyhpdCkge1xuICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUuZihhbk9iamVjdChpdCkpO1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmY7XG4gIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBrZXlzLmNvbmNhdChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpKSA6IGtleXM7XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBvd25LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL293bi1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG4gIHZhciBrZXlzID0gb3duS2V5cyhzb3VyY2UpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmICghaGFzKHRhcmdldCwga2V5KSkgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciByZXBsYWNlbWVudCA9IC8jfFxcLnByb3RvdHlwZVxcLi87XG5cbnZhciBpc0ZvcmNlZCA9IGZ1bmN0aW9uIChmZWF0dXJlLCBkZXRlY3Rpb24pIHtcbiAgdmFyIHZhbHVlID0gZGF0YVtub3JtYWxpemUoZmVhdHVyZSldO1xuICByZXR1cm4gdmFsdWUgPT0gUE9MWUZJTEwgPyB0cnVlXG4gICAgOiB2YWx1ZSA9PSBOQVRJVkUgPyBmYWxzZVxuICAgIDogdHlwZW9mIGRldGVjdGlvbiA9PSAnZnVuY3Rpb24nID8gZmFpbHMoZGV0ZWN0aW9uKVxuICAgIDogISFkZXRlY3Rpb247XG59O1xuXG52YXIgbm9ybWFsaXplID0gaXNGb3JjZWQubm9ybWFsaXplID0gZnVuY3Rpb24gKHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZShyZXBsYWNlbWVudCwgJy4nKS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGRhdGEgPSBpc0ZvcmNlZC5kYXRhID0ge307XG52YXIgTkFUSVZFID0gaXNGb3JjZWQuTkFUSVZFID0gJ04nO1xudmFyIFBPTFlGSUxMID0gaXNGb3JjZWQuUE9MWUZJTEwgPSAnUCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGb3JjZWQ7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGUnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5ub1RhcmdldEdldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcbiAgdmFyIFRBUkdFVCA9IG9wdGlvbnMudGFyZ2V0O1xuICB2YXIgR0xPQkFMID0gb3B0aW9ucy5nbG9iYWw7XG4gIHZhciBTVEFUSUMgPSBvcHRpb25zLnN0YXQ7XG4gIHZhciBGT1JDRUQsIHRhcmdldCwga2V5LCB0YXJnZXRQcm9wZXJ0eSwgc291cmNlUHJvcGVydHksIGRlc2NyaXB0b3I7XG4gIGlmIChHTE9CQUwpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWw7XG4gIH0gZWxzZSBpZiAoU1RBVElDKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsW1RBUkdFVF0gfHwgc2V0R2xvYmFsKFRBUkdFVCwge30pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldCA9IChnbG9iYWxbVEFSR0VUXSB8fCB7fSkucHJvdG90eXBlO1xuICB9XG4gIGlmICh0YXJnZXQpIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlW2tleV07XG4gICAgaWYgKG9wdGlvbnMubm9UYXJnZXRHZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICAgICAgdGFyZ2V0UHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWluZWQgaW4gdGFyZ2V0XG4gICAgaWYgKCFGT1JDRUQgJiYgdGFyZ2V0UHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PT0gdHlwZW9mIHRhcmdldFByb3BlcnR5KSBjb250aW51ZTtcbiAgICAgIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5KTtcbiAgICB9XG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBoaWRlKHNvdXJjZVByb3BlcnR5LCAnc2hhbScsIHRydWUpO1xuICAgIH1cbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNvdXJjZVByb3BlcnR5LCBvcHRpb25zKTtcbiAgfVxufTtcbiIsInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbi8vIGBPYmplY3Qua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3Qua2V5c1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwidmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbi8vIGBUb09iamVjdGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcblxudmFyIG5hdGl2ZUFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIGBPYmplY3QuYXNzaWduYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5hc3NpZ25cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhbmF0aXZlQXNzaWduIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBzeW1ib2wgPSBTeW1ib2woKTtcbiAgdmFyIGFscGhhYmV0ID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtzeW1ib2xdID0gNztcbiAgYWxwaGFiZXQuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGNocikgeyBCW2Nocl0gPSBjaHI7IH0pO1xuICByZXR1cm4gbmF0aXZlQXNzaWduKHt9LCBBKVtzeW1ib2xdICE9IDcgfHwgb2JqZWN0S2V5cyhuYXRpdmVBc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBhbHBoYWJldDtcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICB2YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mO1xuICB3aGlsZSAoYXJndW1lbnRzTGVuZ3RoID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IEluZGV4ZWRPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5U3ltYm9scyA/IG9iamVjdEtleXMoUykuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhTKSkgOiBvYmplY3RLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikge1xuICAgICAga2V5ID0ga2V5c1tqKytdO1xuICAgICAgaWYgKCFERVNDUklQVE9SUyB8fCBwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKFMsIGtleSkpIFRba2V5XSA9IFNba2V5XTtcbiAgICB9XG4gIH0gcmV0dXJuIFQ7XG59IDogbmF0aXZlQXNzaWduO1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1hc3NpZ24nKTtcblxuLy8gYE9iamVjdC5hc3NpZ25gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmFzc2lnblxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogT2JqZWN0LmFzc2lnbiAhPT0gYXNzaWduIH0sIHtcbiAgYXNzaWduOiBhc3NpZ25cbn0pO1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyBjb2RlUG9pbnRBdCwgYXQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChDT05WRVJUX1RPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBwb3MpIHtcbiAgICB2YXIgUyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgdmFyIHBvc2l0aW9uID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIHNpemUgPSBTLmxlbmd0aDtcbiAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IHNpemUpIHJldHVybiBDT05WRVJUX1RPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGZpcnN0ID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcbiAgICByZXR1cm4gZmlyc3QgPCAweEQ4MDAgfHwgZmlyc3QgPiAweERCRkYgfHwgcG9zaXRpb24gKyAxID09PSBzaXplXG4gICAgICB8fCAoc2Vjb25kID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uICsgMSkpIDwgMHhEQzAwIHx8IHNlY29uZCA+IDB4REZGRlxuICAgICAgICA/IENPTlZFUlRfVE9fU1RSSU5HID8gUy5jaGFyQXQocG9zaXRpb24pIDogZmlyc3RcbiAgICAgICAgOiBDT05WRVJUX1RPX1NUUklORyA/IFMuc2xpY2UocG9zaXRpb24sIHBvc2l0aW9uICsgMikgOiAoZmlyc3QgLSAweEQ4MDAgPDwgMTApICsgKHNlY29uZCAtIDB4REMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5jb2RlcG9pbnRhdFxuICBjb2RlQXQ6IGNyZWF0ZU1ldGhvZChmYWxzZSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLnByb3RvdHlwZS5hdFxuICBjaGFyQXQ6IGNyZWF0ZU1ldGhvZCh0cnVlKVxufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEYoKSB7IC8qIGVtcHR5ICovIH1cbiAgRi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBudWxsO1xuICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKG5ldyBGKCkpICE9PSBGLnByb3RvdHlwZTtcbn0pO1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXInKTtcblxudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8vIGBPYmplY3QuZ2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmdldHByb3RvdHlwZW9mXG5tb2R1bGUuZXhwb3J0cyA9IENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90b3R5cGUgOiBudWxsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSBmYWxzZTtcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG4vLyBgJUl0ZXJhdG9yUHJvdG90eXBlJWAgb2JqZWN0XG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0laXRlcmF0b3Jwcm90b3R5cGUlLW9iamVjdFxudmFyIEl0ZXJhdG9yUHJvdG90eXBlLCBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUsIGFycmF5SXRlcmF0b3I7XG5cbmlmIChbXS5rZXlzKSB7XG4gIGFycmF5SXRlcmF0b3IgPSBbXS5rZXlzKCk7XG4gIC8vIFNhZmFyaSA4IGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICBpZiAoISgnbmV4dCcgaW4gYXJyYXlJdGVyYXRvcikpIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSB0cnVlO1xuICBlbHNlIHtcbiAgICBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihnZXRQcm90b3R5cGVPZihhcnJheUl0ZXJhdG9yKSk7XG4gICAgaWYgKFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSkgSXRlcmF0b3JQcm90b3R5cGUgPSBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cbn1cblxuaWYgKEl0ZXJhdG9yUHJvdG90eXBlID09IHVuZGVmaW5lZCkgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbmlmICghSVNfUFVSRSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpIGhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEl0ZXJhdG9yUHJvdG90eXBlOiBJdGVyYXRvclByb3RvdHlwZSxcbiAgQlVHR1lfU0FGQVJJX0lURVJBVE9SUzogQlVHR1lfU0FGQVJJX0lURVJBVE9SU1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydGllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydGllc1xubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IG9iamVjdEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKE8sIGtleSA9IGtleXNbaW5kZXgrK10sIFByb3BlcnRpZXNba2V5XSk7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ2RvY3VtZW50JywgJ2RvY3VtZW50RWxlbWVudCcpO1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGRlZmluZVByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2h0bWwnKTtcbnZhciBkb2N1bWVudENyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xuXG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gZG9jdW1lbnRDcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgdmFyIGxlbmd0aCA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgc2NyaXB0ID0gJ3NjcmlwdCc7XG4gIHZhciBndCA9ICc+JztcbiAgdmFyIGpzID0gJ2phdmEnICsgc2NyaXB0ICsgJzonO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBodG1sLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSBTdHJpbmcoanMpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgc2NyaXB0ICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnLycgKyBzY3JpcHQgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZSAobGVuZ3RoLS0pIGRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbbGVuZ3RoXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG4vLyBgT2JqZWN0LmNyZWF0ZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZGVmaW5lUHJvcGVydGllcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcblxuaGlkZGVuS2V5c1tJRV9QUk9UT10gPSB0cnVlO1xuIiwidmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBUQUcsIFNUQVRJQykge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IFNUQVRJQyA/IGl0IDogaXQucHJvdG90eXBlLCBUT19TVFJJTkdfVEFHKSkge1xuICAgIGRlZmluZVByb3BlcnR5KGl0LCBUT19TVFJJTkdfVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IFRBRyB9KTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgSXRlcmF0b3JDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvckNvbnN0cnVjdG9yLCBUT19TVFJJTkdfVEFHLCBmYWxzZSwgdHJ1ZSk7XG4gIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gIHJldHVybiBJdGVyYXRvckNvbnN0cnVjdG9yO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkgJiYgaXQgIT09IG51bGwpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBzZXQgXCIgKyBTdHJpbmcoaXQpICsgJyBhcyBhIHByb3RvdHlwZScpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYVBvc3NpYmxlUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3Quc2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnNldHByb3RvdHlwZW9mXG4vLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyBmdW5jdGlvbiAoKSB7XG4gIHZhciBDT1JSRUNUX1NFVFRFUiA9IGZhbHNlO1xuICB2YXIgdGVzdCA9IHt9O1xuICB2YXIgc2V0dGVyO1xuICB0cnkge1xuICAgIHNldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldDtcbiAgICBzZXR0ZXIuY2FsbCh0ZXN0LCBbXSk7XG4gICAgQ09SUkVDVF9TRVRURVIgPSB0ZXN0IGluc3RhbmNlb2YgQXJyYXk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgYW5PYmplY3QoTyk7XG4gICAgYVBvc3NpYmxlUHJvdG90eXBlKHByb3RvKTtcbiAgICBpZiAoQ09SUkVDVF9TRVRURVIpIHNldHRlci5jYWxsKE8sIHByb3RvKTtcbiAgICBlbHNlIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgcmV0dXJuIE87XG4gIH07XG59KCkgOiB1bmRlZmluZWQpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtaXRlcmF0b3ItY29uc3RydWN0b3InKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGUnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciBJdGVyYXRvcnNDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlJyk7XG5cbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IEl0ZXJhdG9yc0NvcmUuSXRlcmF0b3JQcm90b3R5cGU7XG52YXIgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IEl0ZXJhdG9yc0NvcmUuQlVHR1lfU0FGQVJJX0lURVJBVE9SUztcbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xudmFyIEVOVFJJRVMgPSAnZW50cmllcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmFibGUsIE5BTUUsIEl0ZXJhdG9yQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gIGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG5cbiAgdmFyIGdldEl0ZXJhdGlvbk1ldGhvZCA9IGZ1bmN0aW9uIChLSU5EKSB7XG4gICAgaWYgKEtJTkQgPT09IERFRkFVTFQgJiYgZGVmYXVsdEl0ZXJhdG9yKSByZXR1cm4gZGVmYXVsdEl0ZXJhdG9yO1xuICAgIGlmICghQlVHR1lfU0FGQVJJX0lURVJBVE9SUyAmJiBLSU5EIGluIEl0ZXJhYmxlUHJvdG90eXBlKSByZXR1cm4gSXRlcmFibGVQcm90b3R5cGVbS0lORF07XG4gICAgc3dpdGNoIChLSU5EKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgICAgY2FzZSBFTlRSSUVTOiByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMpOyB9O1xuICB9O1xuXG4gIHZhciBUT19TVFJJTkdfVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgSU5DT1JSRUNUX1ZBTFVFU19OQU1FID0gZmFsc2U7XG4gIHZhciBJdGVyYWJsZVByb3RvdHlwZSA9IEl0ZXJhYmxlLnByb3RvdHlwZTtcbiAgdmFyIG5hdGl2ZUl0ZXJhdG9yID0gSXRlcmFibGVQcm90b3R5cGVbSVRFUkFUT1JdXG4gICAgfHwgSXRlcmFibGVQcm90b3R5cGVbJ0BAaXRlcmF0b3InXVxuICAgIHx8IERFRkFVTFQgJiYgSXRlcmFibGVQcm90b3R5cGVbREVGQVVMVF07XG4gIHZhciBkZWZhdWx0SXRlcmF0b3IgPSAhQlVHR1lfU0FGQVJJX0lURVJBVE9SUyAmJiBuYXRpdmVJdGVyYXRvciB8fCBnZXRJdGVyYXRpb25NZXRob2QoREVGQVVMVCk7XG4gIHZhciBhbnlOYXRpdmVJdGVyYXRvciA9IE5BTUUgPT0gJ0FycmF5JyA/IEl0ZXJhYmxlUHJvdG90eXBlLmVudHJpZXMgfHwgbmF0aXZlSXRlcmF0b3IgOiBuYXRpdmVJdGVyYXRvcjtcbiAgdmFyIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgbWV0aG9kcywgS0VZO1xuXG4gIC8vIGZpeCBuYXRpdmVcbiAgaWYgKGFueU5hdGl2ZUl0ZXJhdG9yKSB7XG4gICAgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoYW55TmF0aXZlSXRlcmF0b3IuY2FsbChuZXcgSXRlcmFibGUoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgaWYgKCFJU19QVVJFICYmIGdldFByb3RvdHlwZU9mKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSkgIT09IEl0ZXJhdG9yUHJvdG90eXBlKSB7XG4gICAgICAgIGlmIChzZXRQcm90b3R5cGVPZikge1xuICAgICAgICAgIHNldFByb3RvdHlwZU9mKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgSXRlcmF0b3JQcm90b3R5cGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdICE9ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBoaWRlKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIFRPX1NUUklOR19UQUcsIHRydWUsIHRydWUpO1xuICAgICAgaWYgKElTX1BVUkUpIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gICAgfVxuICB9XG5cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGQVVMVCA9PSBWQUxVRVMgJiYgbmF0aXZlSXRlcmF0b3IgJiYgbmF0aXZlSXRlcmF0b3IubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgSU5DT1JSRUNUX1ZBTFVFU19OQU1FID0gdHJ1ZTtcbiAgICBkZWZhdWx0SXRlcmF0b3IgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuYXRpdmVJdGVyYXRvci5jYWxsKHRoaXMpOyB9O1xuICB9XG5cbiAgLy8gZGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUlTX1BVUkUgfHwgRk9SQ0VEKSAmJiBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl0gIT09IGRlZmF1bHRJdGVyYXRvcikge1xuICAgIGhpZGUoSXRlcmFibGVQcm90b3R5cGUsIElURVJBVE9SLCBkZWZhdWx0SXRlcmF0b3IpO1xuICB9XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IGRlZmF1bHRJdGVyYXRvcjtcblxuICAvLyBleHBvcnQgYWRkaXRpb25hbCBtZXRob2RzXG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogZ2V0SXRlcmF0aW9uTWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyBkZWZhdWx0SXRlcmF0b3IgOiBnZXRJdGVyYXRpb25NZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiBnZXRJdGVyYXRpb25NZXRob2QoRU5UUklFUylcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoS0VZIGluIG1ldGhvZHMpIHtcbiAgICAgIGlmIChCVUdHWV9TQUZBUklfSVRFUkFUT1JTIHx8IElOQ09SUkVDVF9WQUxVRVNfTkFNRSB8fCAhKEtFWSBpbiBJdGVyYWJsZVByb3RvdHlwZSkpIHtcbiAgICAgICAgcmVkZWZpbmUoSXRlcmFibGVQcm90b3R5cGUsIEtFWSwgbWV0aG9kc1tLRVldKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgJCh7IHRhcmdldDogTkFNRSwgcHJvdG86IHRydWUsIGZvcmNlZDogQlVHR1lfU0FGQVJJX0lURVJBVE9SUyB8fCBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgfSwgbWV0aG9kcyk7XG4gIH1cblxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2hhckF0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUnKS5jaGFyQXQ7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGRlZmluZUl0ZXJhdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1pdGVyYXRvcicpO1xuXG52YXIgU1RSSU5HX0lURVJBVE9SID0gJ1N0cmluZyBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihTVFJJTkdfSVRFUkFUT1IpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLUBAaXRlcmF0b3JcbmRlZmluZUl0ZXJhdG9yKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICB0eXBlOiBTVFJJTkdfSVRFUkFUT1IsXG4gICAgc3RyaW5nOiBTdHJpbmcoaXRlcmF0ZWQpLFxuICAgIGluZGV4OiAwXG4gIH0pO1xuLy8gYCVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0lc3RyaW5naXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uIG5leHQoKSB7XG4gIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gIHZhciBzdHJpbmcgPSBzdGF0ZS5zdHJpbmc7XG4gIHZhciBpbmRleCA9IHN0YXRlLmluZGV4O1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBzdHJpbmcubGVuZ3RoKSByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIHBvaW50ID0gY2hhckF0KHN0cmluZywgaW5kZXgpO1xuICBzdGF0ZS5pbmRleCArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7IHZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2UgfTtcbn0pO1xuIiwiLy8gaXRlcmFibGUgRE9NIGNvbGxlY3Rpb25zXG4vLyBmbGFnIC0gYGl0ZXJhYmxlYCBpbnRlcmZhY2UgLSAnZW50cmllcycsICdrZXlzJywgJ3ZhbHVlcycsICdmb3JFYWNoJyBtZXRob2RzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ1NTUnVsZUxpc3Q6IDAsXG4gIENTU1N0eWxlRGVjbGFyYXRpb246IDAsXG4gIENTU1ZhbHVlTGlzdDogMCxcbiAgQ2xpZW50UmVjdExpc3Q6IDAsXG4gIERPTVJlY3RMaXN0OiAwLFxuICBET01TdHJpbmdMaXN0OiAwLFxuICBET01Ub2tlbkxpc3Q6IDEsXG4gIERhdGFUcmFuc2Zlckl0ZW1MaXN0OiAwLFxuICBGaWxlTGlzdDogMCxcbiAgSFRNTEFsbENvbGxlY3Rpb246IDAsXG4gIEhUTUxDb2xsZWN0aW9uOiAwLFxuICBIVE1MRm9ybUVsZW1lbnQ6IDAsXG4gIEhUTUxTZWxlY3RFbGVtZW50OiAwLFxuICBNZWRpYUxpc3Q6IDAsXG4gIE1pbWVUeXBlQXJyYXk6IDAsXG4gIE5hbWVkTm9kZU1hcDogMCxcbiAgTm9kZUxpc3Q6IDEsXG4gIFBhaW50UmVxdWVzdExpc3Q6IDAsXG4gIFBsdWdpbjogMCxcbiAgUGx1Z2luQXJyYXk6IDAsXG4gIFNWR0xlbmd0aExpc3Q6IDAsXG4gIFNWR051bWJlckxpc3Q6IDAsXG4gIFNWR1BhdGhTZWdMaXN0OiAwLFxuICBTVkdQb2ludExpc3Q6IDAsXG4gIFNWR1N0cmluZ0xpc3Q6IDAsXG4gIFNWR1RyYW5zZm9ybUxpc3Q6IDAsXG4gIFNvdXJjZUJ1ZmZlckxpc3Q6IDAsXG4gIFN0eWxlU2hlZXRMaXN0OiAwLFxuICBUZXh0VHJhY2tDdWVMaXN0OiAwLFxuICBUZXh0VHJhY2tMaXN0OiAwLFxuICBUb3VjaExpc3Q6IDBcbn07XG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGUnKTtcblxudmFyIFVOU0NPUEFCTEVTID0gd2VsbEtub3duU3ltYm9sKCd1bnNjb3BhYmxlcycpO1xudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG4vLyBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5pZiAoQXJyYXlQcm90b3R5cGVbVU5TQ09QQUJMRVNdID09IHVuZGVmaW5lZCkge1xuICBoaWRlKEFycmF5UHJvdG90eXBlLCBVTlNDT1BBQkxFUywgY3JlYXRlKG51bGwpKTtcbn1cblxuLy8gYWRkIGEga2V5IHRvIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIEFycmF5UHJvdG90eXBlW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGRlZmluZUl0ZXJhdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1pdGVyYXRvcicpO1xuXG52YXIgQVJSQVlfSVRFUkFUT1IgPSAnQXJyYXkgSXRlcmF0b3InO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoQVJSQVlfSVRFUkFUT1IpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmVudHJpZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmVudHJpZXNcbi8vIGBBcnJheS5wcm90b3R5cGUua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUua2V5c1xuLy8gYEFycmF5LnByb3RvdHlwZS52YWx1ZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnZhbHVlc1xuLy8gYEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEBpdGVyYXRvclxuLy8gYENyZWF0ZUFycmF5SXRlcmF0b3JgIGludGVybmFsIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtY3JlYXRlYXJyYXlpdGVyYXRvclxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVJdGVyYXRvcihBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IEFSUkFZX0lURVJBVE9SLFxuICAgIHRhcmdldDogdG9JbmRleGVkT2JqZWN0KGl0ZXJhdGVkKSwgLy8gdGFyZ2V0XG4gICAgaW5kZXg6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gICAga2luZDoga2luZCAgICAgICAgICAgICAgICAgICAgICAgICAvLyBraW5kXG4gIH0pO1xuLy8gYCVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSVhcnJheWl0ZXJhdG9ycHJvdG90eXBlJS5uZXh0XG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gIHZhciB0YXJnZXQgPSBzdGF0ZS50YXJnZXQ7XG4gIHZhciBraW5kID0gc3RhdGUua2luZDtcbiAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXgrKztcbiAgaWYgKCF0YXJnZXQgfHwgaW5kZXggPj0gdGFyZ2V0Lmxlbmd0aCkge1xuICAgIHN0YXRlLnRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4geyB2YWx1ZTogaW5kZXgsIGRvbmU6IGZhbHNlIH07XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4geyB2YWx1ZTogdGFyZ2V0W2luZGV4XSwgZG9uZTogZmFsc2UgfTtcbiAgcmV0dXJuIHsgdmFsdWU6IFtpbmRleCwgdGFyZ2V0W2luZGV4XV0sIGRvbmU6IGZhbHNlIH07XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJVxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtY3JlYXRldW5tYXBwZWRhcmd1bWVudHNvYmplY3Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWNyZWF0ZW1hcHBlZGFyZ3VtZW50c29iamVjdFxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBET01JdGVyYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcycpO1xudmFyIEFycmF5SXRlcmF0b3JNZXRob2RzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvcicpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbnZhciBBcnJheVZhbHVlcyA9IEFycmF5SXRlcmF0b3JNZXRob2RzLnZhbHVlcztcblxuZm9yICh2YXIgQ09MTEVDVElPTl9OQU1FIGluIERPTUl0ZXJhYmxlcykge1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtDT0xMRUNUSU9OX05BTUVdO1xuICB2YXIgQ29sbGVjdGlvblByb3RvdHlwZSA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlKSB7XG4gICAgLy8gc29tZSBDaHJvbWUgdmVyc2lvbnMgaGF2ZSBub24tY29uZmlndXJhYmxlIG1ldGhvZHMgb24gRE9NVG9rZW5MaXN0XG4gICAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGVbSVRFUkFUT1JdICE9PSBBcnJheVZhbHVlcykgdHJ5IHtcbiAgICAgIGhpZGUoQ29sbGVjdGlvblByb3RvdHlwZSwgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgQ29sbGVjdGlvblByb3RvdHlwZVtJVEVSQVRPUl0gPSBBcnJheVZhbHVlcztcbiAgICB9XG4gICAgaWYgKCFDb2xsZWN0aW9uUHJvdG90eXBlW1RPX1NUUklOR19UQUddKSBoaWRlKENvbGxlY3Rpb25Qcm90b3R5cGUsIFRPX1NUUklOR19UQUcsIENPTExFQ1RJT05fTkFNRSk7XG4gICAgaWYgKERPTUl0ZXJhYmxlc1tDT0xMRUNUSU9OX05BTUVdKSBmb3IgKHZhciBNRVRIT0RfTkFNRSBpbiBBcnJheUl0ZXJhdG9yTWV0aG9kcykge1xuICAgICAgLy8gc29tZSBDaHJvbWUgdmVyc2lvbnMgaGF2ZSBub24tY29uZmlndXJhYmxlIG1ldGhvZHMgb24gRE9NVG9rZW5MaXN0XG4gICAgICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZVtNRVRIT0RfTkFNRV0gIT09IEFycmF5SXRlcmF0b3JNZXRob2RzW01FVEhPRF9OQU1FXSkgdHJ5IHtcbiAgICAgICAgaGlkZShDb2xsZWN0aW9uUHJvdG90eXBlLCBNRVRIT0RfTkFNRSwgQXJyYXlJdGVyYXRvck1ldGhvZHNbTUVUSE9EX05BTUVdKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIENvbGxlY3Rpb25Qcm90b3R5cGVbTUVUSE9EX05BTUVdID0gQXJyYXlJdGVyYXRvck1ldGhvZHNbTUVUSE9EX05BTUVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0cy5kZWJvdW5jZT1mdW5jdGlvbihpLGUsbyl7dmFyIHQ7cmV0dXJuIHZvaWQgMD09PWUmJihlPTUwKSx2b2lkIDA9PT1vJiYobz17aXNJbW1lZGlhdGU6ITF9KSxmdW5jdGlvbigpe2Zvcih2YXIgYT1bXSxkPTA7ZDxhcmd1bWVudHMubGVuZ3RoO2QrKylhW2RdPWFyZ3VtZW50c1tkXTt2YXIgbj10aGlzLG09by5pc0ltbWVkaWF0ZSYmdm9pZCAwPT09dDt2b2lkIDAhPT10JiZjbGVhclRpbWVvdXQodCksdD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dD12b2lkIDAsby5pc0ltbWVkaWF0ZXx8aS5hcHBseShuLGEpfSxlKSxtJiZpLmFwcGx5KG4sYSl9fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAoaHRtbDogc3RyaW5nKTogSFRNTEVsZW1lbnQgPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoaHRtbCwgJ3RleHQvaHRtbCcpLmJvZHkuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGExMXljbGljayAtIEVhc2lseSBoYW5kbGUga2V5Ym9hcmQgY2xpY2sgZXZlbnRzIG9uIG5vbiBzZW1hbnRpYyBidXR0b24gZWxlbWVudHMuXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmlua2xlL2ExMXljbGlja1xyXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgQ2xpY2sva2V5Ym9hcmQgZXZlbnQgb2JqZWN0LlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvbiBldmVudCB0eXBlIGFuZCBjb2RlLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGExMXlDbGljayA9IGZ1bmN0aW9uKGV2ZW50OiBhbnkpOiBib29sZWFuIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgY29kZSA9IGV2ZW50LmNoYXJDb2RlIHx8IGV2ZW50LmtleUNvZGUsXHJcbiAgICAgICAgdHlwZSA9IGV2ZW50LnR5cGU7XHJcblxyXG4gICAgaWYgKHR5cGUgPT09ICdjbGljaycpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2tleWRvd24nKSB7XHJcbiAgICAgICAgaWYgKGNvZGUgPT09IDMyIHx8IGNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG4vLyBDcm9zcyBicm93c2VyIGN1c3RvbSBldmVudFxyXG4vLyBTb21lIGNvZGUgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc2h5c3RydWsvY3VzdG9tLWV2ZW50LWpzXHJcbmV4cG9ydCBjb25zdCBjcm9zc0N1c3RvbUV2ZW50ID0gKGV2ZW50OiBzdHJpbmcsIHBhcmFtczogYW55KSA9PiB7XHJcbiAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XHJcblxyXG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZCB9O1xyXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcclxuXHJcbiAgICByZXR1cm4gZXZ0O1xyXG59IiwiaW1wb3J0ICdjb3JlLWpzL2VzL29iamVjdC9hc3NpZ24nO1xyXG5pbXBvcnQgJ2NvcmUtanMvZXMvc3ltYm9sL2l0ZXJhdG9yJztcclxuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICd0cy1kZWJvdW5jZSc7XHJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGExMXlDbGljaywgY3Jvc3NDdXN0b21FdmVudCB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgJy4vaW5kZXguY3NzJztcclxuXHJcbmludGVyZmFjZSBPcHRpb25zIHtcclxuICAgIGNvbnRhaW5lcjogYm9vbGVhbixcclxuICAgIG5hdkJ0bnM6IGJvb2xlYW4sXHJcbiAgICBwcmV2QnRuOiBIVE1MRWxlbWVudCB8IEhUTUxDb2xsZWN0aW9uT2Y8SFRNTEVsZW1lbnQ+IHwgTm9kZUxpc3QsXHJcbiAgICBuZXh0QnRuOiBIVE1MRWxlbWVudCB8IEhUTUxDb2xsZWN0aW9uT2Y8SFRNTEVsZW1lbnQ+IHwgTm9kZUxpc3QsXHJcbiAgICBkb3RzOiBib29sZWFuLFxyXG4gICAgYWRhcHRpdmVIZWlnaHQ6IGJvb2xlYW4sXHJcbiAgICBza2lwTGluazogYm9vbGVhblxyXG59XHJcblxyXG5pbnRlcmZhY2UgQWN0aXZlVmlzaWJsZVNsaWRlcyB7XHJcbiAgICAodmlzaWJsZVNsaWRlczogSFRNTEVsZW1lbnRbXSwgYWN0aXZlU2xpZGU6IEhUTUxFbGVtZW50KTogdm9pZDtcclxufVxyXG5cclxuZW51bSBTbGlkZURpcmVjdGlvbiB7XHJcbiAgICBQcmV2LFxyXG4gICAgTmV4dFxyXG59XHJcblxyXG5lbnVtIFNsaWRlclN0YXRlIHtcclxuICAgIEVuYWJsZWQsXHJcbiAgICBEaXNhYmxlZFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBMTFZU2xpZGVyIHtcclxuICAgIHByaXZhdGUgX2FjdGl2ZUNsYXNzOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF92aXNpYmxlQ2xhc3M6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2RvdHNDbGFzczogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfc2xpZGVyQ2xhc3M6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2hhc0N1c3RvbUJ0bnM6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9mb2N1c2FibGU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2NoZWNrU2hvdWxkRW5hYmxlRGVib3VuY2VkOiBhbnk7XHJcbiAgICBwcml2YXRlIF91cGRhdGVIZWlnaHREZWJvdW5jZWQ6IGFueTtcclxuICAgIHByaXZhdGUgX3VwZGF0ZVNjcm9sbFBvc2l0aW9uOiBhbnk7XHJcbiAgICBwdWJsaWMgc2xpZGVyOiBIVE1MRWxlbWVudDtcclxuICAgIHB1YmxpYyBzbGlkZXM6IEhUTUxDb2xsZWN0aW9uT2Y8SFRNTEVsZW1lbnQ+O1xyXG4gICAgcHVibGljIGRvdHM6IEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICAgIHB1YmxpYyBhY3RpdmVTbGlkZTogSFRNTEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgdmlzaWJsZVNsaWRlczogSFRNTEVsZW1lbnRbXTtcclxuICAgIHB1YmxpYyBzbGlkZXJDb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gICAgcHVibGljIG9wdGlvbnM6IE9wdGlvbnM7XHJcbiAgICBwdWJsaWMgc2xpZGVyRW5hYmxlZDogU2xpZGVyU3RhdGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIG9wdGlvbnM/OiBPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMuc2xpZGVzID0gZWxlbWVudC5jaGlsZHJlbiBhcyBIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50PjtcclxuICAgICAgICB0aGlzLnNsaWRlckNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJzxkaXYgY2xhc3M9XCJhMTF5LXNsaWRlci1jb250YWluZXJcIj48L2Rpdj4nKTtcclxuICAgICAgICB0aGlzLl9hY3RpdmVDbGFzcyA9ICdhMTF5LXNsaWRlci1hY3RpdmUnO1xyXG4gICAgICAgIHRoaXMuX3Zpc2libGVDbGFzcyA9ICdhMTF5LXNsaWRlci12aXNpYmxlJztcclxuICAgICAgICB0aGlzLl9kb3RzQ2xhc3MgPSAnYTExeS1zbGlkZXItZG90cyc7XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyQ2xhc3MgPSAnYTExeS1zbGlkZXInO1xyXG4gICAgICAgIHRoaXMuX2ZvY3VzYWJsZSA9ICdhLCBhcmVhLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgYnV0dG9uLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsICpbdGFiaW5kZXhdLCAqW2NvbnRlbnRlZGl0YWJsZV0nO1xyXG4gICAgICAgIHRoaXMuZG90cyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTbGlkZSA9IHRoaXMuc2xpZGVzWzBdO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZVNsaWRlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyRW5hYmxlZCA9IFNsaWRlclN0YXRlLkRpc2FibGVkO1xyXG4gICAgICAgIHRoaXMuX2hhc0N1c3RvbUJ0bnMgPSBvcHRpb25zICYmIG9wdGlvbnMucHJldkJ0biB8fCBvcHRpb25zICYmIG9wdGlvbnMubmV4dEJ0biA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lcjogdHJ1ZSxcclxuICAgICAgICAgICAgbmF2QnRuczogdHJ1ZSxcclxuICAgICAgICAgICAgcHJldkJ0bjogb3B0aW9ucyAmJiBvcHRpb25zLnByZXZCdG4gfHwgY3JlYXRlRWxlbWVudCgnPGJ1dHRvbiBjbGFzcz1cImExMXktc2xpZGVyLXByZXZcIj5QcmV2aW91cyBzbGlkZTwvYnV0dG9uPicpLFxyXG4gICAgICAgICAgICBuZXh0QnRuOiBvcHRpb25zICYmIG9wdGlvbnMubmV4dEJ0biB8fCBjcmVhdGVFbGVtZW50KCc8YnV0dG9uIGNsYXNzPVwiYTExeS1zbGlkZXItbmV4dFwiPk5leHQgc2xpZGU8L2J1dHRvbj4nKSxcclxuICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBza2lwTGluazogdHJ1ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNldCB1c2VyLWlucHV0dGVkIG9wdGlvbnMgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBCaW5kaW5nXHJcbiAgICAgICAgdGhpcy5faGFuZGxlUHJldiA9IHRoaXMuX2hhbmRsZVByZXYuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLl9oYW5kbGVOZXh0ID0gdGhpcy5faGFuZGxlTmV4dC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2NoZWNrU2hvdWxkRW5hYmxlRGVib3VuY2VkID0gZGVib3VuY2UodGhpcy5fY2hlY2tTaG91bGRFbmFibGUuYmluZCh0aGlzKSwgMjUwKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVIZWlnaHREZWJvdW5jZWQgPSBkZWJvdW5jZSh0aGlzLl91cGRhdGVIZWlnaHQuYmluZCh0aGlzKSwgMjUwKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVTY3JvbGxQb3NpdGlvbiA9IGRlYm91bmNlKCgpID0+IHRoaXMuc2Nyb2xsVG9TbGlkZSh0aGlzLmFjdGl2ZVNsaWRlKSwgMjUwKTtcclxuICAgICAgICB0aGlzLl9oYW5kbGVTY3JvbGwgPSBkZWJvdW5jZSh0aGlzLl9oYW5kbGVTY3JvbGwuYmluZCh0aGlzKSwgMTUwKTsgLy8gTWF5IGZpcmUgdHdpY2UgZGVwZW5kaW5nIG9uIGJyb3dzZXJcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBzbGlkZXJcclxuICAgICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdCgpIHtcclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2xpZGVyIHNob3VsZCBiZSBpbml0aWFsaXplZCBkZXBlbmRpbmcgb24gc2xpZGVzIHNob3duXHJcbiAgICAgICAgdGhpcy5fY2hlY2tTaG91bGRFbmFibGUoKTtcclxuXHJcbiAgICAgICAgLy8gRW5hYmxlL2Rpc2FibGUgc2xpZGVyIGFmdGVyIHJlc2l6ZVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9jaGVja1Nob3VsZEVuYWJsZURlYm91bmNlZCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2luaXQnLCB7XHJcbiAgICAgICAgICAgIGExMXlTbGlkZXI6IHRoaXNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jaGVja1Nob3VsZEVuYWJsZSgpIHtcclxuICAgICAgICBsZXQgc2hvdWxkRW5hYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gSWYgMSBvciBsZXNzIHNsaWRlcyBleGlzdCB0aGVuIGEgc2xpZGVyIGlzIG5vdCBuZWVkZWRcclxuICAgICAgICBpZiAodGhpcy5zbGlkZXMubGVuZ3RoIDw9IDEpIHNob3VsZEVuYWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gc2xpZGVzIG91dHNpZGUgdGhlIHNsaWRlcidzIHZpZXdwb3J0IGEgc2xpZGVyIGlzIG5vdCBuZWVkZWRcclxuICAgICAgICB0aGlzLl9nZXRBY3RpdmVBbmRWaXNpYmxlKCh2aXNpYmxlU2xpZGVzOiBIVE1MRWxlbWVudFtdKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2aXNpYmxlU2xpZGVzLmxlbmd0aCA9PT0gdGhpcy5zbGlkZXMubGVuZ3RoKSBzaG91bGRFbmFibGUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRW5hYmxlL2Rpc2FibGUgc2xpZGVyIGJhc2VkIG9uIGFib3ZlIHJlcXVpcmVtZW50c1xyXG4gICAgICAgIGlmIChzaG91bGRFbmFibGUgJiYgdGhpcy5zbGlkZXJFbmFibGVkID09PSBTbGlkZXJTdGF0ZS5EaXNhYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmFibGVTbGlkZXIoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFzaG91bGRFbmFibGUgJiYgdGhpcy5zbGlkZXJFbmFibGVkID09PSBTbGlkZXJTdGF0ZS5FbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVTbGlkZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgIC8vIEVuYWJsZSBhbGwgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIHNsaWRlci4gU2hvdWxkIG1pcnJvciBfZGlzYWJsZVNsaWRlcigpXHJcbiAgICBwcml2YXRlIF9lbmFibGVTbGlkZXIoKSB7XHJcbiAgICAgICAgLy8gU2V0IHNsaWRlciB0byBlbmFibGVkXHJcbiAgICAgICAgdGhpcy5zbGlkZXJFbmFibGVkID0gU2xpZGVyU3RhdGUuRW5hYmxlZDtcclxuXHJcbiAgICAgICAgLy8gQWRkIHNsaWRlciBjb250YWluZXIgdG8gRE9NIGFuZCBtb3ZlIHNsaWRlciBpbnRvIGl0IGlmIGVuYWJsZWRcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgdGhpcy5zbGlkZXJDb250YWluZXIpO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlckNvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCB0aGlzLnNsaWRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiBwcmV2L25leHQgYnV0dG9ucyBhcmUgZW5hYmxlZCBhbmQgdXNlciBpc24ndCB1c2luZyB0aGVpciBvd24gYWRkIGl0IHRvIHRoZSBET01cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm5hdkJ0bnMgJiYgIXRoaXMuX2hhc0N1c3RvbUJ0bnMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wcmV2QnRuIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCB0aGlzLm9wdGlvbnMucHJldkJ0bik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubmV4dEJ0biBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgdGhpcy5vcHRpb25zLm5leHRCdG4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUT0RPOiBNb3ZlIGFkZC9yZW1vdmFsIG9mIGJ1dHRvbnMgaW50byBpdCdzIG93biBmdW5jdGlvblxyXG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHByZXYvbmV4dCBidXR0b25zLiBQb3NzaWJsZSBmb3IgdGhlcmUgdG8gYmUgbXVsdGlwbGUgc28gbmVlZCB0byBsb29wIHRocm91Z2ggdGhlbSBhbGxcclxuICAgICAgICBjb25zdCBwcmV2QnRucyA9IHRoaXMub3B0aW9ucy5wcmV2QnRuIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBbdGhpcy5vcHRpb25zLnByZXZCdG5dIDogdGhpcy5vcHRpb25zLnByZXZCdG47XHJcbiAgICAgICAgY29uc3QgbmV4dEJ0bnMgPSB0aGlzLm9wdGlvbnMubmV4dEJ0biBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID8gW3RoaXMub3B0aW9ucy5uZXh0QnRuXSA6IHRoaXMub3B0aW9ucy5uZXh0QnRuO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBwcmV2QnRuIG9mIHByZXZCdG5zKSB7XHJcbiAgICAgICAgICAgIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVQcmV2LCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLl9oYW5kbGVQcmV2LCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBuZXh0QnRuIG9mIG5leHRCdG5zKSB7XHJcbiAgICAgICAgICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVOZXh0LCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLl9oYW5kbGVOZXh0LCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgZG90IG5hdmlnYXRpb24gaWYgZW5hYmxlZFxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZG90cykgdGhpcy5fZ2VuZXJhdGVEb3RzKCk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBsaXN0ZW5lciBmb3Igd2hlbiB0aGUgc2xpZGVyIHN0b3BzIG1vdmluZ1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2hhbmRsZVNjcm9sbCwgZmFsc2UpO1xyXG5cclxuICAgICAgICAvLyBBZGQgYWxsIENTUyBuZWVkZWRcclxuICAgICAgICB0aGlzLl9zZXRDU1MoKTtcclxuXHJcbiAgICAgICAgLy8gQWRhcHRpdmUgaGVpZ2h0XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgc2xpZGVyJ3MgaGVpZ2h0IGJhc2VkIG9uIGNvbnRlbnQgb2Ygc2xpZGVcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlSGVpZ2h0KHRoaXMuYWN0aXZlU2xpZGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWxzbyBhZGQgcmVzaXplIGxpc3RlbmVyIGZvciBpdFxyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fdXBkYXRlSGVpZ2h0RGVib3VuY2VkLmJpbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT24gcmVzaXplIG1ha2Ugc3VyZSB0byB1cGRhdGUgc2Nyb2xsIHBvc2l0aW9uIGFzIGNvbnRlbnQgbWF5IGNoYW5nZSBpbiB3aWR0aC9oZWlnaHRcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fdXBkYXRlU2Nyb2xsUG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERpc2FibGUgYWxsIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBzbGlkZXIuIFNob3VsZCBtaXJyb3IgX2VuYWJsZVNsaWRlcigpXHJcbiAgICBwcml2YXRlIF9kaXNhYmxlU2xpZGVyKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVyRW5hYmxlZCA9IFNsaWRlclN0YXRlLkRpc2FibGVkO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgc2xpZGVyIGZyb20gYTExeS1zbGlkZXIncyBjb250YWluZXIgYW5kIHRoZW4gcmVtb3ZlIGNvbnRhaW5lciBmcm9tIERPTVxyXG4gICAgICAgIGlmIChkb2N1bWVudC5ib2R5LmNvbnRhaW5zKHRoaXMuc2xpZGVyQ29udGFpbmVyKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlckNvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgdGhpcy5zbGlkZXIpO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlckNvbnRhaW5lci5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZCh0aGlzLnNsaWRlckNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzIGZvciBwcmV2L25leHQgYnV0dG9uc1xyXG4gICAgICAgIC8vIFBvc3NpYmxlIGZvciB0aGVyZSB0byBiZSBtdWx0aXBsZSBzbyBuZWVkIHRvIGxvb3AgdGhyb3VnaCB0aGVtIGFsbFxyXG4gICAgICAgIGNvbnN0IHByZXZCdG5zID0gdGhpcy5vcHRpb25zLnByZXZCdG4gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA/IFt0aGlzLm9wdGlvbnMucHJldkJ0bl0gOiB0aGlzLm9wdGlvbnMucHJldkJ0bjtcclxuICAgICAgICBjb25zdCBuZXh0QnRucyA9IHRoaXMub3B0aW9ucy5uZXh0QnRuIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBbdGhpcy5vcHRpb25zLm5leHRCdG5dIDogdGhpcy5vcHRpb25zLm5leHRCdG47XHJcblxyXG4gICAgICAgIGZvciAobGV0IHByZXZCdG4gb2YgcHJldkJ0bnMpIHtcclxuICAgICAgICAgICAgcHJldkJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZVByZXYpO1xyXG4gICAgICAgICAgICBwcmV2QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5faGFuZGxlUHJldik7XHJcblxyXG4gICAgICAgICAgICAvLyBPbmx5IHJlbW92ZSBnZW5lcmF0ZWQgYnV0dG9ucywgbm90IHVzZXItZGVmaW5lZCBvbmVzXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5faGFzQ3VzdG9tQnRucykgcHJldkJ0bi5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZChwcmV2QnRuKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IG5leHRCdG4gb2YgbmV4dEJ0bnMpIHtcclxuICAgICAgICAgICAgbmV4dEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZU5leHQpO1xyXG4gICAgICAgICAgICBuZXh0QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5faGFuZGxlTmV4dCk7XHJcblxyXG4gICAgICAgICAgICAvLyBPbmx5IHJlbW92ZSBnZW5lcmF0ZWQgYnV0dG9ucywgbm90IHVzZXItZGVmaW5lZCBvbmVzXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5faGFzQ3VzdG9tQnRucykgbmV4dEJ0bi5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZChuZXh0QnRuKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFdpbGwgcmVtb3ZlIGRvdHMgaWYgdGhleSBleGlzdFxyXG4gICAgICAgIHRoaXMuX3JlbW92ZURvdHMoKTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGxpc3RlbmVyIGZvciB3aGVuIHRoZSBzbGlkZXIgc3RvcHMgbW92aW5nXHJcbiAgICAgICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5faGFuZGxlU2Nyb2xsLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgQ1NTXHJcbiAgICAgICAgdGhpcy5fcmVtb3ZlQ1NTKCk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgYWRhcHRpdmUgaGVpZ2h0IGZ1bmN0aW9uYWxpdHlcclxuICAgICAgICB0aGlzLl91cGRhdGVIZWlnaHQoZmFsc2UpO1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl91cGRhdGVIZWlnaHREZWJvdW5jZWQpO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgc2Nyb2xsIHBvc2l0aW9uIHVwZGF0ZSBjaGVja1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl91cGRhdGVTY3JvbGxQb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIGFsbCBDU1MgbmVlZGVkIGZvciB0aGUgc2xpZGVyLiBTaG91bGQgbWlycm9yIF9yZW1vdmVDU1MoKVxyXG4gICAgcHJpdmF0ZSBfc2V0Q1NTKCkge1xyXG4gICAgICAgIC8vIFVwZGF0ZSBzbGlkZXIgaW5zdGFuY2UgdG8gZ2V0IHRoZSBjb3JyZWN0IGVsZW1lbnRzXHJcbiAgICAgICAgdGhpcy5fZ2V0QWN0aXZlQW5kVmlzaWJsZSgpO1xyXG5cclxuICAgICAgICAvLyBBZGQgbWFpbiBzbGlkZXIgY2xhc3MgaWYgaXQgZG9lc24ndCBoYXZlIGl0IGFscmVhZHlcclxuICAgICAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QuYWRkKHRoaXMuX3NsaWRlckNsYXNzKTtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgdGhlIG1vcmUgZHluYW1pYyBDU1MgZmlyc3QgaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgZm9yIChsZXQgc2xpZGUgb2YgdGhpcy5zbGlkZXMpIHtcclxuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9hY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fdmlzaWJsZUNsYXNzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBpbiBhY3RpdmUgY2xhc3Nlc1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU2xpZGUuY2xhc3NMaXN0LmFkZCh0aGlzLl9hY3RpdmVDbGFzcyk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBpbiB2aXNpYmxlIGNsYXNzZXNcclxuICAgICAgICBmb3IgKGxldCBzbGlkZSBvZiB0aGlzLnZpc2libGVTbGlkZXMpIHtcclxuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZCh0aGlzLl92aXNpYmxlQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVHJpZ2dlciBkb3QgdXBkYXRlXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlRG90cyh0aGlzLmFjdGl2ZVNsaWRlKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIGFsbCBhMTF5IGZ1bmN0aW9uYWxpdHlcclxuICAgICAgICB0aGlzLl9hZGRBMTFZKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIGFsbCBDU1MgbmVlZGVkIGZvciB0aGUgc2xpZGVyLiBTaG91bGQgbWlycm9yIF9zZXRDU1MoKVxyXG4gICAgcHJpdmF0ZSBfcmVtb3ZlQ1NTKCkge1xyXG4gICAgICAgIC8vIFJlbW92ZSBjbGFzcyB0byBzbGlkZXJcclxuICAgICAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3NsaWRlckNsYXNzKTtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgYWxsIHRoZSBkeW5hbWljIGNsYXNzZXNcclxuICAgICAgICBmb3IgKGxldCBzbGlkZSBvZiB0aGlzLnNsaWRlcykge1xyXG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2FjdGl2ZUNsYXNzKTtcclxuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl92aXNpYmxlQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBhMTF5IGZ1bmN0aW9uYWxpdHlcclxuICAgICAgICB0aGlzLl9yZW1vdmVBMTFZKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTWFrZXMgb25seSB0aGUgdmlzaWJsZSBpdGVtcyBmb2N1c2FibGUgYW5kIHJlYWRhYmxlIGJ5IHNjcmVlbnJlYWRlcnMuIFNob3VsZCBtaXJyb3IgX3JlbW92ZUExMVkoKVxyXG4gICAgcHJpdmF0ZSBfYWRkQTExWSgpIHtcclxuICAgICAgICAvLyBSZXNldCBhbGwgYTExeSBmdW5jdGlvbmFsaXR5IHRvIGRlZmF1bHQgYmVmb3JlaGFuZFxyXG4gICAgICAgIHRoaXMuX3JlbW92ZUExMVkoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgc2xpZGUgb2YgdGhpcy5zbGlkZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgZm9jdXNhYmxlSXRlbXMgPSBzbGlkZS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2ZvY3VzYWJsZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBzbGlkZSBpcyBub3QgdmlzaWJsZSBtYWtlIHRoZSBzbGlkZSB3cmFwcGVyIG5vdCBmb2N1c2FibGVcclxuICAgICAgICAgICAgaWYgKCFzbGlkZS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5fdmlzaWJsZUNsYXNzKSkge1xyXG4gICAgICAgICAgICAgICAgc2xpZGUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xyXG4gICAgICAgICAgICAgICAgc2xpZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGZvY3VzYWJsZUl0ZW0gb2YgZm9jdXNhYmxlSXRlbXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICghc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuX3Zpc2libGVDbGFzcykpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVJdGVtLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXNldCBhMTF5IGF0dHJpYnV0ZXMgZm9yIHNsaWRlIHdyYXBwZXIuIFNob3VsZCBtaXJyb3IgX2FkZEExMVkoKVxyXG4gICAgcHJpdmF0ZSBfcmVtb3ZlQTExWSgpIHtcclxuICAgICAgICBmb3IgKGxldCBzbGlkZSBvZiB0aGlzLnNsaWRlcykge1xyXG4gICAgICAgICAgICBjb25zdCBmb2N1c2FibGVJdGVtcyA9IHNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fZm9jdXNhYmxlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhMTF5IGZvciBlYWNoIHNsaWRlIHdyYXBwZXJcclxuICAgICAgICAgICAgc2xpZGUucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xyXG4gICAgICAgICAgICBzbGlkZS5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXNldCBhMTF5IGF0dHJpYnV0ZXMgZm9yIHNsaWRlIGlubmVyIGVsZW1lbnRzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGZvY3VzYWJsZUl0ZW0gb2YgZm9jdXNhYmxlSXRlbXMpIHtcclxuICAgICAgICAgICAgICAgIGZvY3VzYWJsZUl0ZW0ucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dlbmVyYXRlRG90cygpIHtcclxuICAgICAgICB0aGlzLmRvdHMgPSBjcmVhdGVFbGVtZW50KGA8dWwgY2xhc3M9XCIke3RoaXMuX2RvdHNDbGFzc31cIj48L3VsPmApO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2xpZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRvdExpID0gY3JlYXRlRWxlbWVudCgnPGxpPjwvbGk+Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRvdEJ0biA9IGNyZWF0ZUVsZW1lbnQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiPjwvYnV0dG9uPicpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHRleHRcclxuICAgICAgICAgICAgZG90QnRuLnRleHRDb250ZW50ID0gYE1vdmUgc2xpZGVyIHRvIGl0ZW0gIyR7aSArIDF9YDtcclxuXHJcbiAgICAgICAgICAgIC8vIEV2ZW50IGhhbmRsZXJzIHRvIHN3aXRjaCB0byBzbGlkZVxyXG4gICAgICAgICAgICBjb25zdCBzd2l0Y2hUb1NsaWRlID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGExMXlDbGljayhldmVudCkgPT09IHRydWUpIHRoaXMuc2Nyb2xsVG9TbGlkZSh0aGlzLnNsaWRlc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lcnNcclxuICAgICAgICAgICAgZG90QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3dpdGNoVG9TbGlkZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICBkb3RCdG4uYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBzd2l0Y2hUb1NsaWRlLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBcHBlbmQgdG8gVUxcclxuICAgICAgICAgICAgZG90TGkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBkb3RCdG4pO1xyXG4gICAgICAgICAgICB0aGlzLmRvdHMuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBkb3RMaSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zbGlkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIHRoaXMuZG90cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcmVtb3ZlRG90cygpIHtcclxuICAgICAgICBpZiAodGhpcy5kb3RzIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5kb3RzLnBhcmVudE5vZGUhLnJlbW92ZUNoaWxkKHRoaXMuZG90cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3VwZGF0ZURvdHMoYWN0aXZlU2xpZGU6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG90cyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChhY3RpdmVTbGlkZS5wYXJlbnROb2RlIS5jaGlsZHJlbiwgYWN0aXZlU2xpZGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVzZXQgY2hpbGRyZW4gYWN0aXZlIGNsYXNzIGlmIGV4aXN0XHJcbiAgICAgICAgICAgIGZvciAobGV0IGRvdCBvZiB0aGlzLmRvdHMuY2hpbGRyZW4pIGRvdC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKSEuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgY2xhc3MgdG8gYWN0aXZlIGRvdFxyXG4gICAgICAgICAgICB0aGlzLmRvdHMuY2hpbGRyZW5bYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpIS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ29QcmV2T3JOZXh0KGRpcmVjdGlvbjogU2xpZGVEaXJlY3Rpb24pIHtcclxuICAgICAgICB0aGlzLl9nZXRBY3RpdmVBbmRWaXNpYmxlKCh2aXNpYmxlU2xpZGVzOiBIVE1MRWxlbWVudFtdLCBhY3RpdmVTbGlkZTogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3RTbGlkZSA9IHRoaXMuc2xpZGVyLmZpcnN0RWxlbWVudENoaWxkIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICBjb25zdCBsYXN0U2xpZGUgPSB0aGlzLnNsaWRlci5sYXN0RWxlbWVudENoaWxkIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICBjb25zdCBmaXJzdFZpc2libGVTbGlkZSA9IHZpc2libGVTbGlkZXNbMF07XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3RWaXNpYmxlU2xpZGUgPSB2aXNpYmxlU2xpZGVzW3Zpc2libGVTbGlkZXMubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBTbGlkZURpcmVjdGlvbi5OZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBXcmFwIHRvIHRoZSBmaXJzdCBzbGlkZSBpZiB3ZSdyZSBjdXJyZW50bHkgb24gdGhlIGxhc3RcclxuICAgICAgICAgICAgICAgIGlmIChsYXN0VmlzaWJsZVNsaWRlID09PSBsYXN0U2xpZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvU2xpZGUoZmlyc3RTbGlkZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9TbGlkZShhY3RpdmVTbGlkZSEubmV4dEVsZW1lbnRTaWJsaW5nIGFzIEhUTUxFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFNsaWRlRGlyZWN0aW9uLlByZXYpIHtcclxuICAgICAgICAgICAgICAgIC8vIFdyYXAgdG8gdGhlIGxhc3Qgc2xpZGUgaWYgd2UncmUgY3VycmVudGx5IG9uIHRoZSBmaXJzdFxyXG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0VmlzaWJsZVNsaWRlID09PSBmaXJzdFNsaWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb1NsaWRlKGxhc3RTbGlkZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9TbGlkZShhY3RpdmVTbGlkZSEucHJldmlvdXNFbGVtZW50U2libGluZyBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2Nyb2xsVG9TbGlkZSh0YXJnZXRTbGlkZTogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBtb2Rlcm5Ccm93c2VyOiBib29sZWFuID0gISFIVE1MRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsVG87XHJcblxyXG4gICAgICAgIC8vIERpc3BhdGNoIGN1c3RvbSBldmVudFxyXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2JlZm9yZUNoYW5nZScsIHtcclxuICAgICAgICAgICAgY3VycmVudFNsaWRlOiB0aGlzLmFjdGl2ZVNsaWRlLFxyXG4gICAgICAgICAgICBuZXh0U2xpZGU6IHRhcmdldFNsaWRlLFxyXG4gICAgICAgICAgICBhMTF5U2xpZGVyOiB0aGlzXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSBzbGlkZXIncyBoZWlnaHQgYmFzZWQgb24gY29udGVudCBvZiBzbGlkZVxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQgPT09IHRydWUpIHRoaXMuX3VwZGF0ZUhlaWdodCh0YXJnZXRTbGlkZSk7XHJcblxyXG4gICAgICAgIC8vIE1vdmUgc2xpZGVyIHRvIHNwZWNpZmljIGl0ZW1cclxuICAgICAgICBpZiAobW9kZXJuQnJvd3Nlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5zY3JvbGwoe1xyXG4gICAgICAgICAgICAgICAgbGVmdDogdGFyZ2V0U2xpZGUub2Zmc2V0TGVmdCxcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5zY3JvbGxMZWZ0ID0gdGFyZ2V0U2xpZGUub2Zmc2V0TGVmdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRyaWdnZXIgZG90IHVwZGF0ZVxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZURvdHModGFyZ2V0U2xpZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgZWxlbWVudCBpcyBwYXNzZWQgc2xpZGVyJ3MgaGVpZ2h0IHdpbGwgbWF0Y2hcclxuICAgICAqICBpdCBvdGhlcndpc2UgdGhlIGhlaWdodCBvZiB0aGUgc2xpZGVyIGlzIHJlbW92ZWQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3VwZGF0ZUhlaWdodCh0YXJnZXQ6IEhUTUxFbGVtZW50IHwgZmFsc2UpIHtcclxuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0SGVpZ2h0ID0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gYCR7dGFyZ2V0SGVpZ2h0fXB4YDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5zdHlsZS5oZWlnaHQgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0QWN0aXZlQW5kVmlzaWJsZShjYWxsYmFjaz86IEFjdGl2ZVZpc2libGVTbGlkZXMpIHtcclxuICAgICAgICBsZXQgdmlzaWJsZVNsaWRlczogSFRNTEVsZW1lbnRbXSA9IFtdO1xyXG5cclxuICAgICAgICAvLyBPbmx5IGRldGVjdHMgaXRlbXMgaW4gdGhlIHZpc2libGUgdmlld3BvcnQgb2YgdGhlIHBhcmVudCBlbGVtZW50XHJcbiAgICAgICAgZm9yIChsZXQgc2xpZGUgb2YgdGhpcy5zbGlkZXMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xpZGVyV2lkdGggPSB0aGlzLnNsaWRlci5jbGllbnRXaWR0aDtcclxuICAgICAgICAgICAgY29uc3Qgc2xpZGVyUG9zaXRpb24gPSB0aGlzLnNsaWRlci5zY3JvbGxMZWZ0O1xyXG4gICAgICAgICAgICBjb25zdCBzbGlkZU9mZnNldCA9IHNsaWRlLm9mZnNldExlZnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2xpZGVPZmZzZXQgPj0gc2xpZGVyUG9zaXRpb24gJiYgc2xpZGVPZmZzZXQgPCAoc2xpZGVyUG9zaXRpb24gKyBzbGlkZXJXaWR0aCkpIHtcclxuICAgICAgICAgICAgICAgIHZpc2libGVTbGlkZXMucHVzaChzbGlkZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudmlzaWJsZVNsaWRlcyA9IHZpc2libGVTbGlkZXM7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTbGlkZSA9IHZpc2libGVTbGlkZXNbMF07XHJcblxyXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHRoaXMudmlzaWJsZVNsaWRlcywgdGhpcy5hY3RpdmVTbGlkZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaGFuZGxlUHJldihldmVudDogRXZlbnQpIHtcclxuICAgICAgICBpZiAoYTExeUNsaWNrKGV2ZW50KSA9PT0gdHJ1ZSkgdGhpcy5fZ29QcmV2T3JOZXh0KFNsaWRlRGlyZWN0aW9uLlByZXYpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2hhbmRsZU5leHQoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGExMXlDbGljayhldmVudCkgPT09IHRydWUpIHRoaXMuX2dvUHJldk9yTmV4dChTbGlkZURpcmVjdGlvbi5OZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9oYW5kbGVTY3JvbGwoKSB7XHJcbiAgICAgICAgLy8gVXBkYXRlIENTU1xyXG4gICAgICAgIHRoaXMuX3NldENTUygpO1xyXG5cclxuICAgICAgICAvLyBEaXNwYXRjaCBjdXN0b20gZXZlbnRcclxuICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdhZnRlckNoYW5nZScsIHtcclxuICAgICAgICAgICAgY3VycmVudFNsaWRlOiB0aGlzLmFjdGl2ZVNsaWRlLFxyXG4gICAgICAgICAgICBhMTF5U2xpZGVyOiB0aGlzXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGlzcGF0Y2hFdmVudChldmVudE5hbWU6IHN0cmluZywgZGV0YWlsOiBvYmplY3QpIHtcclxuICAgICAgICBjb25zdCBldmVudCA9IGNyb3NzQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCB7IGRldGFpbCB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zbGlkZXIuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOdWtlIHRoZSBzbGlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy8gVW5kb3MgZXZlcnl0aGluZyBmcm9tIF9lbmFibGVTbGlkZXIoKVxyXG4gICAgICAgIHRoaXMuX2Rpc2FibGVTbGlkZXIoKTtcclxuXHJcbiAgICAgICAgLy8gVW5kb3MgZXZlcnl0aGluZyBmcm9tIGluaXQoKVxyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9jaGVja1Nob3VsZEVuYWJsZURlYm91bmNlZCk7XHJcblxyXG4gICAgICAgIC8vIERpc3BhdGNoIGN1c3RvbSBldmVudFxyXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2Rlc3Ryb3knLCB7XHJcbiAgICAgICAgICAgIGExMXlTbGlkZXI6IHRoaXNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdLCJuYW1lcyI6WyJnbG9iYWwiLCJyZXF1aXJlJCQwIiwiZG9jdW1lbnQiLCJERVNDUklQVE9SUyIsImNyZWF0ZUVsZW1lbnQiLCJJRThfRE9NX0RFRklORSIsImRlZmluZVByb3BlcnR5TW9kdWxlIiwiU3ltYm9sIiwiTkFUSVZFX1NZTUJPTCIsIndyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUiLCJjbGFzc29mIiwiSW5kZXhlZE9iamVjdCIsInByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlIiwibmF0aXZlRnVuY3Rpb25Ub1N0cmluZyIsIldlYWtNYXAiLCJoYXMiLCJOQVRJVkVfV0VBS19NQVAiLCJzdG9yZSIsIm9iamVjdEhhcyIsIkludGVybmFsU3RhdGVNb2R1bGUiLCJtaW4iLCJoaWRkZW5LZXlzIiwiaW50ZXJuYWxPYmplY3RLZXlzIiwiZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSIsImdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImlzRm9yY2VkIiwiJCIsImFzc2lnbiIsImNyZWF0ZU1ldGhvZCIsIkNPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiIsImdldFByb3RvdHlwZU9mIiwiSUVfUFJPVE8iLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZGVmaW5lUHJvcGVydHkiLCJJdGVyYXRvclByb3RvdHlwZSIsImNyZWF0ZSIsIkl0ZXJhdG9yc0NvcmUiLCJCVUdHWV9TQUZBUklfSVRFUkFUT1JTIiwiSVRFUkFUT1IiLCJyZXR1cm5UaGlzIiwic2V0UHJvdG90eXBlT2YiLCJzZXRJbnRlcm5hbFN0YXRlIiwiZ2V0SW50ZXJuYWxTdGF0ZSIsIlRPX1NUUklOR19UQUciLCJBcnJheUl0ZXJhdG9yTWV0aG9kcyIsIkRPTUl0ZXJhYmxlcyIsImh0bWwiLCJET01QYXJzZXIiLCJwYXJzZUZyb21TdHJpbmciLCJib2R5IiwiZmlyc3RDaGlsZCIsImExMXlDbGljayIsImV2ZW50IiwiY29kZSIsImNoYXJDb2RlIiwia2V5Q29kZSIsInR5cGUiLCJwcmV2ZW50RGVmYXVsdCIsImNyb3NzQ3VzdG9tRXZlbnQiLCJwYXJhbXMiLCJldnQiLCJjcmVhdGVFdmVudCIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiZGV0YWlsIiwidW5kZWZpbmVkIiwiaW5pdEN1c3RvbUV2ZW50IiwiU2xpZGVEaXJlY3Rpb24iLCJTbGlkZXJTdGF0ZSIsIkExMVlTbGlkZXIiLCJlbGVtZW50Iiwib3B0aW9ucyIsInNsaWRlciIsInNsaWRlcyIsImNoaWxkcmVuIiwic2xpZGVyQ29udGFpbmVyIiwiX2FjdGl2ZUNsYXNzIiwiX3Zpc2libGVDbGFzcyIsIl9kb3RzQ2xhc3MiLCJfc2xpZGVyQ2xhc3MiLCJfZm9jdXNhYmxlIiwiZG90cyIsImFjdGl2ZVNsaWRlIiwidmlzaWJsZVNsaWRlcyIsInNsaWRlckVuYWJsZWQiLCJEaXNhYmxlZCIsIl9oYXNDdXN0b21CdG5zIiwicHJldkJ0biIsIm5leHRCdG4iLCJjb250YWluZXIiLCJuYXZCdG5zIiwiYWRhcHRpdmVIZWlnaHQiLCJza2lwTGluayIsIk9iamVjdCIsIl9oYW5kbGVQcmV2IiwiYmluZCIsIl9oYW5kbGVOZXh0IiwiX2NoZWNrU2hvdWxkRW5hYmxlRGVib3VuY2VkIiwiZGVib3VuY2UiLCJfY2hlY2tTaG91bGRFbmFibGUiLCJfdXBkYXRlSGVpZ2h0RGVib3VuY2VkIiwiX3VwZGF0ZUhlaWdodCIsIl91cGRhdGVTY3JvbGxQb3NpdGlvbiIsInNjcm9sbFRvU2xpZGUiLCJfaGFuZGxlU2Nyb2xsIiwiX2luaXQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiX2Rpc3BhdGNoRXZlbnQiLCJhMTF5U2xpZGVyIiwic2hvdWxkRW5hYmxlIiwibGVuZ3RoIiwiX2dldEFjdGl2ZUFuZFZpc2libGUiLCJfZW5hYmxlU2xpZGVyIiwiRW5hYmxlZCIsIl9kaXNhYmxlU2xpZGVyIiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwiSFRNTEVsZW1lbnQiLCJwcmV2QnRucyIsIm5leHRCdG5zIiwicGFzc2l2ZSIsIl9nZW5lcmF0ZURvdHMiLCJfc2V0Q1NTIiwiY29udGFpbnMiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiX3JlbW92ZURvdHMiLCJfcmVtb3ZlQ1NTIiwiY2xhc3NMaXN0IiwiYWRkIiwic2xpZGUiLCJyZW1vdmUiLCJfdXBkYXRlRG90cyIsIl9hZGRBMTFZIiwiX3JlbW92ZUExMVkiLCJmb2N1c2FibGVJdGVtcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzZXRBdHRyaWJ1dGUiLCJmb2N1c2FibGVJdGVtIiwicmVtb3ZlQXR0cmlidXRlIiwiaSIsImRvdExpIiwiZG90QnRuIiwidGV4dENvbnRlbnQiLCJzd2l0Y2hUb1NsaWRlIiwiYWN0aXZlSW5kZXgiLCJBcnJheSIsInByb3RvdHlwZSIsImluZGV4T2YiLCJjYWxsIiwiZG90IiwicXVlcnlTZWxlY3RvciIsImRpcmVjdGlvbiIsImZpcnN0U2xpZGUiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImxhc3RTbGlkZSIsImxhc3RFbGVtZW50Q2hpbGQiLCJmaXJzdFZpc2libGVTbGlkZSIsImxhc3RWaXNpYmxlU2xpZGUiLCJOZXh0IiwibmV4dEVsZW1lbnRTaWJsaW5nIiwiUHJldiIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJ0YXJnZXRTbGlkZSIsIm1vZGVybkJyb3dzZXIiLCJzY3JvbGxUbyIsImN1cnJlbnRTbGlkZSIsIm5leHRTbGlkZSIsInNjcm9sbCIsImxlZnQiLCJvZmZzZXRMZWZ0IiwiYmVoYXZpb3IiLCJzY3JvbGxMZWZ0IiwidGFyZ2V0IiwidGFyZ2V0SGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0Iiwic3R5bGUiLCJoZWlnaHQiLCJjYWxsYmFjayIsInNsaWRlcldpZHRoIiwiY2xpZW50V2lkdGgiLCJzbGlkZXJQb3NpdGlvbiIsInNsaWRlT2Zmc2V0IiwicHVzaCIsIl9nb1ByZXZPck5leHQiLCJldmVudE5hbWUiLCJkaXNwYXRjaEV2ZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQztBQUNqQixJQUFJLEtBQUssR0FBRyxVQUFVLEVBQUUsRUFBRTtFQUN4QixPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7Q0FDcEMsQ0FBQzs7O0FBR0YsWUFBYzs7RUFFWixLQUFLLENBQUMsT0FBTyxVQUFVLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQztFQUMzQyxLQUFLLENBQUMsT0FBTyxNQUFNLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQztFQUNuQyxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQztFQUMvQixLQUFLLENBQUMsT0FBT0EsY0FBTSxJQUFJLENBQUMsSUFBSUEsY0FBTSxDQUFDOztFQUVuQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQzs7QUNiNUIsUUFBYyxHQUFHQyxRQUE4QixDQUFDOztBQ0FoRCxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDOztBQUV2QyxPQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUUsR0FBRyxFQUFFO0VBQ2xDLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDckMsQ0FBQzs7QUNKRixTQUFjLEdBQUcsVUFBVSxJQUFJLEVBQUU7RUFDL0IsSUFBSTtJQUNGLE9BQU8s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
