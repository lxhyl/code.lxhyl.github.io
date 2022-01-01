
// 就相当于将 函数作为一个值添加至所绑定的对象
// 就可以访问对象的属性了

Function.prototype.myCall = function(context,...args){
    // 如果为null或undefind时，将其指向全局对象
    context = (context ? context : (window ? window : global))
    // 生成唯一key
    const key = Symbol();
    // 给context添加属性，key为symbol，值为调用者 (function)
    context[key] = this;
    // 执行这个函数的结果
    const result = context[key](...args);
    // 删除object的这个属性
    delete context[key];
    return result;
}

// 和call不同之处只是 参数为一个数组
Function.prototype.myApplay = function(context,args){
    context = (context ? context : (window ? window : global))
    // 生成唯一key
    const key = Symbol();
    // 给context添加属性，key为symbol，值为调用者 (function)
    context[key] = this;
    // 执行这个函数的结果
    const result = context[key](...args);
    // 删除object的这个属性
    delete context[key];
    return result;
}


/**
MDN上对bind()的定义
bind() 方法创建一个新的函数，在 bind() 被调用时,
这个新函数的 this 被指定为 bind() 的第一个参数,
而其余参数将作为新函数的参数，供调用时使用。

**/
Function.prototype.myBind = function(context,...args1){
    const Fun = this;
    return function (...args2){
        const temp = [...args1,...args2];
        return Fun.apply(context,temp);
    }
}


let obj = {
    name:'zzz',
    age:10
}
function fun(a,b){
     console.log(this.name);
     console.log(this.age);
     console.log(a+b);
}

let test = fun.myBind(obj,1)(2);
console.log(test);


