{
    // set
    let sourceObj = {};
    let obj2 = new Proxy(sourceObj, {
        set: function (obj, prop, value) {
            if (prop === 'age') {
                if (value <= 150 && value >= 0) {
                    obj[prop] = value
                } else {
                    throw new RangeError('年龄不合法')
                }
            }
            obj[prop] = value;
        }
    })
    obj2.name = 'zzz';
    obj2.age = 22;
    console.log(obj2); // { name: 'zzz', age: 22 }
    obj2.age = 160; // RangeError: 年龄不合法 


    let data = {
        a: 1,
        b: {
            b1: 2,
            b2: {
                b21: 'aaa'
            }
        }
    }
    const proxyObj = sourceObj => {
        for (let i in sourceObj) {
            if (typeof sourceObj[i] === 'object') {
                sourceObj[i] = proxyObj(sourceObj[i]);
            }
        }
        let result = new Proxy(sourceObj, {
            set: (obj, prop, value) => {
                if (obj.hasOwnProperty(prop)) {
                    if (obj[prop] !== value) {
                        console.log(`[${prop}]的值变为了${value}`);
                    }
                } else {
                    console.log(`设置了新属性${prop},值为${value}`)
                }
                obj[prop] = value;
            }
        })
        return result;
    }
    let resultObj = proxyObj(data);
    resultObj.a = 22;
    resultObj.a = 22;
    resultObj.c = 33;
    resultObj.b.b1 = 'test';
    resultObj.b.b2.b21 = 'test';
    resultObj.b.b2.b22 = 'test222';
    resultObj.b.b2 = null;
    console.log(resultObj);
    console.log(data);
}

{
    // get
    let data = {
        a:1,
    }
    let proxyData = new Proxy(data,{
        get:(data,prop,receiver)=>{
             if(data[prop]){
                 return data[prop]
             }else{
                 throw Error(`不存在${prop}属性`)
             }
        }
    })
    console.log(proxyData.a);
    proxyData.b; 
}

{
    // has
    let data = {
        a:1,
        b:2,
        c:3
    }
    let proxyData = new Proxy(data,{
        has:(obj,prop) => {
          if(prop != 'b'){
              return true
          }else{
              return false
          }
        }
    })
    console.log('a' in proxyData);
    console.log('b' in proxyData);
}


{
    // construct
    let data = function (){

    };
    let proxyData = new Proxy(data,{
        construct:function(obj,args,proxyObj){
            if(args.length === 1){
                return [args[0]]
            }else{
                return new Array(...args);
            }
        }
    })
    console.log(new proxyData(1,2,3))
}

