# 中间件(Middleware)

有时候, 依赖注入在一些奇怪的地方作用的不是太好(例如 `Ponyorm` 就是用类似 `with orm.session` 建立连接的),
我们需要在事务运行前就执行代码, 并且我们还需要在事务运行完毕后做一些清理工作,
这时候, 我们就可以用到 中间件(Middleware) 特性轻松的解决这个问题.

## 简单的介绍
在 python 中, 有一个称为 `with` 的关键字, 即 上下文管理器(Context Manager),
可以先执行任意对象内的 `__enter__` 方法, 在执行完代码块后又去执行 `__exit__` 方法,
可以说是很方便了, 较之 `try-finally` 语法要好用的多.

而 `with` 也有它的异步版本 `async with`, 执行的是异步方法 `__aenter__` 和 `__aexit__`,
与同步方法大同小异.

中间件便是围绕着这个语言特性设计的, 我们同时支持这两种操作方式,
不需要对其进行二次包装.

::: tip
如果你用过类似 `with open(...) as file` 这样的,
你可能会感到疑惑, 因为中间件特性**不能**使用 `as` 关键字捕获 `__enter__` 的返回值,
所以如果你有这样的需求, 建议还是在业务代码里包含.
:::

## 使用
我们需要在 `receiver` 里定义参数 `middlewares`,
传入一系列带有方法 `__enter__`(或 `__aenter__`) 和 `__exit__`(或 `__aexit__`) 的对象:

``` python
@app.receiver(..., middlewares=[
    # 传入一些带有方法 `__enter__`(或 `__aenter__`) 和 `__exit__`(或 `__aexit__`) 的对象
])
async def event_handler(...):
```

我们建议你使用 Python 标准库 `contextlib` 内提供的一些装饰器函数, 帮助你使用中间件特性.  
我们可以使用 `contextlib.contextmanager` 装饰一个同步函数, 使其可以直接使用:

``` python
from contextlib import contextmanager

@contextmanager
def middleware1():
    # 在事务代码执行前会执行的部分
    yield # 后面可以跟任何值, 本来是拿来给 `with as` 用的, 现在用作用不了, 所以传什么值都无所谓
    # 在事务代码执行后会执行的部分
```

当然, `contextlib.contextmanager` 也有它的异步版本, 即 `contextlib.asynccontextmanager`,
用于包装异步函数为上下文管理器:

``` python
from contextlib import asynccontextmanager

@asynccontextmanager
async def middleware2():
    # 在事务代码执行前会执行的部分
    yield
    # 在事务代码执行后会执行的部分
``` 

无论是同步版本的 `middleware1` 还是异步版本的 `middleware2`, 中间件特性皆支持, 不需要担心兼容性.  
无论 `contextmanager` 还是 `asynccontextmanager`, 他们都返回了一个可以为 `with` 使用的对象,
理论上, 一个对象只需要可以为 `with` 使用, 就可以用来当中间件使用.

## 设置全局中间件
在 `Mirai` 对象实例化时, 我们可以通过传入 `global_middlewares` 使**所有的**事件监听处理
(包括 `exception handler`, 但不包括 `subroutine`) 都会调用该列表内的上下文管理器:

``` python
app = Mirai(..., global_middlewares=[
    middleware1,
    middleware2,
    ...
])
```