# Hello World

[[toc]]

## 启动无头客户端
由于 `python-mirai` 基于 `mirai-http-api` 实现, 所以若你想通过 `python-mirai` 编写机器人,
我建议你先按照Mirai的[文档](https://github.com/mamoe/mirai/tree/master/mirai-console)启动一个 
`mirai-console` 实例, 然后按照其输出进行操作即可

### 成功依照其指示启动后
在 `mirai-console.jar` 同级目录下会有一个 `mirai.properties` 文件, 打开这个文件, 大概是这样的:

``` properties
HTTP_API_PORT = 8080
HTTP_API_AUTH_KEY = "xxxxxxxxxxxxxxxxxxx"
HTTP_API_ENABLE = true
```

将 `HTTP_API_AUTH_KEY` 和 `HTTP_API_PORT` 这两个字段的值记住, 接下来要用到

## 安装 python-mirai

::: warning
由于 `mirai` 现在处于快速流转状态, 建议你在其结束前尽量使用来自仓库的源代码安装,
以免导致接口不兼容的情况的发生.
:::

### 从 Pypi 安装
从 Pypi 安装是获取 `python-mirai` 最快捷的方式, 通常情况下, 从该来源安装的包较从源代码仓库安装更稳定, 但可能不包括新的特性.

``` bash
$ sudo pip install kuriyama
```

### 从 Github 源代码仓库安装
从 Github 源代码仓库安装是获取 `python-mirai` 最新特性与兼容的唯一方式,
通常的, 我们会尽量使仓库下的 `test.py` 文件可以被执行,
但这并不包含其他未被使用的特性.

从该途径安装, 需要你先安装好 `git`, `setuptools`.
```bash
$ git clone https://github.com/Chenwe-i-lin/python-mirai
$ cd python-mirai
$ pip install -r requirements.txt
$ python setup.py install
```

::: tip
若你还没有学习过 Python 的标准库 `asyncio` 的基本用法,
或是因为没有接触过这方面的内容,
所以自己无法理解接下来的内容,
那么请**不要**将自己的怒火发泄到开发者身上.
 > 无知不是什么挡箭牌, 只有知识的渊博才能使人成为受人敬仰的对象.
:::

## Hello, world!
代码实现最简单的机器人如下所示, 我们使用了标准库 `typing` 以获得更好的开发体验.  
在这里我们将假设你已经配置好了 `mirai-console` 及 `mirai-http-api`, 同时将一些关键信息设置为如下形式:

``` yml
http-locate: "localhost:8080" # 这里是表示 mirai-console 自带的 mirai-http-api 所启动的服务的地址, 不需要什么 "http://" 之类的
authKey: "this-is-a-authkey" # 字段 "HTTP_API_AUTH_KEY" 的值
qq: 183213564 # 你登录 mirai-console 用的QQ
```

这是一段代码样例, 当有用户私聊机器人时, 会向其发送一条 `"Hello, world!"`.
出于使任何人理解的目的, 我会带着你一一解析我们提供的 API .

::: warning
由于[客观原因](https://github.com/mamoe/mirai/issues/108), 导致目前 `FriendMessage` 的事件监听无法使用...  
我们会尽力给出解决方案.
:::


首先, 给出一段 `Hello, world!` 代码:
``` python
import asyncio
from mirai import Session, Plain, Friend

authKey = "this-is-a-authkey"
qq = 183213564

async def main():
    async with Session(f"mirai://localhost:8080/?authKey={authKey}&qq={qq}") as session:
        @session.receiver("FriendMessage")
        async def event_friendmessage(session: Session, sender: Friend):
            await session.sendFriendMessage(
                sender.id,
                [Plain(text="Hello, world!")]
            )

        await session.joinMainThread()

try:
    asyncio.run(main())
except KeyboardInterrupt:
    exit()
```

在运行这段代码后, 私聊你的机器人, 她会发送一条消息:

<panel-view title="聊天记录">
<chat-message nickname="Alice" color="#cc0066">向这个世界问个好吧.</chat-message>
<chat-message nickname="Bot" :avatar="$withBase('/mirai-head.png')">Hello, world!</chat-message>
</panel-view>

### 发生了什么?
我们会分几个章节来说明一个 `Hello, world` 实例, 这里我们先介绍下 `Session`.  
 `Session` 实例负责从无头客户端处获取消息/事件, 同时负责协调与执行事件.

首先, 我们从第`8`行开始解析.
``` python
async with Session(f"mirai://localhost:8080/?authKey={authKey}&qq={qq}") as session:
```

去除无关部分:
``` python
Session(f"mirai://localhost:8080/?authKey={authKey}&qq={qq}")
```

你可以很清晰的看出, 我们使用了一个 URL 实例化了一个 `Session` 对象, 这是推荐的做法.  
如果你需要传入具名参数, 需要使用类似 `host`, `port`, `qq` 之类的字段, 也是可以的:

``` python
Session(host="localhost", port="8080", authKey=authKey, qq=qq)
```

无论如何, 在实例中, 我们都使用了 `async with` 语法启动了 `Session` 内部的相关机制, 
同时你的程序接收到了一个返回值, 这个返回值即是 `Session` 对象本身.

到底发生了什么?
::: details
我们使用 异步上下文(`async context manager`) 机制自动向无头客户端 `mirai-http-api` 发起请求, 并完成以下几件事:
 - 向无头客户端发起认证, 获取并记录 `sessionKey`
 - 发起一次 `verify` 请求, 绑定机器人的 qq
 - 启动 短轮询/事务运行 线程, 用于从无头服务器端获取事件并传递事件到 `event_runner`.
:::

然后我们使用 `Session.receiver` 注册了事件 `"FriendMessage"`.

当我们的 短轮询/事务运行 线程从无头客户端获取到事件时,
会对其下发的 `JSON` 进行序列化, 并传递到 `event_runner`, 并由其进行事务的运行.

于是当 `Session` 获取到事件 `"FriendMessage"` 时,
`event_runner` 从已注册的事件列表内抽出 `事件运行主体(Event Body)`,
并传入 `上下文(Context)` 运行事务.

简单来说, 就是:
```
注册事件 -> 监听事件 -> 收到事件 -> 传入上下文并运行
```

同时, 我们还支持一定程度上的 `事件上下文(Event Context)`:

``` python
@session.receiver("FriendMessage", lambda c: c.message.sender.id == 133454534)
async def event_friendmessage(session: Session, sender: Friend):
    await session.sendFriendMessage(
        sender.id,
        [Plain(text="Hello, world!")]
    )
```

当事件注册把一个 `Callable[[Union[MessageContext, EventContext]], bool]` 作为第二个参数传入时,
在 `event_runner` 内会先传入 `InternalEvent.body` 执行该 `Callable`,
并根据其返回值判断是否执行事件运行主体.