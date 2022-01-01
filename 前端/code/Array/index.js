{
    let arr = [];
    console.log(arr[Symbol.unscopables]);
}




{
    // Array.from()
    console.log(Array.from.length === 1);

    Array.from({ length: 3 }, (item) => item || 1)
    //  [1, 1, 1]

    arr = [1, 1, 2, 3, 4]
    Array.from(new Set(arr));
    // [1, 2, 3, 4]

    function getArr(len, fillValue) {
        return Array.from({ length: len }, () => fillValue);
    }
    console.log(getArr(5, 0));
    // [ 0, 0, 0, 0, 0 ]
}






{
    // Array.isArray()
    Array.isArray();
    // false
    Array.myisArray = e => Object.prototype.toString.call(e) === '[object Array]'
    console.log(Array.myisArray(''))
}


{
    // Array.of()
    console.log(Array.of([], 1, true, {}, Symbol()))
    console.log(Array(3)) //[ <3 empty items> ]
    console.log(Array.of(3)) // [ 3 ]
    console.log([].of(3)) //报错
}



{
    //Array.prototype.concat()
    console.log([1, 2, 3].concat());
}



{
    //Array.prototype.copyWithin()
    let arr = [0, 1, 2, 3, 4];
    arr.copyWithin(3);
}

{
    //Array.prototype.entries()
    let arr = [1, 2, 3];
    let arrEntries = arr.entries();
    for (let i of arr) {
        console.log(i);
    }

}

{
    [{ name: 'x' }, { name: 'y' }, { name: 'y' }, { name: 'z' }].find(item => item.name === 'y')
}


{
    console.log([1, 2, [3, 4]].flat(-1))
    // [ 1, 2, [ 3, 4 ] ]
    let a = [1, [2, 3, [4, 5]]]
    const myFlat = (arr) => {
        const result = []
        const getItem = arr => {
            arr.forEach(item => {
                if (Array.isArray(item)) {
                    getItem(item)
                } else {
                    result.push(item)
                }
            })
        }
        getItem(arr)
        return result;
    }
    console.log(myFlat(a));

}


{
    //Array.prototype.flatMap()
    let arr1 = [1, 2, 3]
    arr1.map(item => [item * 2]) //[[2],[4],[6]]
    console.log(arr1.flatMap(item => [item * 2])) //

    let arr2 = ["it's Sunny in", "", "California"]
    console.log(arr2.map(item => item.split(' ')))
    console.log(arr2.flatMap(item => item.split(' ')))
}


{
    //Array.prototype.forEach()
    let arr = ['a', 'b', 'c', 'd']
    arr.forEach((item, index, array) => {
        console.log(index + ':' + item)
        if (index === 1) {
            array.shift();
        }
    })
}


{
    // Array.prototype.includes()
    let obj = { key: 100 }
    let arr = [{ a: 1 }, { b: { c: 'c' } }, 3, obj]
    console.log(arr.includes(3))
    console.log(arr.includes('3'))
    console.log(arr.includes({ a: 1 }))
    console.log(arr.includes(obj))
}


{
    //Array.prototype.indexOf()
    const findAllItem = (arr, item) => {
        let indexs = []
        let index = arr.indexOf(item)
        while (index !== -1) {
            indexs.push(index)
            index = arr.indexOf(item, index + 1)
        }
        return indexs
    }
    let testArr = [1, 3, 4, 5, 6, 1]
    console.log(findAllItem(testArr, 1))
}

{
    //Array.prototype.join()
    function testFun() { }
    let arr = [1, { a: 1 }, () => { }, testFun, testFun(), null, true]
    console.log(arr.join());
}

{
    //Array.prototype.keys()
    let arr1 = ['a', , 'c', Symbol()]
    console.log([...arr1.keys()]) // [0,1,2,3]
    console.log([...Object.keys(arr1)]) // ['0','2','3']
}

{
    //Array.prototype.pop()
    let arr1 = [0, null, , ,]
    console.log(arr1.pop())
    console.log(arr1)
}

{
    //Array.prototype.reduce()
    const sumFun = arr => {
        return arr.reduce((sum, nowItem) => sum + nowItem, 0);
    }
    const arr1 = [1, 1, 2, 3, 44, 44, 1, 1];
    // console.log(sumFun(arr1));


    const itemNum = arr => {
        return arr.reduce((itemNumsObj, nowItem) => {
            if (nowItem in itemNumsObj) {
                itemNumsObj[nowItem]++;
            } else {
                itemNumsObj[nowItem] = 1;
            }
            return itemNumsObj
        }, {})
    }
    console.log(itemNum(arr1));

}


{
    //Array.prototype.reverse()
    const a = { 2: 2, 1: 1, '0': 0, 3: 3, 'a': 1, 'b': 2, 'c': 3, length: 7 };
    Array.prototype.reverse.apply(a);
    console.log(a);


}

{
    //Array.prototype.values()
    let arr1 = ['a', 'b', 'c'];
    let eArr1 = arr1.values();
    for (let i of eArr1) {
        console.log(i);
    }
    // a b c
    arr1[0] = 'aaa';
    for (let i of eArr1) {
        console.log(i);
    }
    // 无输出 迭代器是一次性的
    let eArr2 = arr1.values();
    arr1[0] = 'aaa';
    for (let i of eArr2) {
        console.log(i)
    }
}


{
    //Array.prototype[@@iterator]
    let arr1 = ['a', 'b', 'c'];
    let eArr1 = arr1[Symbol.iterator]();
    for (let i of eArr1) {
        console.log(i);
    }
    // a b c
}

{
 console.log(Array[Symbol.species]())
}