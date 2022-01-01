{
  // # 2022. 将一维数组转变成二维数组 
  function construct2DArray(original: number[], m: number, n: number): number[][] {
     const len = original.length
     if(len !== m * n) return []
     return original.reduce((res:number[][]):number[][] => res.push(original.slice(res.length * n,res.length * n + n)) ? res : res,[]).slice(0,m)
  }
  const original = [1,1,1,1], m = 4, n = 1
  console.log(construct2DArray(original,m,n))
}
