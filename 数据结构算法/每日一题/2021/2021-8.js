{
    // #1337.矩阵中战斗力最弱的k行
    const kWeakestRows = (mat, k) => {
        const arr = Array(mat.length - 1)
        for (let row = 0; row < mat.length; row++) {
            let col = 0
            let n = 0
            while (col < mat[row].length && mat[row][col] === 1) {
                n++
                col++
            }
            arr[row] = { row, n }
        }
        return arr.sort((a, b) => a.n - b.n).map(item => item.row).slice(0, k)
    }
    const mat =
        [[1, 1, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1]]
    const k = 3
    console.log(kWeakestRows(mat, k))
}

{
    // #743.网络延迟时间
    const networkDelayTime = (times, n, k) => {
        const sideMap = {}
        times.forEach(item => {
            const [source, target, time] = item
            if (!sideMap[source]) {
                sideMap[source] = {}
            }
            sideMap[source][target] = time
        })
        // 标记节点，如果遍历过就移除
        const mark = new Set()
        for (let i = 1; i <= n; i++) {
            mark.add(i)
        }
        // 键为节点，值为k节点到此节点的最短时间
        const result = new Map()
        /**
         * 
         * @param node  当前节点
         * @param  t 到当前节点的时间
         * @returns 
         */
        const dfs = (node, t) => {
            // 遍历过了 移除此节点 
            mark.delete(node);
            // 找到到此节点的时间和最小值
            if (!result.has(node)) {
                result.set(node, t)
            } else if (result.get(node) > t) {
                result.set(node, t)
            } else {
                return
            }
            // 下一个节点不存在
            if (!sideMap[node]) return
            // 递归
            const keys = Object.keys(sideMap[node])
            keys.forEach(item => dfs(Number(item), t + sideMap[node][item]))
        }
        dfs(k, 0)
        if (mark.size > 0) return -1
        // 木桶理论，走完所有节点的最短时间为所有节点中的最大值
        return Math.max(...result.values())
    }
    const times = [[2, 1, 1], [2, 3, 1], [3, 4, 1]], n = 4, k = 2
    console.log(networkDelayTime(times, n, k))
}

{
    // #581.最短无序连续字数组
    const findUnsortedSubarray = nums => {
        const copyNums = [...nums].sort((a, b) => a - b)
        const len = nums.length
        let left = null
        let right = null
        for (let i = 0; i < len; i++) {
            if (copyNums[i] !== nums[i]) {
                left = i
                break
            }
        }
        for (let i = len - 1; i >= 0; i--) {
            if (copyNums[i] !== nums[i]) {
                right = i
                break
            }
        }
        if (left === null) {
            return 0
        } else {
            return right - left + 1
        }
    }
    const nums = [1]
    console.log(findUnsortedSubarray(nums))
}

{
    // #611.有效的三角形的个数
    const triangleNumber = nums => {
        nums.sort((a, b) => a - b)
        const len = nums.length
        if (len <= 2) return 0
        let result = 0
        for (let i = 0; i < len - 2; i++) {
            for (let j = i + 1; j < len - 1; j++) {
                const sideSum = nums[i] + nums[j]
                let left = j + 1
                let right = len - 1
                let k = j
                while (left <= right) {
                    const mid = Math.floor((right + left) / 2)
                    if (nums[mid] < sideSum) {
                        k = mid
                        left = mid + 1
                    } else {
                        right = mid - 1
                    }
                }
                result += k - j

            }
        }
        return result
    }
    const nums = [2, 2, 3, 4]
    console.log(triangleNumber(nums))
}

{
    // # 802.找到最终的安全状态
    const eventualSafeNodes = graph => {
        const len = graph.length
        const result = []
        // 标记节点
        const mark = Array(len).fill('init')
        const isSafeDfsHelper = index => {
            if (mark[index] === 'ing') return false
            if (mark[index] === 'safe') return true
            // 打标记
            mark[index] = 'ing'
            for (let i = 0; i < graph[index].length; i++) {
                if (!isSafeDfsHelper(graph[index][i])) {
                    return false
                }
            }
            // 搜索完毕 是安全节点
            mark[index] = 'safe'
            return true
        }
        graph.forEach((_, index) => {
            if (isSafeDfsHelper(index)) {
                result.push(index)
            }
        })
        return result
    }
    const graph = [[1, 2], [2, 3], [5], [0], [5], [], []]
    console.log(eventualSafeNodes(graph))
}

{
    // #457.环形数组是否存在循环

    // dfs
    const circularArrayLoop = nums => {
        const len = nums.length
        const getNext = index => ((index + nums[index]) % len + len) % len
        /**
         *  深度优先遍历 
         * @param {Number} index 当前节点
         * @param {Number} d 方向
         * @param {Set} set 已经遍历过的节点
         * @returns {Boolean} 
         */
        const dfs = (index, d, set) => {
            // 再次遍历到说明有循环
            if (set.has(index)) return true
            set.add(index)
            // 不同方向的相乘肯定为负数
            if (d * nums[index] < 0) return false
            const next = getNext(index)
            // 环的长度为1
            if (next === index) return false
            return dfs(next, d, set)
        }
        for (let i = 0; i < len; i++) {
            const result = dfs(i, nums[i], new Set())
            if (result) return true
        }
        return false
    }
    // 快慢指针
    const circularArrayLoop = nums => {
        const len = nums.length
        const getNext = index => ((index + nums[index]) % len + len) % len
        for (let i = 0; i < len; i++) {
            // 已经遍历过的跳过
            if (nums[i] === 0) continue
            let slow = i, fast = getNext(i)
            // 当方向相同，并且都不为0时
            // 注意：由于slow和fast是同步前进的，所以需要再错开相乘，才能保证方向相同。
            while (nums[slow] * nums[fast] > 0 && nums[slow] * nums[getNext(fast)] > 0) {
                // 遍历过的直接置0
                nums[slow] === 0
                nums[fast] === 0
                if (slow === fast) {
                    // 检查是否长度只有1
                    if (slow === getNext(fast)) break
                    return true
                }
                // 下一步
                slow = getNext(slow)
                fast = getNext(getNext(fast))
            }
        }
        return false
    }
    const nums = [-2, 1, -1, -2, -2]
    console.log(circularArrayLoop(nums))
}

{
    // #1137.第N个泰波那契数
    const tribonacci = n => {
        let a = 0, b = 1, c = 1
        if (n === 0) return a
        if (n === 1) return b
        if (n === 2) return c
        let i = 3
        while (i <= n) {
            const temp = a + b + c
            a = b
            b = c
            c = temp
            i++
        }
        return c
    }
    console.log(tribonacci(4))
}


{
    // #313.超级丑数
    const nthSuperUglyNumber = (n, primes) => {
        const dp = new Array(n + 1).fill(0)
        dp[1] = 1
        const len = primes.length
        //标记质因数所指的指针,起初都指向dp[1]
        const markPointers = new Array(len).fill(1)
        for (let i = 2; i <= n; i++) {
            let minNum = Number.MAX_SAFE_INTEGER
            for (let j = 0; j < len; j++) {
                minNum = Math.min(dp[markPointers[j]] * primes[j], minNum)
            }
            dp[i] = minNum
            for (let j = 0; j < len; j++) {
                if (minNum === dp[markPointers[j]] * primes[j]) {
                    markPointers[j]++
                }
            }
        }
        return dp[n]
    }
    const n = 12, primes = [2, 7, 13, 19]
    console.log(nthSuperUglyNumber(n, primes))
}

{
    // #等差数列划分
    const numberOfArithmeticSlices = nums => {
        const len = nums.length
        // dp[i] 表示前nums[0:i]为等差数组的子数组的个数
        const dp = new Array(len).fill(0)
        let i = 2
        let result = 0
        while (i <= len) {
            if (nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
                dp[i] = dp[i - 1] + 1
                result += dp[i]
            }
            i++
        }
        return result
    }
    const nums = [1, 2, 3, 4]

    console.log(numberOfArithmeticSlices(nums))
}

{
    // #等差数列划分2 - 子序列
    const numberOfArithmeticSlices = nums => {
        const len = nums.length
        // dp[i][j] 表示尾项为nums[i] 公差为j的等差子序列的个数
        const dp = new Map()
        for (let i = 0; i < len; i++) {
            dp[i] = new Map()
        }
        let result = 0
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < i; j++) {
                const d = nums[i] - nums[j]
                const count = dp[j].get(d) || 0
                result += count
                dp[i].set(d, (dp[i].get(d) || 0) + count + 1)
                console.log(dp)
            }
        }
        return result
    }
    const nums = [2, 4, 6, 8, 10]
    console.log(numberOfArithmeticSlices(nums))
}

{
    // #516.最长回文子序列

    // 递归
    const longestPalindromeSubseq = s => {
        const len = s.length
        // dp[i][j] 表示{i,j}内最长回文序列
        const dp = new Array(len).fill(0).map(() => new Array(len).fill(0))
        for (let i = len - 1; i >= 0; i--) {
            for (let j = i; j < len; j++) {
                if (i === j) {
                    dp[i][j] = 1
                    continue
                }
                if (s[i] === s[j]) {
                    dp[i][j] = dp[i + 1][j - 1] + 2
                } else {
                    dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
                }
            }
        }
        return dp[0][len - 1]
    }

    // 深度优先遍历 递归
    const longestPalindromeSubseq = s => {
        const dfs = (left, right, res) => {
            if (left === right) {
                return 1 + res
            }
            if (left > right) {
                return res
            }
            if (s[left] === s[right]) {
                return dfs(left + 1, right - 1, res + 2)
            } else {
                return Math.max(dfs(left, right - 1, res), dfs(left + 1, right, res))
            }
        }
        return dfs(0, s.length - 1, 0)
    }
    const s = "bbbab"
    console.log(longestPalindromeSubseq(s))
}


{
    // #233.数字1的个数
    const countDigitOne = n => {
        let mulk = 1;
        let ans = 0;
        for (let k = 0; n >= mulk; ++k) {
            ans += (Math.floor(n / (mulk * 10))) * mulk + Math.min(Math.max(n % (mulk * 10) - mulk + 1, 0), mulk);
            mulk *= 10;
        }
        return ans;
    }
    console.log(countDigitOne(13))
}

{
    // #统计不开心的朋友
    const unhappyFriends = (n, preferences, pairs) => {
        // order[i][j]表示i和j的亲近程度
        const order = new Array(n).fill(0).map(() => new Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - 1; j++) {
                order[i][preferences[i][j]] = n - j;
            }
        }
        // match[i]表示 i和match[i]是一对儿 
        const match = new Array(n).fill(0);
        for (const pair of pairs) {
            let person0 = pair[0], person1 = pair[1];
            match[person0] = person1;
            match[person1] = person0;
        }
        // 找到所有不开心的朋友，可能会有重复的，所以用set
        const res = new Set()
        // 遍历 match按条件查找即可
        for (let x = 0; x < match.length; x++) {
            for (let u = 0; u < match.length; u++) {
                const y = match[x]
                const v = match[u]
                if (order[x][u] > order[x][y] && order[u][x] > order[u][v]) {
                    // x只要不开心，那么u肯定也不开心
                    res.add(x).add(u)
                }
            }
        }
        return res.size;
    }
    const n = 4, preferences = [[1, 2, 3], [3, 2, 0], [3, 1, 0], [1, 2, 0]], pairs = [[0, 1], [2, 3]]
    console.log(unhappyFriends(n, preferences, pairs))
}

{
    // #576.出界的路径数   

    //深度优先遍历

    const findPaths = (m, n, maxMove, startRow, startColumn) => {
        const dir = [[-1, 0], [0, -1], [0, 1], [1, 0]]
        let pathsCount = 0
        /**
        * 递归函数
        * @param {number} x  坐标x
        * @param {number} y  坐标y
        * @param {number} steps 剩余的步数
        */
        const dfs = (x, y, steps) => {
            // 步数用完了，未找到边界
            if (steps > maxMove) return
            steps += 1
            // 找到一次出界路径
            if (x < 0 || x >= m || y < 0 || y >= n) {
                pathsCount += 1
                return
            }
            // 向四周递归
            for (let i = 0; i < dir.length; i++) {
                const [u, v] = dir[i]
                dfs(x + u, y + v, steps)
            }
        }
        dfs(startRow, startColumn, 0)
        return pathsCount % (Math.pow(10, 9) + 7)
    }

    // 缓存每一步的结果
    const findPaths = (m, n, maxMove, startRow, startColumn) => {
        const dir = [[-1, 0], [0, -1], [0, 1], [1, 0]]
        const mod = Math.pow(10, 9) + 7
        const cache = new Map()

        const dfs = (x, y, steps) => {
            if (steps < 0) return 0
            if (x < 0 || x >= m || y < 0 || y >= n) return 1
            let result = 0
            // 缓存每一次的值，如果缓存中有直接返回即可，避免重复计算
            const cacheKey = `(${x},${y},${steps})`
            if (cache.has(cacheKey)) return cache.get(cacheKey)
            for (let i = 0; i < dir.length; i++) {
                const [u, v] = dir[i]
                result = (result + (dfs(x + u, y + v, steps - 1))) % mod
            }
            cache.set(cacheKey, result)
            return result
        }
        return dfs(startRow, startColumn, maxMove)
    }

    // 动态规划
    const findPaths = (m, n, maxMove, startRow, startColumn) => {
        const mod = Math.pow(10, 9) + 7
        const dir = [[-1, 0], [0, -1], [0, 1], [1, 0]]
        // dp[s][i][j]  表示经过步数s，从坐标[i][j]处开始的出界路径数
        let dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
        dp[startRow][startColumn] = 1
        let result = 0
        for (let s = 0; s < maxMove; s++) {
            const newDp = new Array(m).fill(0).map(() => new Array(n).fill(0))
            for (let i = 0; i < m; i++) {
                for (let j = 0; j < n; j++) {
                    const count = dp[i][j]
                    if (count > 0) {
                        for (let dirItem of dir) {
                            const x = i + dirItem[0]
                            const y = j + dirItem[1]
                            if (x < 0 || x >= m || y < 0 || y >= n) {
                                result = (result + count) % mod
                            } else {
                                newDp[x][y] = (newDp[x][y] + count) % mod
                            }
                        }
                    }
                }
            }
            dp = newDp
        }
        return result
    }
    const m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
    console.log(findPaths(m, n, maxMove, startRow, startColumn))
}

{
    // #526.优美的排列
    const countArrangement = n => {
        let result = 0
        const helper = (nums, set) => {
            if (nums.length === n) {
                result += 1
                return
            }
            const ith = nums.length + 1

            for (let i = 1; i <= n; i++) {
                if (!set.has(i)) {
                    if ((ith % i === 0) || (i % ith === 0)) {
                        nums.push(i)
                        set.add(i)
                        helper(nums, set)
                        const value = nums.pop()
                        set.delete(value)
                    }
                }
            }

        }
        helper([], new Set())
        return result
    }
    console.log(countArrangement(4))
}

{
    // # 551.学生出勤记录
    const checkRecord = s => {
        let ACount = 0
        let ctnLCount = 0
        let i = 0
        while (i < s.length) {
            if (s[i] === 'L') {
                ctnLCount += 1
            } else {
                ctnLCount = 0
                if (s[i] === 'A') {
                    ACount += 1
                }
            }
            if (ACount >= 2) return false
            if (ctnLCount === 3) return false
            i++
        }
        return true
    }
    const s = "LALL"
    console.log(checkRecord(s))
}

{
    // #552.学生出勤记录2  

    // 暴力 超出时间限制
    const checkRecord = n => {
        const mod = Math.pow(10, 9) + 7
        const isLawful = s => {
            let ACount = 0
            let ctnLCount = 0
            let i = 0
            while (i < s.length) {
                if (s[i] === 'L') {
                    ctnLCount += 1
                } else {
                    ctnLCount = 0
                    if (s[i] === 'A') {
                        ACount += 1
                    }
                }
                if (ACount >= 2) return false
                if (ctnLCount === 3) return false
                i++
            }
            return true
        }
        const STR = 'ALP'
        let count = 0
        const helper = sArr => {
            if (sArr.length === n) {
                if (isLawful(sArr.join(''))) {
                    count = (count + 1) % mod
                }
                return
            }
            for (let i = 0; i < STR.length; i++) {
                sArr.push(STR[i])
                helper(sArr)
                sArr.pop()
            }
        }
        helper([])
        return count
    }

    const checkRecord = n => {
        const MOD = 1e9 + 7
        let P = 1; // 不含A以P结尾的数量
        let L = 1; // 不含A以L结尾不以LL结尾的数量 
        let LL = 0;// 不含A以LL结尾的数量 
        let A = 1; // 含有A并且以A结尾的数量 
        let AP = 0; // 含有A并且以P结尾的数量 
        let AL = 0; // 含有A并且以L结尾不以LL结尾的数量 
        let ALL = 0;// 含有A并且以LL结尾的数量 
        for (let i = 1; i < n; ++i) {
            [P, L, LL, A, AP, AL, ALL] = [
                (P + L + LL) % MOD,
                P,
                L,
                (P + L + LL) % MOD,
                (A + AP + AL + ALL) % MOD,
                (A + AP) % MOD,
                AL
            ]
        }
        return (P + L + LL + A + AP + AL + ALL) % MOD
    }
}


{
    // #345.反转字符串中的元音字母
    const reverseVowels = s => {
        let left = 0, right = s.length
        // 是否元音
        const isTrue = char => {
            return "aeiouAEIOU".indexOf(char) > -1
        }
        const arr = s.split('')
        while (left < right) {
            // 左边指针移动
            if (isTrue(arr[left])) {
                // 右指针移动
                if (isTrue(arr[right])) {
                    [arr[left], arr[right]] = [arr[right], arr[left]]
                    left++
                    right--
                } else {
                    right--
                }
            } else {
                left++
            }
        }
        return arr.join('')
    }
    const s = 'hello'
    console.log(reverseVowels(s))
}

{
    // 541.反转字符串2      
    const reverseStr = (s, k) => {
        const len = s.length
        const arr = s.split('')
        for (let i = 0; i < len; i += 2 * k) {
            let left = i, right = Math.min(i + k, len) - 1
            while (left < right) {
                [arr[left], arr[right]] = [arr[right], arr[left]]
                left++
                right--
            }
        }
        return arr.join('')
    }
    const s = "abcdefg", k = 2
    console.log(reverseStr(s, k))
}

{
    // 443.压缩字符串
    const compress = chars => {
        const len = chars.length
        let s = ''
        let i = 0, j = i + 1
        while (j <= len) {
            // 相等的话 右指针向右移
            if (chars[i] === chars[j]) {
                j++
            } else {
                const tempS = (j - i) > 1 ? `${chars[i]}${j - i}` : `${chars[i]}`
                s += tempS
                i = j
                j = i + 1
            }
        }
        // 写入chars
        for (let i = 0; i < s.length; i++) {
            chars[i] = s[i]
        }
        return s.length
    }
    const chars = ["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"]
    console.log(compress(chars))
}

{
    // 5834. 使用特殊打字机键入单词的最少时间
    const minTimeToType = word => {
        const len = word.length
        let nowPit = 'a'
        let time = 0
        for (let i = 0; i < len; i++) {
            if (word[i] === nowPit) {
                time += 1
            } else {
                let move = Math.abs(word[i].charCodeAt() - nowPit.charCodeAt())
                move = Math.min(move, 26 - move)
                nowPit = word[i]
                time += move
                time += 1
            }
        }
        return time
    }
    console.log(minTimeToType("zjpc"))
}


{
    // #789.逃脱阻碍者
    const escapeGhosts = (ghosts, target) => {
        const source = [0, 0]
        const distance = (a, b) => {
            return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
        }
        const myDisc = distance(source, target)
        for (const point of ghosts) {
            if (myDisc >= distance(point, target)) return false
        }
        return true
    }
}


{
    // # 1529.灯泡开关4

    const minFlips = target => {
        let count = 0
        // 翻转map
        const zeroOnetran = {
            1: '0',
            0: '1'
        }
        // 已经计算过的字符
        const mark = new Map()
        /**
         * 计算此字符所有可能的反转结果
         * @param {String} str 
         * @returns {Array} 
         */
        const reversePsb = str => {
            const arr = str.split('')
            const res = []
            for (let i = 0; i < str.length; i++) {
                const tempArr = [...arr]
                let j = i
                while (j < str.length) {
                    tempArr[j] = zeroOnetran[tempArr[j]]
                    j++
                }
                const tempStr = tempArr.join('')
                if (!mark.has(tempStr)) {
                    res.push(tempStr)
                }
                mark.set(tempArr, true)
            }
            return res
        }
        // 广度优先搜索
        const bfs = list => {
            if (list.length === 0) return
            // 计算下一步的所有可能
            const nextList = []
            for (let i = 0; i < list.length; i++) {
                if (list[i] === target) {
                    return
                }
                nextList.push(...reversePsb(list[i]))
            }
            bfs(nextList)
            count += 1
        }
        const start = new Array(target.length).fill('0').join('')
        bfs([start])
        return count
    }
    const target = "001011101"
    console.log(minFlips(target))
}

{
    // #1646.获取生成数组中的最大值
    const getMaximumGenerated = n => {
        if (n === 0) return 0
        const nums = new Array(n + 1).fill(0)
        nums[1] = 1
        let max = 1
        for (let i = 1; i <= n; i++) {
            nums[i] = nums[Math.floor(i / 2)] + i % 2 * nums[Math.floor(i / 2) + 1]
            max = Math.max(max, nums[i])
        }
        return max
    }
    console.log(getMaximumGenerated(7))
}

{
    // 797.所有可能的路径
    function allPathsSourceTarget(graph) {
        const n = graph.length
        const paths = []
        const dfs = (node, path, mark) => {
            for (let i = 0; i < graph[node].length; i++) {
                const item = graph[node][i]
                const copyPath = [...path]
                const copyMark = { ...mark }
                copyPath.push(item)
                copyMark[item] = true
                if (item === n - 1) {
                    paths.push([...copyPath])
                    continue
                }
                if (!mark[item]) {
                    dfs(item, copyPath, copyMark)
                }
            }
        }
        dfs(0, [0], { 0: true })
        return paths
    }
    const graph = [[4, 3, 1], [3, 2, 4], [3], [4], []]
    console.log(allPathsSourceTarget(graph))
}


{
    // 881.救生艇
    function numRescueBoats(people, limit) {
        people.sort((a, b) => a - b)
        let count = 0
        let light = 0, weight = people.length - 1
        while (light <= weight) {
            if (people[light] + people[weight] <= limit) {
                light++
                weight--
            } else {
                weight--
            }
            count++
        }
        return count
    }
    const people = [3, 2, 2, 1], limit = 3
    console.log(numRescueBoats(people, limit))
}

{
    // 787.k站中转内最便宜的航班
    function findCheapestPrice(n, flights, src, dst, k) {
        const map = new Map()
        for (const [from, to, price] of flights) {
            const targets = map.get(from) || []
            targets.push({ to, price })
            map.set(from, targets)
        }
        const prices = []
        const dfs = (node, price, mark, path) => {
            if (node === dst) {
                prices.push(price)
                return
            }
            if (path > k) return
            const copyMark = { ...mark }
            copyMark.node = true
            const tos = map.get(node) || []
            for (let i = 0; i < tos.length; i++) {
                if (!mark[tos[i].to]) {
                    dfs(tos[i].to, price + tos[i].price, copyMark, path + 1)
                }
            }
        }
        dfs(src, 0, {}, 0)
        return prices.length > 0 ? Math.min(...prices) : -1
    }

    const findCheapestPrice = (n, flights, src, dst, k) => {
        const INF = 10000 * 101 + 1;
        const f = new Array(k + 2).fill(0).map(() => new Array(n).fill(INF));
        f[0][src] = 0;
        for (let t = 1; t <= k + 1; ++t) {
            for (const flight of flights) {
                const j = flight[0], i = flight[1], cost = flight[2];
                f[t][i] = Math.min(f[t][i], f[t - 1][j] + cost);
            }
        }
        let ans = INF;
        for (let t = 1; t <= k + 1; ++t) {
            ans = Math.min(ans, f[t][dst]);
        }
        return ans == INF ? -1 : ans;
    }
    const n = 5, edges = [[4, 1, 1], [1, 2, 3], [0, 3, 2], [0, 4, 10], [3, 1, 1], [1, 4, 3]], src = 2, dst = 1, k = 1
    console.log(findCheapestPrice(n, edges, src, dst, k))
}


{
    // # 295.数据流的中位数

    // 数组
    class MedianFinder {
        constructor() {
            this.arr = []
        }
        addNum(num) {
            const len = this.arr.length
            let left = 0, right = len - 1
            while (left <= right) {
                const mid = Math.floor((left + right) / 2)
                if (num <= this.arr[mid]) {
                    left = mid + 1
                } else {
                    right = mid - 1
                }
            }
            this.arr.splice(left, 0, num)
            return this
        }
        findMedian() {
            const len = this.arr.length
            if (len % 2 === 0) {
                return (this.arr[len / 2 - 1] + this.arr[len / 2]) / 2
            } else {
                return this.arr[Math.floor(len / 2)]
            }
        }
    }
    // 链表
    class MedianFinder {
        constructor() {
            this.list = {
                val: Number.MIN_SAFE_INTEGER,
                next: null
            }
            this.len = 1
        }
        addNum(num) {
            const me = { val: num, next: null }
            let father = this.list
            let son = this.list.next
            while (father && son) {
                if (num > father.val && num <= son.val) {
                    father.next = me
                    me.next = son
                    break
                } else {
                    father = son
                    son = son.next
                }
            }
            father.next = me
            this.len += 1
            return this
        }
        findMedian() {
            const nums = []
            let node = this.list.next
            while (node) {
                nums.push(node.val)
                node = node.next
            }
            const len = nums.length
            if (len % 2 === 0) {
                return (nums[len / 2 - 1] + nums[len / 2]) / 2
            } else {
                return nums[Math.floor(len / 2)]
            }
        }
    }
    const med = new MedianFinder()
    med.addNum(1)
    console.log(med.findMedian())
    med.addNum(2)
    console.log(med.findMedian())
    med.addNum(3)
    console.log(med.findMedian())
}

{
    // 1480.一维数组的动态和
    function runningSum(nums) {
        const len = nums.length
        if (len === 0) return []
        const dp = new Array(len)
        dp[0] = nums[0]
        for (let i = 1; i < len; i++) {
            dp[i] = dp[i - 1] + nums[i]
        }
        return dp
    }
}

{
    // 1588.所有奇数长度子数组的和
    function sumOddLengthSubarrays(arr) {
        const len = arr.length
        if(len === 0) return 0
        if(len === 1) return arr[0]
        if(len === 2) return arr[0] + arr[1]
        const dp = new Array(len)
        dp[0] = arr[0]
        dp[1] = arr[1]
        let sum = dp[0] + dp[1]
        for(let i =2;i<arr.length;i++){
           dp[i] = (arr[i] + arr[i-1]) * Math.floor(i / 2) + dp[i-2] + arr[i]
           sum += dp[i]
        }
        return sum
    }
    const arr = [1,4,2,5,3]
    console.log(sumOddLengthSubarrays(arr))
}

{
    // 528.按权重随机选择
    class Solution{
        constructor(w){
          const line = new Array(w.length).fill(0)
          line[0] = w[0]
          for(let i = 1;i<w.length;i++){
              line[i] = w[i] + line[i-1]
          }
          this.line = line
          this.max = line[line.length - 1]
        }
        pickIndex(){
           const index = Math.floor(Math.random() * this.max) + 1
           let left = 0,right = this.line.length - 1
           while(left < right){
              const mid = Math.floor((right - left) / 2) + left
              if(this.line[mid] < index){
                  left = mid + 1
              }else{
                  right = mid
              }
           }
           return left
        }
    }
    const solu = new Solution([1])
    console.log(solu.pickIndex())
}

{
    // # 847.访问所有节点的最短路径
    function shortestPathLength(graph){
       const len = graph.length
       const queue = []
       const mark = new Array(len).fill(0).map(() => new Array(1 << len).fill(false))
       for(let i =0;i<len;i++){
           queue.push([i, 1 << i, 0])
           mark[i][1 << i] = true
       }
       let res = 0
       while(queue.length){
           const [node,path,deep] = queue.shift()
           if(path === (1 << len) - 1){
               res = deep
               break
           }
           for(let v of graph[node]){
               const pathV =  path | (1 << v)
               if(!mark[v][pathV]){
                   queue.push([v,pathV,deep + 1])
                   mark[v][pathV] = true
               }
           }
       }
       return res
    }
}

{   
    // 1109.航班预订统计    
    // 模拟
    function corpFlightBookings(bookings,n){
        const res = new Array(n).fill(0)
        for(const [first,end,seats] of bookings){
            for(let i = first;i<=end;i++){
                res[i-1] += seats
            }
        }
        return res
    }
    const bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
    console.log(corpFlightBookings(bookings,n))
}