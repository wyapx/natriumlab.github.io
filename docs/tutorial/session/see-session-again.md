# 深入 Session(会话) 机制

[[toc]]

在 `python-mirai` 中, 与无头客户端的交互主要由 `session` 暴露出的 API 完成,
这些 API 作为方法, 将输入的参数序列化后发往无头客户端以完成一次操作.

接下来, 我们将深入其 API, 并一一讲解.

::: tip
在实际的代码中, `Session` 其实继承了 `MiraiProtocol`,
通过操作其暴露出的各式方法, 来完成一系列的操作.

你可以在 `mirai.protocol` 内找到 `MiraiProtocol` 的定义.
:::

## 发送消息
目前, 我们支持两种消息类型, 即 `FriendMessage` 和 `GroupMessage`.  

### 发送群消息
**Coroutine** `session.`**`sendGroupMessage`**
 - 参数列表:
   - `group: Union[Group, int]`: 发送消息目标群
   - `message`
     - 可为以下类型的其中一种(`Union`):
       - `MessageChain`
       - `<? extend BaseMessageComponent>`
       - `List[<? extend BaseMessageComponent>]`
       - `str`
   - `quoteSource: Optional[Source, int]`: 指定回复的消息
 - 返回值: `BotMessage`(`mirai.message.types.BotMessage`)
 - 可能抛出的错误:
   - `ValueError`: 没有找到目标群, 无法发送
   - `EnvironmentError`: 检查检查实例化 `Session` 时填入的信息
   - `ConnectionRefusedError`: 尝试重启
   - `PermissionError`: 权限不足
   - `RuntimeError`: 序列化失败, 尝试联系开发者
 - 样例:
    ``` python
    # 非上下文.
    await session.sendGroupMessage(
        123456789,
        [Plain(text="发送了一条群消息")]
    )

    # 与上下文连用
    @session.receiver("GroupMessage")
    async def _(context):
        await context.session.sendGroupMessage(
            context.message.sender.group.id
            context.message.messageChain,
            quoteSource=context.message.messageChain.getFirstComponent(Source)
        )
    ```

### 发送好友消息
**Coroutine** `session.`**`sendFriendMessage`**
 - 参数列表:
   - `friend: Union[Friend, int]`: 发送消息目标好友
   - `message`
     - 可为以下类型的其中一种(`Union`):
       - `MessageChain`
       - `<? extend BaseMessageComponent>`
       - `List[<? extend BaseMessageComponent>]`
       - `str`
 - 返回值: `BotMessage`(`mirai.message.types.BotMessage`)
 - 可能抛出的错误:
   - `ValueError`: 没有找到目标群, 无法发送
   - `EnvironmentError`: 检查检查实例化 `Session` 时填入的信息
   - `ConnectionRefusedError`: 尝试重启
   - `PermissionError`: 权限不足
   - `RuntimeError`: 序列化失败, 尝试联系开发者
 - 样例:
    ``` python
    await session.sendFriendMessage(
        123456789
        [Plain(text="这是一条好友消息")]
    )
    ```