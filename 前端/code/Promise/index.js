{
    const fs = require('fs');
    const promise1 = new Promise((resolve, reject) => {

        fs.readFile(`d:\\clic\\lxhyl.github.io\\CNAME`, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data.toString());
        })

    })
    promise1.then(res => {
        console.log(res); // lxhyl.cn
    })
        .catch(err => {
            // 更改文件名，使之发生error，报错就可以在这里捕获到
            console.log('error log:', err);
        })
    /**
   error log: [Error: ENOENT: no such file or directory, open 'd:\clic\lxhyl.github.io\CNAME111'] {
   errno: -4058,
   code: 'ENOENT',
   syscall: 'open',
   path: 'd:\\clic\\lxhyl.github.io\\CNAME111'
   }
    **/
}

{
    let promise1 = new Promise((reslove) => {
        reslove('hello');
    })
    let promise2 = Promise.resolve(promise1);
    promise2.then(res => {
        console.log(res); // 'hello'
    })
    let promise3 = Promise.resolve(promise2);
    promise3.then(res => {
        console.log(res); // 'hello'
    })
}

{
    let obj = {
        then: (resolve, reject) => {
            resolve('hello')
        }
    }
    let promise1 = Promise.resolve(obj);
    promise1.then(res => {
        console.log(res); // 'hello'
    })
}

{
    let promise1 = Promise.resolve('hello');
    promise1.then(res => {
        console.log(res); // 'hello'
    })
}

{
    let promiseFun = e => new Promise(resolve => resolve(e));
    let promise1 = promiseFun('第一个Promise');
    promise1.then(res => promiseFun(res + '\n第二个Promise'))
    .then(res => promiseFun(res + '\n第三个Promise'))
    .then(res => {
        console.log(res);
         /**
        第一个Promise
        第二个Promise
        第三个Promise
        **/
    })
}

{
    let promiseFun = (s,e) => new Promise((resolve,reject)=> {
        if(e){
            reject(e);
        }else{
            resolve(s);
        }
    });
    let p = Promise.all([promiseFun('成'),promiseFun('功'),promiseFun('了')]);

    p.then( res => {
        console.log(res);
    })
    .catch( err => {
        console.log(err);
    })

}

{
    let promiseFun = (s,e) => new Promise((resolve,reject)=> {
        if(e){
            reject(e);
        }else{
            resolve(s);
        }
    });
    let p = Promise.all([promiseFun('成'),promiseFun('功'),promiseFun('了','失败'),promiseFun('了','失败了')]);

    p.then( res => {
        console.log(res);
    })
    .catch( err => {
        console.log(err);
    })
}

{
    let promiseFun = (s,e) => new Promise((resolve,reject)=> {
        if(e){
            reject(e);
        }else{
            resolve(s);
        }
    });
    let p = Promise.race([promiseFun('成'),promiseFun('功'),promiseFun('了','失败'),promiseFun('了','失败了')]);

    p.then( res => {
        console.log(res);
    })
    .catch( err => {
        console.log(err);
    })
    // 成
}

{
    let promiseFun = (s,e) => new Promise((resolve,reject)=> {
        if(e){
            reject(e);
        }else{
            resolve(s);
        }
    });
    let p = Promise.race([promiseFun('成','败'),promiseFun('功'),promiseFun('了')]);

    p.then( res => {
        console.log(res);
    })
    .catch( err => {
        console.log(err);
    })
    // 败
}