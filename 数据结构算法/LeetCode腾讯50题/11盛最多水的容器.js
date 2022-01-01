/**
**给你 n 个非负整数 a1，a2，...，an，
每个数代表坐标中的一个点 (i, ai) 。
在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。
找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/container-with-most-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
**
**/

const maxArea = (height) => {
    let i = 0;
    let j = height.length-1;
    let water = 0;
    while(i  < j){
         let temp = Math.min(height[i],height[j]) * (j-i);
         if(temp > water){
             water = temp;
         }
         height[i] > height[j] ? j-- : i++;
    }
    return water;
}

let arr = [1,8,6,2,5,4,8,3,7];
console.log(maxArea(arr));