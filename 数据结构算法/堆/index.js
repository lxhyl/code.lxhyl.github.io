class Heap {
  constructor(arr,sortF = (a,b) => a - b > 0) {
    this.sortF = sortF
    this.data = [...arr]
    this.size = this.data.length
    this.build = this.build.bind(this)
    this.maxHeapify = this.maxHeapify.bind(this)
    this.sort = this.sort.bind(this)
    this.getTop = this.getTop.bind(this)
    this.delete = this.delete.bind(this)
  }
  // 交换两个节点
  swap(i, j) {
    if (i >= this.size || j >= this.size) return
    const temp = this.data[i]
    this.data[i] = this.data[j]
    this.data[j] = temp
  }
  // 构建堆
  build() {
    const len = Math.floor(this.size / 2)
    for (let i = len - 1; i >= 0; i--) {
      this.maxHeapify(i)
    }
  }
  // 最大堆化  比较当前元素和子节点元素的大小，如果比子节点小，就交换，直至递归到叶子节点
  maxHeapify(i) {
    if (i >= this.size) return
    let index = i
    const left = i * 2 + 1
    const right = i * 2 + 2
    if (left < this.size && this.data[left] > this.data[index]) {
      index = left
    }
    if (right < this.size && this.data[right] > this.data[index]) {
      index = right
    }
    if (index === i) return
    this.swap(i, index)
    return this.maxHeapify(index)
  }
  // 排序
  sort() {
    for (let i = this.size - 1; i > 0; i--) {
      this.swap(0, i)
      this.size--
      this.maxHeapify(0)
    }
    return this.data
  }
  // 获取堆顶元素
  getTop(){
    if(this.size === 0) return undefined
    return this.data[0]
  }
  // 删除堆顶元素，首先交换，然后删除，再堆化
  delete(){
    if(this.size === 0) return
    this.swap(0,this.size - 1)
    this.data.pop()
    this.size--
    this.maxHeapify(0)
  }
  // 插入
  insert(n){
    this.data.push(n)
    this.size++
    this.build()
    return this
  }
  test(){
    console.log(this.data)
  }
}

