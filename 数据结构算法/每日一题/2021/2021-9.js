{
  // 165.比较版本号
  function compareVersion(version1, version2) {
    const v1 = version1.split('.')
    const v2 = version2.split('.')
    for (let i = 0; i < v1.length || i < v2.length; i++) {
      let x = 0, y = 0;
      if (i < v1.length) {
        x = parseInt(v1[i]);
      }
      if (i < v2.length) {
        y = parseInt(v2[i]);
      }
      if (x > y) {
        return 1;
      }
      if (x < y) {
        return -1;
      }
    }
    return 0
  }
}

{
  // 剑指Offer 22.链表
  function getKthFromEnd(head, k) {
    let left = head
    let right = head
    while (right && k > 0) {
      right = right.next
      k -= 1
    }
    while (left && right) {
      [left, right] = [left.next, right.next]
    }
    return left
  }
}

{
  // 面试题 17.14. 最小k个数
  function smallestK(arr, k) {
    arr.sort((a, b) => a - b)
    return arr.slice(0, k)
  }
  // 堆排序
  function smallestK(arr, k) {
    const len = arr.length
    const maxHeapify = i => {
      let max = i
      const left = i * 2 + 1
      const right = i * 2 + 2
      if (left < len && arr[max] > arr[left]) {
        max = left
      }
      if (right < len && arr[max] > arr[right]) {
        max = right
      }
      if (max === i) return
      [arr[max], arr[i]] = [arr[i], arr[max]]
      return maxHeapify(max)
    }
    const halfLen = Math.floor(len / 2)
    for (let i = halfLen; i >= 0; i--) {
      maxHeapify(i)
    }
    const res = []
    for (let i = 0; i < k; i++) {
      res.push(arr[0])
      arr[0] = Number.MAX_SAFE_INTEGER
      maxHeapify(0)
    }
    return res
  }
  const arr = [1, 3, 5, 7, 2, 4, 6, 8], k = 4
  console.log(smallestK(arr, k))
}


{
  // #460.用Rand7()实现Rand10()
  const rand7 = () => Math.floor(1 + Math.random() * 7)
  function rand10() {
    const rand49 = () => (rand7() - 1) * 7 + rand7()
    let n = rand49()
    while (n > 40) {
      n = rand49()
    }
    return (n - 1) % 10 + 1
  }
  const rand7 = () => Math.floor(1 + Math.random() * 7)
  function rand10() {
    const rand01 = () => {
      let res = rand7()
      while (res === 4) {
        res = rand7()
      }
      return res > 4 ? 1 : 0
    }
    const rand15 = () => rand01() + (rand01() << 1) + (rand01() << 2) + (rand01() << 3)
    let res = rand15()
    while (res > 9) {
      res = rand15()
    }
    return res + 1
  }
  console.log(rand10())
}

{
  // # 704.二分查找
  function search(nums, target) {
    const len = nums.length
    let left = 0, right = len - 1
    while (left <= right) {
      const mid = Math.floor((right + left) / 2)
      if (nums[mid] < target) {
        left = mid + 1
      } else if (nums[mid] === target) {
        return mid
      } else {
        right = mid - 1
      }
    }
    return -1
  }
  const nums = [-1, 0, 3, 5, 9, 12], target = 2
  console.log(search(nums, target))
}

{
  // # 1221.分割平衡字符串
  // 栈
  function balancedStringSplit(s) {
    let count = 0
    const stack = []
    for (let i = 0; i < s.length; i++) {
      const len = stack.length
      if (len === 0) {
        count += 1
      }
      const top = len > 0 ? stack[len - 1] : null
      if (top === s[i] || top === null) {
        stack.push(s[i])
      } else {
        stack.pop()
      }
    }
    return count
  }
  // 数字差
  function balancedStringSplit(s) {
    let count = 0
    let d = 0
    for (let i = 0; i < s.length; i++) {
      if (s[i] === 'R') {
        d++
      } else if (s[i] === 'L') {
        d--
      }
      if (d === 0) {
        count++
      }
    }
    return count
  }
  const s = "RLLLLRRRLR"
  console.log(balancedStringSplit(s))
}

{
  // # 502.IPO

  function findMaximizedCapital(k, w, profits, capital) {
    while (k > 0) {
      let maxM = 0, index
      for (let i = 0; i < profits.length; i++) {
        if (w >= capital[i]) {
          if (profits[i] > maxM) {
            maxM = profits[i]
            index = i
          }
        }
      }
      w += maxM
      profits.splice(index, 1)
      capital.splice(index, 1)
      k--
    }
    return w
  }

  function findMaximizedCapital(k, w, profits, capital) {
    const len = profits.length
    const arr = []
    for (let i = 0; i < len; i++) {
      arr.push({ p: profits[i], c: capital[i] })
    }
    arr.sort((a, b) => a.c - b.c)
    const maxArr = []
    const hafeFindPush = (nums, n) => {
      const len = nums.length
      if (len === 0) {
        nums.push(n)
        return
      }
      let left = 0, right = len - 1
      while (left <= right) {
        const mid = Math.floor((right + left) / 2)
        if (nums[mid] < n) {
          left = mid + 1
        } else if (nums[mid] === n) {
          nums.splice(mid, 0, n)
          return
        } else {
          right = mid - 1
        }
      }
      nums.splice(left, 0, n)
    }
    let index = 0
    while (k > 0) {
      while (index < len && arr[index].c <= w) {
        hafeFindPush(maxArr, arr[index].p)
        index++
      }
      if (maxArr.length === 0) break
      w += maxArr.pop()
      k--
    }
    return w
  }

  const k = 2, w = 0, profits = [1, 2, 3], capital = [0, 1, 1]
  console.log(findMaximizedCapital(k, w, profits, capital))
}


{
  // 68.文本对齐

  const makeSpace = n => {
    return new Array(n).fill(' ').join('')
  }
  function fullJustify(words, maxWidth) {
    const len = words.length
    // 先找到每一行应该存那些元素
    const lines = new Map()
    let lineIndex = 1
    for (let i = 0; i < len; i++) {
      const line = lines.get(lineIndex) || { word: [], len: 0 }
      // 当前行的字符长度 加上空格长度小于等于最大宽度时添加到此行，否则添加到下一行
      if (words[i].length + line.len + line.word.length <= maxWidth) {
        line.word.push(words[i])
        line.len = line.len + words[i].length
        lines.set(lineIndex, line)
      } else {
        // 行加一
        lineIndex++
        const nextLine = { word: [], len: 0 }
        nextLine.word.push(words[i])
        nextLine.len = nextLine.len + words[i].length
        lines.set(lineIndex, nextLine)
      }
    }
    const res = []
    const size = lines.size
    // 生成每一行的字符串
    lines.forEach((item, index) => {
      const wordCount = item.word.length
      // 非最后一行 两端对齐
      if (index < size) {
        // 只有一个 左对齐
        if (wordCount === 1) {
          const spaceCount = maxWidth - item.len
          res.push(`${item.word.join('')}${makeSpace(spaceCount)}`)
        } else {
          // 正常空格数
          const spaceCount = Math.floor((maxWidth - item.len) / (wordCount - 1))
          // 空格数可能不能整除，有多出的几个
          const extraSpace = (maxWidth - item.len) % (wordCount - 1)
          // 将多出来的空格分配到左边
          const leftHalf = item.word.slice(0, extraSpace + 1).join(makeSpace(spaceCount + 1))
          // 右边空格正常
          const rightHalf = item.word.slice(extraSpace + 1).join(makeSpace(spaceCount))
          res.push(`${leftHalf}${makeSpace(spaceCount)}${rightHalf}`)
        }
      } else {  //最后一行 左对齐
        // 等于最大字符数  减去单词长度，减去单词间隔长度
        const extraSpace = maxWidth - item.len - (wordCount - 1)
        res.push(`${item.word.join(' ')}${makeSpace(extraSpace)}`)
      }
    })
    return res
  }
  const words = ["Science", "is", "what", "we", "understand", "well", "enough", "to", "explain", "to", "a", "computer.", "Art", "is", "everything", "else", "we", "do"], maxWidth = 20
  console.log(fullJustify(words, maxWidth))
}

{
  // # 1894.找到需要补充粉笔的学生

  // 模拟
  function chalkReplacer(chalk, k) {
    const len = chalk.length
    let index = 0
    while (true) {
      const item = chalk[index]
      if (item > k) return index
      k -= item
      index = (index + 1) % len
    }
  }

  // 优化取余模拟
  function chalkReplacer(chalk, k) {
    const sum = chalk.reduce((i, s) => i + s, 0)
    let last = k % sum
    let index = 0
    while (true) {
      const item = chalk[index]
      if (item > last) return index
      last -= item
      index++
    }
  }
  const chalk = [3, 4, 1, 2], k = 25
  console.log(chalkReplacer(chalk, k))
}

{
  // #600.不含连续的1的非负数

  // 暴力
  function findIntegers(n) {
    const hasCtn1 = num => {
      const numB = num.toString(2)
      let left = 0; right = left + 1
      while (right < numB.length) {
        if (numB[left] == 1 && numB[left] === numB[right]) return true
        left++
        right++
      }
      return false
    }
    let res = 2
    for (let i = 2; i <= n; i++) {
      if (!hasCtn1(i)) res++
    }
    return res
  }

  function findIntegers(n) {
    const len = n.toString(2).length
    const dp = new Array(len).fill(0)
    dp[0] = dp[1] = 1
    for (let i = 2; i < len + 2; i++) {
      dp[i] = dp[i - 1] + dp[i - 2]
    }
    console.log(dp)
    let last = 0
    let res = 0
    for (let i = len; i >= 0; --i) {
      const val = 1 << i
      console.log("val ==> ", val)
      console.log("n ==> ", n)
      console.log("res ==> ", res)
      if ((n & val) !== 0) {
        n -= val
        res += dp[i + 1]
        if (last === 1) break
        last = 1
      } else {
        last = 0
      }
      if (i === 0) res++
      console.log('\n')
    }
    return res
  }
  console.log(findIntegers(5))
}

{
  // #678.有效的括号字符串
  function checkValidString(s) {
    const len = s.length
    const stackPre = []
    const stackStar = []
    for (let i = 0; i < len; i++) {
      const char = s[i]
      switch (char) {
        case '(':
          stackPre.push(i)
          break
        case '*':
          stackStar.push(i)
          break
        case ')':
          // 右括号 优先从stackPre中抵消  没有可以抵消的了，就为false
          if (stackPre.length > 0) {
            stackPre.pop()
          } else if (stackStar.length > 0) {
            stackStar.pop()
          } else {
            return false
          }
        default:
          break
      }
    }
    // 如果 ’*‘ 不能抵消掉 ‘(’  
    if (stackPre.length > stackStar.length) return false

    while (stackPre.length && stackStar.length) {
      // 逐个抵消，如果 '(' 在 '*' 右边。 是不能匹配的
      if (stackPre.pop() > stackStar.pop()) return false
    }
    return true
  }
  const s = "(*))"
  console.log(checkValidString(s))
}

{
  // # 447.回旋镖的数量
  function numberOfBoomerangs(points) {
    const len = points.length
    let res = 0
    for (let i = 0; i < len; i++) {
      const distance = new Map()
      const a = points[i]
      for (let j = 0; j < len; j++) {
        if (j === i) continue
        const b = points[j]
        const dis = (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2
        distance.set(dis, (distance.get(dis) || 0) + 1)
      }
      distance.forEach(item => res += item * (item - 1))
    }
    return res
  }
  const points = [[0, 0], [1, 0], [2, 0]]
  console.log(numberOfBoomerangs(points))
}

{
  // # 524.通过删除字母匹配到字典里最长单词
  function findLongestWord(s, dictionary) {
    let str = ''
    for (let i = 0; i < dictionary.length; i++) {
      const word = dictionary[i]
      let j = 0 // 指向s
      let k = 0 // 指向word
      while (j < s.length) {
        if (s[j] === word[k]) k++
        j++
      }
      // 相等，按字典序
      // if(k === str.length){
      //   const arr = [str,word]
      //   arr.sort()
      //   str = arr[0]
      // }else if(k > str.length){
      //   str = word
      // }
      if (k === word.length && ((k === str.length && word < str) || k > str.length)) {
        str = word
      }

    }
    return str
  }

  const s = "abpcplea", dictionary = ["a", "b", "c"]
  console.log(findLongestWord(s, dictionary))
}

{
  // #162.寻找峰值
  function findPeakElement(nums) {
    const len = nums.length
    let left = 0
    let right = len - 1
    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      if (nums[mid] > nums[mid + 1]) {
        right = mid
      } else {
        left = mid + 1
      }
    }
    return left
  }
  const nums = [1, 2, 3, 1]
  console.log(findPeakElement(nums))
}


{
  // #212.单词搜索2
  function findWords(board, words) {
    const yLen = board.length
    const xLen = board[0].length
    const res = []

    // 字典树
    const root = Object.create(null)
    for (let w of words) {
      let node = root
      for (let char of w) {
        if (!node[char]) node[char] = Object.create(null)
        node = node[char]
      }
      node.end = w
    }

    /**
     * 
     * @param {Tree} tire 当前遍历到的字符节点 
     * @param {Number} i 在board中的位置
     * @param {Number} j 
     * @returns 
     */
    const search = (tire, i, j) => {
      // 到最后一个了
      if (tire.end) {
        res.push(tire.end)
        // 找到重置为null,避免重复
        tire.end = null
      }
      // 边界条件
      if (i < 0 || i >= yLen || j < 0 || j >= xLen) return
      // 下个节点是board[i][j]，如果没有这个字符节点，说明不匹配，直接返回
      if (!tire[board[i][j]]) return
      // 暂存board[i][j]的值
      const preChar = board[i][j]
      // 标记
      board[i][j] = '#'
      search(tire[preChar], i, j - 1)
      search(tire[preChar], i, j + 1)
      search(tire[preChar], i - 1, j)
      search(tire[preChar], i + 1, j)
      // 剪枝 还原board[i][j]
      board[i][j] = preChar
    }

    // 每个节点作为搜索入口
    for (let i = 0; i < yLen; i++) {
      for (let j = 0; j < xLen; j++) {
        search(root, i, j)
      }
    }
    return res
  }
  const board = [["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]], words = ["oath", "pea", "eat", "rain"]
  console.log(findWords(board, words))
}

{
  // #36.有效的数独 
  function isValidSudoku(board) {
    const xLen = 9, yLen = 9
    // 存储列
    const col = new Map()
    // 存储3*3块
    const block = new Map()
    const getBlockIndex = n => {
      if (n <= 2) return 0
      if (n <= 5) return 1
      if (n <= 8) return 2
    }
    for (let i = 0; i < yLen; i++) {
      const row = new Set()
      for (let j = 0; j < xLen; j++) {
        // 行是否满足条件
        const item = board[i][j]
        if (item === '.') continue
        if (row.has(item)) return false
        row.add(item)

        // 列是否满足条件
        const colItem = col.get(j) || new Set()
        if (colItem.has(item)) return false
        colItem.add(item)
        col.set(j, colItem)

        // 3*3方格是否满足条件
        const index = `${getBlockIndex(i)}-${getBlockIndex(j)}`
        const blockItem = block.get(index) || new Set()
        if (blockItem.has(item)) return false
        blockItem.add(item)
        block.set(index, blockItem)
      }
    }
    return true
  }
  const board = [
    [".", ".", "4", ".", ".", ".", "6", "3", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    ["5", ".", ".", ".", ".", ".", ".", "9", "."],

    [".", ".", ".", "5", "6", ".", ".", ".", "."],
    ["4", ".", "3", ".", ".", ".", ".", ".", "1"],
    [".", ".", ".", "7", ".", ".", ".", ".", "."],

    [".", ".", ".", "5", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."]
  ]
  console.log(isValidSudoku(board))
}


{
  // # Nim游戏
  function canWinNim(n) {
    return n % 4 !== 0
  }
}

{
  // # 650.只有两个键的键盘
  function minSteps(n) {
    if (n === 1) return 0
    // 步数
    let step = 0
    // 复制的个数
    let copyCount = 1
    // 当前字符长度
    let nowLen = 1
    while (true) {
      if (nowLen === n) return step
      // 复制 如果总长度能整除当前元素，说明可以复制
      if (n % nowLen === 0) {
        step++
        copyCount = nowLen
      }
      // 粘贴
      step++
      nowLen += copyCount
    }
  }
  console.log(minSteps(3))
}


{
  // #673.最长递增子序列的个数
  function findNumberOfLIS(nums) {
    const len = nums.length
    // dp[i]表示已i结尾的递增序列的长度
    const dp = new Array(len).fill(0)
    // ct[i]表示长度为dp[i]的序列的个数
    const ct = new Array(len).fill(0)
    let res = 0
    let maxLen = 0
    for (let i = 0; i < len; i++) {
      dp[i] = 1
      ct[i] = 1
      for (let j = 0; j < i; j++) {
        // 可以构成递增序列
        if (nums[i] > nums[j]) {
          // 找到更长的
          if (dp[j] + 1 > dp[i]) {
            dp[i] = dp[j] + 1
            // i是从j转移而来的
            ct[i] = ct[j]
          } else if (dp[j] + 1 === dp[i]) {
            // 长度相同的序列
            ct[i] += ct[j]
          }
        }
      }
      // 此时dp[i]即为前i个元素能组成的最长序列的长度
      if (maxLen === dp[i]) {
        res += ct[i]
      } else if (dp[i] > maxLen) {
        maxLen = dp[i]
        res = ct[i]
      }
    }
    return res
  }
}

{
  // #58.最后一个单词的长度
  function lengthOfLastWord(s) {
    s = s.trimEnd()
    const sLen = s.length
    let res = 0
    for (let i = sLen - 1; i >= 0; i--) {
      if (s[i] !== ' ') {
        res++
      } else {
        return res
      }
    }
    return res
  }
  const s = "   fly me   to   the moon  "
  console.log(lengthOfLastWord(s))
}

{
  // #分隔链表
  function splitListToParts(head, k) {
    let node = head
    let len = 0
    while (node) {
      len++
      node = node.next
    }
    const res = []
    let partLen = Math.ceil(len / k)
    const re = len % k
    let nowPart = 0
    node = head
    let tempNode = node // 结果链表
    let index = 1
    let flag = true
    while (node) {
      // 长度不够
      if (index < partLen) {
        node = node.next
        index++
      } else {
        const temp = node.next
        // 断开链表
        node.next = null
        res.push(tempNode)
        tempNode = temp
        node = temp
        // 下一部分
        nowPart++
        index = 1
      }

      if (re !== 0 && nowPart == re && flag) {
        partLen -= 1
        flag = false
      }

    }
    for (let n = res.length; n < k; n++) {
      res.push(null)
    }
    return res
  }
}


{
  // #326.3的幂
  function isPowerOfThree(n) {
    if (n === 1) return true
    if (n === 0) return false
    while (Number.isInteger(n)) {
      n = n / 3
      if (n === 1) return true
    }
    return false
  }
  console.log(isPowerOfThree(27))
}

{

  // #430.扁平化多级双向链表
  function flatten(head) {
    const listArr = []
    const dfs = node => {
      if (!node) return
      // 按顺序push进数组
      listArr.push(new Node(node.val))
      // 先child节点
      dfs(node.child)
      // 后next节点
      dfs(node.next)
    }
    dfs(head)
    // 只需要倒叙遍历数组变为链表即可
    let res = listArr.pop()
    while (listArr.length > 0) {
      const nodeItem = listArr.pop()
      res.prev = nodeItem
      nodeItem.next = res
      res = nodeItem
    }
    return res
  }
}

{
  // #583.两个字符串的删除操作
  function minDistance(word1, word2) {
    const w1Len = word1.length, w2Len = word2.length
    const dp = new Array(w1Len + 1).fill(0).map(() => new Array(w2Len + 1).fill(0))
    for (let i = 1; i <= w1Len; i++) {
      const s1 = word1[i - 1]
      for (let j = 1; j <= w2Len; j++) {
        const s2 = word2[j - 1]
        if (s1 === s2) {
          dp[i][j] = dp[i - 1][j - 1] + 1
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
        }
      }
    }
    // 最长公共子序列的长度
    const csl = dp[w1Len][w2Len]
    return w1Len - csl + w2Len - csl
  }
  console.log(minDistance("sea", "eat"))
}


{
  // #371.两整数之和
  function getSum(a, b) {
    while (b != 0) {
      const carry = (a & b) << 1
      a = a ^ b
      b = carry
    }
    return a
  }

  // 对数
  function getSum(a,b){
    const {log,exp:e} = Math
    return log(e(a) * e(b))
  }
  console.log(getSum(1,2))
}

{
  // #437.路径总和3
  function pathSum(root,targetSum){
    if(root === null) return 0  
    let res = 0
    const dfs = (node,sum) => {
       if(node === null) return
       sum += node.val
       if(sum === targetSum) res += 1
       dfs(node.right,sum)
       dfs(node.left,sum)
    }
    // 每一个节点都当作初始节点
    const startDfs = node => {
      if(node === null) return
      dfs(node,0)
      startDfs(node.left)
      startDfs(node.right)
    }
    startDfs(root)
    return res
  }
}

{
  //#517.超级洗衣机
  function findMinMoves(machines){
    const total = machines.reduce((i,s) => s + i,0)
    const len = machines.length
    if(total % len !== 0) return - 1
    let avg = Math.floor(total / len)
    let ans = 0,sum = 0
    for(let num of machines){
      num -= avg
      sum += num
      ans = Math.max(ans,Math.max(Math.abs(sum),num))
    }
    return ans
  }
}

{
  // #223.矩形面积
  function computeArea(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2){
    const areaA = (ax2 - ax1) * (ay2 - ay1)
    const areaB = (bx2 - bx1) * (by2 - by1)
    console.log(areaA,areaB)
    const width = Math.min(ax2,bx2) - Math.max(ax1,bx1)
    const heigth =  Math.min(ay2,by2) - Math.max(ay1,by1)
    console.log(width,heigth)
    const areaOver = Math.max(width,0) * Math.max(heigth,0) 
    return areaA + areaB - areaOver
  }
}

{
   // #1436.旅行终点站
   function destCity(paths){
      const placeMap = new Map()
      for(const [start,end] of paths){
        const place = placeMap.get(start) || []
        place.push(end)
        placeMap.set(start,place)
      }
      let endPlace = null
      const dfs = node => {
         const next = placeMap.get(node)
         if(!next){
           endPlace = node
           return
         }
         next.forEach(item => dfs(item))
      }
      for(let item of placeMap.entries()){
         dfs(item[0])
      }
      return endPlace
   }

   function destCity(paths){
     const placesSet = new Set()
     for(const [start,end] of paths){
       placesSet.add(start)
     }
     for(const [start,end] of paths){
       if(!placesSet.has(end)) return end
     }
   }
}


