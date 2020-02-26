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

## 消息处理
目前, 我们支持两种消息类型的发送, 即 `FriendMessage` 和 `GroupMessage`.  

### 发送群消息
**Coroutine** `Session.sendGroupMessage`
 - 描述: 发送消息到指定目标群
 - **警告**: 当机器人被禁言时调用该方法, 将不会有消息发出, 同时可能抛出错误(`mirai.exceptions.NetworkError`)
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
**Coroutine** `Session.sendFriendMessage`
 - 描述: 发送消息到指定目标好友
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
   - `ValueError`: 没有找到目标好友, 无法发送

   - `EnvironmentError`: 检查检查实例化 `Session` 时填入的信息
   - `ConnectionRefusedError`: 你可以尝试重启应用
   - `PermissionError`: 权限不足
   - `RuntimeError`: 序列化失败, 尝试联系开发者
 - 样例:
    ``` python
    await session.sendFriendMessage(
        123456789
        [Plain(text="这是一条好友消息")]
    )
    ```

### 撤回消息
**Coroutine** `Session.revokeMessage`
 - 描述: 撤回自己或者群员的信息(需要管理员/群主权限)
 - 参数列表:
   - `source: T.Union[Source, int]`: 需要撤回的目标消息
 - 返回值: `bool`
 - 可能抛出的错误:
   - `ValueError`: 无法找到指定目标
   - `PermissionError`: 权限不足

   - `EnvironmentError`: 检查检查实例化 `Session` 时填入的信息
   - `ConnectionRefusedError`: 你可以尝试重启应用
   - `RuntimeError`: 序列化失败, 尝试联系开发者

## 信息获取
### 获取机器人账号加入的群组
**Coroutine** `Session.groupList`
 - **警告**: 若你在实例化 `Session` 时未显式传入参数 `cache_groups` 的值,
 则不需要通过调用该API再次抓取群组列表, 请通过 `Session.cached_groups` 访问已经被缓存的群,
 这是一个 `Dict[int, Group]`, 妥善使用.
 - 参数列表: 不需要传入参数
 - 返回值: `List[Group]`

### 获取机器人账号所拥有的好友
**Coroutine** `Session.friendList`
 - **警告**: 若你在实例化 `Session` 时未显式传入参数 `cache_friends` 的值,
 则不需要通过调用该API再次抓取群组列表, 请通过 `Session.cached_friends` 访问已经被缓存的群,
 这是一个 `Dict[int, Friend]`, 妥善使用.
 - 参数列表: 不需要传入参数
 - 返回值: `List[Friend]`

### 获取特定群组的成员列表
**Coroutine** `Session.memberList`
 - 参数列表:
    - `target: int`: 群组的群号
 - 返回值: `List[Member]`

### 从已缓存的群组列表中获取 Group 对象
`Session.getGroup`
 - 参数列表:
    - `target: int`: 群组的群号
 - 返回值: `Optional[Group]`

### 从已缓存的好友列表中获取 Friend 对象
`Session.getFriend`
 - 参数列表:
    - `target: int`: 好友的QQ号
 - 返回值: `Optional[Friend]`

### 缓存群组列表
**Coroutine** `Session.cacheBotGroups`
 - 描述: 若在实例化时没有设置缓存, 则从无头客户端处拉取群组列表
 - 参数列表: 不需要传入参数
 - 返回值: 无返回值

### 缓存好友列表
**Coroutine** `Session.cacheBotFriends`
 - 描述: 若在实例化时没有设置缓存, 则从无头客户端处拉取好友列表
 - 参数列表: 不需要传入参数
 - 返回值: 无返回值

### 强制刷新群组列表缓存
**Coroutine** `Session.refreshBotGroupsCache`
 - 描述: 强制刷新群组列表, 无论是否已经缓存
 - 参数列表: 不需要传入参数
 - 返回值: `List[Group]`

### 强制刷新好友列表缓存
**Coroutine** `Session.refreshBotFriendsCache`
 - 描述: 强制刷新好友列表, 无论是否已经缓存
 - 参数列表: 不需要传入参数
 - 返回值: `List[Friend]`

