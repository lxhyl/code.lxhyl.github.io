Object.prototype.lxhyl = function (e) {
    return e;
}
console.log([1, 2, 3].lxhyl('Array调用'))
console.log(('string').lxhyl('String调用'))
console.log((/a/).lxhyl('正则调用'))
console.log(Math.lxhyl('Math调用'))

{
    // Object.prototype.constructor
    function NewConstructor() {

    }
    let arr1 = [111, 11, 4, 6];
    arr1.constructor = NewConstructor;
    console.log(arr1.constructor); // [Function: NewConstructor]
    let str1 = 'test';
    str1.constructor = NewConstructor;
    console.log(str1.constructor); // [Function: String]
}

{
    let obj1 = {
        a: 1,
    };
    console.log(obj1.prototype);
    let fun1 = function () {

    }
    console.log(fun1.prototype);
    let fun2 = () => {

    }
    console.log(fun2.prototype);
}

{
    //Object.assign()
    let obj1 = { a: 1 };
    let obj2 = "str";
    let obj21 = "STR"
    let obj3 = true;
    let obj4 = Object.assign(obj1, obj2, obj21, obj3);
    console.log(obj4);
}


{
    // Object.create()
    let testObj = {
        a: 1,
        b: 2
    }
    let obj11 = Object.create(testObj);
    let obj22 = Object.create(null);
    console.log(obj11.toString, obj22.toString);




    let obj1 = Object.create(Object.prototype, {
        a: {
            value: "我是a属性",
            writable: true,
            configurable: true,
        },
        aa: {
            enumerable: true,
            value: "我是aa属性",
            writable: true,
            configurable: true,
        },
        b: {
            enumerable: true,
            configurable: false,
            get: function () {
                return "我是b属性的get"
            },
            set: function (value) {
                console.log('设置值' + value)
            }
        }
    })
    console.log(obj1); // { aa: '我是aa属性', b: [Getter/Setter] }
}

{
    //Object.defineProperties()
    let obj1 = {
        a: 111
    };
    Object.defineProperties(obj1, {
        a: {
            writable: false,
            enumerable: true
        },
        b: {
            writable: true,
            value: 1,
            enumerable: true,
        }
    })
    obj1.a = 222;
    console.log(obj1);

}

{
    //Object.defineProperty()
    let obj1 = {};
    let a = 1;
    Object.defineProperty(obj1, 'a', {
        enumerable: true,
        get: function () {
            console.log("访问值")
            return a;
        },
        set: function (value) {
            console.log("把修改值为" + value);
            return value
        }
    })
    obj1.a;
    obj1['a'] = 2;


    let arr1 = [1, 2, 3];
    Object.defineProperty(arr1, 5, {
        value: 4,
        configurable: true,
        enumerable: false
    })
    arr1; // [1, 2, 3, empty × 2, 4]


    let obj2 = {
        a: 'aaa',
        arr1: [1, 2, 3, 4],
        b: {
            b1: 'b1',
            b2: 'b2',
        }
    }
    const sub = obj => {
        let keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            if (typeof obj[keys[i]] === 'object') {
                sub(obj2[keys[i]]);
            } else {
                Object.defineProperty(obj, keys[i], {
                    set: function (value) {
                        console.log(`${keys[i]}的值改变为${value}了`)
                        return value;
                    }
                })
            }
        }
    }
    sub(obj2)
    obj2.a = 1;
    obj2.arr1[0] = 'a';
    obj2.b.b1 = 'bbbb1'

}




{
    // Object.entires()
    let obj1 = {
        a: '1',
        b: 2
    };

    console.log(Object.entries(obj1));
}

{
    // Object.preventExtensions()
    let obj1 = {
        a: '1',
        b: 2
    }
    Object.preventExtensions(obj1);
    obj1.c = 'ccc';
    console.log(obj1); // { a: '1', b: 2 }
}

{
    // Object.seal()
    let obj1 = {
        a: '1',
        b: 2
    };
    Object.seal(obj1);

    Object.defineProperty(obj1,'a',{
        configurable:true,
        enumerable:false
    })
    delete obj1.a
    console.log(obj1);
}

{   
    // Object.freeze()
    let obj1 = {
        a: '1',
        b: {
            b1:222,
            b2:111
        }
    };
    Object.freeze(obj1);
    obj1.a = 'a';
    obj1.c = 'newC';
    delete obj1.a;
    delete obj1.b.b1;
    console.log(obj1);

}



{
    // Object.fromEntries()
    let arr1 = [[0,'a'],[1,'b'],[2,'c']];
    let arr2obj = Object.fromEntries(arr1);
    console.log(arr2obj);  //{ '0': 'a', '1': 'b', '2': 'c' }

}

{
    // Object.getOwnPropertyDescriptor()
    let obj1 = {
        a: '1',
        b: {
            b1:222,
            b2:111
        }
    };
    let desA = Object.getOwnPropertyDescriptor(obj1,'a');
    let desB = Object.getOwnPropertyDescriptor(obj1,'b');
    console.log(desA);
    console.log(desB);
}
{
    // Object.getOwnPropertyDescriptors()
    let obj1 = {
        a: '1',
        b: {
            b1:222,
            b2:111
        }
    };
    let desA = Object.getOwnPropertyDescriptors(obj1);
    console.log(desA);
}

{
    // Object.getOwnPropertyNames()
    let sym = Symbol()
    let obj1 = {
        a: '1',
        b: {
            b1:222,
            b2:111
        },
    };
    obj1[sym] = 'Symbol';
    console.log(obj1);
    let keys = Object.getOwnPropertyNames(obj1);
    console.log(keys);


    let arr1 = ['a','b','c'];
    let arr1Keys = Object.getOwnPropertyNames(arr1);
    console.log(arr1Keys);
}

{
    // Object.getPrototypeOf()
    let obj1 = {};
    let obj2 = Object.create(obj1);
    console.log(obj2.__proto__ === obj1); // true
    Object.getPrototypeOf(obj2) === obj1; // true
}

{
    // Object.is()
    console.log(Object.is(null,undefined)) 

    let obj1 = {
        a:1
    }
    let obj2 = {
        a:1
    }
    let obj3 = obj2;
    console.log(Object.is(obj1,obj2)); 
    console.log(Object.is(obj3,obj2)); 
}

{
    // Object.isExtensible()
    let obj1 = {};
    Object.preventExtensions(obj1);
    console.log(Object.isExtensible(obj1));
   console.log(Object.isExtensible(1));
}
{
    //Object.isFrozen()
    let obj1 = {};
    console.log(Object.isFrozen(obj1));
    Object.freeze(obj1);
    console.log(Object.isFrozen(obj1));

}

{
    // Object.isSealed()
    let obj1 = {a:1};
    Object.defineProperty(obj1,'a',{
        value:1,
        writable:true,
        configurable:false,
        enumerable:true,
    })
    Object.preventExtensions(obj1);
    console.log(Object.isSealed(obj1));

}


{
    // Object.keys()
    let obj1 = {
        a:1,
    }
    Object.defineProperty(obj1,'b',{
        value:'bbb',
        enumerable:false
    })
    let c = Symbol('test')
    Object.defineProperty(obj1,c,{
        value:'ccc',
        enumerable:true
    })
    console.log(Object.keys(obj1));
}

{
    // Object.values()
    let obj1 = {
        a:1,
        b:null,
    }
    Object.defineProperty(obj1,'c',{
        value:'ccc',
        enumerable:false
    })
    console.log(Object.values(obj1)); // [ 1, null ]
}

{
    // Object.prototype.hasOwnProproty()
    let obj1 = {
        a:1,
        b:null,
    }
    Object.defineProperty(obj1,'c',{
        value:'ccc',
        enumerable:false
    })
    console.log(obj1.hasOwnProperty('c'))
}

{
    // Object.prototype.isProprotyOf()
    let obj1 = {
        a:'1'
    }
    let obj2 = Object.create(obj1,{
        b:{
            value:'bbb',
            enumerable:true
        }
    })
    console.log(obj1.isPrototypeOf(obj2));
}

{
    // Object.prototype.propertyIsEnumerable()
    let obj1 = {a:1};
    Object.defineProperty(obj1,'b',{
        value:'bbb',
        enumerable:false
    });
    console.log(obj1.propertyIsEnumerable('a'));
    console.log(obj1.propertyIsEnumerable('b'));
}

{
    // Object.prototype.toLoacleString()
    console.log((1234567).toLocaleString());
}


{
    //  Object.prototype.toString()
    let obj1 = {
        
    };
    let fun1 = () => {
       
    };
    console.log(obj1.toString());
    console.log(fun1.toString());
}

{
   // Object.prototype.valueOf()
    let obj1 = {
        a:1,
        b:2,
    }
    obj1.valueOf();
}