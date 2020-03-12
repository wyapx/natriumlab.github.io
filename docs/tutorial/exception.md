# 错误捕获(Exception Handler)

[[toc]]

有时候, 业务代码会出现开发时未发现的错误, 运行时可能会有安全方面的风险.  
为了解决这个问题, 我们引进了 `Exception Handler` 机制,
用于处理在事件运行主体中被抛出的错误.

## 基本的使用
直接使用装饰器方法 `Mirai.exception_handler` 即可:

``` python
@app.exception_handler()
async def exception_handler_normal(context):
    debug(context) # 调用了库 devtools 中的 debug 函数, 可以美观的在控制台输出 Pydantic 模型.
```

### 监听特定错误
将特定的错误类传入装饰器方法的第一个参数即可:

``` python
@app.exception_handler(ValueError)
@app.exception_handler(KeyError)
async def exception_handler_normal(context):
    debug(context)
```

## 原理解析
`Mirai.event_runner` 会捕获你传入的上下文控制函数和事件运行主体的错误,
并在捕获到错误时向程序内部广播一个 `UnexceptedException` 事件.  
而 `Mirai.exception_handler` 则是一个 `Mirai.receiver` 的封装,
提供了更加友好的接口以供调用.