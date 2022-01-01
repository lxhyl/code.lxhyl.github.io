{
  // # 268.丢失的数字
  function missingNumber(nums) {
    const map = new Map(nums.map(n => [n, n]))
    for (let i = 0; i <= nums.length; i++) {
      if (!map.has(i)) return i
    }
  }
  const nums = [1, 2, 3]
  console.log(missingNumber(nums))
}

{
  // # 299.猜数字游戏
  function getHint(secret, guess) {
    let aCount = 0, bCount = 0
    secret = secret.split('')
    guess = guess.split('')
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === secret[i]) {
        aCount++
        secret[i] = null
        guess[i] = null
      }
    }
    const sNum = new Map()
    for (let i = 0; i < secret.length; i++) {
      if (secret[i]) {
        const n = sNum.get(secret[i]) || 0
        sNum.set(secret[i], n + 1)
      }
    }
    for (let i = 0; i < guess.length; i++) {
      const n = sNum.get(guess[i]) || 0
      if (n > 0) {
        bCount++
        sNum.set(guess[i], n - 1)
      }
    }
    return `${aCount}A${bCount}B`
  }
  const secret = "1807", guess = "7810"
  console.log(getHint(secret, guess))
}

{
  // # 397. 整数替换
  /**
   * 
   *  
   */
  function integerReplacement(n) {
    if (n === 1) return 0
    if (n % 2 === 0) return integerReplacement(n / 2) + 1
    return Math.min(integerReplacement(n + 1) + 1, integerReplacement(n - 1) + 1)
  }
  console.log(integerReplacement(7))
}

{
  // #397.整数替换
  /**
   *  n => 1 最小操作步数 
   *  n == 1 0
   *  f(n) = f(n / 2) + 1  (n偶数)
   *  f(n) = min(f(n + 1) + 1,  f(n - 1) + 1) (奇数)
   */
  function integerReplacement(n) {
    if (n === 1) return 0
    if (n % 2 === 0) return integerReplacement(n / 2) + 1
    return Math.min(integerReplacement(n + 1) + 1, integerReplacement(n - 1) + 1)
  }
}


{
  // # 594.最长和谐子序列
  /**
   *   [1,2,3,4]
   *   [4,2,1,3]
   */
  function findLHS(nums) {
    // 小到大排序
    nums = nums.sort((a, b) => a - b)
    const len = nums.length
    let max = 0
    let start = 0
    for (let i = 0; i < len; i++) {
      while (nums[i] - nums[start] > 1) {
        start++
      }
      if (nums[i] - nums[start] === 1) {
        max = Math.max(max, i - start + 1)
      }
    }
    return max
  }

  const nums = [1, 3, 2, 2, 5, 2, 3, 7]
  console.log(findLHS(nums))
}


{
  // #559.N叉树的最大深度
  function maxDepth(root) {
    if (!root) return 0
    const queue = [root]
    let res = 0
    while (queue.length > 0) {
      let len = queue.length
      // 每一层遍历完再下一层
      while (len > 0) {
        // 拿出一个元素
        const node = queue.shift()
        // 获取下一层
        for (let item of node.children) {
          queue.push(item)
        }
        len--
      }
      res++
    }
    return res
  }
}

{
  // # 384.打乱数组
  class Solution {
    constructor(nums) {
      this.source = [...nums]
      this.nums = nums
    }
    reset() {
      return this.source
    }
    shuffle() {
      const len = this.nums.length
      for (let i = 0; i < len; i++) {
        const index = Math.floor(Math.random() * len)
        if (i !== index) {
          [this.nums[index], this.nums[i]] = [this.nums[i], this.nums[index]]
        }
      }
      return this.nums
    }
  }
  const a = [1, 2, 3]
  [a[0], a[0]] = [a[0], a[0]]
}


{
  // # 859.亲密字符串
  function buddyStrings(s, goal) {
    const len = s.length
    if (len !== goal.length || len < 2) return false
    let sDiff = '', gDiff = ''
    for (let i = 0; i < len; i++) {
      if (s[i] === goal[i]) continue
      sDiff += s[i]
      gDiff = `${goal[i]}${gDiff}`
    }
    // 没有不同元素时，只能交换重复元素，所以判断是否有重复元素
    if (sDiff.length === 0) return s.length !== new Set(s).size
    if (sDiff.length === 2) return sDiff === gDiff
    return false
  }
  const s = 'aa', goal = 'aa'
  console.log(buddyStrings(s, goal))
}


{
  // #75.颜色分类
  function sortColors(nums) {
    for (let i = 0; i < nums.length; i++) {
      let x = i, y = i - 1
      while (y >= 0 && nums[x] < nums[y]) {
        [nums[x], nums[y]] = [nums[y], nums[x]]
        x--
        y--
      }
    }
    return nums
  }
  const nums = [2, 0, 2, 1, 1, 0]
  console.log(sortColors(nums))
}


{
  // # 991.坏了的计算器
  function brokenCalc(X, Y) {
    let ans = 0
    while (Y > X) {
      ans++
      if (Y % 2 == 1) Y++
      else Y /= 2
    }
    return ans + X - Y
  }
  const x = 2, y = 3
  console.log(brokenCalc(x, y))
}

{
  // # 700.二叉搜索树中的搜索
  function searchBST(root, val) {
    let res = null
    const dfs = node => {
      if (!node) return
      if (node.val === val) {
        res = node
        return
      }
      dfs(node.left)
      dfs(node.right)
    }
    dfs(root)
    return res
  }

}

{
  // #383.赎金信
  function canConstruct(ransomNote, magazine) {
    const ranMap = new Map()
    for (let i = 0; i < magazine.length; i++) {
      ranMap.set(magazine[i], (ranMap.get(magazine[i]) || 0) + 1)
    }
    for (let i = 0; i < ransomNote.length; i++) {
      if (!ranMap.has(ransomNote[i])) return false
      const n = ranMap.get(ransomNote[i])
      if (n < 1) return false
      ranMap.set(ransomNote[i], n - 1)
    }
    return true
  }
}

{
  // #748.最短补全词
  function shortestCompletingWord(licensePlate, words) {
    const ignoreWords = new Set("1234567890 ".split(''))
    const licensePlateMap = {}
    for (let i = 0; i < licensePlate.length; i++) {
      if (ignoreWords.has(licensePlate[i])) continue
      const liWord = licensePlate[i].toLowerCase()
      licensePlateMap[liWord] = (licensePlateMap[liWord] || 0) + 1
    }
    console.log(licensePlateMap)
    const isSafeWord = s => {
      const obj = JSON.parse(JSON.stringify(licensePlateMap))
      console.log(s, obj)
      for (let i = 0; i < s.length; i++) {
        const iCount = obj[s[i]]
        if (!iCount) continue
        obj[s[i]] = obj[s[i]] - 1
        if (obj[s[i]] <= 0) delete obj[s[i]]
      }

      return Object.keys(obj).length === 0
    }
    let minLenWord
    for (let i = words.length - 1; i >= 0; i--) {
      if (isSafeWord(words[i])) {
        if (!minLenWord) {
          minLenWord = words[i]
        } else if (minLenWord.length >= words[i].length) {
          minLenWord = words[i]
        }
      }
    }
    return minLenWord || false
  }
}

{
  // #709.转换为小写字母
  function toLowerCase(s){
     const chars = s.split('')
     for(let index in s){
       const code = chars[index].charCodeAt()
       if(code >= 65 && code <= 90) chars[index] = String.fromCharCode(code | 32)
     }
     return chars.join('')
  }
}

{
  // #807.保持城市天际线
  function maxIncreaseKeepingSkyline(grid){
     const n = grid.length
     const rowMax = new Array(n).fill(0)
     const colMax = new Array(n).fill(0)
     for(let i = 0; i < n; i++){
       for(let j = 0;j < n; j++){
         rowMax[i] = Math.max(rowMax[i],grid[i][j])
         colMax[j] = Math.max(colMax[j],grid[i][j])
       }
     }
     let res = 0
     for(let i = 0; i < n; i++){
      for(let j = 0;j < n; j++){
        res += Math.min(rowMax[i] - grid[i][j],colMax[j] - grid[i][j])
      }
    }
    return res
  }
}

