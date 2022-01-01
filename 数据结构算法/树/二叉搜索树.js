class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}


/**
 *
 *
 * @class Tree
 */
class Tree {
    constructor(value) {
        this.tree = new Node(value);
    }
    /**
     * 插入
     *
     * @param {Object} value 要插入的值
     * @memberof Tree
     */
    insert(value) {
        // 创建新节点
        let newNode = new Node(value)
        /**
        *  递归比较新旧节点
        *  判断新值的插入位置
        **/
        const insertHelpFun = (newNode, oldNode) => {
            //新值小于当前节点值，插入在左边 
            if (newNode.value < oldNode.value) {
                // 当前节点有左节点
                if (oldNode.left) {
                    //并且左节点的值小于要插入的值
                    if (oldNode.left.value < newNode.value) {
                        let tempNodeLeft = oldNode.left;
                        oldNode.left = newNode;
                        newNode.left = tempNodeLeft;
                    } else {
                        // 要插入比较小，那就继续递归
                        insertHelpFun(newNode, oldNode.left);
                    }
                } else {
                    // 没有就插入
                    oldNode.left = newNode;
                }
            } else {
                if (oldNode.right) {
                    if (newNode.value === oldNode.value) {
                        let tempNodeRight = oldNode.right;
                        oldNode.right = newNode;
                        newNode.right = tempNodeRight;
                    } else {
                        insertHelpFun(newNode, oldNode.right)
                    }
                } else {
                    oldNode.right = newNode;
                }
            }

        }
        //调用函数
        insertHelpFun(newNode, this.tree);
    }

    /**
     * 以数组形式插入多条
     * 
     * @param {*} arr
     * @memberof Tree
     */
    insertMore(arr) {
        arr.forEach(item => {
            this.insert(item);
        });
    }

    /**
     * 先序遍历
     *
     * @param {*} node 树 
     * @returns 所有元素的结果数组
     * @memberof Tree
     */
    preOrder(node) {
        const traversalHelpFun = node => {
            if (node) {
                console.log(node.value);
                traversalHelpFun(node.left);
                traversalHelpFun(node.right);
            }
        }
        traversalHelpFun(node);
    }
    /**
     * 中序遍历
     *
     * @param {*} node
     * @memberof Tree
     */
    inOrder(node) {
        const traversalHelpFun = node => {
            if (node) {
                traversalHelpFun(node.left);
                console.log(node.value);
                traversalHelpFun(node.right);
            }
        }
        traversalHelpFun(node);
    }
    // 后序遍历
    /**
     *
     *
     * @param {*} node
     * @memberof Tree
     */
    postOrder(node) {
        const traversalHelpFun = node => {
            if (node) {
                traversalHelpFun(node.left);
                traversalHelpFun(node.right);
                console.log(node.value);
            }
        }
        traversalHelpFun(node);
    }
    /**
     * 层序遍历 
     * BFC 广度优先搜索  从顶层开始
     * @param {*} node
     * @return {Array} 由每层元素组成的二维数组
     * @memberof Tree
     */
    levelOrder(node) {
        let result = []; // 结果数组
        let fatherArr = [node]; // 当前遍历的那一层节点
        while (fatherArr.length > 0) {
            let tempArr = []; // 临时存值的节点
            let childNodeArr = [];
            for (let i = 0; i < fatherArr.length; i++) {
                //把每个值都push进tempArr
                tempArr.push(fatherArr[i].value);
                // 找到所有子节点，并push进childNodeArr;
                if (fatherArr[i].left) {
                    childNodeArr.push(fatherArr[i].left);
                }
                if (fatherArr[i].right) {
                    childNodeArr.push(fatherArr[i].right);
                }
            }
            //找到所有值push进结果数组
            result.push(tempArr);
            //进入下一层
            fatherArr = childNodeArr;
        }
        return result;
    }
    /**
     *  返回最小值节点
     *
     * @param {*} node
     * @return {number} 最小值
     * @memberof Tree
     */
    min(node) {
        // 二叉搜索树的特点最小值为左下角，
        let tempNode = node;
        while (tempNode) {
            if (tempNode.left === null) {
                return tempNode;
            } else {
                tempNode = tempNode.left;
            }
        }
    }
    /**
     * 返回最大值节点
     * 
     * @param {*} node
     * @memberof Tree
     */
    max(node) {
        // 二叉搜索树的特点最大值为右下角，
        let tempNode = node;
        while (tempNode) {
            if (tempNode.right === null) {
                return tempNode;
            } else {
                tempNode = tempNode.right;
            }
        }
    }
    /**
     * 查找给定值并执行callback函数
     * 二分查找加递归
     * @param {*} value
     * @return {Object} 查找到的给定值所在的节点
     * @memberof Tree
     */
    find(value,node) {
        const findHelpFun = (value, nowNode) => {
            if(!nowNode){
              return;
            }
            if (value === nowNode.value) {
                 return nowNode;
            }
            if (value < nowNode.value) {
                return findHelpFun(value, nowNode.left);
            }
            if (value > nowNode.value) {
                return findHelpFun(value, nowNode.right);
            }

        }
       return findHelpFun(value,node);
    }
    /**
     * 查找此值的父节点
     *
     * @param {*} value 
     * @param {*} node
     * @returns
     * @memberof Tree
     */
    findFatherNode(value,node){
        if(value === node.value){
            return null;
        }
        const findFatherNodeHelpFun = (value,nowNode) =>{
             if((nowNode.left&&nowNode.left.value === value)
                 ||
               (nowNode.right&&nowNode.right.value === value))
             {

               return nowNode
             }
             if(value < nowNode.value){
                 return findFatherNodeHelpFun(value,nowNode.left);
             }
             if(value > nowNode.value){
                 return findFatherNodeHelpFun(value,nowNode.right);
             }
        }
        return findFatherNodeHelpFun(value,node);
    }
    /**
     * 删除节点
     *
     * @param {*} value
     * @param {object} node 
     * @memberof Tree
     */
    remove(value,node){
       //查找到father节点，如果没有father节点，说明要删除的是跟节点
       //只需要把右节点上的最小值的左节点指向根节点的左节点 
       let fatherNode = this.findFatherNode(value,node);
       let thisNode = this.find(value,node);
       if(!fatherNode){
           this.min(thisNode.right).left = thisNode.left;
           return thisNode.right;
       }else{
           // 判断要删除的是左节点还是右节点
           // 删除的是右节点
           //  让父节点的rigth指向待删除节点的右子节点   
           // 让右子节点的最小值的左节点指向待删除节点的左子节点    
           if(fatherNode.right && fatherNode.right.value === value){
              this.min(thisNode.right).left = thisNode.left; 
              fatherNode.right = thisNode.right;
           }
           //如果删除的是左节点
           // 让父节点left指向待删除节点的right
           // 让待删除节点的rigth的最小值指向待删除节点的left
           if(fatherNode.left && fatherNode.left.value === value){
              fatherNode.left = thisNode.right;
              this.min(thisNode.right).left = thisNode.left;
           }
       }
       return node;
    }
}



let myTree = new Tree(100);
myTree.insertMore([97,98,98,99,100,101,102]);
// console.log(myTree.findFatherNode(98,myTree.tree));
console.log(myTree.find(102,myTree.tree));
// console.log(myTree.remove(98,myTree.tree));



// 从数组生成树（前序遍历）
const makeTreeByArr = nodes => {
    function Node(val){
       this.val = val
       this.left = this.right = null
    }
    const df = arr => {
        if(arr.length === 0) return null
        const node = arr.shift()
        if(!node) return null
        const root = new Node(node)
        root.left = df(arr)
        root.right = df(arr)
        return root
    }
    return df(nodes) 
}
const nodes = [3,5,1,6,2,0,8,null,null,7,4]
const tree = makeTreeByArr(nodes)
