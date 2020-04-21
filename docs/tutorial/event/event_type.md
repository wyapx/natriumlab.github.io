# 事件类型一览 
[[toc]]

## 机器人相关 


### 机器人上线 
**class** 'BotOnlineEvent' 
 - 描述：机器人上线时触发此事件（触发条件暂时未知）
 - 属性：
    - type: EventType.BotOnlineEvent
    - qq: int

### 机器人下线（Console处主动下线）
**class** 'BotOfflineEventActive' 
 - 描述：机器人主动下线时触发此事件（在Console处主动下线）
 - 属性：
    - type: EventType.BotOfflineEventActive
    - qq: int

### 机器人下线（被强制下线）
**class** 'BotOfflineEventForce' 
 - 描述：机器人被强制下线时触发此事件（账号在其他地点登录或其他意外事件）
 - 属性：
    - type: EventType.BotOfflineEventForce
    - qq: int

### 机器人下线（暂时未知）
**class** 'BotOfflineEventDropped' 
 - 描述：下线时触发（待补充）
 - 属性：
    - type: EventType.BotOfflineEventDropped
    - qq: int

### 机器人重新登录 
**class** 'BotReloginEvent' 
 - 描述：机器人在重新登录时触发
 - 属性：
    - type: EventType.BotReloginEvent
    - qq: int

### 机器人权限改变 
**class** 'BotGroupPermissionChangeEvent' 
 - 描述：机器人在权限改变时触发
 - 属性：
    - type: EventType.BotGroupPermissionChangeEvent
    - origin: Permission（改变前的权限）
    - current: Permission（改变后的权限）
    - group: Group

### 机器人被禁言 
**class** 'BotMuteEvent' 
 - 描述：机器人在被禁言时触发
 - 属性：
    - type: EventType.BotMuteEvent
    - durationSeconds: int（禁言时长）
    - operator: T.Optional[Member]（操作人）

### 机器人被解除禁言
**class** 'BotUnmuteEvent' 
 - 描述：机器人在被解除禁言时触发
 - 属性：
    - type: EventType.BotUnmuteEvent
    - operator: T.Optional[Member]（操作人）

### 机器人加入群
**class** 'BotJoinGroupEvent' 
 - 描述：机器人在加入群时触发（加入群操作需手动进行）
 - 属性：
    - type: EventType.BotJoinGroupEvent
    - group: Group
