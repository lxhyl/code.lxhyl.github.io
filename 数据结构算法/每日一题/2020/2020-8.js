{
   // #415

   /**
    * 两个字符串相加
    *
    * @param {string} num1 
    * @param {string} num2
    * @returns {string} 
    */
   const addStrings = (num1, num2) => {
      // 维护两个分别指向字符串最后一位的指针
      let i = num1.length - 1;
      let j = num2.length - 1;
      // 维护一个进位器    
      let add = 0;
      let result = '';
      // 当任意一个字符串没遍历完的时候，或者进位器有值的时候
      // 进入循环   
      while (i >= 0 || j >= 0 || add > 0) {
         // 初始化加数，被加数，如果不存在就让其为0，
         //  转为数字防止变为字符串拼接   
         let x = parseInt(num1[i] ? num1[i] : 0);
         let y = parseInt(num2[j] ? num2[j] : 0);
         let sum = x + y + add;
         // 求完和，让进位器归零
         add = 0;
         // 拼接字符串
         if (sum >= 10) {
            add = 1;
            result = `${sum - 10}${result}`;
         } else {
            result = `${sum}${result}`;
         }
         i--;
         j--;
      }
      return result;
   }
   console.log(addStrings('123', '12'))
}


{
   // #337
   const rob = root => {
      // 深度优先遍历
      const dfs = node => {
         if (node === null) {
            // 0为选择子节点，1为不选择子节点
            return [0, 0];
         }
         // 两个子节点的值
         const l = dfs(node.left);
         const r = dfs(node.right);
         // 当选择了当前节点
         let choosed = node.val + l[1] + r[1];
         // 没选择当前节点
         let notChoosed = Math.max(l[0], l[1]) + Math.max(r[0], r[1]);
         // 返回两个值
         return [choosed, notChoosed];
      }
      const rootValue = dfs(root);
      // 返回最大值
      return Math.max(rootValue[0], rootValue[1]);
   }

}

{
   // #336
   const allPlalindrome = words => {
      // 判断是不是回文
      const isPlalindrome = (word1, word2) => {
         let str = `${word1}${word2}`;
         let i = 0;
         let j = str.length - 1;
         while (i <= j) {
            if (str[i] === str[j]) {
               i++;
               j--;
            } else {
               return false;
            }
         }
         return true
      }
      let result = [];
      // 找出所有回文
      for (let i = 0; i < words.length; i++) {
         for (let j = 0; j < words.length; j++) {
            if (i != j && isPlalindrome(words[i], words[j])) {
               result.push([i, j]);
            }
         }
      }
      return result;
   }
   let words = ["abcd", "dcba", "lls", "s", "sssll"];
   console.log(allPlalindrome(words));
}

{
   // #100
   const isSameTree = (p, q) => {
      let temp = true;
      let valFirst = (p, q) => {
         if (p && q) {
            if (p.val === q.val) {
               valFirst(p.left, q.left);
               valFirst(p.right, q.right);
            } else {
               temp = false;
               return false;
            }
         } else {
            if (p !== q) {
               temp = false;
               return false;
            }
         }
      }
      valFirst(p, q);
      return temp;
   }
}

{
   // #93
   const restoreIpAddresses = s => {
      const isTrue = num => {
         if (num.length === 0) return false;
         if (num.length === 1) return true;
         if (num[0] == 0) return false;
         if (num <= 255) {
            return true;
         } else {
            return false
         }
      }
      let result = [];
      // 第一个点的位置
      for (let i = 1; i <= 3 && i < s.length; i++) {
         //第二个点的位置
         for (let j = i; j <= i + 3 && j < s.length; j++) {
            //第三个点的位置
            for (let k = j; k <= j + 3 && k < s.length; k++) {
               let num1 = s.substring(0, i);
               let num2 = s.substring(i, j);
               let num3 = s.substring(j, k);
               let num4 = s.substring(k);
               if (isTrue(num1) && isTrue(num2) && isTrue(num3) && isTrue(num4)) {
                  let ip = `${num1}.${num2}.${num3}.${num4}`;
                  result.push(ip);
               }
            }
         }
      }
      return result;
   }

   let str = "25525511135"
   console.log(restoreIpAddresses(str));
}

{
   // #696
   const countBinarySubstrings = s => {
      let strCount = [];
      let index = 0;
      let num = 1;
      while (index < s.length) {
         if (s[index] === s[index + 1]) {
            index++;
            num++;
         } else {
            strCount.push(num);
            num = 1;
            index++;
         }
      }
      let result = 0;
      for (let i = 0; i < strCount.length - 1; i++) {
         result += Math.min(strCount[i], strCount[i + 1]);
      }
      return result;
   }
   console.log(countBinarySubstrings('00110011')) // 6
}

{
   // #130
   const solve = board => {
      let notChange = [];

      let h = board.length;
      let w;
      if (h > 1) {
         w = board[0].length;
      } else {
         return board;
      }
      // 深度遍历所有连接的‘O’并标记
      const dfs = (y, x) => {
         if (y >= 0 && y < h && x >= 0 && x < w) {
            if (board[y][x] === 'O') {
               let str = JSON.stringify([y, x])
               // 判断这个点是否已经遍历过，避免死循环
               if (notChange.indexOf(str) <= -1) {
                  notChange.push(str);
                  dfs(y, x + 1);
                  dfs(y, x - 1);
                  dfs(y + 1, x);
                  dfs(y - 1, x);
               }
            }
         }
      }
      // 从边界开始查找
      for (let i = 0; i < w; i++) {
         if (board[0][i] === 'O') dfs(0, i);
         if (board[h - 1][i] === 'O') dfs(h - 1, i);
      }
      for (let i = 0; i < h; i++) {
         if (board[i][0] === 'O') dfs(i, 0);
         if (board[i][w - 1] === 'O') dfs(i, w - 1);
      }
      // 遍历二维数组，改变没有被标记的点
      for (let i = 0; i < h; i++) {
         for (let j = 0; j < w; j++) {
            if (board[i][j] === 'O' && notChange.indexOf(JSON.stringify([i, j])) <= -1) {
               board[i][j] = 'X';
            }
         }
      }
      return board;
   }
}

{
   // #133
   const cloneGraph = node => {
      if (!node) {
         return node;
      }
      // 创建HASH映射来存储 已经克隆过的节点
      let map = new Map();
      // 深度优先遍历
      const dfs = n => {
         // 如果已经克隆过了 直接返回
         if (map.has(n)) {
            return map.get(n);
         }
         // 克隆节点
         let cloneNode = new Node(n.val, [])
         // 键为老节点，值为新节点
         map.set(n, cloneNode);
         // 遍历邻居，克隆邻居
         for (let i = 0; i < n.neighbors.length; i++) {
            let newN = dfs(n.neighbors[i]);
            cloneNode.neighbors.push(newN);
         }
         // 返回克隆节点
         return cloneNode;
      }
      return dfs(node);
   }
}

{
   // #733
   const floodFill = (image, sr, sc, newColor) => {
      const oldColor = image[sr][sc];
      let filled = [];
      const helpFun = (x, y) => {
         if (x >= 0 && x < image.length && y >= 0 && y < image[0].length) {
            if (oldColor === image[x][y]) {
               filled.push(`${x}${y}`)
               image[x][y] = newColor;
               if (filled.indexOf(`${x - 1}${y}`) === -1) helpFun(x - 1, y);
               if (filled.indexOf(`${x}${y - 1}`) === -1) helpFun(x, y - 1);
               if (filled.indexOf(`${x}${y + 1}`) === -1) helpFun(x, y + 1);
               if (filled.indexOf(`${x + 1}${y}`) === -1) helpFun(x + 1, y);
            }
         }

      }
      helpFun(sr, sc);
      return image;
   }
   let image = [[0, 0, 0], [0, 1, 1]];
   console.log(floodFill(image, 1, 1, 1));
}

{
   // #110
   const isBalanced = root => {
      const balanced = node => {
         if(!node) return 0;
         let left = balanced(node.left);
         let right = balanced(node.right);
         if(left === -1 || right === -1 || Math.abs(left-right) > -1){
            return -1;
         }
         return Math.max(left,right) + 1;
      }
     
      return balanced(root) !== -1;
   }
   let root = {
      val: 3,
      left: {
         val: 1,
         left:null
      },
      right: {
         val: 1,
         left: {
            val: 2,
            left: {
               val:3,
               right:null
            },
            right:{
               val:7,
               left:null
            }
         }
      }
   }
   console.log(isBalanced(root));
}

{
   // # 201
   var rangeBitwiseAnd = function(m, n) {
      let shift = 0;
      // 找到公共前缀
      while (m < n) {
          m >>= 1;
          n >>= 1;
          ++shift;
      }
      return m << shift;
  }
}


{
   // #841
   const canVisitedAllRoom = rooms => {
      let canInRooms = new Array(rooms.length).fill(0);
      canInRooms[0] = 1;
      const dfs = keysArray => {
         for(let i =0;i<keysArray.length;i++){
            if(canInRooms[keysArray[i]] !== 1){
               canInRooms[keysArray[i]] = 1;
               dfs(rooms[keysArray[i]]);
            }
         }
      }
      dfs(rooms[0]);
      if(canInRooms.indexOf(0) !== -1){
         return false
      }else{
         return true;
      }
   }
   let rooms = [[1,3],[3,0,1],[2],[0]];
   console.log(canVisitedAllRoom(rooms));
}