# 生命周期(Life Cycle)

有时候, 你可能会有在程序的各个不同阶段执行代码的需求:
 - 程序启动时, 向 Master 进程汇报并获取 Worker ID
 - 程序关闭时, 向 Master 进程汇报并释放自己的 Worker ID
 - 还有很多...

而我们也提供了相应的解决方案, 即我们接下来要讲的 `Mirai.on_stage` 方法

## 使用
使用的方式非常简单, 只需要用该方法装饰一个函数(异步同步皆可):

``` python
@app.on_stage("start")
async def start_stage_subroutine(app: Mirai):
    ...
```

我们传入的是一个 阶段名称(Stage name), 你可以随便注册阶段名,
但我们的 `run` 方法只会执行注册了这几个阶段的函数:
 - `"start"`: 在程序启动时执行, 最先被执行.
 - `"around"`: 在程序启动和被终止时执行(Ctrl-C), 执行优先级比 `start` 低, 但比 `end` 高.
 - `"end"`: 在程序被终止时执行(Ctrl-C), 执行优先级比 `start` 和 `ground` 都低.

## 与 Subroutine 的异同
执行生命周期时, 主线程会被堵塞, 并且 `subroutine` 是在 `start` 和 `around` 执行完后和事件监听/广播协程一起运行的.

但相同的一处是, 无论是 `subroutine` 还是生命周期, 在他们执行前, `session_key` 就已经被激活,
保证无论执行的是哪个, 其内部运行的事务都会顺利的执行

当然, 前提是你不要自己绊自己调用 `Mirai.release` 方法释放 `session_key`,
虽然 `python-mirai` 会自动对其进行刷新, 但还是会对程序的稳定性产生影响的.