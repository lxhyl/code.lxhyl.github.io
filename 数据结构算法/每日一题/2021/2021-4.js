{
    // 第几个灯泡是开的
    const lightBulb = () => {
        const stdAndBulbNum = 1000
        const bulbs = Array(stdAndBulbNum).fill(false)
        for (let sdt = 1; sdt <= stdAndBulbNum; sdt++) {
            let index = sdt;
            while (index <= stdAndBulbNum) {
                bulbs[index - 1] = !bulbs[index - 1]
                index += sdt
            }
        }
        bulbs.forEach((status, index) => {
            if (status) {
                console.log(`第${index + 1}个灯泡是打开的`)
            }
        })
    }
    lightBulb()
}


{
    //   #153.
    // 双指针  时间复杂度O(N)
    const findMin = nums => {
        const len = nums.length
        if (len === 0) return
        if (len === 1) return nums[0]
        let i = 0,
            j = 1
        while (j < len && nums[i] <= nums[j]) {
            j++;
            i++
        }
        if (j >= len) {
            return nums[0]
        }
        return nums[j]
    }
    console.log(findMin([11, 13, 15, 17]))
       
}


{
    // #28 
    const strStr = function(haystack, needle) {
        if(needle === '') return 0
        if(haystack === '') return -1
        for(let i=0;i<haystack.length;i++){
            let index = 0
            while(haystack[i + index] === needle[index] && index < needle.length){
                index += 1
            }
            if(index === needle.length) return i
        }
        return -1
    }

    const haystack = "hello", needle = "ll"
    console.log(strStr(haystack,needle))
}


{
    // # 938 
    const computed = (root,low,high) => {
        let result = 0;
        const dfs = node => {
            if(!node) return
            if(node.val >= low && node.val <= high){
                result += node.val
            }
            dfs(node.left)
            dfs(node.right)
        }
        dfs(root)
        return result
    }
}