/**
合并 k 个排序链表，返回合并后的排序链表。
请分析和描述算法的复杂度。

示例:
输入:
[
  1->4->5,
  1->3->4,
  2->6
]
输出: 1->1->2->3->4->4->5->6

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-k-sorted-lists
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
**/

// 暴力求解

const mergeKLists = (lists) => {
    if (lists.length == 0) {
        return null;
    }
    let arr = [];
    for (let i = 0; i < lists.length; i++) {
        if (lists[i] === null) {
            continue;
        } else {
            arr.push(lists[i].val)
            let tempList = lists[i].next;
            while (tempList) {
                arr.push(tempList.val);
                tempList = tempList.next;
            }
        }
    }
    if (arr.length === 0) {
        return null;
    }
    arr = arr.sort((a, b) => a - b)
    let result = {
        val: arr[arr.length - 1],
        next: null
    }
    for (let i = arr.length - 2; i >= 0; i--) {
        let temp = {
            val: arr[i],
            next: result
        }
        result = temp;
    }
    return result;
}



let lists = [

    {
        val: 1,
        next: {
            val: 2,
            next: {
                val: 4,
                next: null
            }
        }
    },
    {
        val: 1,
        next: {
            val: 2,
            next: {
                val: 4,
                next: null
            }
        }
    },
    {
        val: 1,
        next: {
            val: 2,
            next: {
                val: 4,
                next: null
            }
        }
    },
]
let lists2 = [[], []]
console.log(mergeKLists(lists2))
