web打包原理
1. Compiler启动（编译程序）
2. 解析入口文件,获取 AST（我们这里使用@babel/parser,这是 babel7 的工具,来帮助我们分析内部的语法,包括 es6,返回一个 AST 抽象语法树。）
3. 找出所有依赖模块（Babel 提供了@babel/traverse(遍历)方法维护这 AST 树的整体状态,我们这里使用它来帮我们找出依赖模块。）
4. AST 转换为 code
5. 递归解析所有依赖项,生成依赖关系图
6. 重写 require 函数,输出 bundle
loader是为了帮助我们解决 转化webpack识别不了的语言 因为webpack只识别javascript
loader 被用于转换某些类型的模块,而插件则可以用于执行范围更广的任务。

plugin
插件的范围包括,从打包优化和压缩,一直到重新定义环境中的变量。插件接口功能极其强大,可以用来处理各种各样的任务。

