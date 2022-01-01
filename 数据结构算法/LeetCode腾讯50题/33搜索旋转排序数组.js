/**
假设按照升序排序的数组在预先未知的某个点上进行了旋转。
( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

你可以假设数组中不存在重复的元素。
你的算法时间复杂度必须是 O(log n) 级别。

示例 1:
输入: nums = [4,5,6,7,0,1,2], target = 0
输出: 4

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/search-in-rotated-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

**/

// 二分法
const search = (nums, target) => {
    let len = nums.length;
    if (len === 0) {
        return -1;
    }
    if (len === 1) {
        nums[0] === target ? 0 : -1;
    }
    let left = 0, right = len - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            return mid;
        }

        /**
        相比于普通排序数组二分查找
        旋转排序数组多了一层判断
        即选取的中点和 arr[0] 的比较
        **/

        if (nums[mid] >= nums[0]) {
            // 如果在 0-mid 之间
            if (target < nums[mid] && target >= nums[0]) {
                // 改变边界
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (target > nums[mid] && target <= nums[len - 1]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}

const nums = [3, 1], target = 1;
console.log(search(nums, target));