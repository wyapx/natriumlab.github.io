# 使用 Session.get_tasks 方法

默认情况下, 为了保证短轮询和 `event_runner` 的数据共享,
我们通常在程序内部新建立一个单独的线程来执行此种操作,
并要求您使用 `Session.joinMainThread` 方法堵塞主线程以保证程序的运行.

但这只是推荐方法, 若你具有特殊的需求,
需要将 `python-mirai` 作为库而不是运行时环境使用,
我们也有相应的解决方案.

::: warning
通常情况下, 默认方式就已经足够好用,
接下来的操作要求您熟悉 Python 标准库 `asyncio` 的用法.  
若你对接下来的操作感到迷惑, 可以暂时跳过此段.
:::

## 不使用 "async with"
在这种方式中, 你需要自己启动短轮询协程和 `event_runner`.  
同时, 你需要手动实例化一个 `asyncio.Queue`, 并将其设置为 `Session.event_stack` 的值:

``` python
from mirai import Session
import asyncio

authKey = "this-is-a-authkey"
qq = 183213564

async def main():
    session = Session(f"mirai://localhost:8080/?authKey={authKey}&qq={qq}")
    session.event_stack = asyncio.Queue()

    ...

asyncio.run(main())
```

然后使用 `Session.get_tasks` 和 `Session.enable_session`:

``` python
await Session.enable_session()
await session.get_tasks()
```

与之前的区别在于: 我们使用了运行在主线程的事件循环启动了短轮询协程和 `event_runner`,
这种方式便于与现有的系统一起运作, 具有低侵入性.  

## 关闭
不幸的是, 不使用 `async with` 意味着你需要自己实现一套的合理退出方案:
 - 设置 `Session.exit_signal` 的值为 `True`
 - 你需要调用 `Session.close_session` 来使当前使用的 `sessionKey` 被释放. 若不释放会导致无头客户端一定量的内存泄漏.