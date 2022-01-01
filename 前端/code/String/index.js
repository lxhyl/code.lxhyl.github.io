function test(a, b) {

}
console.log(test.length);
console.log(Array.length);
console.log(Function.length);
console.log(Object.length);

{
    //codePonitAt()
    let str1 = '我爱你';
    console.log(str1.codePointAt(0));
    console.log(str1.codePointAt(1));
    console.log(str1.codePointAt(2));
}

{
    // concat() 
    let num = 10000000
    console.time();
    let str1 = '';
    for(let i = 0;i<num;i++){
        str1 = str1.concat('a');
    }
    console.timeEnd();

    console.time()
    for(let i =0;i<num;i++){
        str1 += 'a';
    }
    console.timeEnd();
/**
default: 1878.764ms
default: 1115.631ms
**/
}

{
    // endsWith()
    let str1 = 'abcdefg';
    console.log(str1.endsWith('de',5))
}

{
    //Symbol.iterator
    let str1 = 'zxcvbnm';
    let eStr1 = str1[Symbol.iterator]();
    for(let i of eStr1){
        console.log(i);
    }
}

{
    //String.raw()
    let name ='zpf';
    console.log(String.raw`name:${name}`); //name:zpf
    console.log(String.raw({ raw: 'test' }, 0, 1, 2)); // t0e1s2t
    console.log(String.raw({raw:['name:',',']},'zpf')) // name:zpf,
}