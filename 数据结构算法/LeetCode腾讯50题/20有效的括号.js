/**
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，
判断字符串是否有效。

有效字符串需满足：  
左括号必须用相同类型的右括号闭合。  
左括号必须以正确的顺序闭合。  
注意空字符串可被认为是有效字符串。  

示例 1:  
输入: "()"  
输出: true  

示例 2:   
输入: "()[]{}"   
输出: true   

示例 3:  
输入: "(]"  
输出: false  

示例 4:  
输入: "([)]"  
输出: false  

示例 5:  
输入: "{[]}"  
输出: true  

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/valid-parentheses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

**/

const isValid = (s) => {
    let len = s.length;
    if(s === ''){
        return true;
    }
    if(len === 1){
        return false;
    }
    // 建立括号到数字的映射
    const ys = {
        "(":-1,
        ")":1,
        "[":-2,
        "]":2,
        "{":-3,
        "}":3
    }
    //初始化栈
    let arr = [ys[s[0]]];
    for(let i =1;i<len;i++){
      // 如果新的 和栈顶的之和为1，说明匹配
     //  反之，则入栈  
      if(ys[s[i]] + arr[arr.length-1] === 0){
          arr.pop()
      }else{
          arr.push(ys[s[i]]);
      }
    }
    //如果栈中没有元素 说明匹配完了
    if(arr.length === 0){
        return true;
    }else{
        return false;
    }

}
let s1 = "{[]}"
console.log(isValid(s1));
