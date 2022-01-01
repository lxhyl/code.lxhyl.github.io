
// const add = x => x + 10;
// const double = x => x * 2;
// const sub = x => x - 10;

// const pipe = (...fns) => e => fns.reduce((r,f) => f(r),e);

// let result = pipe(add,double,sub);
// console.log(result(10))

const log = console.log
const curry = fn => {
    const len = fn.length;
    return function helpFun() {
        return arguments.length < len ? helpFun.bind(null, ...arguments) : fn(...arguments)
    }
}

const add = (a, b, c) => a + b + c;
const curryAdd = curry(add);

const Box = x => ({
    of: x,  // 拿到值
    map: f => Box(f(x)), // Box.value -> function(Box.value) -> Box  值进行函数运算
    /*
    * ap 将函数应用与值。就相当于包装了一层map,
    * o.map() 本质就是 Box.map(),只不过参数是第一次执行Box的参数
    */
    ap: o => o.map(x)
})

log(Box(curryAdd).ap(Box(1)).ap(Box(2)).ap(Box(3)).of)



const Maybe = x => ({
    of: x,
    isNothing: function () {
        return this.of === undefined || this.of === null || this.of === ''
    },
    map: function (f) {
        return this.isNothing() ? Maybe(null) : Maybe(f(x))
    },

    ap: function (o) {
        return this.isNothing() ? Maybe(null) : o.map(x)
    }
})



const result = (a, b, c) => Maybe(curryAdd).ap(Maybe(a)).ap(Maybe(b)).ap(Maybe(c)).of
log(result(null, 1)) // null
log(result(2, 1, 3)) // 6
log(result(undefined, null, 1)) // null

