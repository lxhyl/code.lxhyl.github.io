function Test(name) {
    this.name = name;
}
Test.prototype.age = 10


function myNew() {
    let tempName = Symbol();
    // 获取并删除第一个参数
    let fun = Array.prototype.shift.call(arguments);
    tempName = {
        __proto__: fun.prototype
    }
    //fun绑定到新创建的对象上
    let result =  fun.call(tempName,...arguments);
    return  result instanceof Object ? result : tempName;
}


let testNew = new Test('C');
let testMyNew = myNew(Test,'C');




