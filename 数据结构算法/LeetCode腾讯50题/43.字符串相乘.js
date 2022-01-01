

/**
 * 大数相乘，模拟竖乘法
 *
 * @param {string} num1 数字1
 * @param {string} num2 数字2
 * @returns {string} 
 */
const multiply = (num1, num2) => {
    if(num1 == 0 || num2 ==0){
        return '0';
    }
    // 生成一个存储所有位数的数组
    let arr = [];
    for (let i = 0; i < (num1.length + num2.length - 1); i++) {
        arr.push([]);
    }
    // 找到每一位的数字相乘  放入数组中
    //  i+j的含义是，乘法的每一轮相乘都会错位
    //  所以此轮相乘，最低位就为 i
    for (let i = 0; i < num1.length; i++) {
        for (let j = 0; j < num2.length; j++) {
            let temp = num1[i] * num2[j];
            arr[i + j].push(temp);
        }
    }
    console.log('包含每位的值的数组：',arr);
    // 包含每位的值的数组： [ [ 4 ], [ 5, 8 ], [ 10, 12 ], [ 15, 16 ], [ 20 ] ]
    let result = '';
    let add = 0;
    // 由低位到高位 倒序遍历所有位，模拟加法
    for (let i = arr.length - 1; i >= 0; i--) {
        // 计算此位所有值的和，上次的进位 + 每轮相乘此位的数字之和
        let sum = add + arr[i].reduce((lastSum, num) => {
            return lastSum + num;
        }, 0);
        add = 0;
        // 进位处理
        if (sum >= 10) {
            add = Math.floor(sum / 10);
            let num = sum - add * 10;
            result = `${num}${result}`;
        } else {
            result = `${sum}${result}`;
        }
    }
    // 判断还有没有进位数
    if(add === 0 ){
        return result;
    } else{
        return `${add}${result}`
    }
}
console.log(multiply('1234', '45')) // 55530