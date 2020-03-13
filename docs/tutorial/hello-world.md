# Hello World

[[toc]]

## 启动无头客户端
由于 `python-mirai` 基于 `mirai-http-api` 实现, 所以若你想通过 `python-mirai` 编写机器人,
我建议你先按照Mirai的[文档](https://github.com/mamoe/mirai-console)启动一个 
`mirai-console` 实例, 然后按照其输出进行操作即可.

### 成功依照其指示启动后
在 `mirai-console.jar` 同级目录下的文件夹 `plugins/MiraiAPIHTTP` 下,
会有一个 `setting.yml` 文件, 文件内容可能如下:

``` yml
authKey: AAAAAAAA
port: 8080
enableWebsocket: true #ws模式开关
```

将字段 `APIKey` 和 `port` 的值记下, 然后下一步.

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
在这里我们将假设你已经配置好了 `mirai-console` 及 `mirai-http-api`,
并获取到了必要的, 例如 `APIKey`, `port`, `qq` 等关键配置...嗯, 你还记得你用来登录的机器人的qq号吗?
等下要用, 字段 `qq` 的值就是你用来登录的机器人的qq号.

这是一段代码样例, 当有用户私聊机器人时, 会向其发送一条 `"Hello, world!"`.
出于使任何人理解的目的, 我会带着你一一解析我们提供的 API .

::: tip
由于本文档更新时, `python-mirai` 已经发布了 `0.2.10`,
故我们将转为介绍 `Application`, 同时 `Session` 将作为 `addForeverTarget` 的备选方案.
:::


首先, 给出一段 `Hello, world!` 代码:
``` python
from mirai import Mirai, Plain, MessageChain, Group
import asyncio

qq = 123456 # 字段 qq 的值
authKey = 'abcdefg' # 字段 authKey 的值
mirai_api_http_locate = 'localhost:8080/' # httpapi所在主机的地址端口,如果setting.yml文件里面的 nableWebsocket: true 则需要在此地址上加上 ws 后缀

app = Mirai(f"mirai://{mirai_api_http_locate}?authKey={authKey}&qq={qq}")

@app.receiver("GroupMessage")
async def event_gm(app: Mirai, group: Group):
    await app.sendGroupMessage(group, [
        Plain(text="Hello, world!")
    ])

if __name__ == "__main__":
    app.run()

```

::: warning
强烈建议你开一个测试机器人专用的群组, 否则你的机器人很可能会被其他人仇视!
:::

运行这段代码, 在某个群随便说一句话, 你的机器人就会发送一条消息:

<panel-view title="聊天记录">
<chat-message nickname="Alice" color="#cc0066">向这个世界问个好吧.</chat-message>
<chat-message nickname="Bot" :avatar="$withBase('/mirai-head.png')">Hello, world!</chat-message>
</panel-view>

### 发生了什么?
我们会分几个章节来说明一个 `Hello, world` 实例, 这里我们先介绍下 `Application` 机制.  
 `Application` 实例负责从无头客户端处获取消息/事件, 同时负责协调与执行事件.

首先, 我们从定义了 `app` 的那行开始解析.
``` python
Mirai(f"mirai://localhost:8080/?authKey={authKey}&qq={qq}")
```

你可以很清晰的看出, 我们使用了一个 URL 实例化了一个 `Mirai` 对象, 这是推荐的做法.  
如果你需要传入具名参数, 需要使用类似 `host`, `port`, `qq` 之类的字段, 也是可以的:

``` python
Mirai(host="localhost", port="8080", authKey=authKey, qq=qq)
```

无论如何, 在实例中,
我们最后都使用了 `Mirai.run` 方法启动了 `Application` 内部的相关机制,
使一切开始运作起来.

到底发生了什么?
::: details
当执行方法 `Mirai.run` 时:
 - 我们向无头客户端发起认证, 获取并记录 `sessionKey`;
 - 发起一次 `verify` 请求, 绑定机器人的 qq;
 - 开始短轮询协程, 用于从无头服务器端获取事件广播并执行事件.
:::

然后我们使用 `Mirai.receiver` 注册了事件 `"GroupMessage"`.

当我们的短轮询协程从无头客户端获取到事件时,
会对其广播的事件进行查找, 并运行事务.

于是当 `Application` 获取到事件 `"GroupMessage"` 时,
`event_runner` 从已注册的事件列表内抽出 `事件运行主体(Event Body)`,
并传入 `上下文(Context)` 运行事务.

简单来说, 就是:
```
注册事件 -> 监听事件 -> 收到事件 -> 传入上下文并运行
```

如果你理解了这些, 那么你就可以去浏览本文档的其他部分了.