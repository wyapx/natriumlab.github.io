# 消息组件

[[toc]]

## 嗯...什么是消息组件(Message Components)?
回到一开始的 `Hello, world` 实例中去, 我们会发现, 当我们发送消息时, 需要使用这样一个格式:

``` python
from mirai import mirai, Plain, Member
app = Mirai(......)
...
await app.sendGroupMessage(
    group.id,
    [Plain(text="Hello, world!")]
)
```

注意第三行, 我们使用一个字符串 `"Hello, world!"` 作为具名实参 `text` 传入到了 `Plain` 中,
并实例化了一个 `List[Plain]` 对象.  
而当我们发出任意群聊消息时, 机器人会发出 `"Hello, world!"` 的消息.  
如果我们将其改为这样:

```python
[Plain(text="Hello, "), Plain(text="world"), Plain(text="!")]
```

若此时, 我们也如之前一样发出任意私聊消息时:

<panel-view title="聊天记录">
<chat-message nickname="Alice" color="#cc0066">随便打个招呼吧.</chat-message>
<chat-message nickname="Bot" :avatar="$withBase('/mirai-head.png')">Hello, world!</chat-message>
</panel-view>

我们会发现, 这和之前是一样的返回.

::: tip
我们会尽量使用浅显易懂的方法, 来解释一些读者可能会抛出的问题.  
若你对我们的方法表示困惑, 欢迎提出 Issue 或是发起 Pull Request.  
我们始终欢迎任何形式的贡献.
:::

## 为什么会这样?
我们将类似 `Plain` 这样可以构成一条消息的一部分的模型, 称为 `消息组件(Message Components)`.  

::: tip
你目前所接触的仅仅是冰山一角, 你还可以通过 查看代码 或是 实地演练 的方式对你刚才接触到的东西进行更为深层次的了解.  
没有不好用的工具, 只有不会用的工匠.
:::

你发出的消息在 `mirai` 内部会被解析为一个或多个部分,
并且每个部分都有其特殊的用途, 像是 `@Alice`, `@全体成员`, 或是
`[这里是一张图片,不是什么色图,只是一张图]`, 这样, `mirai` 接收到消息, 并将消息序列化为这样的格式.  

### 嗯...所以为什么不是 "Mirai码" ?
::: tip
如果你之前曾使用过类似 [酷Q](https://cqp.me) 这样的无头客户端实现,
你可能会更加熟悉于类似 `CQ码` 的格式.  
我们将解释这个问题, 并说明我们的用意.
:::

我们**不会**创造什么 `Mirai码`, 过去没有, 现在没有, 将来也**不会**有.  
出于方便和可用性考虑, 我们并不会去专门设计自己的表现特殊数据的方式,
相反, 我们使用类似 [`JSON Schema`](https://json-schema.org/) 的方式表现数据.

而这种方式对应用的表达性是有很大提高的:

``` python
# 你觉得那种方式更加友好?
string = "[At::target=123456789] [Image::\{UIUIUIUIUIUI-UIUI-UIUI-UIUI\}.jpg]"

objective = [
    At(target=123456789),
    Image(imageId=UUID("UIUIUIUIUIUI-UIUI-UIUI-UIUI"))
]
```

::: tip
其实我们还是创造了一种将消息组件转化为文本信息的API,
但是这种转换是**单向**的.

你可以使用 `MessageChain.toString` 方法将消息链用文本形式表示,
同时我们也在各个组件内定义了 `toString` 方法, 用于一些判断.
:::

## 我可以从哪里找到消息组件?
若你只使用 `python-mirai`, 那么你可以在 `mirai.event.message.components` 处找到所有消息组件的定义.  

::: details
我们支持的可发出的消息组件:
 - `At`(`mirai.event.message.components.At`): At某人
     - `target: int`
        - 你要 at 的人
 - `AtAll`(`mirai.event.message.components.AtAll`): At全体成员, 若你的机器人无相关权限, 抛出 `ValueError`.
 - `Plain`(`mirai.event.event.message.components.AtAll`): 文本消息.
     - `text: str` 
        - 将被发出的文本, 支持所有使用 `Unicode` 的字符串.
 - `Image`(`mirai.event.message.components.Image`): 图片, 有着特殊的使用方式, 将在之后重点讲到.
 - `Face`(`mirai.event.message.components.Face`): QQ表情, 有着特殊的使用方式, 将在之后重点讲到.
     - `faceId: int`
        - 表情的 ID, 会在之后讲到如何传值.
:::

## 基本的使用方式
只需要实例化即可, 在最新的提交中已经重写了 `__init__` 方法, 这意味着你会得到更好的开发体验:

``` python
from mirai import At, AtAll, Plain

At(target=123456789)
AtAll() # 需要有特定权限.
Plain(text="?")
```

在发送消息时, 我们推荐使用列表的形式组合消息组件:

``` python
from mirai import mirai, Member
app = Mirai(......)
await app.sendGroupMessage(
    group.id,
    [
        At(target=member.id),
        Plain(text="!")
    ]
)
```

## 图片的发送方式
我们强烈建议你使用 `Image.fromFileSystem` 工厂方法来上传本地图片:

``` python
from mirai import Image, Plain #使用前导入

[
    Image.fromFileSystem("./image.png"),
    Plain(text="这张图片发给你了!")
]
```

此外, 你可以直接使用 `MessageChain` 对象的
`getFirstComponent` 方法获取消息中的第一张图片, 也可以使用
`getAllofComponent` 方法获取消息中的所有图片:

``` python
from typing import List
from mirai import MessageChain, Image

async def event_gm(message: MessageChain):
    # 获取消息中的第一张图片
    a_image: Image = message.getFirstComponent(Image)

    # 获取消息中所有图片
    all_images: List[Image] = \
        msg.getAllofComponent(Image)
```

你可以直接发送其中的 `Image` 对象, 大多数情况都会如预期中运转.

## QQ 表情的发送方式
我们内置了一个 `QQFaces`(`mirai.face.QQFaces`) 的字典, 你可以直接从中获取 `faceId`:

``` python
from mirai.face import QQFaces

from mirai import Face
Face(faceId=QQFaces['nanguo']) # 实例化了一个会被发送为 "难过" 的表情.
```
