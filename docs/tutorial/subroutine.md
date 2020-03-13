# 协处理器(Subroutine)

[[toc]]

有时候, 类似 HTTP 的以请求换回复的模型满足不了你,
但是 `Application` 在 `run` 方法运行之前,
你无法对机器人做任何操作, 而你需要让机器人主动的发送消息...

这时, 你就需要使用 协处理器(Subroutine) 策略了.

## 什么是 协处理器(Subroutine)?
通俗的说, 就是 `Mirai` 实例在开始运行事件的监听的同时启动的协程,
而在那之前, 一些准备工作早已完工, 例如 `sessionKey` 的获取和激活.  

有时候, 我们需要让机器人主动的去发送一些消息, 或者是定时的让机器人更新数据...  
这些都可以使用协处理器策略解决.

## 使用方式
你需要做的仅仅是将 `Mirai.subroutine` 作为装饰器装饰一个异步函数:

``` python
from mirai import Mirai

app = Mirai(......)

@app.subroutine
async def subroutine1(app: Mirai):
    print("subroutine1 started")

if __name__ == "__main__":
    app.run()
```

::: tip
呃, 可能有些误会, 我们不会一次又一次的调用被包装的异步函数,
所以上面的实例**只会**输出一次, 所以如果你需要这个函数不停的运行,
只能使用类似 `while True` 这种方案.

此外, `exception_handler` 对此方案有效(version > 0.2.7).
:::