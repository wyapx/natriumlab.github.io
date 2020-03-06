# 依赖注入

`python-mirai` 有着非常强大但又十分简单的**依赖注入**机制.

它的设计非常简单, 使任何开发人员都很容易将其他组件与 `python-mirai` 集成.

::: tip
如果你了解过 [Fastapi](https://fastapi.tiangolo.com/),
你会发现这几乎和 Fastapi 的依赖注入机制是从一个模子里刻出来的...  
是的, 我们在设计这个框架时, 借鉴, 模仿了流行框架的一些设计,
以帮助开发者更好的进行开发.
:::



::: warning
不同于 Annotations 特性, 目前依赖注入**不进行**启动时检查,
这意味着你需要有足够的经验才能尽量少的抛出错误..?

`Application` 机制已在开发分支加入对依赖注入的启动时检查,
且会在可预见的未来进行向后迁移.
:::

## 什么是 "依赖注入"?
"依赖注入" 是指在编写程序的过程中的一种让代码声明需要用于工作和使用的东西 —— 即"依赖项" —— 的方法.

负责处理声明的依赖注入的系统将负责处理一切需要执行的工作, 以提供业务代码需要使用的 "依赖项",
这个过程称为 "注入".

当你需要做类似这些事情时:
 - 重用代码逻辑
 - 共享数据库会话
 - 强制对上下文进行验证(用户身份验证)
 - 还有很多...

依赖注入机制能帮助重用代码逻辑, 减少代码量, 使开发者能更加专注于业务的逻辑.

## 第一步
通过一个简单的实例来窥探事物一角, 是从零开始了解事务的一条较为轻松的途径.

``` python
from mirai import Session, Depend, Plain, MessageChain
import asyncio

authKey = "213we355gdfbaerg"
qq = 208924405

async def depend_test_func(session: Session, message: MessageChain):
    return message.toString()

async def main():
    async with Session(f"mirai://localhost:8070/?authKey={authKey}&qq={qq}") as session:
        @session.receiver("FriendMessage")
        async def fm_test(message: str = Depend(depend_test_func)):
            print(message)

        await session.joinMainThread()
        

asyncio.run(main())
```

执行这段代码后, 给机器人发送一段信息, 控制台会输出信息的内容.

刚才, 我们并没有在事件主体内调用 `toString` 方法, 而是在 `depend_test_func`
内执行并返回了 `toString` 方法返回的值, 然后事件主体内部被传入的参数 `message` 就是函数
`depend_test_func` 的返回值.

## 发生了什么?
`python-mirai` 的内部机制检测到你在事件主体内定义了一个依赖注入项, 先执行了该依赖注入项,
捕获返回值后与其他参数一起传入到了事件主体内.

## 嵌套依赖注入(Nested)
我们的机制允许你注入近乎无限个的依赖注入项, 并且也容许在依赖注入内使用依赖注入项:

``` python
async def depend1():
    return 0

async def depend2(d1: int = Depend(depend1)):
    return d1
```

