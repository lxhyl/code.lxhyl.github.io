{
    // #LCP 07.传递信息
    const numWays = (n,relation,k) => {
        const allWaysMap = Array(n).fill(null).map(() => Array())
        for(let [start,next] of relation){
            allWaysMap[start].push(next)
        }
        let result = 0;
        const dfs = (index,step) => {
            if(step === k){
                if(index === n -1){
                   result++
                }
                return
            }else{
                allWaysMap[index].forEach(item => {
                    dfs(item,step + 1)
                })
            }
        }
        dfs(0,0)
        return result
    }
    const n = 5, relation = [[0,2],[2,1],[3,4],[2,3],[1,4],[2,0],[0,4]], k = 3
    console.log(numWays(n,relation,k))
}

{
    // #3.无重复字符的最长子串
    const lengthOfLongestSubstring = s => {
        const len = s.length
        if(len <= 1) return len
        let i = 0;
        let result = 0
        while(i < len - 1){
            let j = i + 1;
            const set = new Set()
            set.add(s[i])
            while(!set.has(s[j]) && j<len){
                set.add(s[j])
                j++
            }
            let childLen = set.size
            result = childLen > result ? childLen : result
            i++
        }
        return result
    }
    const s = "dvdf"
    console.log(lengthOfLongestSubstring(s))
}

{
    // #雪糕的最大数量
    const maxIceCream = (costs,coins) => {
        costs.sort((a,b) => a - b)
        let result = 0;
        for(let i=0; i<costs.length; i++){
            if(coins >= costs[i]){
                result += 1
                coins -= costs[i]
            }else{
                break
            }
        }
        return result
    }
    const costs = [1,3,2,4,1], coins = 7
    console.log(maxIceCream(costs,coins))
}

{
    // #451.根据字符出现的频率排序
    const frequencySort = s => {
        const len = s.length
        if(s.length <= 1) return s
        const strNumMap = {}
        for(let i=0;i<len;i++){
           strNumMap[s[i]] =  strNumMap[s[i]] ?  strNumMap[s[i]] + 1 : 1  
        }
        const strNumArr = []
        for(let key in strNumMap){
            strNumArr.push({
                s:key,
                n:strNumMap[key]
            })
        }
        strNumArr.sort((a,b) => b.n - a.n)
        return strNumArr.map(item => {
            let str = ''
            let i = 1
            while(i <= item.n){
                str += item.s
                i++
            }
            return str
        }).join('')
    }
    const s = 'tree'
    console.log(frequencySort(s))
}

{
    // # 509.斐波那契数列
    const fib = n => {
        const dp = []
        dp[0] = 0
        dp[1] = 1
        if(n <= 1) return dp[n]
        let i = 2
        while(i <= n){
            dp[i] = dp[i-1] + dp[i-2]
            i++
        }
        return dp[n]
    }
    console.log(fib(4))
}

{
    // #1137.第n个泰波那契数 
    const tribonacci = n => {
        const dp = [0,1,1]
        if(n <= 2) return dp[n]
        let i = 3
        while(i <= n){
            dp[i] = dp[i-1] + dp[i-2] + dp[i-3]
            i++
        }
        return dp[n]
    }
    const n = 25
    console.log(tribonacci(n))
}


{
    // #645.错误的集合
    const findErrorNums = nums => {
       const numsMap = new Map()
       nums.forEach(item => {
           if(!numsMap.has(item)){
               numsMap.set(item,1)
           }else{
               numsMap.set(item,2)
           }
       })
       let miss,mult
       for(let i=1;i<=nums.length;i++){
           if(!numsMap.has(i)){
               miss = i
           }
           if(numsMap.get(i) === 2){
               mult = i
           }
       }
       return [mult,miss]
    }
    const nums = [3,2,3,4,6,5]
    console.log(findErrorNums(nums))
}

{
    // # 70.爬楼梯
    // 状态转移方程 f(x) = f(x-1) + f(x-2)
    // 每次爬楼梯向前一步或两部，所以爬到第x层的方法等于x-1层的方法加上x-2层
    const climbStairs = n => {
        const dp = []
        dp[1] = 1
        dp[2] = 2
        let i = 3
        while(i<=n){
            dp[i] = dp[i-1] + dp[i-2]
            i++
        }
        return dp[n]
    }
    const climbStairs = n => {
        let x1=0,x2=0
        let x = 1
        for(let i=1;i<=n;i++){
           x1 = x2
           x2 = x
           x = x1 + x2
        }
        return x
    }
    console.log(climbStairs(3))
}

{
    // # 746.使用最小话费爬楼梯

    const minCostClimbingStairs = cost => {
        const len = cost.length
        const dp = Array(len + 1)
        dp[0] = 0
        dp[1] = 0
        let i=2
        while(i <= len){
           dp[i] = Math.min(dp[i-1] + cost[i-1],dp[i-2] + cost[i-2])
           i++
        }
        return dp[len]
    }
    const cost =  [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
    console.log(minCostClimbingStairs(cost))
}

{
    // #198.大家劫舍
    const rob =  nums => {
        const len = nums.length
        if(len === 1) return nums[0]
        if(len === 2) return Math.max(nums[0],nums[1])
        const dp = Array(len)
        dp[0] = nums[0]
        dp[1] = Math.max(nums[0],nums[1])
        let i = 2;
        while(i<len){
            dp[i] = Math.max(dp[i-1],dp[i-2] + nums[i])
            i++
        }
        return dp[len-1]
    }
    const nums = [2,7,9,3,1]
    console.log(rob(nums))
}


{
    // #213.打家劫舍2
    const rob = nums => {
        const len = nums.length
        if(len === 1) return nums[0]
        if(len === 2) return Math.max(nums[0],nums[1])
        const steal = (start,end) => {
           let first = nums[start]
           let second = Math.max(nums[start],nums[start + 1])
           for(let i = start + 2; i<=end; i++){
              const  t = Math.max(first + nums[i],second)
              first = second
              second = t
           }
           return second
        }
        return Math.max(steal(0,len-2),steal(1,len-1))
    }
    const nums  = [1,3,1,3,100]
    console.log(rob(nums))
}


{
    // #740.删除并获得点数

    const deleteAndEarn = nums => {
        const len = nums.len
        if(len === 0) return 0
        if(len === 1) return nums[0]
        const numsCount = {}
        nums.forEach(n => {
            if(n in numsCount){
                numsCount[n] += 1
            }else{
                numsCount[n] = 1
            }
        })
        const numsSum = []
        for(let key in numsCount){
            numsSum[key] = Number(key) * numsCount[key]
        }
        const dp = Array(len)
        dp[0] = numsSum[0] || 0
        dp[1] = Math.max(numsSum[0] || 0,numsSum[1] || 0)
        let i = 2
        while(i < numsSum.length){

            dp[i] = Math.max(dp[i-1],dp[i-2] + numsSum[i] || 0)
            i++
        }
        return dp[numsSum.length - 1]
    }
    const nums  = [3,4,2]
    console.log(deleteAndEarn(nums))
}

{
    const displayTable = orders => {
        const tablesObj = {}
        const allProductSet = new Set()
        for(let i=0;i<orders.length;i++){
            [_,tableNum,product] = orders[i]
            allProductSet.add(product)
            if(!tablesObj[tableNum]){
                tablesObj[tableNum] = {}
            }
            if(!tablesObj[tableNum][product]){
               tablesObj[tableNum][product] = 1
            }else{
                tablesObj[tableNum][product]++
            }
        }
        const titles = Array.from(allProductSet).sort()
        titles.unshift('Table')
        const result = [titles]
        for(let table in tablesObj){
            const nums = [table]
            for(let i=1;i<titles.length;i++){
                if(!tablesObj[table][titles[i]]){
                    nums.push("0")
                }else{
                    nums.push(tablesObj[table][titles[i]].toString())
                }
            }
            result.push(nums)
        }
        return result
    }
    const orders = [["David","3","Ceviche"],["Corina","10","Beef Burrito"],["David","3","Fried Chicken"],["Carla","5","Water"],["Carla","5","Ceviche"],["Rous","3","Ceviche"]]
    console.log(displayTable(orders))
}


{
    // #1711.大餐计数
    const countPairs = deliciousness => {
        let result = 0
        const mod = 10**9 + 7
        let len = deliciousness.length
        const max = Math.max(...deliciousness) * 2
        if(len <= 1) return 0
        if(len === 2) return 1
        const map = new Map()
        for(let i =0; i<len;i++){
           const val = deliciousness[i]
           for(let j=1;j <= max;j <<= 1){
              const count = map.get(j - val) || 0
              result = (result + count) % mod
           }
           map.set(val,(map.get(val) || 0) + 1)
        }
        return result
    }
    const deliciousness = [2160,1936,3,29,27,5,2503,1593,2,0,16,0,3860,28908,6,2,15,49,6246,1946,23,105,7996,196,0,2,55,457,5,3,924,7268,16,48,4,0,12,116,2628,1468]
    console.log(countPairs(deliciousness))
}

{
    // #930.和相同的二元子数组
    // 暴力
    const numSubarraysWithSum = (nums,goal) => {
        const len = nums.length
        let result = 0
        nums.forEach((n,index) => {
            let j = index
            let sum = 0
            while(j<len){
               sum += nums[j]
               if(sum < goal){
                   j++
                   continue
               }
               if(sum === goal){
                   result += 1
                   j++
                   continue
               }
               if(sum > goal){
                   return
               }
            }
        })
        return result
    }
    const nums = [0,0,0,0,0], goal = 0
    console.log(numSubarraysWithSum(nums,goal))
}

{
     // #面试题 17.10.主要元素
     const majorityElement = nums => {
         const nMap = new Map()
         const len = nums.length
         const halfLen = Math.floor(len / 2)
         for(let i = 0;i<len;i++){
             nMap.set(nums[i],(nMap.get(nums[i]) || 0) + 1)
             if(nMap.get(nums[i]) > halfLen){
                 return nums[i]
             }
         }
         return -1
     }
     const majorityElement = nums => {
         let m
         let n = 0
         nums.forEach(item => {
             console.log('m==>',m,';','n==>',n)
             if(n === 0){
                 m = item
                 n = 1
             }else if(m === item){
                 n++
             }else{
                 n--
             }
         })
         let mNum = 0
         for(let i =0;i<nums.length;i++){
             if(nums[i] === m){
                 mNum++
             }
             if(mNum > Math.floor(nums.length / 2)){
                 return m
             }
         }
         return -1
     }
     const nums =[1,2,5,9,5,9,5,5,5]
     console.log(majorityElement(nums))
}

{
    // #981.基于时间的键值存储
    const TimeMap = function(){
        this.store = new Map()
        return this
    }
    TimeMap.prototype.set = function(key,value,timestamp){
       if(this.store.has(key)){
           this.store.get(key).push([value,timestamp])
       }else{
           this.store.set(key,[[value,timestamp]])
       }
    }
    TimeMap.prototype.get = function(key,timestamp){
        let pairs = this.store.get(key)
        if (pairs) {
            let low = 0, high = pairs.length - 1;
            while (low <= high) {
                let mid = Math.floor((high - low) / 2) + low;
                if (pairs[mid][1] > timestamp) {
                    high = mid - 1;
                } else if (pairs[mid][1] < timestamp) {
                    low = mid + 1;
                } else {
                    return pairs[mid][0];
                }
            }
            if (high >= 0) {
                return pairs[high][0];
            }
            return "";
        }
        return "";
    }
    const timemap = new TimeMap()
    console.log(timemap)
}

{
    // # 274.H指数
    const hIndex = citations => {
        citations.sort((a,b) => b - a)
        let h = 0
        let i = 0
        while(i<citations.length &&  citations[i] > h){
            h++
            i++ 
        }
        return h
    }
    const citations =  [1,3,1]
    console.log(hIndex(citations))
}

{
    // #275.H指数2
    const hIndex = citations => {
        let h = 0;
        let i = citations.length - 1;
        while(i>=0 && citations[i] > h){
            h++
            i--
        }
        return h
    }
    const citations =  [1,1,3]
    console.log(hIndex(citations))
}

{
    // #1846
    const maximumElementAfterDecrementingAndRearranging = arr => {
       arr.sort((a,b) => a - b)[0] = 1
       let result = 1
       for(let i = 1;i<arr.length;i++){
           if(arr[i] - arr[i-1] > 1){
               arr[i] = arr[i-1] + 1
           }
       }
       return arr[arr.length - 1]
    }
    const maximumElementAfterDecrementingAndRearranging = arr => {
        return arr.sort((a,b) => a - b).reduce((l,n) => Math.min(l + 1,n),0)
    }
    const arr = [2,2,1,2,1]
    console.log(maximumElementAfterDecrementingAndRearranging(arr))
}

{
    // #剑指Offer.53
    const search = (nums,target) => {
        let left = 0,right = nums.length - 1
        while(left <= right){
            const mid = Math.floor((left + right) / 2)
            if(nums[mid] < target){
                left = mid + 1
            }else if(nums[mid] >= target){
                right = mid - 1
            }
        }
        let result = 0
        while(left < nums.length && nums[left] === target){
            left++
            result++
        }
        return result
    }
    const nums = [1], target = 1
    console.log(search(nums,target))
}

{
    // 剑指Offer 42.
    const maxSubArray = nums => {
       const len = nums.length
       if(len === 0) return 0
       if(len === 1) return nums[0]
       const dp = [0]
       dp[0] = nums[0]
       for(let i = 1;i<len;i++){
           dp[i] = Math.max(dp[i-1] + nums[i],nums[i]) 
       }
       return  Math.max(...dp)
    }
    const nums = [-2,-1]
    console.log(maxSubArray(nums))
}


{
    // #面试题 10.02
    const groupAnagrams = strs => {
        const sortStrs = strs.map(item => ({
            sortStr:[...item].sort(),
            str:item
        }))
        const map = new Map()
        sortStrs.forEach(item => {
            const key = item.sortStr.join('')
            const val = map.has(key) ? map.get(key) : []
            val.push(item.str)
            map.set(key,val)
        })
        return Array.from(map.values())
    }
    const strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
    console.log(groupAnagrams(strs))
}

{
    // # 剑指Offer 52.
    const getIntersectionNode = (headA,headB) => {
        const setObj = new Set()
        let tempNode = headA
        while(tempNode){
            setObj.add(tempNode)
            tempNode = tempNode.next
        }
        tempNode = headB
        while(tempNode){
            if(setObj.has(tempNode)){
                return tempNode
            }
            tempNode =  tempNode.next
        }
        return null
    }
}

{
    const restoreArray = adjacentPairs => {
        const nums = {}
        for(let i = 0;i<adjacentPairs.length;i++){
            const [num1,num2] = adjacentPairs[i]
            const arr1 = nums[num1] || []
            const arr2 = nums[num2] || []
            arr1.push(num2)
            arr2.push(num1)
            nums[num1] = arr1
            nums[num2] = arr2
        }
        // 结果
        const res = []
        // 标记已经push进结果的
        const markObj = {}
        for(let key in nums){
            if(nums[key].length === 1){
                res[0] = Number(key)
                markObj[key] = true
                break
            }
        }
      
        // 相邻的一个或两个数
        let next = nums[res[res.length - 1]]
        while(next !== undefined){
            // n2 可能为undefined
            const [n1,n2] = next
            let n = markObj[n1] ? n2 : n1
            if(n !== undefined){
                res.push(n)
                next = nums[n]
                markObj[n] = true
            }else{
                break
            }
        }
       
        return res
    }
    const adjacentPairs = [[2,1],[3,4],[3,2]]
    console.log(restoreArray(adjacentPairs))
} 

{
    // #671.二叉树中第二小的节点
    const findSecondMinimumValue = root => {
        if(!root) return -1
        const rootVal = root.val
        let secondMin = null
        const dfs = node => {
            if(!node) return
            if(node.val !== rootVal){
                if(secondMin === null){
                    secondMin = node.val
                }else if(node.val < secondMin){
                    secondMin = node.val
                }
            }
            dfs(node.left)
            dfs(node.right)
        }
        dfs(root)
        return secondMin === null ? -1 : secondMin
    }
}

{
    // # 863.二叉树中所有距离为k的节点
    const distanceK = (root,target,k) => {
        // 将所有节点加上parent指向其父节点，方便后面的深度优先搜索
        const addParentsDFS = node => {
            if(!node) return
            if(node.left) node.left.parent = node
            if(node.right) node.right.parent = node
            addParentsDFS(node.left)
            addParentsDFS(node.right)
        }
        addParentsDFS(root)
        // 结果
        const result = []
        // 标记已经遍历过的节点，避免DFS时重复计算
        const mark = new Map()
        /**
         * 
         * @param {*} node 当前节点
         * @param {*} d 距离target的距离
         */
        const findDistanceKDFS = (node,d) => {
            if(!node) return
            if(mark.has(node)) return
            mark.set(node,true)
            if(d === k){
                result.push(node.val)
                return
            }
            // 大于k的就不用再遍历了
            if(d > k) return
            findDistanceKDFS(node.left,d+1)
            findDistanceKDFS(node.right,d+1)
            findDistanceKDFS(node.parent,d+1)
        }
        // 从target处开始遍历
        findDistanceKDFS(target,0)
        return result
    }
}

{
   // #1104 二叉树寻路
   const pathInZigZagTree = label => {
       const paths = []
       // 计算当前位于第几层
       // l = log2(n) + 1 
       let l = Math.floor(Math.log(label) / Math.log(2) + 1)
       console.log(l) 
       while(label > 1){
           paths.push(label)
           l--
           // 之字形完全二叉树左右对称的数只和相同，
           // 而两边的数是知道的，正常顺序的父节点也是知道的，所以就可以求出对称的了
           const lMin = Math.pow(2,l) - 1
           const lMax = Math.pow(2,l - 1)
           label = lMax + lMin - Math.floor(label / 2)
       }
       paths.push(1)
       return paths.reverse()
   }
   console.log(pathInZigZagTree(26))
}

{
    // #171.Excel表列序号
    const titleToNumber = columnTitle => {
        // 获取字符对应的数字
        const str2num = s => s.charCodeAt() - 'A'.charCodeAt() + 1
        const titleArr = columnTitle.split('')
        const len = titleArr.length
        if(len === 0) return 0
        let result = 0
        let i = 0
        while(titleArr.length > 0){
           // 从个位数开始
           const s = titleArr.pop()
           // 26进制每一位对应的值为 x * 26^n (x为当前位的数字，n为第几位) 
           result += (str2num(s) * Math.pow(26,i))
           // 下一位
           i++
        }
        return result
    }
    const columnTitle = "FXSHRXW"
    console.log(titleToNumber(columnTitle))
}

{
    // #987.二叉树的垂序遍历
    const verticalTraversal = root => {
        // 存储每个坐标的值
        const positionMap = new Map()
        // 生成并缓存key，同一个坐标应该用同一个坐标对象
        const keyCache = {}
        const makeMapKey = (col,row) => {
             const key = `${col}===${row}`
             if(keyCache[key]){
                 return keyCache[key]
             }else{
                 const keyObj = {col,row}
                 keyCache[key] = keyObj
                 return keyObj
             }
        }
        /**
         * 
         * @param {object} node 节点
         * @param {number} col  第几列
         * @param {number} row  第几行
         */
        const dfs = (node,col,row) => {
           if(!node) return
           const key = makeMapKey(col,row)
           // key为横纵坐标，横纵坐标相同时需要进行排序
           const positionVal = positionMap.get(key) || []
           positionVal.push(node.val)
           positionMap.set(key,positionVal)
           dfs(node.left,col - 1,row + 1)
           dfs(node.right,col + 1,row + 1)
        }
        dfs(root,0,0)
        const pstMap = new Map()
        positionMap.forEach((item,key) => {
            // 相同坐标的排序
            if(item.length > 1){
                item.sort((a,b) => a - b)
            }
            // 转为以列为索引的数据结构
            const val = pstMap.get(key.col) || []
            val.push({
                col:key.col,
                row:key.row,
                val:item
            })
            pstMap.set(key.col,val)
        })
        const arr = []
        pstMap.forEach(item => arr.push(item))
        const colObj = []
        arr.forEach(item => {
            // 每一行，从小到大，也就是二叉树由上至下
            item.sort((a,b) => a.row - b.row)
            const allRow = []
            // 排序后，就不需要行了，所以收集同一列的数据
            item.forEach(json => allRow.push(...json.val))
            colObj.push({col:item[0].col,val:allRow})
        })
        // 按列排序
        return colObj.sort((a,b) => a.col - b.col).map(item => item.val)
    }

}