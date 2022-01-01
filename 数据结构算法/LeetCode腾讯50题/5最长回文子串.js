/**

给定一个字符串 s，找到 s 中最长的回文子串。
你可以假设 s 的最大长度为 1000。

示例 1：
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
示例 2：

输入: "cbbd"
输出: "bb"

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-palindromic-substring
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
**/

// 暴力求解  (超出时间限制)
const longestPalindrome = (str) => {
    if (str.length < 2) {
        return str;
    }
    //判断是否是回文
    const isPalindrome = (str) => {
        let i = 0;
        let j = str.length - 1;
        while (i <= j) {
            if (str[i] === str[j]) {
                i++;
                j--;
            } else {
                return false;
            }
        }
        if (i >= j) {
            return true;
        }
    }
    let longestTemp = '';
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j < str.length; j++) {
            let s = str.substring(i, j + 1);
            // console.log(s);
            if (isPalindrome(s) && s.length > longestTemp.length) {
                longestTemp = s;
            }
        }

    }
    return longestTemp.length > 0 ? longestTemp : str[0];
}


// 优化  动态规划
const longestPalindrome2 = (str) => {
    let len = str.length;
    if (len < 2) {
        return str;
    }

    //状态转移方程 = isPalindrome(i,j) = isPalindrome(i+1,j-1);
    const isPalindrome = (left, right) => {

        if (left >= right) {
            return true
        } else {
            if (str[left] == str[right]) {
                return isPalindrome(++left, --right);
            } else {
                return false
            }
        }
    }

    let max = { i: 0, j: 0 };
    for (let i = 0; i < len; i++) {
        // 从最长的开始 找到就直接跳出循环
        // 从长到短循环的，所以找到的就是最长的 
        let longest = max.j - max.i;
        let j = len - 1;
        // 当循环的长度大于 最大回文长度时，再进入循环

        if (longest < j - i) {
            while (j > i) {
                //一旦长度小于现在的回文长，就跳出循环
                if (longest > j - i) {
                    break;
                }
                if (isPalindrome(i, j)) {
                    if (j - i > longest) {
                        max.j = j;
                        max.i = i;
                    }
                    break;
                } else {
                    j--;
                }
            }
        }

    }

    return str.substring(max.i, max.j + 1);
}


