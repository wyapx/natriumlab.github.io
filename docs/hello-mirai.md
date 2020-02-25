# 向 Mirai 道个好

[`Mirai`](https://github.com/mamoe/mirai) 是一款优秀的高性能 QQ(也称OICQ) 无头客户端兼框架,
基于一种被称作 `Kotlin` 的 JVM 方言开发, 向机器人开发者提供了友好, 强大的应用接口, 
且同时提供 `mirai-native`, `mirai-http-api`, `mirai-japt` 等运作高效的工具链, 用于对所有编程语言提供支持.

[`python-mirai`](https://github.com/Chenwe-i-lin/python-mirai) 
是基于 `mirai-http-api` 开发的面向 Python 开发者的机器人框架,
使用 [`asyncio`](https://docs.python.org/3/library/asyncio.html)
和 [`aiohttp`](https://github.com/aio-libs/aiohttp) 作为底层实现编写而成.

本文档是 `python-mirai` 的实践和技术参考, 若你对其中的内容感到困惑, 欢迎你协助我们完善.
文档的部分内容使用了 [`koishi.github.io`](https://github.com/koishijs/koishijs.github.io)
中的 vue 组件, 在这里也感谢其作者的优秀作品给了我灵感.

::: warning
由于目前, 依赖项目 `Mirai` 处于快速流转状态, 在这段时间内, 我们会尽力对最新的版本进行兼容,
而由于个人原因, 我们无法产出更多的高级接口,
若你有此种意向, 可以向主项目 [`python-mirai`](https://github.com/Chenwe-i-lin/python-mirai) 
发起 `Pull Request` 帮助我们.
:::