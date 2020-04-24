# 事件类型一览 
[[toc]]

## 机器人相关 


### 机器人上线 
**class** `BotOnlineEvent` 
 - 描述：机器人上线时触发此事件（触发条件暂时未知）
 - 属性：
    - type: `EventType.BotOnlineEvent`
    - qq: `int`

### 机器人下线（Console处主动下线）
**class** `BotOfflineEventActive` 
 - 描述：机器人主动下线时触发此事件（在Console处主动下线）
 - 属性：
    - type: `EventType.BotOfflineEventActive`
    - qq: `int`

### 机器人下线（被强制下线）
**class** `BotOfflineEventForce` 
 - 描述：机器人被强制下线时触发此事件（账号在其他地点登录或其他意外事件）
 - 属性：
    - type: `EventType.BotOfflineEventForce`
    - qq: `int`

### 机器人下线（服务器断开或网络问题）
**class** `BotOfflineEventDropped` 
 - 描述：机器人被服务器断开或因网络问题下线时触发
 - 属性：
    - type: `EventType.BotOfflineEventDropped`
    - qq: `int`

### 机器人重新登录 
**class** `BotReloginEvent` 
 - 描述：机器人在重新登录时触发
 - 属性：
    - type: `EventType.BotReloginEvent`
    - qq: `int`

### 机器人权限改变 
**class** `BotGroupPermissionChangeEvent` 
 - 描述：机器人在权限改变时触发
 - 属性：
    - type: `EventType.BotGroupPermissionChangeEvent`
    - origin: `Permission`（改变前的权限）
    - current: `Permission`（改变后的权限）
    - group: `Group`

### 机器人被禁言 
**class** `BotMuteEvent` 
 - 描述：机器人在被禁言时触发
 - 属性：
    - type: `EventType.BotMuteEvent`
    - durationSeconds: `int`（禁言时长）
    - operator: `T.Optional[Member]`（这个值为None时是机器人在操作）

### 机器人被解除禁言
**class** `BotUnmuteEvent` 
 - 描述：机器人在被解除禁言时触发
 - 属性：
    - type: `EventType.BotUnmuteEvent`
    - operator: `T.Optional[Member]`（这个值为None时是机器人在操作）

### 机器人加入群
**class** `BotJoinGroupEvent` 
 - 描述：机器人在加入群时触发（加入群操作需手动进行）
 - 属性：
    - type: `EventType.BotJoinGroupEvent`
    - group: `Group`

## 群相关 


### 消息撤回
**class** `GroupRecallEvent` 
 - 描述：有消息被撤回时触发
 - 属性：
    - type: `EventType.GroupRecallEvent`
    - authorId: `int`（发送者qq）
    - messageId: `int`（消息ID）
    - time: `datetime`
    - group: `Group`
    - operator: `Member`

### 群名称改变
**class** `GroupNameChangeEvent` 
 - 描述：群名称改变时触发
 - 属性：
    - type: EventType.GroupNameChangeEvent
    - origin: `str`（更改前的群名称）
    - current: `str`（更改后的群名称）
    - group: `Group`
    - isByBot: `bool`

### 入群公告改变
**class** `GroupEntranceAnnouncementChangeEvent` 
 - 描述：入群公告改变时触发
 - 属性：
    - type: `EventType.GroupEntranceAnnouncementChangeEvent`
    - origin: `str`（更改前）
    - current: `str`（更改后）
    - group: `Group`
    - operator: `T.Optional[Member]`（这个值为None时是机器人在操作）

### 全体禁言事件
**class** `GroupMuteAllEvent` 
 - 描述：群开启全体禁言时触发
 - 属性：
    - type: `EventType.GroupMuteAllEvent`
    - origin: `bool`（更改前）
    - current: `bool`（更改后）
    - group: `Group`
    - operator: `T.Optional[Member]`（这个值为None时是机器人在操作）

### 匿名聊天事件
**class** `GroupAllowAnonymousChatEvent` 
 - 描述：匿名聊天状态更改（允许或不允许）
 - 属性：
    - type: `EventType.GroupAllowAnonymousChatEvent`
    - origin: `bool`（更改前）
    - current: `bool`（更改后）
    - group: `Group`
    - operator: `T.Optional[Member]`（这个值为None时是机器人在操作）

### 坦白说事件
**class** `GroupAllowConfessTalkEvent` 
 - 描述：坦白说状态更改（允许或不允许）
 - 属性：
    - type: `EventType.GroupAllowConfessTalkEvent`
    - origin: `bool`（更改前）
    - current: `bool`（更改后）
    - isByBot: `bool`

### 群员邀请好友
**class** `GroupAllowMemberInviteEvent` 
 - 描述：允许群员邀请好友加群状态更改（允许或不允许）
 - 属性：
    - type: `EventType.GroupAllowMemberInviteEvent`
    - origin: `bool`（更改前）
    - current: `bool`（更改后）
    - group: `Group`
    - operator: `T.Optional[Member]`（这个值为None时是机器人在操作）

### 新人入群
**class** `MemberJoinEvent` 
 - 描述：新人入群时触发
 - 属性：
    - type: `EventType.MemberJoinEvent`
    - member: `Member`

### 成员被踢出群
**class** `MemberLeaveEventKick` 
 - 描述：成员被踢出群时触发
 - 属性：
    - type: `EventType.MemberLeaveEventKick`
    - member: `Member`
    - operator: `T.Optional[Member]`（这个值为None时是机器人在操作）

### 成员退群
**class** `MemberLeaveEventQuit` 
 - 描述：成员退群时触发
 - 属性：
    - type: `EventType.MemberLeaveEventQuit`
    - member: `Member`

### 群名片更改
**class** `MemberCardChangeEvent` 
 - 描述：群名片更改时触发
 - 属性：
    - type: `EventType.MemberCardChangeEvent`
    - origin: `str`（更改前）
    - current: `str`（更改后）
    - member: `Member`
    - operator: `T.Optional[Member]`（这个值为None时是机器人在操作）

### 群头衔更改
**class** `MemberSpecialTitleChangeEvent` 
 - 描述：群头衔更改时触发（操作者必定为群主）
 - 属性：
    - type: `EventType.MemberSpecialTitleChangeEvent`
    - origin: `str`（更改前）
    - current: `str`（更改后）
    - member: `Member`

### 成员权限变更
**class** `MemberPermissionChangeEvent` 
 - 描述：群头衔更改时触发（操作者必定为群主）
 - 属性：
    - type: `EventType.MemberPermissionChangeEvent`
    - origin: `str`（更改前）
    - current: `str`（更改后）
    - member: `Member`

### 成员被禁言
**class** `MemberMuteEvent` 
 - 描述：成员被禁言时触发
 - 属性：
    - type: `EventType.MemberMuteEvent`
    - durationSeconds: `int`（禁言时长）
    - member: `Member`
    - operator: `T.Optional[Member]`（这个值为None时是机器人在操作）

### 成员被解除禁言
**class** `MemberUnmuteEvent` 
 - 描述：成员被解除禁言时触发（管理或群主主动解除）
 - 属性：
    - type: `EventType.MemberUnmuteEvent`
    - member: `Member`
    - operator: `T.Optional[Member]`（这个值为None时是机器人在操作）
