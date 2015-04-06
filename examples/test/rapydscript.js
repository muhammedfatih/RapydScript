function range(start, stop, step) {
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    step = arguments[2] || 1;
    var length = Math.max (Math.ceil ((stop - start) / step) , 0);
    var idx = 0;
    var range = new Array(length);
    while (idx < length) {
        range[idx++] = start;
        start += step;
    }
    return range;
}
function _$rapyd$_in(val, arr) {
    if (arr instanceof Array || typeof arr === "string") return arr.indexOf(val) != -1;
    else {
        if (arr.hasOwnProperty(val)) return true;
        return false;
    }
}
function dir(item) {
    var arr = [];
    for (var i in item) {
        arr.push(i);
    }
    return arr;
}
function _$rapyd$_extends(child, parent) {
    child.prototype = new parent;
    child.prototype.constructor = child;
}
function enumerate(item) {
    var arr = [];
    for (var i = 0; i < item.length; i++) {
        arr[arr.length] = [i, item[i]];
    }
    return arr;
}
function len(obj) {
    if (obj instanceof Array || typeof obj === "string") return obj.length;
    else {
        var count = 0;
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) count++;
        }
        return count;
    }
}
function _$rapyd$_print() {
    var args, output;
    args = [].slice.call(arguments, 0);
    output = JSON.stringify(args);
    if ("console" in window) console.log(output.substr(1, output.length-2));
}
JSON = JSON || {};
if (!JSON.stringify) {
    
    JSON.stringify = function(obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string")
                obj = '"' + obj + '"';
            if (t == "function")
                return; // return undefined
            else
                return String(obj);
        } else {
            // recurse array or object
            var n, v, json = []
            var arr = (obj && obj.constructor == Array);
            for (n in obj) {
                v = obj[n];
                t = typeof (v);
                if (t != "function" && t != "undefined") {
                    if (t == "string")
                        v = '"' + v + '"';
                    else if ((t == "object" || t == "function") && v !== null)
                        v = JSON.stringify(v);
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    };
    ;
}
str = JSON.stringify;
function kwargs(f) {
    var argNames;
    argNames = f.toString().match(/\(([^\)]+)/)[1];
    argNames = argNames ? argNames.split(",").map(function(s) {
        return s.trim();
    }) : [];
    return function() {
        var args, kw, i;
        args = [].slice.call(arguments);
        if (args.length) {
            kw = args.pop();
            if (typeof kw === "object") {
                for (i = 0; i < argNames.length; i++) {
                    if (_$rapyd$_in(argNames[i], dir(kw))) {
                        args[i] = kw[argNames[i]];
                    }
                }
            } else {
                args.push(kw);
            }
        }
        return f.apply(this, args);
    };
}
function IndexError() {
    IndexError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(IndexError, Error);
IndexError.prototype.__init__ = function __init__(message){
    var self = this;
    if (typeof message === "undefined") message = "list index out of range";
    self.name = "IndexError";
    self.message = message;
};

function TypeError() {
    TypeError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(TypeError, Error);
TypeError.prototype.__init__ = function __init__(message){
    var self = this;
    self.name = "TypeError";
    self.message = message;
};

function ValueError() {
    ValueError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(ValueError, Error);
ValueError.prototype.__init__ = function __init__(message){
    var self = this;
    self.name = "ValueError";
    self.message = message;
};

function AssertionError() {
    AssertionError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(AssertionError, Error);
AssertionError.prototype.__init__ = function __init__(message){
    var self = this;
    if (typeof message === "undefined") message = "";
    self.name = "AssertionError";
    self.message = message;
};

if (!Array.prototype.map) {
    
	Array.prototype.map = function(callback, thisArg) {
		var T, A, k;
		if (this == null) {
			throw new TypeError(" this is null or not defined");
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if ({}.toString.call(callback) != "[object Function]") {
			throw new TypeError(callback + " is not a function");
		}
		if (thisArg) {
			T = thisArg;
		}
		A = new Array(len);
		for (var k = 0; k < len; k++) {
			var kValue, mappedValue;
			if (k in O) {
				kValue = O[k];
				mappedValue = callback.call(T, kValue);
				A[k] = mappedValue;
			}
		}
		return A;
	};
	;
}
function map(oper, arr) {
    return list(arr.map(oper));
}
if (!Array.prototype.filter) {
    
	Array.prototype.filter = function(filterfun, thisArg) {
		"use strict";
		if (this == null) {
			throw new TypeError(" this is null or not defined");
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if ({}.toString.call(filterfun) != "[object Function]") {
			throw new TypeError(filterfun + " is not a function");
		}
		if (thisArg) {
			T = thisArg;
		}
		var A = [];
		var thisp = arguments[1];
		for (var k = 0; k < len; k++) {
			if (k in O) {
				var val = O[k]; // in case fun mutates this
				if (filterfun.call(T, val))
					A.push(val);
			}
		}
		return A;
	};
	;
}
function filter(oper, arr) {
    return list(arr.filter(oper));
}
function sum(arr, start) {
    if (typeof start === "undefined") start = 0;
    return arr.reduce(function(prev, cur) {
        return prev + cur;
    }, start);
}
function deep_eq(a, b) {
    var i;
    "\n    Equality comparison that works with all data types, returns true if structure and\n    contents of first object equal to those of second object\n\n    Arguments:\n        a: first object\n        b: second object\n    ";
    if (a === b) {
        return true;
    }
    if (a instanceof Array && b instanceof Array || a instanceof Object && b instanceof Object) {
        if (a.constructor !== b.constructor || a.length !== b.length) {
            return false;
        }
        var _$rapyd$_Iter0 = dict.keys(a);
        for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
            i = _$rapyd$_Iter0[_$rapyd$_Index0];
            if (b.hasOwnProperty(i)) {
                if (!deep_eq(a[i], b[i])) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    }
    return false;
}
String.prototype.find = String.prototype.indexOf;
String.prototype.strip = String.prototype.trim;
String.prototype.lstrip = String.prototype.trimLeft;
String.prototype.rstrip = String.prototype.trimRight;
String.prototype.join = function(iterable) {
    return iterable.join(this);
};
String.prototype.zfill = function(size) {
    var s;
    s = this;
    while (s.length < size) {
        s = "0" + s;
    }
    return s;
};
function list(iterable) {
    if (typeof iterable === "undefined") iterable = [];
    var result, i;
    result = [];
    var _$rapyd$_Iter1 = iterable;
    for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
        i = _$rapyd$_Iter1[_$rapyd$_Index1];
        result.append(i);
    }
    return result;
}
Array.prototype.append = Array.prototype.push;
Array.prototype.find = Array.prototype.indexOf;
Array.prototype.index = function(index) {
    var val;
    val = this.find(index);
    if (val === -1) {
        throw new ValueError(str(index) + " is not in list");
    }
    return val;
};
Array.prototype.insert = function(index, item) {
    this.splice(index, 0, item);
};
Array.prototype.pop = function(index) {
    if (typeof index === "undefined") index = this.length - 1;
    return this.splice(index, 1)[0];
};
Array.prototype.extend = function(array2) {
    this.push.apply(this, array2);
};
Array.prototype.remove = function(item) {
    var index;
    index = this.find(item);
    this.splice(index, 1);
};
Array.prototype.copy = function() {
    return this.slice(0);
};
mainDict.inc = function(n) {
    return n + 1;
};
function mainDict(iterable) {
    var result, key;
    result = {};
    var _$rapyd$_Iter2 = iterable;
    for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
        key = _$rapyd$_Iter2[_$rapyd$_Index2];
        result[key] = iterable[key];
    }
    return result;
}
if (typeof Object.getOwnPropertyNames !== "function") {
    mainDict.keys = function(hash) {
        var keys;
        keys = [];
        
        for (var x in hash) {
            if (hash.hasOwnProperty(x)) {
                keys.push(x);
            }
        }
        ;
        return keys;
    };
} else {
    mainDict.keys = function(hash) {
        return Object.getOwnPropertyNames(hash);
    };
}
mainDict.values = function(hash) {
    var vals, key;
    vals = [];
    var _$rapyd$_Iter3 = mainDict.keys(hash);
    for (var _$rapyd$_Index3 = 0; _$rapyd$_Index3 < _$rapyd$_Iter3.length; _$rapyd$_Index3++) {
        key = _$rapyd$_Iter3[_$rapyd$_Index3];
        vals.append(hash[key]);
    }
    return vals;
};
mainDict.items = function(hash) {
    var items, key;
    items = [];
    var _$rapyd$_Iter4 = mainDict.keys(hash);
    for (var _$rapyd$_Index4 = 0; _$rapyd$_Index4 < _$rapyd$_Iter4.length; _$rapyd$_Index4++) {
        key = _$rapyd$_Iter4[_$rapyd$_Index4];
        items.append([key, hash[key]]);
    }
    return items;
};
mainDict.copy = mainDict;
mainDict.clear = function(hash) {
    var key;
    var _$rapyd$_Iter5 = mainDict.keys(hash);
    for (var _$rapyd$_Index5 = 0; _$rapyd$_Index5 < _$rapyd$_Iter5.length; _$rapyd$_Index5++) {
        key = _$rapyd$_Iter5[_$rapyd$_Index5];
        delete hash[key];
    }
};
mainDict.get = function(hash, searchKey) {
    var key;
    var _$rapyd$_Iter6 = mainDict.keys(hash);
    for (var _$rapyd$_Index6 = 0; _$rapyd$_Index6 < _$rapyd$_Iter6.length; _$rapyd$_Index6++) {
        key = _$rapyd$_Iter6[_$rapyd$_Index6];
        if (key === searchKey) {
            return hash[key];
        }
    }
    return "";
};
mainDict.setdefault = function(hash, key, value) {
    if (mainDict.get(hash, key) === "") {
        hash[key] = value;
        return hash[key];
    } else {
        return hash[key];
    }
};
mainDict.update = function(hash, key, value) {
    hash[key] = value;
    return hash;
};
mainDict.pop = function(hash, searchkey) {
    var temp;
    temp = hash[searchkey];
    delete hash[searchkey];
    return temp;
};
mainDict.has_key = function(hash, key) {
    var lists, flag, list;
    lists = mainDict.keys(hash);
    flag = 0;
    var _$rapyd$_Iter7 = lists;
    for (var _$rapyd$_Index7 = 0; _$rapyd$_Index7 < _$rapyd$_Iter7.length; _$rapyd$_Index7++) {
        list = _$rapyd$_Iter7[_$rapyd$_Index7];
        if (list === key) {
            flag = 1;
        }
    }
    return flag === 1;
};
var collections = (function(){
    function dict() {
        dict.prototype.__init__.apply(this, arguments);
    }
    dict.prototype.__init__ = function __init__(iterable){
        var self = this;
        if (typeof iterable === "undefined") iterable = {};
        var keys, length, values, key, value, index;
        self.result = {};
        keys = mainDict.keys(iterable);
        length = enumerate(mainDict.keys(iterable));
        values = mainDict.values(iterable);
        var _$rapyd$_Iter8 = length;
        for (var _$rapyd$_Index8 = 0; _$rapyd$_Index8 < _$rapyd$_Iter8.length; _$rapyd$_Index8++) {
            index = _$rapyd$_Iter8[_$rapyd$_Index8];
            key = keys[index[0]];
            value = values[index[0]];
            self.result[key] = value;
        }
        return self.result;
    };
    dict.prototype.keys = function keys(){
        var self = this;
        var keys;
        if (typeof Object.getOwnPropertyNames !== "function") {
            keys = [];
            
				for (var x in self.result) {
					if (self.result.hasOwnProperty(x)) {
						keys.push(x);
					}
				}
				;
            return keys;
        } else {
            return Object.getOwnPropertyNames(self.result);
        }
    };
    dict.prototype.values = function values(){
        var self = this;
        var vals, key;
        vals = [];
        var _$rapyd$_Iter9 = self.keys();
        for (var _$rapyd$_Index9 = 0; _$rapyd$_Index9 < _$rapyd$_Iter9.length; _$rapyd$_Index9++) {
            key = _$rapyd$_Iter9[_$rapyd$_Index9];
            vals.append(self.result[key]);
        }
        return vals;
    };
    dict.prototype.items = function items(){
        var self = this;
        var items, key;
        items = [];
        var _$rapyd$_Iter10 = self.keys();
        for (var _$rapyd$_Index10 = 0; _$rapyd$_Index10 < _$rapyd$_Iter10.length; _$rapyd$_Index10++) {
            key = _$rapyd$_Iter10[_$rapyd$_Index10];
            items.append([key, self.result[key]]);
        }
        return items;
    };
    dict.prototype.copy = function copy(){
        var self = this;
        var returnValue, keys, length, values, key, value, index;
        returnValue = {};
        keys = self.keys();
        length = enumerate(self.keys());
        values = self.values();
        var _$rapyd$_Iter11 = length;
        for (var _$rapyd$_Index11 = 0; _$rapyd$_Index11 < _$rapyd$_Iter11.length; _$rapyd$_Index11++) {
            index = _$rapyd$_Iter11[_$rapyd$_Index11];
            key = keys[index[0]];
            value = values[index[0]];
            returnValue[key] = value;
        }
        return new dict(returnValue);
    };
    dict.prototype.get = function get(searchKey){
        var self = this;
        var key;
        var _$rapyd$_Iter12 = self.keys();
        for (var _$rapyd$_Index12 = 0; _$rapyd$_Index12 < _$rapyd$_Iter12.length; _$rapyd$_Index12++) {
            key = _$rapyd$_Iter12[_$rapyd$_Index12];
            if (key === searchKey) {
                return self.result[key];
            }
        }
        return "";
    };
    dict.prototype.clear = function clear(){
        var self = this;
        var key;
        var _$rapyd$_Iter13 = self.keys();
        for (var _$rapyd$_Index13 = 0; _$rapyd$_Index13 < _$rapyd$_Iter13.length; _$rapyd$_Index13++) {
            key = _$rapyd$_Iter13[_$rapyd$_Index13];
            delete self.result[key];
        }
    };
    dict.prototype.setdefault = function setdefault(key, value){
        var self = this;
        if (self.get(key) === "") {
            self.result[key] = value;
        }
        return self.result[key];
    };
    dict.prototype.update = function update(key, value){
        var self = this;
        self.result[key] = value;
        return self.result;
    };
    dict.prototype.pop = function pop(searchkey){
        var self = this;
        var temp;
        temp = self.result[searchkey];
        delete self.result[searchkey];
        return temp;
    };
    dict.prototype.has_key = function has_key(key){
        var self = this;
        var lists, flag, list;
        lists = self.keys();
        flag = 0;
        var _$rapyd$_Iter14 = lists;
        for (var _$rapyd$_Index14 = 0; _$rapyd$_Index14 < _$rapyd$_Iter14.length; _$rapyd$_Index14++) {
            list = _$rapyd$_Iter14[_$rapyd$_Index14];
            if (list === key) {
                flag = 1;
            }
        }
        return flag === 1;
    };

    function OrderedDict() {
        OrderedDict.prototype.__init__.apply(this, arguments);
    }
    _$rapyd$_extends(OrderedDict, dict);
    OrderedDict.prototype.__init__ = function __init__(iterable){
        var self = this;
        var keys, length, values, key, value, index;
        self.result = {};
        self.keyOrder = {};
        self.nextKeyOrder = 0;
        keys = mainDict.keys(iterable);
        length = enumerate(mainDict.keys(iterable));
        values = mainDict.values(iterable);
        var _$rapyd$_Iter15 = length;
        for (var _$rapyd$_Index15 = 0; _$rapyd$_Index15 < _$rapyd$_Iter15.length; _$rapyd$_Index15++) {
            index = _$rapyd$_Iter15[_$rapyd$_Index15];
            key = keys[index[0]];
            value = values[index[0]];
            self.result[key] = value;
            self.keyOrder[self.nextKeyOrder] = key;
            self.nextKeyOrder = self.nextKeyOrder + 1;
        }
        return self.result;
    };
    OrderedDict.prototype.update = function update(key, value){
        var self = this;
        var has_key;
        has_key = self.has_key(key);
        self.result[key] = value;
        if (!has_key) {
            self.keyOrder[self.nextKeyOrder] = key;
            self.nextKeyOrder = self.nextKeyOrder + 1;
        }
        return self.result;
    };
    OrderedDict.prototype.pop = function pop(searchkey){
        var self = this;
        var temp;
        temp = self.result[searchkey];
        delete self.result[searchkey];
        self.delFromKeyOrder(searchkey);
        return temp;
    };
    OrderedDict.prototype.delFromKeyOrder = function delFromKeyOrder(searchkey){
        var self = this;
        var key, value, index;
        for (index = 0; index < self.nextKeyOrder; index++) {
            key = index;
            value = self.keyOrder[key];
            if (value === searchkey) {
                delete self.keyOrder[key];
                return true;
            }
        }
        return false;
    };
    OrderedDict.prototype.hasKeyOrder = function hasKeyOrder(searchKey){
        var self = this;
        var lists, list, flag, index;
        lists = self.keyOrder;
        flag = 0;
        for (index = 0; index < self.nextKeyOrder; index++) {
            list = self.keyOrder[index];
            if (list === searchKey) {
                flag = 1;
            }
        }
        return flag === 1;
    };
    OrderedDict.prototype.keys = function keys(){
        var self = this;
        var returnKey, index;
        returnKey = [];
        for (index = 0; index < self.nextKeyOrder; index++) {
            returnKey[index] = self.keyOrder[index];
        }
        return returnKey;
    };
    OrderedDict.prototype.popitem = function popitem(last){
        var self = this;
        if (typeof last === "undefined") last = true;
        var keys, key, value, returnKey, index;
        returnKey;
        keys = self.keys();
        for (index = 0; index < self.nextKeyOrder; index++) {
            key = keys[index];
            if (self.hasKeyOrder(key)) {
                value = self.get();
                returnKey = key;
                if (!last) {
                    return self.pop(returnKey);
                }
            }
        }
        return self.pop(returnKey);
    };
    OrderedDict.prototype.reversed = function reversed(){
        var self = this;
        var returnDict, newKey, key, value, index;
        returnDict = new collections.OrderedDict({});
        newKey = self.nextKeyOrder;
        for (index = 0; index < self.nextKeyOrder; index++) {
            key = self.keyOrder[self.nextKeyOrder - 1 - index];
            value = self.get(key);
            returnDict.update(key, value);
        }
        return returnDict;
    };
    OrderedDict.prototype.isEqual = function isEqual(second){
        var self = this;
        var size, selfKey, secondKey, selfValue, secondValue, index;
        if (self.nextKeyOrder === second.nextKeyOrder) {
            size = range(self.nextKeyOrder);
            var _$rapyd$_Iter16 = size;
            for (var _$rapyd$_Index16 = 0; _$rapyd$_Index16 < _$rapyd$_Iter16.length; _$rapyd$_Index16++) {
                index = _$rapyd$_Iter16[_$rapyd$_Index16];
                selfKey = self.keyOrder[index];
                secondKey = second.keyOrder[index];
                if (selfKey === secondKey) {
                    selfValue = self.get(selfKey);
                    secondValue = second.get(secondKey);
                    if (!selfValue === secondValue) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    };

    function tuple() {
        tuple.prototype.__init__.apply(this, arguments);
    }
    tuple.prototype.__init__ = function __init__(iterable){
        var self = this;
        if (typeof iterable === "undefined") iterable = {};
        var index;
        self.args = {};
        for (index = 0; index < len(iterable); index++) {
            self.args[index] = iterable[index];
        }
    };
    tuple.prototype.__add__ = function __add__(index){
        var self = this;
        return self.args[index];
    };

    return {
        dict: dict, 
        OrderedDict: OrderedDict, 
        tuple: tuple
    };
})();

d = new collections.tuple([ "name", "surname" ]);
_$rapyd$_print(d[0]);