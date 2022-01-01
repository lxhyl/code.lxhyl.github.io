{   // 4的幂次方
    const fun = n => {
        const sqrt = Math.sqrt(n)
        return (Number.isInteger(sqrt) && sqrt > 0) ? (sqrt & sqrt - 1) === 0 : false
    }
    console.log(fun(16))
}

{
    // #160
    const getNode = (headA, headB) => {
        const mapObj = new Set()
        let tempNode = headA
        while (tempNode) {
            mapObj.add(tempNode)
            tempNode = tempNode.next
        }
        tempNode = headB
        while (tempNode) {
            if (mapObj.has(tempNode)) {
                return tempNode
            }
            tempNode = tempNode.next
        }
        return null
    }
}


{
    // #518
    const change = (amount, coins) => {
        const dp = new Array(amount + 1).fill(0);
        dp[0] = 1;
        for (const coin of coins) {
            for (let i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
                console.log('dp[i]:', dp[i])
            }
        }
        return dp[amount];
    }

    const amount = 5
    const coins = [1, 2, 5]
    console.log(change(amount, coins))
}

{
    // #852 
    const peakIndexInMountainArray = arr => {
        let i = 0
        while (i < arr.length - 1 && arr[i] < arr[i + 1]) {
            i++
        }
        return i
    }
    const arr = [24, 69, 100, 99, 79, 78, 67, 36, 26, 19]
    console.log(peakIndexInMountainArray(arr))
}

{
    // #94
    const inorderTraversal = root => {
        const result = []
        const helper = node => {
            if (!node) return
            helper(node.left)
            result.push(node.val)
            helper(node.right)
        }
        helper(root)
        return result;
    }
}



{
    // #98
    const isValidBST = root => {
        const valArr = []
        const dfs = node => {
            if (!node) return
            dfs(node.left)
            valArr.push(node.val)
            dfs(node.right)
        }
        dfs(root)
        let i = 0, j = 1;
        if (valArr.length <= 1) return true
        while (i < j && j < valArr.length) {
            if (valArr[i] < valArr[j]) {
                i++
                j++
            } else {
                return false
            }
        }
        return true
    }
    console.log(isValidBST(tree))
}

{
    //#102
    const levelOrder = root => {
        const result = []
        const lsfHelper = nodesArr => {
            if (nodesArr.length === 0) return
            const tempLevelArr = []
            const tempNodeArr = []
            nodesArr.forEach(itemNode => {
                if (!itemNode) return
                tempLevelArr.push(itemNode.val)
                tempNodeArr.push(itemNode.left)
                tempNodeArr.push(itemNode.right)
            });
            if (tempLevelArr.length > 0) {
                result.push([...tempLevelArr])
            }
            lsfHelper(tempNodeArr)
        }
        lsfHelper([root])
        return result
    }
}

{
    // #103
    const levelOrder = root => {
        const result = []
        const lsfHelper = (nodesArr, level) => {
            if (nodesArr.length === 0) return
            const tempLevelArr = []
            const tempNodeArr = []
            nodesArr.forEach(itemNode => {
                if (!itemNode) return
                tempLevelArr.push(itemNode.val)
                tempNodeArr.push(itemNode.left)
                tempNodeArr.push(itemNode.right)
            });
            if (tempLevelArr.length > 0) {
                if (level % 2 === 0) {
                    result.push([...tempLevelArr].reverse())
                } else {
                    result.push([...tempLevelArr])
                }
            }
            lsfHelper(tempNodeArr, level + 1)
        }
        lsfHelper([root], 1)
        return result
    }
}


{
    // #104
    const maxDepth = root => {
        const dfs = node => {
            if (!node) return 0
            return Math.max(dfs(node.left), dfs(node.right)) + 1
        }
        return dfs(root)
    }
}


{
    // #107
    const orderTree = root => {
        const result = []
        const lsfHelper = nodesArr => {
            if (nodesArr.length === 0) return
            const tempLevelArr = []
            const tempNodeArr = []
            nodesArr.forEach(itemNode => {
                if (!itemNode) return
                tempLevelArr.push(itemNode.val)
                tempNodeArr.push(itemNode.left)
                tempNodeArr.push(itemNode.right)
            });
            if (tempLevelArr.length > 0) {
                result.unshift([...tempLevelArr])
            }
            lsfHelper(tempNodeArr)
        }
        lsfHelper([root])
        return result
    }
}

{
    //#1333
    const filterRestaurants = function (restaurants, veganFriendly, maxPrice, maxDistance) {
        const filtersArr = restaurants.filter(rest => {
            return rest[3] <= maxPrice && rest[4] <= maxDistance
        }).filter(rest => {
            if (veganFriendly === 1) {
                return rest[2] === 1
            }
            return true
        })
        filtersArr.sort((a, b) => {
            if (a[1] < b[1]) {
                return 1
            } else if (a[1] === b[1]) {
                return b[0] - a[0]
            } else {
                return -1
            }
        })
        return filtersArr.map(item => item[0])
    };
    const restaurants = [[1, 4, 1, 40, 10], [2, 8, 0, 50, 5], [3, 8, 1, 30, 4], [4, 10, 0, 10, 3], [5, 1, 1, 15, 1]],
        veganFriendly = 1,
        maxPrice = 50,
        maxDistance = 10;
    console.log(filterRestaurants(restaurants, veganFriendly, maxPrice, maxDistance))
}

{
    // #1
    const twoSum = (nums, target) => {
        for (let i = 0; i < nums.length; i++) {
            for (let j = 0; i < nums.length; j++) {
                if (i !== j && (nums[i] + nums[j] === target)) {
                    return [i, j]
                }
            }
        }
        return []
    }
    let nums = [2, 7, 11, 15], target = 9
    console.log(twoSum(nums, target))


    const twoSum = (nums, target) => {
        const gapMap = new Map(nums.map((num, index) => [num, index]))
        for (let i = 0; i < nums.length; i++) {
            if (gapMap.has(target - nums[i])) {
                return [i, gapMap.get(target - nums[i])]
            }
        }
        return []
    }

    const twoSum = (nums, target) => {
        const gapMap = new Map()
        for (let i = 0; i < nums.length; i++) {
            if (gapMap.has(target - nums[i])) {
                return [i, gapMap.get(target - nums[i])]
            }
            gapMap.set(nums[i], i)
        }
        return []
    }

}


{
    // #剑指offer 38.
    const permutation = s => {
        const result = []
        const sArr = s.split('')
        // 递归函数，strs为排列中的字符串，使用数组（栈会更好）存储，indexs为已经排列了的字符串的索引
        const helper = (strs, indexs) => {
            // 排列完成
            if (strs.length === sArr.length) {
                result.push([...strs])
                return
            }
            // 选择一个字符串进行组合
            for (let i = 0; i < sArr.length; i++) {
                // 判断此字符是否排列过了
                if (!indexs.includes(i)) {
                    // 未排列，则将此字符进行排列
                    strs.push(sArr[i])
                    // 标记索引
                    indexs.push(i)
                    helper(strs, indexs)
                    // 运行至此，则说明已经找到一个满足条件的排列组合了
                    // 进行回溯，由于函数参数是按值传递的，且为引用类型，所以直接pop移除栈顶元素即可
                    indexs.pop()
                    strs.pop()
                }
            }
        }
        for (let i = 0; i < sArr.length; i++) {
            helper([sArr[i]], [i])
        }
        return Array.from(new Set(result.map(item => item.join(''))))
    }
    const str = 'aab'
    console.log(permutation(str))
}


{
    // #剑指Offer.15.二进制中1的个数
    const hammingWeight = n => {
        let result = 0;
        for (let i = 0; i < 32; i++) {
            if ((n & (1 << i)) !== 0) {
                result++
            }
        }
        return result
    }
}

{
    // #149.直线上最多的点
    const maxPoints = points => {
        const len = points.length
        if (len <= 2) return len
        let result = 0
        const gcd = (a, b) => {
            return b !== 0 ? gcd(b, a % b) : a
        }
        const computeSlopeBy2Points = (a, b) => {
            let dx = b[0] - a[0]
            let dy = b[1] - a[1]
            // Δx=0时，直线方程为 x = c，此时的斜率可以表示为c/0,为了方便代码统计把c取任意常量
            if (dx === 0) {
                dy = 1;
            }
            // Δy=0时，直线方程为 y = c
            if (dy === 0) {
                dx = 1;
            }
            // 目的是把负号移到分子 
            if (dy < 0) {
                dx = -dx;
                dy = -dy;
            }
            // 约为最简分数
            const dgcd = gcd(Math.abs(dx), Math.abs(dy));
            dx /= dgcd;
            dy /= dgcd;
            return `${dx}/${dy}`
        }
        for (let i = 0; i < len; i++) {
            const slopeMap = {}
            for (let j = i + 1; j < len; j++) {
                const slope = computeSlopeBy2Points(points[i], points[j])
                if (!slopeMap[slope]) {
                    slopeMap[slope] = 1
                } else {
                    slopeMap[slope] += 1
                }
            }
            let maxNum = 0;
            for (let slope in slopeMap) {
                maxNum = Math.max(maxNum, slopeMap[slope] + 1)
            }
            result = Math.max(result, maxNum)
        }
        return result
    }
    const points = [[1, 1], [2, 2], [3, 3]]
    console.log(maxPoints(points))
}


{
    // # 752
    const openLock = (deadends, target) => {
        if (target === '0000') return 0
        if (deadends.includes('0000')) return -1
        // 标记已经转到的数字
        const markTarget = {}
        // 计算下次可能的数字
        const makeAllTarget = t => {
            const arrT = t.split('').map(s => +s)
            const res = []
            for (let i = 0; i < arrT.length; i++) {
                let a = [...arrT]
                let b = [...arrT]
                if (a[i] < 9) {
                    a[i] += 1
                } else {
                    a[i] = 0
                }
                if (b[i] > 0) {
                    b[i] -= 1
                } else {
                    b[i] = 9
                }
                a = a.join('')
                b = b.join('')
                if (!deadends.includes(a) && !markTarget[a]) {
                    res.push(a)
                }
                if (!deadends.includes(b) && !markTarget[b]) {
                    res.push(b)
                }
                markTarget[a] = 1
                markTarget[b] = 1
            }
            return res
        }

        let result = 0
        // 判断是否没有答案
        let noSolve = false
        // 广度优先遍历
        const bfs = tArr => {
            result += 1
            if (tArr.includes(target)) return
            const nextLevel = []
            tArr.forEach(item => {
                nextLevel.push(...makeAllTarget(item))
            })
            if (nextLevel.length === 0) {
                noSolve = true
                return
            }
            bfs(nextLevel)
        }
        const firstLevel = makeAllTarget('0000')
        bfs(firstLevel)
        return noSolve ? -1 : result
    }
    const deadends = ["0201", "0101", "0102", "1212", "2002"], target = "0202"
    console.log(openLock(deadends, target))
}

{
    // #773.滑动谜题
    const slidingPuzzle = board => {
        const strBoard = board.flat(2).join('')
        if (strBoard === '123450') return 0
        /*
        *  将二维转为一维，方便操作
        *  0 1 2
        *  3 4 5
        *  手动写出，i可能移动的位置
        *  比如 0 可以和neighbor[0]数组内的索引处字符交换位置
        */
        const neighbor = [
            [1, 3],
            [0, 2, 4],
            [1, 5],
            [0, 4],
            [1, 3, 5],
            [2, 4]
        ]
        // 存储已经遍历过的状态
        const markStatus = {}
        markStatus[strBoard] = true
        // 求出所有的可交换的结果
        const allPossible = b => {
            const zeroIndex = b.indexOf('0')
            const possbileNeb = neighbor[zeroIndex]
            const res = []
            for (let i = 0; i < possbileNeb.length; i++) {
                const tempB = b.split('')
                tempB[zeroIndex] = tempB[possbileNeb[i]]
                tempB[possbileNeb[i]] = '0'
                const strTempB = tempB.join('')
                if (!markStatus[strTempB]) {
                    res.push(strTempB)
                }
                markStatus[strTempB] = true
            }
            return res
        }
        // 第一层
        let step = 0
        let noSolve = false
        const bfs = boards => {
            step += 1
            if (boards.includes('123450')) return
            const nextLevel = []
            boards.forEach(s => {
                nextLevel.push(...allPossible(s))
            })
            if (nextLevel.length === 0) {
                noSolve = true
                return
            }
            bfs(nextLevel)
        }
        bfs(allPossible(strBoard))
        return noSolve ? -1 : step
    }
    const board = [[3, 2, 4], [1, 5, 0]]
    console.log(slidingPuzzle(board))
}


{
    // #909.蛇梯棋i
    const snakesAndLadders = board => {
        const oneBoard = []
        // 将二维展开为1维
        let pushWay = 'order'
        for (let i = board.length - 1; i >= 0; i--) {
            if (pushWay === 'order') {
                oneBoard.push(...board[i])
                pushWay = 'flashback'
            } else {
                oneBoard.push(...board[i].reverse())
                pushWay = 'order'
            }
        }
        const startIndex = 0, endIndex = oneBoard.length - 1
        if (startIndex >= endIndex) return 0
        // 存储走过的格子
        const markStatus = {}
        // 找到下一步所有可能的格子
        const allNextStep = index => {
            const res = []
            for (let i = 1; i <= 6; i++) {
                let nextStepIndex = Number(index) + Number(i)
                if (oneBoard[nextStepIndex] !== -1) {
                    nextStepIndex = oneBoard[nextStepIndex]
                    // 注意，格子的编号是从1开始的，和索引不一致，减一转换为索引
                    nextStepIndex -= 1
                }
                if (!markStatus[nextStepIndex] && (nextStepIndex <= endIndex)) {
                    res.push(nextStepIndex)
                }
                markStatus[nextStepIndex] = true
            }
            return res
        }
        let result = 0
        let noSolve = false
        // 广度优先遍历
        const bfs = steps => {
            result += 1
            // 路线中包含终点
            if (steps.includes(endIndex)) return
            // 下一步所有可能的格子
            const nextArr = []
            steps.forEach(item => nextArr.push(...allNextStep(item)))
            // 无结果
            if (nextArr.length === 0) {
                noSolve = true
                return
            }
            bfs(nextArr)
        }
        bfs(allNextStep([0]))
        return noSolve ? -1 : result
    }
    // [-1,8,9,8,9,-1,-1,-1,-1]
    const board = [[-1, -1, -1], [-1, 9, 8], [-1, 8, 9]]
    console.log(snakesAndLadders(board))
}


{
    // #168.Excel表名称
    const convertToTitle = columnNumber => {
        /**
         * 
         * @param {Number} n  0-25  
         * @returns 得到A-Z的字母
         */
        const getString = n => String.fromCharCode(n + 'A'.charCodeAt())
        const result = []
        while(columnNumber !== 0){
            /**
             *  columnNumber是从1开始计数的
             *  求取字符的函数参数（也就是A-Z）是从0开始的
             *  所以减一
             */
            columnNumber--
            // 求模得到最后一位
            const r = columnNumber % 26 
            result.unshift(getString(r))
            columnNumber = Math.floor(columnNumber/26)
        }
       return result.join('')
    }
    let columnNumber = 1
    console.log(convertToTitle(columnNumber))
}


{
    // #297.二叉树的序列化与反序列化
    const serialize = root => {
        const result = []
        const dfs = node => {
            if(!node){
                result.push('NULL')
                return
            }
            result.push(node.val)
            dfs(node.left)
            dfs(node.right)
        }
        dfs(root)
        return result.join(',')
    }
    const deserialize = data => {
        const dfs = nodeArr => {
            if(nodeArr[0] === 'NULL'){
                nodeArr.shift()
                return null
            }
            const root = {val:parseInt(nodeArr[0])}
            nodeArr.shift()
            root.left = dfs(nodeArr)
            root.right = dfs(nodeArr)
            return root
        }
        return dfs(data.split(','))
    }
    const root = {
        val:1,
        left:{
            val:11,
            right:{
                val:111
            }
        },
        right:{
            val:2
        }
    }
    console.log(deserialize(serialize(root)))
}

{
    // #27.移除元素
    const removeElement = (nums,val) => {
        let i =0;
        while(nums[i] !== undefined){
            if(nums[i] === val){
                if(i !== nums.length -1){
                  nums[i] = nums.pop()
                }else{
                    nums.pop()
                }
            }else{
                i++
            }
        }
        return nums.length
    }
    const nums = [3,2,2,3], val = 3
    console.log(removeElement(nums,val))
}


{
    // #690.员工的重要性
    const getImportance = (employees,id) => {
        const employeesObj = {}
        for(let i=0;i<employees.length;i++){
            const item = employees[i]
            employeesObj[item.id] = {
                importance:item.importance,
                subordinates:item.subordinates
            }
        }
        console.log(employeesObj)
        let result = employeesObj[id]?.importance
        const bfs = s => {
            s.forEach(item => {
               result += employeesObj[item].importance
               if(employeesObj[item].subordinates.length > 0){
                   bfs(employeesObj[item].subordinates)
               }
            })
        }
        bfs(employeesObj[id].subordinates)
        return result
    }
    const employees =[[1, 5, [2, 3]], [2, 3, []], [3, 3, []]], id = 1
    console.log(getImportance(employees,id))
}

