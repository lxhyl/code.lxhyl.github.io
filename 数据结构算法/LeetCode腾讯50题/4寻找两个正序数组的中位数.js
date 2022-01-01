/**
**
给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
请你找出这两个正序数组的中位数，
并且要求算法的时间复杂度为 O(log(m + n))。
你可以假设 nums1 和 nums2 不会同时为空。

示例 1:
nums1 = [1, 3]
nums2 = [2]
则中位数是 2.0

示例 2:
nums1 = [1, 2]
nums2 = [3, 4]
则中位数是 (2 + 3)/2 = 2.5

log(m+n) = log(m) * log(n);

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/median-of-two-sorted-arrays
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
**/


//采用js原生方法合并排序
const findMedianSortedArrays = (nums1, nums2) =>  {
   let arr = [...nums1,...nums2].sort((a,b)=>{
       return a - b;
   })
   if(arr.length % 2 ==0){
       return (arr[Math.floor(arr.length/2)] + arr[Math.floor(arr.length)/2 - 1])/2;
   }else{
       return arr[Math.floor(arr.length/2)];
   }
};
let nums1 = [1,2];
let nums2 = [3,4];




console.log(findMedianSortedArrays(nums1,nums2));