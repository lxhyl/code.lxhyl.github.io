/**
**
给出两个 非空 的链表用来表示两个非负的整数。
其中，它们各自的位数是按照 逆序 的方式存储的，
并且它们的每个节点只能存储 一位 数字。
如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

例:
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
**
**/
function ListNode(val) {
    this.val = val;
    this.next = null;
}


const addTwoNumbers = (l1, l2) => {
     const listToArr = (l) => {
          let next = l.next;
          let arr = [l.val];
          while(next !== null){
              arr.push(next.val);
              next = next.next;
          }
          return arr;
     }
     let arr1 = listToArr(l1);
     let arr2 = listToArr(l2);
     let arr3 = [];
     let maxLen = arr1.length < arr2.length ? arr2.length : arr1.length;
     for(let i=0;i<maxLen;i++){
         arr3[i] = (arr1[i] || 0) + (arr2[i] || 0) + (arr3[i] || 0);
         if(arr3[i] >=10){
            arr3[i] = arr3[i] - 10;
            arr3[i+1] = 1;
         }
     }
    
     arr3 = arr3.reverse();
     let list = {
         val:arr3[0],
         next:null
     }
     for(let j = 1;j<arr3.length;j++){
         let next = {
             val:arr3[j],
             next:null
         }
         next.next = list;
         list = next;
     }
     return list;
};




// 优化版

const addTwoNumbers2 = (l1,l2) => {
    let arr = [];
    let i = 0;
    while(l1 || l2){
         // 初始化arr[i];
         arr[i] = arr[i] ? arr[i] : 0;
         let add = (l1 && l1.val) + (l2 && l2.val) + arr[i];
       
         if(add < 10){
           arr[i] = add;
         }else{
             // 进位
             arr[i] = add - 10;
             arr[i+1] = 1;
         }
        //  console.log(arr[i],arr[i+1],l1 && l1.val,l2 && l2.val);
         i++;
         l1 =l1 && l1.next;
         l2 =l2 && l2.next;
    }
    arr = arr.reverse();

    let list = {
        val:arr[0],
        next:null
    }
    for(let j = 1;j<arr.length;j++){
        let next = {
            val:arr[j],
            next:null
        }
        next.next = list;
        list = next;
    }
    return list;
}

let l1 = {
    val: 2,
    next: {
        val: 4,
        next:{
            val:3,
            next:null,
        }
    }
}
let l2 = {
    val: 5,
    next: {
        val: 6,
        next:{
            val:4,
            next:null,
        }
    }
}
console.log(addTwoNumbers2(l1,l2))


