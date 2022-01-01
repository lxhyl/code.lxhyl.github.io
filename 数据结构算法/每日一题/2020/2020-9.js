// #257
{
    const binaryTreePaths = root => {
        let result = [];
        // 深度优先遍历
        const dfs = (node,path) => {
            if(!node) return;
            // 给path拼接上 当前节点的值
            path = `${path}${node.val}`
            if(node.left === null && node.right === null){
              result.push(path)
            }else{
                // 如果还有下一层节点 则拼接上箭头
                path = `${path}->`;
                dfs(node.left,path);
                dfs(node.right,path);
            }
        }
        dfs(root,'');
        return result;
    }
    
}

{
    // #77
    {
        const combine = (n,k) => {
            let result = [];
            const dfs = (numN,choosedN) => {
                if(choosedN.length >= numN){
                    return;
                }
                
            }
        }
    }
}