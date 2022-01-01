{
  // #350.两个数组的交集2
  function intersect(nums1,nums2){
     const l1 = nums1.length,l2 = nums2.length
     const nums1Map = new Map()
     for(let i = 0; i < l1; i++){
        const item = nums1Map.get(nums1[i]) || 0
        nums1Map.set(nums1[i],item + 1)
     }
     const result = []
     for(let i = 0; i < l2; i++){
       const item = nums1Map.get(nums2[i])
       if(item){
         result.push(nums2[i])
         nums1Map.set(nums2[i],item - 1)
       }
     }
     return result
  }
  // 
  function intersect(nums1,nums2){
    const map = new Map()
    nums1.forEach(n => map.set(n,(map.get(n) || 0) + 1))
    return nums2.filter(n => (map.get(n) || 0) > 0 ?  map.set(n,map.get(n) - 1) : false)
  }
}


{
  // lc 加一
  function plusOne(digits){
    let i = digits.length - 1
    digits[i] += 1
    while(true){
      if(digits[i] >= 10){
         digits[i] = 0
         i--
         //数组越界
         if(i < 0){
           digits.unshift(1)
           break
         }
         digits[i] += 1
      }else{
        break
      }
    }
    return digits
  }
}

{
  // # 412.Fizz Buzz
  function fizeeBuzz(n){
    const result = []
    for(let i = 1;i <= n; i++){
        let s = ''
        if(i % 3 === 0) s = 'Fizz'
        if(i % 5 === 0) s += 'Buzz'
        if(s.length === 0) s = i.toString()
        result.push(s)  
    }
    return result
  }
}