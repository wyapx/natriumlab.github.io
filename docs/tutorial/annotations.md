# 认识 Annotations 特性

[[toc]]

## 什么是 Annotations?
即 Python 3.5 及以上版本的特性 类型注解(Annotations).
于 [PEP3107](https://www.python.org/dev/peps/pep-3107/) 中被提出,
并于 [PEP526](https://www.python.org/dev/peps/pep-0526/) 中强化,
使之可以覆盖到变量层面.

主要的实现 `typing` 是 Python 的标准库.

## 在 python-mirai 中的应用
我们使用 Annotations 特性来给事件运行主体分发上下文项, 并基于其提供了附加功能.  

::: tip
`Application` 机制也支持使用 `Annotations` 特性, 且具体的变动将在接下来讲解.
:::

### 基本案例
``` python
from mirai import (
    Session, Group, Member, Friend,
    GroupMessage, FriendMessage
)

...
@session.receiver(GroupMessage)
async def GMHandler(session: Session, group: Group, member: Member, message: GroupMessage):
    pass

@session.receiver(FriendMessage)
async def FMHandler(session: Session, friend: Friend, message: FriendMessage):
    pass
...

```
当你做好类型推断后, 只需要按照规则调用就好.

可以作为注解项的类型(值):
 - `mirai.Session`: 会话本身. **不能在 Applications 机制中使用!!!**
 - `mirai.Mirai`: `Application` 的实例, 与 `mirai.Session` 同级. **只能在 Applications 机制中使用!!!**
 - `mirai.GroupMessage`: **只能在事件 GroupMessage 内使用**, GroupMessage实例.
 - `mirai.FriendMessage`: **只能在事件 FriendMessage 内使用**, FriendMessage实例.
 - `mirai.Source`: **只能在事件 FriendMessage, GroupMessage 内使用**, 消息的 `Source` 对象, 用于读取 `MessageID`.
 - `mirai.MessageChain`: **只能在事件 FriendMessage, GroupMessage 内使用**, 消息的 `messageChain` 对象.
 - `mirai.Group`: **只能在事件 GroupMessage 内使用**, `GroupMessage.sender.group` 实例.
 - `mirai.Friend`: **只能在事件 FriendMessage 内使用**, `FriendMessage.sender` 实例.
 - `mirai.Member`: **只能在事件 GroupMessage 内使用**, `GroupMessage.sender` 实例.
 - `"Sender"`: **只能在事件 FriendMessage, GroupMessage 内使用**, 消息的 `sender` 对象.
 - `"Type"`: 事件的名称, 类型 `str`
 - 各个事件类: **只能在其监听内使用**, 当前事件的实例.