# 上下文(Context)

[[toc]]

## 什么是上下文?
上下文(`Context`) 是我们用于处理多模块耦合和消息获取的核心部分, 
用于对消息的获取, 响应和 自动对象生成(`Automatic object generation`).

### 说点人能听懂的吧
简单来说, 上下文主要用于事件运行主体内部的信息获取,
也就是说当你写了个色图机器人, 你就必须这样来叫一张色图:

<panel-view title="聊天记录">
<chat-message nickname="无情的叫色图机" color="#cc0066">来张色图秋梨膏</chat-message>
</panel-view>

然后机器人需要读取到你发出的消息内容, 并且要知道是哪个群的肥宅叫的色图, 还要知道他要的是啥, 色图要发到哪里...  
我们称这些 "能知道并且必须知道的信息" 称为 "上下文项", 而一堆这样的项聚合起来就叫做 "上下文".

获取的信息由 `MessageContextBody` 和 `EventContextBody` 这两个数据模型进行汇总和解析,
并通过你在定义事件运行主体时所定义的形参传入.

::: tip
关于 `EventContextBody`, 目前只需要了解 `MessageContextBody` 即可, 关于这玩意后面会讲到.
:::

### 所以这玩意咋用?
`event_runner` 在运行事件运行主体时,
会将当前上下文依据事件运行主体的 [`annotations`](https://www.python.org/dev/peps/pep-3107/) 传入上下文项.

还是以 `Hello, world` 作为范例:
``` python
@session.receiver("FriendMessage")
async def event_friendmessage(session: Session, sender: Friend):
    # 像上面的 session, sender 即是当前事件运行主体的上下文项对象, 每个事件独有一份.
    # 因为最新版本使用了 annotations 这个特性, 所以你的 IDE/编辑器 可以非常轻松的完成它的任务.
    await context.session.sendFriendMessage(
        context.message.sender.id,
        [Plain(text="Hello, world!")]
    )
```

而上下文最大的功用, 便是能使环境下的任何函数都能调用当前环境中的数据,
而不需要显式传入对象.  
多说无益, 我们还是直接上实例吧.

``` python
# file: context_test.py
from mirai import Direct

def is_startwith(string):
    "判断当前正在处理的消息是否以 string 为前缀"
    return Direct.Message\
        .message.messageChain.toString().startswith(string)
```

``` python
# file: main.py
from mirai import Plain, Session, Member, Group

from context_test import is_startwith
...
@session.receiver("GroupMessage")
async def handler(session: Session, group: Group):
    if is_startwith("/"):
        await session.sendGroupMessage(
            group.id,
            [Plain(text="嗯?你刚才以斜杠开头写了什么啊")]
        )
...
```

尝试运行:

<panel-view title="聊天记录">
<chat-message nickname="Toolman" color="#cc0066">/help,please!!!!</chat-message>
<chat-message nickname="Bot" :avatar="$withBase('/mirai-head.png')">嗯?你刚才以斜杠开头写了什么啊</chat-message>
</panel-view>

你会发现, 我们使用了 `mirai.Direct` 这个对象在未传参时访问了上下文对象,
同时对消息内容进行了条件判断.

上下文系统有利于降低应用各个模块间的耦合, 并使数据的调用更加流畅,
而模块提供的方法也变得更加易用.

::: tip
注意, 我们目前只对事件运行主体使用 `annotations` 特性,
当外部函数要使用上下文对象时, 还是需要使用 `mirai.Direct` 对象!
~~当以后整出依赖注入就不用了~~
:::