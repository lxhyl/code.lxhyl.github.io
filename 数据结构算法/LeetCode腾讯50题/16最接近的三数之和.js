/**
给定一个包括 n 个整数的数组 nums 和 一个目标值 target。
找出 nums 中的三个整数，使得它们的和与 target 最接近。
返回这三个数的和。假定每组输入只存在唯一答案。

 
示例：
输入：nums = [-1,2,1,-4], target = 1
输出：2
解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/3sum-closest
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

**/



const threeSumClosest = (nums, target) => {
    let sortNums = nums.sort((a, b) => a - b);
    let best = 99999999;
    for (let index = 0; index < sortNums.length; index++) {
        let i = index + 1;
        let j = sortNums.length - 1;
        while (i < j) {
            let sum = sortNums[index] + sortNums[i] + sortNums[j];
            if (sum === target) {
                return target;
            }
            //如果新差小于 原来的差 就更新
            if (Math.abs(best - target) > Math.abs(sum - target)) {
                best = sum;
            }
            if(sum > target){
                j--;
                while(sortNums[j] === sortNums[j+1]){
                    j--;
                }
            }else{
                i++;
                while(sortNums[i] === sortNums[i-1]){
                    i++;
                }
            }
        }
    }
    return best;
}

let nums = [-1, 2, 1, -4];
let target = 1;
console.log(threeSumClosest(nums, target));