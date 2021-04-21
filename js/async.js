// es7中的语法糖 async await 如果函数中使用了await 则函数必须使用async修饰
function* f() {
    console.log('执行了！')
  }
  
  var generator = f();
  
  generator.next()

  setTimeout(function () {
  }, 2000);