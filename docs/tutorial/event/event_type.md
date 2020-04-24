# 事件类型一览 


[[toc]]

## 机器人相关 


### 机器人上线 
**class** `BotOnlineEvent` 
 - 描述：机器人上线时触发此事件（触发条件暂时未知）
 - 属性：
    - qq: `int`

### 机器人下线（Console处主动下线）
**class** `BotOfflineEventActive` 
 - 描述：机器人主动下线时触发此事件（于 mirai-console 处主动将机器人账号下线）
 - 属性：
    - qq: `int`

### 机器人下线（被强制下线）
**class** `BotOfflineEventForce` 
 - 描述：机器人被强制下线时触发此事件（账号在其他地点登录或其他意外事件）
 - 属性：
    - qq: `int`

### 机器人下线（服务器断开或网络问题）
**class** `BotOfflineEventDropped` 
 - 描述：机器人被服务器断开或因网络问题下线时触发
 - 属性：
    - qq: `int`

### 机器人重新登录 
**class** `BotReloginEvent` 
 - 描述：机器人在重新登录时触发
 - 属性：
    - qq: `int`

### 机器人权限改变 
**class** `BotGroupPermissionChangeEvent` 
 - 描述：机器人在权限改变时触发
 - 属性：
    - origin: `Permission`（改变前的权限）
    - current: `Permission`（改变后的权限）
    - group: `Group`

### 机器人被禁言 
**class** `BotMuteEvent` 
 - 描述：机器人在被禁言时触发
 - 属性：
    - durationSeconds: `int`（禁言时长, 单位为秒）
    - operator: `Optional[Member]`（当该属性值为 `None` 时, 操作者为机器人账号）

### 机器人被解除禁言
**class** `BotUnmuteEvent` 
 - 描述：机器人在被解除禁言时触发
 - 属性：
    - operator: `T.Optional[Member]`（当该属性值为 `None` 时, 操作者为机器人账号）

### 机器人加入群
**class** `BotJoinGroupEvent`
 - 描述：机器人在加入群时触发（加入群操作需手动进行）
 - 属性：
    - group: `Group`

## 群相关 

### 消息撤回
**class** `GroupRecallEvent` 
 - 描述：有消息被撤回时触发
 - 属性：
    - authorId: `int`（发送者 qq）
    - messageId: `int`（消息ID, 可通过 `Mirai.MessageFromId` 方法获取消息）
    - time: `datetime.datetime`
    - group: `Group`
    - operator: `Member`

### 群名称改变
**class** `GroupNameChangeEvent` 
 - 描述：群名称改变时触发
 - 属性：
    - origin: `str`（更改前的群名称）
    - current: `str`（更改后的群名称）
    - group: `Group`
    - isByBot: `bool`(是否为机器人所为)

### 入群公告改变
**class** `GroupEntranceAnnouncementChangeEvent` 
 - 描述：入群公告改变时触发
 - 属性：
    - origin: `str`（更改前）
    - current: `str`（更改后）
    - group: `Group`
    - operator: `T.Optional[Member]`（当该属性值为 `None` 时, 操作者为机器人账号）

### 全体禁言事件
**class** `GroupMuteAllEvent` 
 - 描述：群组全体禁言状态改变时触发
 - 属性：
    - origin: `bool`（更改前状态）
    - current: `bool`（更改后状态）
    - group: `Group`
    - operator: `Optional[Member]`（当该属性值为 `None` 时, 操作者为机器人账号）

### 匿名聊天事件
**class** `GroupAllowAnonymousChatEvent` 
 - 描述：群组更改匿名聊天状态时触发（允许或不允许）
 - 属性：
    - origin: `bool`（更改前）
    - current: `bool`（更改后）
    - group: `Group`
    - operator: `Optional[Member]`（当该属性值为 `None` 时, 操作者为机器人账号）

### 坦白说事件
**class** `GroupAllowConfessTalkEvent` 
 - 描述：群组更改坦白说允许规则状态时
 - 属性：
    - origin: `bool`（更改前）
    - current: `bool`（更改后）
    - isByBot: `bool`

### 群员邀请好友
**class** `GroupAllowMemberInviteEvent` 
 - 描述：群组允许/禁止群员邀请好友加群时触发
 - 属性：
    - origin: `bool`（更改前）
    - current: `bool`（更改后）
    - group: `Group`
    - operator: `Optional[Member]`（当该属性值为 `None` 时, 操作者为机器人账号）

### 新人入群
**class** `MemberJoinEvent` 
 - 描述：新成员加入群组时触发
 - 属性：
    - member: `Member`

### 成员被踢出群
**class** `MemberLeaveEventKick` 
 - 描述：成员被踢出群组时触发
 - 属性：
    - member: `Member`
    - operator: `Optional[Member]`（当该属性值为 `None` 时, 操作者为机器人账号）

### 成员退群
**class** `MemberLeaveEventQuit` 
 - 描述：成员自主退群时触发
 - 属性：
    - member: `Member`

### 群名片更改
**class** `MemberCardChangeEvent` 
 - 描述：群成员的群名片更改时被触发
 - 属性：`
    - origin: `str`（更改前）
    - current: `str`（更改后）
    - member: `Member`
    - operator: `Optional[Member]`（当该属性值为 `None` 时, 操作者为机器人账号）

### 群头衔更改
**class** `MemberSpecialTitleChangeEvent` 
 - 描述：某成员在某群内的群头衔被更改时触发（操作者必定为群主）
 - 属性：
    - origin: `str`（更改前）
    - current: `str`（更改后）
    - member: `Member`

### 成员权限变更
**class** `MemberPermissionChangeEvent` 
 - 描述：某成员在某群内的权限被更改时触发（操作者必定为群主）
 - 属性：
    - origin: `str`（更改前）
    - current: `str`（更改后）
    - member: `Member`

### 成员被禁言
**class** `MemberMuteEvent` 
 - 描述：成员被禁言时触发
 - 属性：
    - durationSeconds: `int`（禁言时长）
    - member: `Member`
    - operator: `Optional[Member]`（当该属性值为 `None` 时, 操作者为机器人账号）

### 成员被解除禁言
**class** `MemberUnmuteEvent` 
 - 描述：成员被解除禁言时触发（群管理员或群主主动解除）
 - 属性：
    - member: `Member`
    - operator: `Optional[Member]`（当该属性值为 `None` 时, 操作者为机器人账号）
