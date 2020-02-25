# 事件接收器

[[toc]]

## 什么是事件接收器(Event Receiver)
事件接收器用于接收来自无头客户端的事件, 聚合当前处理的事件信息, 并封装为上下文以供事件运行主体调用

::: tip
此处为高级特性, 若你还没学会之前叙述的各式用法,
建议你跳过此节, 之后再来学习
:::

## 注册事件监听
我们都知道, 当要注册一个事件监听时, 要使用装饰器的工厂方法 `Session.receiver`,
为注册的事件监听提供事件的基本类型, 如果需要, 还可以提供运行条件:

``` python
@session.receiver("GroupMessage")
async def event_gm(context):
    ...

@session.receiver("GroupMessage", lambda i: i.message.sender.group.id == 123456789)
async def another_event_gm(context):
    ...
```

### 事件的多种监听方式
是的, 你不仅可以使用字符串表达出你想监听的事件, 还可以用另外两种方式:
 - 传入事件模型, 全部的事件模型在 `mirai.event.external` 处被定义
 - 传入一个 `Enum Value`, 这意味着你可以通过遍历一个枚举类的方式来批量注册事件监听

不过我们并不推荐使用这两种方式

### 为什么?
你无法从其获得类型推断支持, 并且这还会使你的 `import` 列表变得混乱, 在某些情况下甚至会导致程序无法启动.