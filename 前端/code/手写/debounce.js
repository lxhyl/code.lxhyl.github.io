function dbounce(fun,time){
  let timer = null;
  return function(){
      if(timer){
          clearTimeout(timer);
          timer = null;
      }else{
          timer = setTimeout(fun,time);
      }
  }
}