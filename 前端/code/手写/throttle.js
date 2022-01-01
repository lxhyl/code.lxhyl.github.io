function throttle(fun, time) {
    let timer = null;
    return function (arg) {
        let _this = this;
        if (!timer) {
            timer = setTimeout(() => {
                fun.call(_this, arg);
                timer = null;
            }, time)
        }
    }
}



function throttle2(fun, time) {
    let flag = false;
    let timer = null;
    return () => {
        if (flag) {
            return;
        } else {
            flag = true;
            timer = setTimeout(() => {
                fun();
                flag = false;
                clearTimeout(timer);
            }, time)
        }
    }
}