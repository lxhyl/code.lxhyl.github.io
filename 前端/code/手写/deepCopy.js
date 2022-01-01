

/**
 Object.assign() 方法用于对象的合并，
将源对象（source）的所有可枚举属性，复制到目标对象（target）。
是浅拷贝, 如果属性也是对象，那就无法深拷贝
**/

/**
 for in 递归拷贝
**/
function deepCopy(obj){
   let result = Array.isArray(obj) ? [] : {};
   for(let i in obj){
       if(obj[i] === obj){
           continue;
       }
     result[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
   }
   return result;
}



let test = {
    num: 0,
    str: '',
    boolean: true,
    sym:Symbol(),
    unf: undefined,
    nul: null,
    obj: {
        name: '我是一个对象',
        id: 1
    },
    arr: [0, 1, 2],
    func: function() {
        console.log('我是一个函数')
    },
    date: new Date(0),
    reg: new RegExp('/我是一个正则/ig'),
    err: new Error('我是一个错误')
}
let obj2 = deepCopy(test);
console.log(obj2);
console.log(Object.prototype.toString.call([]))

let obj3 =JSON.parse(JSON.stringify(test));