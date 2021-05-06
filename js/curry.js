const { reject } = require("async");

(
    function () {
        function  myBind(context = window, ...outArgs) {
            let _this = this;
            return function (...innerArgs) {
                return _this.call(context, ...outArgs.concat(innerArgs));
            }
        }
        Function.prototype.myBind = myBind;
    }
    
)();
function  curry(fn, length) {
    length = length || fn.length;
    return function (...args) {
        if (args.length >= length) {
            return fn(...args);
        }
        return curry(fn.bind(null, ...args), length - args.length)
    }
}
var add = curry(function (...args) {
    return eval(args.join('+'))
}, 4)
console.log(add(1)(2)(3)(4));
console.log(add(1,2,3,4,5));


function f1() {
    var N = 0; // N是f1函数的局部变量

    function f2() {
        // f2是f1函数的内部函数，是闭包
        N += 1; // 内部函数f2中使用了外部函数f1中的变量N
        console.log(N);
    }

    return f2;
}

var result = f1();
result(); // 输出1
result(); // 输出2
result(); // 输出3




class ss {
    constructor(){
        this.x = '11'
    }
    
}
let aa = new ss();
console.log(ss.prototype.x);