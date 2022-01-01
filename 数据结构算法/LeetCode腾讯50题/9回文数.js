/**
**判断一个整数是否是回文数。
回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例 1:
输入: 121
输出: true

**
**/

// 变为字符串处理
const isPalindrome = (x) => {
   let str = x.toString();
   let i =0;
   let j = str.length -1;
   while(i < j){
       if(str[i] == str[j]){
           i++;
           j--;
           if(i >= j){
               return true;
           }
       }else{
           return false;
       }
   }
   return true;
}


// 优化  纯数字处理
const isPalindrome2 = (x) => {
    //负数必不可能是回文数，
    // 如果个位是0,那么只有0才满足回文数的条件
    if (x < 0 || (x % 10 == 0 && x != 0)) {
        return false;
    }
    // 将数字的后半段反转
    let halfNum = 0;
    while(x>halfNum){
        //js相除会有精度问题
        halfNum = parseInt(halfNum * 10 + x%10);
        x = parseInt(x/10);
    }
    return x == halfNum || x == parseInt(halfNum/10);
}
let x = 121;
console.log(isPalindrome2(x));