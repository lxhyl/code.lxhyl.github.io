{
let a = function(){}
Function.prototype.toString = () => {
    return 'toString方法'
}
let obj = {};
obj[a] = 1;
console.log(obj);

let b = new Map()
b.set(a,1);
console.log(b);
}

{
    let map = new Map()
    map.set(Object,{});
    map.set(Function,()=>{});
    console.log(map.size);
}

{
    let map = new Map();
    map.set('a',1).set('b',2).set('c',3);
    // console.log(map); // Map { 'a' => 1, 'b' => 2, 'c' => 3 }
    for(let i in map){
        console.log('in',i);
    }
    for(let i of map){
        console.log('of',i);
    }
}


