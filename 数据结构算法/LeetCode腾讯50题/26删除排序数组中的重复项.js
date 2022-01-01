/**

给定一个排序数组，你需要在 原地 删除重复出现的元素，
使得每个元素只出现一次，返回移除后数组的新长度。
不要使用额外的数组空间，
你必须在 原地 修改输入数组并在使用 O(1)额外空间的条件下完成。

 

示例 1:
给定数组 nums = [1,1,2], 
函数应该返回新的长度 2, 
并且原数组 nums 的前两个元素被修改为 1, 2。 
你不需要考虑数组中超出新长度后面的元素。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
**/

const removeDuplicates = (nums) => {
     if(nums.length === 0 ){
         return 0
     }
     let i = 0
     for(let j = 1;j<nums.length;j++){
         if(nums[j] != nums[i]){
             i++
             nums[i] = nums[j]
         }
     }
     return i+1
}
let nums = [0,0,1,1,1,2,2,3,3,4]
console.log(removeDuplicates(nums))
