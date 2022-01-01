
// 转换为  排列索引

const permute = nums => {
  let result = [];
  let len = nums.length;
  if(len === 0){
      return nums;
  }
  const dfs = (path,nums) => {
     // 长度够了 就表示找到了一个结果
     if(path.length === nums.length){
        result.push([...path]);
        return;
     }
     // 遍历每个元素
     for(let i =0;i<len;i++){
        if(path.indexOf(nums[i]) === -1){
          path.push(nums[i]);
          dfs(path,nums);
          // 运行到这一步时，path为[1,2,3]; 长度和nums一致
          // dfs会直接返回，所以删除path的最后一个元素，
          // 相当于回溯到上一步
          path.pop(); 
        }
     }
  }
  dfs([],nums);
  return result;
}
const nums = [1,2,3];
console.log(permute(nums));
