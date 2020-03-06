# Hello, event

[[toc]]

## 什么是事件(Event)?
事件(`Event`) 用于处理在无头客户端处广播的各式可观察事件, 并将其通过内置的事件处理机制进行分发.

::: tip
`Application` 机制完全兼容本特性.
:::

### 通俗的说法
事件就是我们能看到的 "xxx被禁言了", "xxx群开全群禁言了" 这样的外部发生的状态变化.

我们将类似 "欸, 那个人被禁言辣", "欸, 这个群怎么群名变了" 这样的称为 "作为第三方观察到的外部发生的事件",
而将类似 "机器人又被下管理了", "机器人被口球了" 这样以机器人账号为被执行者的称为 "作为被执行方所观察到的事件".

::: tip
其实, 你之前用到的 `FriendMessage`, `GroupMessage`,
也是事件的一种特殊类型, 我们称这种特殊事件为 `Message`
:::

## 如何监听事件
与之前使用的类似 `"FriendMessage"` 一样, 你只需要将事件的名称传入 `Session.receiver` 即可监听事件.  
事件的列表可以在[这里](https://github.com/mamoe/mirai/blob/master/mirai-api-http/EventType_CH.md)看到.

当事件被传达时, `event_runner` 会实例化一个 `EventContextBody`(`mirai.prototypes.context.EventContextBody`)
对象, 设置上下文对象 `EventContext`(`mirai.context.event` 或者 `mirai.Direct.Event`), 
并使用 `annotations` 特性将参数传入事件运行主体运行.

这里是一个监听事件 `"MemberJoinEvent"` 的实例.
``` python
from mirai import (
    Session, Plain, At,
    MemberJoinEvent,
    EventContextBody
)
...

@session.receiver("MemberJoinEvent")
async def member_join(event: MemberJoinEvent, session: Session):
    await session.sendGroupMessage(
        event.member.group.id,
        [
            At(target=event.member.id),
            Plain(text="欢迎进群!")
        ]
    )

...
```

运行这段代码, 当有新成员加入有该机器人的群时, 机器人会发送一条欢迎消息.

## 关于类型推断
在之前的版本中, 由于直接传入上下文对象, 导致编辑器的类型推断无法工作.  
而在最近更新的版本中, 因为使用了 `annotations` 的特性,
你可以使用更加优雅的方式处理事件了.

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

## 提供运行条件
`Session.receiver` 还支持第二个参数, 前面我们已经了解到了:

> 当事件注册把一个 `Callable[[Union[MessageContext, EventContext]], bool]` 作为第二个参数传入时,
> 在 `event_runner` 内会先传入 `InternalEvent.body` 执行该 `Callable`,
> 并根据其返回值判断是否执行事件运行主体.

你需要通过传入 `lambda 表达式` 的方式定义第二个参数.  
建议你需要判定多个条件时使用内置函数 `any` 更加优雅的判定条件.