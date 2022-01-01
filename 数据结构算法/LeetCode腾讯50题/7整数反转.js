/**
**
给出一个 32 位的有符号整数,
你需要将这个整数中每位上的数字进行反转。

示例 1:
输入: 123
输出: 321

示例 2:
输入: -123
输出: -321

示例 3:
输入: 120
输出: 21
注意:

假设我们的环境只能存储得下 32 位的有符号整数，
则其数值范围为 [−2^31,  2^31 − 1]。
请根据这个假设，如果反转后整数溢出那么就返回 0。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-integer
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
**
**/

const reverse = (x) => {
    let arr = x.toString().split('');
    let result = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    if (result[result.length - 1] == '-') {
        result.unshift(result.splice(result.length - 1, 1)[0]);
    }
    result = Number(result.join(''));
    if (result < (-Math.pow(2, 31)) || result > (Math.pow(2, 31) - 1)) {
        return 0;
    } else {
        return result;
    }
}
const reverse2 = (x) => {
    // 个位 =  x%10;
    // 剩余 = (x - x%10)/10;
    let result = 0;
    while (x !== 0) {
        result = result * 10 + x % 10;
        x = (x - x % 10) / 10
    }
    if (result < (-Math.pow(2, 31)) || result > (Math.pow(2, 31) - 1)) {
        return 0;
    } else {
        return result;
    }

}
let n = -15342;

console.log(reverse2(n));