# 深入 Application(应用) 机制

[[toc]]

在 `python-mirai` 中, 与无头客户端的交互主要由应用类 `Mirai` 暴露出的 API 完成,
这些 API 作为方法, 将输入的参数序列化后发往无头客户端以完成一次操作.

接下来, 我们将深入其 API, 并一一讲解.

::: tip
在实际的代码中, `Mirai` 其实继承了 `MiraiProtocol`,
通过操作其暴露出的各式方法, 来完成一系列的操作.

你可以在 `mirai.protocol` 内找到 `MiraiProtocol` 的定义.
:::

## 消息处理
目前, 我们支持两种消息类型的发送, 即 `FriendMessage` 和 `GroupMessage`.  

### 发送群消息
**Coroutine** `Mirai.sendGroupMessage`
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
   - `quoteSource: Optional[Union[Source, int]]`: 指定回复的消息
 - 返回值: `BotMessage`(`mirai.message.types.BotMessage`)
 - 可能抛出的错误:
   - `ValueError`: 没有找到目标群, 无法发送

   - `EnvironmentError`: 检查检查实例化 `Mirai` 时填入的信息
   - `ConnectionRefusedError`: 尝试重启
   - `PermissionError`: 权限不足
   - `RuntimeError`: 序列化失败, 尝试联系开发者
 - 样例:
    ``` python
    await app.sendGroupMessage(
        123456789,
        [Plain(text="发送了一条群消息")]
    )
    ```

### 发送好友消息
**Coroutine** `Mirai.sendFriendMessage`
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

   - `EnvironmentError`: 检查检查实例化 `Mirai` 时填入的信息
   - `ConnectionRefusedError`: 你可以尝试重启应用
   - `PermissionError`: 权限不足
   - `RuntimeError`: 序列化失败, 尝试联系开发者
 - 样例:
    ``` python
    await app.sendFriendMessage(
        123456789
        [Plain(text="这是一条好友消息")]
    )
    ```

### 撤回消息
**Coroutine** `Mirai.revokeMessage`
 - 描述: 撤回自己或者群员的信息(需要管理员/群主权限)
 - 参数列表:
   - `source: T.Union[Source, int]`: 需要撤回的目标消息
 - 返回值: `bool`
 - 可能抛出的错误:
   - `ValueError`: 无法找到指定目标
   - `PermissionError`: 权限不足

   - `EnvironmentError`: 检查检查实例化 `Mirai` 时填入的信息
   - `ConnectionRefusedError`: 你可以尝试重启应用
   - `RuntimeError`: 序列化失败, 尝试联系开发者

## 信息获取
### 获取机器人账号加入的群组
**Coroutine** `Mirai.groupList`
 - **警告**: 若你在实例化 `Mirai` 时未显式传入参数 `cache_groups` 的值,
 则不需要通过调用该API再次抓取群组列表, 请通过 `Mirai.cached_groups` 访问已经被缓存的群,
 这是一个 `Dict[int, Group]`, 妥善使用.
 - 参数列表: 不需要传入参数
 - 返回值: `List[Group]`

### 获取机器人账号所拥有的好友
**Coroutine** `Mirai.friendList`
 - **警告**: 若你在实例化 `Mirai` 时未显式传入参数 `cache_friends` 的值,
 则不需要通过调用该API再次抓取群组列表, 请通过 `Mirai.cached_friends` 访问已经被缓存的群,
 这是一个 `Dict[int, Friend]`, 妥善使用.
 - 参数列表: 不需要传入参数
 - 返回值: `List[Friend]`

### 获取特定群组的成员列表
**Coroutine** `Mirai.memberList`
 - 参数列表:
    - `target: int`: 群组的群号
 - 返回值: `List[Member]`

### 获取特定群组的成员数量
**Coroutine** `Mirai.groupMemberNumber`
 - 参数列表:
    - `target: int`: 群组的群号
 - 返回值: `int`

### 从已缓存的群组列表中获取 Group 对象
`Mirai.getGroup`
 - 参数列表:
    - `target: int`: 群组的群号
 - 返回值: `Optional[Group]`

### 从已缓存的好友列表中获取 Friend 对象
`Mirai.getFriend`
 - 参数列表:
    - `target: int`: 好友的QQ号
 - 返回值: `Optional[Friend]`

### 缓存群组列表
**Coroutine** `Mirai.cacheBotGroups`
 - 描述: 若在实例化时没有设置缓存, 则从无头客户端处拉取群组列表
 - 参数列表: 不需要传入参数
 - 返回值: 无返回值

### 缓存好友列表
**Coroutine** `Mirai.cacheBotFriends`
 - 描述: 若在实例化时没有设置缓存, 则从无头客户端处拉取好友列表
 - 参数列表: 不需要传入参数
 - 返回值: 无返回值

### 强制刷新群组列表缓存
**Coroutine** `Mirai.refreshBotGroupsCache`
 - 描述: 强制刷新群组列表, 无论是否已经缓存
 - 参数列表: 不需要传入参数
 - 返回值: `List[Group]`

### 强制刷新好友列表缓存
**Coroutine** `Mirai.refreshBotFriendsCache`
 - 描述: 强制刷新好友列表, 无论是否已经缓存
 - 参数列表: 不需要传入参数
 - 返回值: `List[Friend]`

## 群管理
::: warning
此部分的绝大多数内容需要机器人账号具有管理员甚至群主级的权限,
若你的程序抛出 `PermissionError`, 请先检查机器人账号的权限,
若仍存在该问题, 请在主项目 `python-mirai` 处新增一个 ISSUE.
:::

### 全体禁言
**Coroutine** `Mirai.muteAll`
 - 描述: 在指定群组处启用全体禁言
 - 参数列表:
    - `target: int`: 要操作的群号
 - 返回值: 返回值无意义(`bool`)
 - 权限限制:
    - 管理员(`Permission.Administrator`)
    - 群主(`Permission.Owner`)

### 取消全体禁言
**Coroutine** `Mirai.unmuteAll`
 - 描述: 在指定群组处启用全体禁言
 - 参数列表:
    - `target: int`: 要操作的群号
 - 返回值: 返回值无意义(`bool`)
 - 权限限制:
    - 管理员(`Permission.Administrator`)
    - 群主(`Permission.Owner`)

### 获取群员信息
**Coroutine** `Mirai.memberInfo`
 - 描述: 获取指定群组内指定群员的信息
 - 参数列表:
    - `group: Union[Group, int]`: 指定群组
    - `member: Union[Member, int]`: 指定群员
 - 返回值: `MemberChangeableSetting`
 - 权限限制: 无

### 修改群员信息
**Coroutine** `Mirai.changeMemberInfo`
 - 描述: 修改群成员的信息(特殊头衔, 群名片)
 - 参数列表:
    - `group: Union[Group, int]`: 目标群组
    - `member: Union[Member, int]`: 目标成员
    - `info: MemberChangeableSetting`: 要加以修改的设置
 - 返回值: 返回值无意义(`bool`)
 - 权限限制:
    - 管理员(`Permission.Administrator`): 仅能更改群名片
    - 群主(`Permission.Owner`): 可设置特殊头衔与群名片
    - 修改自身: 仅能更改群名片
 - 温馨提示: 因为 pydantic 无法不将值为 `null` 的键忽略,
 所以请先使用获取群员信息的接口, 并通过 `MemberChangeableSetting.modify` 更改其属性再提交.

### 获取机器人的群成员信息
**Coroutine** `Mirai.botMemberInfo`
 - 描述: 获取机器人账号在目标群的成员信息
 - 参数列表:
    - `group: Union[Group, int]`: 目标群组
 - 返回值: `MemberChangeableSetting`

### 获取群设置
**Coroutine** `Mirai.groupConfig`
 - 描述: 获取指定群的设置
 - 参数列表:
    - `group: Union[Group, int]`: 目标群组
 - 返回值: `GroupSetting`

### 修改群设置
**Coroutine** `Mirai.changeGroupConfig`
 - 描述: 修改群成员的信息(特殊头衔, 群名片)
 - 参数列表:
    - `group: Union[Group, int]`: 目标群组
    - `config: GroupSetting`: 要加以修改的设置
 - 返回值: 返回值无意义(`bool`)
 - 权限限制:
    - 管理员(`Permission.Administrator`)
    - 群主(`Permission.Owner`)
 - 温馨提示: 因为 pydantic 无法不将值为 `null` 的键忽略,
 所以请先使用获取群设置的接口, 并通过 `GroupSetting.modify` 更改其属性再提交.

### 禁言群成员
**Coroutine** `Mirai.mute`
 - 描述: 禁言群成员
 - 参数列表:
    - `group: Union[Group, int]`: 目标群组
    - `member: Union[Member, int]`: 目标成员
    - `time: Union[timedelta, int]`: 禁言时长
 - 返回值: 返回值无意义(`bool`)
 - 权限限制:
    - 管理员(`Permission.Administrator`)
    - 群主(`Permission.Owner`)
 - 温馨提示: 
    - 由于客观原因, 你只能设置参数 `time` 为一个
      "所直接表现值小于 30 天 并且大于 1 分钟的值",  
      若其直接表现值大于 30 天, 将只会禁言该成员 30 天,  
      若其直接表现值小于 1 分钟, 将只会禁言该成员 1 分钟.
    - 由于客观原因, 导致管理员**无法禁言**群主及其他管理员, 此时会抛出 `PermissionError`, 请注意.

### 取消禁言
**Coroutine** `Mirai.unmute`
 - 描述: 取消之前对指定群成员的禁言
 - 参数列表:
    - `group: Union[Group, int]`: 目标群组
    - `member: Union[Member, int]`: 目标成员
 - 返回值: 返回值无意义(`bool`)
 - 权限限制:
    - 管理员(`Permission.Administrator`)
    - 群主(`Permission.Owner`)
 - 温馨提示:
    - 由于客观原因, 导致管理员**无法解禁**由群主禁言的管理员或是自己, 此时会抛出 `PermissionError`, 请注意.

### 将成员从群组中删除
**Coroutine** `Mirai.kick`
 - 描述: 将指定群成员从群组中删除
 - 参数列表:
    - `group: Union[Group, int]`: 目标群组
    - `member: Union[Member, int]`: 目标成员
 - 返回值: 返回值无意义(`bool`)
 - 权限限制:
    - 管理员(`Permission.Administrator`)
    - 群主(`Permission.Owner`)
 - 温馨提示:
    - 由于客观原因, 导致管理员**无法踢出**其他管理员及群主, 此时会抛出 `PermissionError`, 请注意.