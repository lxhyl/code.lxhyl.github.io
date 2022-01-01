/**
 * 
 * LRU缓存算法
 * 
 * 
 */
class LRU {
    constructor(size = 5) {
        // 默认缓存5条数据 
        this.size = size
        // 用map存数据
        const map = new Map()
        this.headNode = {
            prev: null,
            value: 'HEAD',
            next: 'FOOT_ID'
        }
        this.footNode = {
            prev: 'HEAD_ID',
            value: 'FOOT',
            next: null
        }
        map.set('HEAD_ID', this.headNode)
        map.set('FOOT_ID', this.footNode)
        this.cache = map
        // 双向链表  保证操作时间复杂度为1
        this.list = this.headNode
    }
    getCache() {
        return this.cache
    }
    getList() {
        return this.list
    }
    // 添加数据      
    addData(data) {
        const addInHead = () => {
            this.cache.set(data, {
                prev: 'HEAD_ID',
                value: null,
                next: this.headNode.next
            })
            const sourceNode = this.cache.get(this.headNode.next)
            sourceNode.prev = data
            // 写入链表头部
            this.headNode.next = data
        }
        const isInCache = this.cache.has(data)
        // 如果已经存在了，把原来位置的删除,并且此条数据插入头节点
        if (isInCache) {
            const sourceNode = this.cache.get(data)
            const prevNode = this.cache.get(sourceNode.prev)
            const nextNode = this.cache.get(sourceNode.next)
            prevNode.next = sourceNode.next
            nextNode.prev = sourceNode.prev
            addInHead()
        } else {
            // 插入至头部

            // 如果缓存未满，插入头部
            if (this.cache.size - 2 < this.size) {
                addInHead()
            }
            // 缓存满了 删除未节点，插入头部
            else {
                addInHead()
                // 获取最后一个节点
                const lastFootNode = this.cache.get(this.footNode.prev)
                this.cache.delete(this.footNode.prev)
                // 最后一个节点的父节点
                const fatherLastFootNode = this.cache.get(lastFootNode.prev)
                this.footNode.prev = lastFootNode.prev
                fatherLastFootNode.next = 'FOOT_ID'
            }
        }

    }
}
const lruCom = new LRU()
lruCom.addData(1)
lruCom.addData(2)
lruCom.addData(3)
lruCom.addData(4)
lruCom.addData(5)
lruCom.addData(6)
lruCom.addData(4)
console.log(lruCom.getCache())
console.log(lruCom.getList())



/**
 *  最大公因数
 *  2021-09-21
 *  @param {Number} a
 *  @param {Number} b
 *  @return {Number}
 */
function maxCommonFactor(a, b) {
    if (b === 0) return a
    return a % b === 0 ? b : maxCommonFactor(b, a % b)
}
console.log(maxCommonFactor(101, 5))


/**
 * 快速排序 由低到高排序
 * @param {Array} arr 
 * @param {Number} left 左索引
 * @param {Number} right 右索引
 * @returns {Array}
 */
function quickSort(arr, start = 0, end = arr.length - 1) {
    if (end - start < 1) return
    // 基准
    const base = arr[start]
    let left = start
    let right = end
    while (left < right) {
        // 从右边开始向左遍历  找到一个小于基准的
        while (left < right && arr[right] >= base) {
            right--
        }
        arr[left] = arr[right]
        // 从左边开始找到一个大于基准的
        while (left < right && arr[left] <= base) {
            left++
        }
        arr[right] = arr[left]
    }
    // 恢复数组
    arr[left] = base
    // 不断递归两边
    quickSort(arr, start, left - 1)
    quickSort(arr, left + 1, end)
    return arr
}

// #快速排序
function quickSort(arr){
  if(arr.length <= 1) return arr
  const base = arr[0]
  const leftArr = []
  const rightArr = []
  for(let i = 1; i< arr.length; i++){
      if(arr[i] < base){
          leftArr.push(arr[i])
      }else{
         rightArr.push(arr[i])
      }
  }
  return [...quickSort(leftArr),base,...quickSort(rightArr)]
}

const arr = [5, 1, 6, 4, 8, 24, 5]
console.log(quickSort(arr))

/**
 * 获取数组中的最大值 分治法
 * @param {items} 要比较的元素
 * @param {Function} compareFun 自定义比较函数 和sort函数的参数类似
 * compareFun每次比较两个，如果返回值大于等于0，则返回第一个，否则返回第二个
 */
function max(items,compareFun){
   if(!compareFun || typeof compareFun !== 'function'){
       compareFun = (a,b) => a - b
   }
   const len = items.length
   if(len === 0) return null
   // 递归函数
   const helper = (arr,l,r) => {
     const len = r - l + 1
     // 一个元素直接返回此元素
     if(len === 1) return arr[l]
     if(len === 2)  {
         return  compareFun(arr[l],arr[r]) >= 0 ? arr[l] : arr[r]
     }
     // 从中间分隔，进行分治
     const mid = Math.floor((l + r) / 2)
     const lMax = helper(arr,l,mid)
     const rMax = helper(arr,mid + 1,r)
     return compareFun(lMax,rMax) >= 0 ? lMax : rMax
   }
   return helper(items,0,len - 1)
}
const nums = [{v:1},{v:3},{v:5},{v:10}]
console.log("len",nums.length)
console.log(max(nums,(a,b) => a.v - b.v))