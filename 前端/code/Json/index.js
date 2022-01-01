
let str1 = "{\"a\":1,\"b\":2,}";
console.log(JSON.parse(str1))

let str = "{\"a\":1,\"b\":2}";
let parseStr = JSON.parse(str,function(k,v){
    if(k === "a"){
        return v + 100;
    }
})
console.log(parseStr); //undefind

let parseStr2 = JSON.parse(str,function(k,v){
    if(k === "a"){
        return v + 100;
    }else{
        return v;
    }
})
console.log(parseStr2);

{
let obj = {
    a:null,
    b:undefined,
    c:function(){
        
    },
    d:{
        toJSON:function() {
            return "我是d的toJSON方法"
        }
    },
    e:[1,2,3],
    f:Symbol(),
    g:{
        h:'aaa'
    },
    i:true,
    j:NaN,
    k:+Infinity
}
const replacerFun = (k,v) => {
  if(typeof v === 'string'){
     return  v + '我是replacer方法加的字符'
  }
  return v;
}

let strObj = JSON.stringify(obj,['a','b','c']);
console.log(strObj);
}
