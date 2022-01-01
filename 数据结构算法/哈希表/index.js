class HashTable {
  constructor(size = 20) {
    this.store = new Array(size)
    this.count = 0
    this.size = size
  }
  // hash函数
  hash(key) {
    const H = 37
    let code = 0
    for (let i = 0; i < key.length; i++) {
      code = code * H + key.charCodeAt(i)
    }
    const index = code % this.size
    return index
  }
  /**
   * 新增或者修改
   * 存储的格式是单链表，如果有hash冲突,添加到链表结尾即可
   * @param {String} key 
   * @param {*} value 
   */
  put(key, value) {
    // 映射的数组索引
    const hashKey = this.hash(key)
    // 索引对应的块
    let chunk = this.store[hashKey]
    // 无冲突 直接添加，有冲突需进一步处理
    if (!chunk) {
      this.store[hashKey] = { key, value, next: null }
    } else {
      while (chunk) {
        // 键相同 表示修改。反之表示新增
        if (key === chunk.key) {
          chunk.value = value
          return
        } else {
          if (chunk.next === null) {
            chunk.next = { key, value, next: null }
          }
        }
        chunk = chunk.next
      }
    }

    this.count++
    // 扩容
    if (this.count / this.size > 0.75) {
      this.size += 10
    }
  }
  // 获取
  get(key){
    const hashKey = this.hash(key)
    let chunk = this.store[hashKey]
    while(chunk){
      if(chunk.key === key){
        return chunk.value
      }
      chunk = chunk.next
    }
    return undefined
  }
  // 删除
  delete(key){
    const hashKey = this.hash(key)
    let chunk = this.store[hashKey]
    if(chunk.key === key){
      this.store[hashKey] = null
      this.count--
      return
    }
    let son = chunk.next
    while(son){
      if(son.key === key){
        chunk.next = son.next
        this.count--
        return
      }
      chunk = son
      son = son.next
    }
  }
  // 获取所有
  getAll() {
    const res = {}
    for(let i =0;i<this.store.length;i++){
      let chunk = this.store[i]
      if(!chunk) continue
      while(chunk){
        res[chunk.key] = chunk.value
        chunk = chunk.next
      }
    }
    return res
  }
}


const map = new HashTable()
for (let i = 0; i < 50; i++) {
  map.put(`${i}`, i)
}
map.delete("45")
const all =  map.getAll()
console.log("all",all)