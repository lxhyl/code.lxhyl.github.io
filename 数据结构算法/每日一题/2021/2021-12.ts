
{
  // #419.甲板上的战舰
  function countBattleships(board: Array<Array<string>>): number {
    const yLen = board.length, xLen = board[0].length
    let res = 0
    for (let i = 0; i < yLen; i++) {
      for (let j = 0; j < xLen; j++) {
        if (board[i][j] === 'X') {
          if (i > 0 && board[i - 1][j] === 'X') continue
          if (j > 0 && board[i][j - 1] === 'X') continue
          res++
        }
      }
    }
    return res
  }
}

{
  // # 997.找到小镇的法官
  function findJudge(n: number, trust: number[][]): number {
    const inD = new Array(n + 1).fill(0)
    const outD = new Array(n + 1).fill(0)
    for (const [x, y] of trust) {
      outD[x] += 1
      inD[y] += 1
    }
    for (let i = 1; i <= n; ++i) {
      if (inD[i] === n - 1 && outD[i] === 0) return i
    }
    return -1
  }
}

{
  // #475.供暖器
  function findRadius(houses: number[], heaters: number[]) {
    heaters.sort((a, b) => a - b)
    const findHous = (h: number): number => {
      let l = 0, r = heaters.length - 1
      if (heaters[l] > h) {
        return -1
      }
      while (l < r) {
        const mid = Math.floor((l + r + 1) / 2)
        if (h < heaters[mid]) {
          r = mid - 1
        } else {
          l = mid
        }
      }
      return l
    }
    let min = Number.MIN_SAFE_INTEGER
    for (let i = 0; i < houses.length; i++) {
      const house = houses[i]
      const l = findHous(house)
      const r = l + 1
      const lDistance = l >= 0 ? house - heaters[l] : Number.MAX_SAFE_INTEGER
      const rDistance = r < heaters.length ? heaters[r] - house : Number.MAX_SAFE_INTEGER
      const distance = Math.min(lDistance, rDistance)
      min = Math.max(distance, min)
    }
    return min
  }
  const houses = [1, 2, 3], heaters = [2]
  console.log(findRadius(houses, heaters))
}

console.log(Math.min(Number.MAX_SAFE_INTEGER, 0))



{
  // #1609.奇偶树
  class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
      this.val = (val === undefined ? 0 : val)
      this.left = (left === undefined ? null : left)
      this.right = (right === undefined ? null : right)
    }
  }
  function isEvenOddTree(root: TreeNode | null):boolean {
     const queue: Array<TreeNode> = [root]
     let level = 0
     while(queue.length){
        let len = queue.length
        // 记录上一个 
        let pre =  level % 2 === 0 ? -Number.MAX_VALUE : Number.MAX_VALUE
        console.log(queue)
        // 遍历每一层
        for(let i = 0; i < len; i++){
          const node = queue.shift()
          // 层数与值奇偶性不同
          if(level % 2 === node.val % 2) return false
          // 偶数层递增,奇数层递减  
          if((level % 2 === 0 && node.val <= pre) || (level % 2 === 1  && node.val >= pre)){
            return false
          }
          pre = node.val
          node.left && queue.push(node.left)
          node.right && queue.push(node.right)
        }
        level++
     }
     return true
  }
}