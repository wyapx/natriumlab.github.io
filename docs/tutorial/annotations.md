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
    Mirai, Group, Member, Friend,
    GroupMessage, FriendMessage
)
app = Mirai(......)
...
@app.receiver(GroupMessage)
async def GMHandler(app: Mirai, group: Group, member: Member, message: GroupMessage):
    pass

@app.receiver(FriendMessage)
async def FMHandler(app: Mirai, friend: Friend, message: FriendMessage):
    pass
...

```
当你做好类型推断后, 只需要按照规则调用就好.

可以作为注解项的类型(值), 以下都可以在模块 `mirai` 处直接引入:

|是否常用|注解项的值|说明|指向的实例|条件限制|
|:-:|:-:|:-|:-|:-|
|√|`Mirai`|即 `Mirai` 实例本身|正在运行的 `Mirai` 实例|无|
|√|`Source`|在信息链里面的 `Source`(消息源) 组件|用于取出消息的 `MessageID` 和发送时间|不能在事件的监听里用.|
|√|`MessageChain`|捕获到的消息链|用于获取接收到的消息|不能在事件的监听里用.|
|√|`Group`|群消息的群|用于获取群消息的来源|只能在监听 `GroupMessage` 的事件内使用.|
|√|`Member`|发群消息的群成员|用于获取群消息的发送者|只能在监听了 `GroupMessage` 的事件内使用.|
|√|`Friend`|发好友消息的好友|用于获取好友消息的发送者|只能在监听了 `FriendMessage` 的事件内使用.|
|√|各个事件的类|事件的实例|事件的实例, 在 `mirai.event.external` 内被定义|只能在对应事件的监听内使用.|
|×|`GroupMessage`|属于低级API, 可以使用其他的代替|当前消息的序列化对象|只能在监听 `GroupMessage` 的事件内使用.|
|×|`FriendMessage`|属于低级API, 可以使用其他的代替|当前消息的序列化对象|只能在监听 `FriendMessage` 的事件内使用.|
|?|`"Sender"`|消息的发送者, 值可能是 `Member` 也可能是 `Friend`|当前消息的序列化对象内属性 `sender` 的值|只能在实例内有属性 `sender` 的事件内使用.|
|?|`"Type"`|当前捕获到的事件名称|必定是字符串|魔法注解, 无条件限制|
