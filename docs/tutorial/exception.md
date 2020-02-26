# 错误捕获(Exception Handler)

[[toc]]

由于 `event_runner` 是运行在多线程中的, 所以当事件运行主体抛出错误时,
主线程无法在终端打印出 `traceback` 信息.  
为了解决这个问题, 我们引进了 `Exception Handler` 机制,
用于处理在事件运行主体中被抛出的错误.

## 基本的使用
直接使用装饰器方法 `Session.exception_handler` 即可:

``` python
@session.exception_handler()
async def exception_handler_normal(context):
    debug(context) # 调用了库 devtools 中的 debug 函数, 可以美观的在控制台输出 Pydantic 模型.
```

### 监听特定错误
将特定的错误类传入装饰器方法的第一个参数即可:

``` python
@session.exception_handler(ValueError)
@session.exception_handler(KeyError)
async def exception_handler_normal(context):
    debug(context)
```

### 上下文支持
将 lambda 表达式传入具名形参 `addon_condition`, 或者第二个参数即可:

``` python
@session.exception_handler(ValueError)
@session.exception_handler(
    addon_condition=\
        lambda c: c.event.message.messageChain.toString().startswith("/")
)
async def exception_handler_normal(context):
    debug(context)
```

## 原理解析
`Session.event_runner` 会捕获你传入的上下文控制函数和事件运行主体的错误,
并在捕获到错误时向程序内部广播一个 `UnexceptedException` 事件.  
而 `Session.exception_handler` 则是一个 `Session.receiver` 的封装,
提供了更加友好的接口以供调用.