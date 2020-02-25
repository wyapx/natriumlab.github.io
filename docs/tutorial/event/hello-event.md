# Hello, event

[[toc]]

## 什么是事件(Event)?
事件(`Event`) 用于处理在无头客户端处广播的各式可观察事件, 并将其通过内置的事件处理机制进行分发.

### 通俗的说法
事件就是我们能看到的 "xxx被禁言了", "xxx群开全群禁言了" 这样的外物状态变化.

我们将类似 "欸, 那个人被禁言辣", "欸, 这个群怎么群名变了" 这样的称为作为第三方观察到的外部发生的事件,
而将类似 "机器人又被下管理了", "机器人被口球了" 这样的称为作为被执行方所观察到的事件.

::: tip
其实, 你之前用到的 `FriendMessage`, `GroupMessage`,
也是事件的一种特殊类型, 我们称这种特殊事件为 `Message`
:::

## 如何监听事件
与之前使用的类似 `"FriendMessage"` 一样, 你只需要将事件的名称传入 `Session.receiver` 即可监听事件.  
事件的列表可以在[这里](https://github.com/mamoe/mirai/blob/master/mirai-api-http/EventType_CH.md)看到.

当事件被传达时, `event_runner` 会实例化一个 `EventContextBody`(`mirai.prototypes.context.EventContextBody`)
对象, 设置上下文对象 `EventContext`(`mirai.context.event` 或者 `mirai.Direct.Event`), 
并传入事件运行主体运行.

这里是一个监听事件 `"MemberJoinEvent"` 的实例.
``` python
from mirai import (
    Session, Plain, At,
    MemberJoinEvent,
    EventContextBody
)
...

@session.receiver("MemberJoinEvent")
async def member_join(context: EventContextBody):
    context.event: MemberJoinEvent

    await context.session.sendGroupMessage(
        context.event.member.group.id,
        [
            At(target=context.event.member.id),
            Plain(text="欢迎进群!")
        ]
    )

...
```

运行这段代码, 当有新成员加入有该机器人的群时, 机器人会发送一条欢迎消息.

## 关于类型推断
因为就算将 `context` 加上了 `EventContextBody` 的定义,
由于其内部设置的是各个事件的基类 `ExternalEvent`(`mirai.event.ExternalEvent`),
所以导致类型推断无法正常工作, 此时只需要将 `context.event` 的类型推断重新定义为事件模型即可:

``` python
...
context.event: MemberJoinEvent
...
```

::: tip
所有的事件模型都在包 `mirai.event.external` 内被定义, 同时被公开到 `mirai` 下, 你可以直接导入:

``` python
from mirai import (
    ...
    MemberJoinEvent,
    MemberJoinEvent,
    MemberLeaveEventKick,
    MemberLeaveEventQuit,
    MemberCardChangeEvent,
    ... 
)
```
:::