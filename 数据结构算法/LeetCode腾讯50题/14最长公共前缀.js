/**
编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1:

输入: ["flower","flow","flight"]
输出: "fl"
示例 2:

输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-common-prefix
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

**/

// 暴力求解
const longest = (strs) => {
    if (strs.length === 0) {
        return '';
    }
    if (strs.length === 1) {
        if (strs[0]) {
            return strs[0][0];
        } else {
            return '';
        }
    }
    // 判断strs中是否每个都包含str
    let allHave = (str) => {
        let i = 0;
        while (i < strs.length) {

            if (strs[i].search(str) === 0) {
                i++;
            } else {
                return false;
            }
        }
        if (i == strs.length) {
            return true;
        }
    }
    let index = 0;
    while (index < strs[0].length) {
        if (allHave(strs[0].substr(0, index + 1))) {
            index++;
        } else {
            break;
        }
    }
    return strs[0].substr(0, index);
}

//假设第一个就是最长字符，再依次排除
const longest2 = (strs) => {
    if (strs.length === 0) {
        return '';
    }
    let result = strs[0];
    //判断每一个是否包含
    let allHave = (str) => {
        let i = 0;
        while (i < strs.length) {
            if (strs[i].search(str) === 0) {
                i++;
            } else {
                return false;
            }
        }
        if (i == strs.length) {
            return true;
        }
    }
    let index = result.length;
    while(index >= 0){
        if(allHave(result)){
           return result;
        }else{
            index--;
            result = result.substr(0,index);
        }
    }
    return result;
}
let strs = ["a", "aflow", "a"];
console.log(longest2(strs));