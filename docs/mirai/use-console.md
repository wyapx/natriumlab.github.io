# 使用 mirai-console 快速部署开发用无头客户端

由于 `python-mirai` 依赖于 `mirai-api-http`,
所以你需要先搭建一个提供 `mirai-api-http` 服务的无头客户端,
而 [mirai-console](https://github.com/mamoe/mirai-console) 就是个不错的选择.

## 如何获取
::: warning
由于 `mirai` 全部都是用 `kotlin` 这样一种 JVM 方言写的, 所以你需要安装
`JRE(Java Runtime Environment)` 以运行.
:::

你可以在其 [releases](https://github.com/mamoe/mirai-console/releases) 处获取到最新的打包.  
获取到 `mirai-console` 后, 你还需要获取插件形式的 `mirai-api-http`,
也可以在其 [releases](https://github.com/mamoe/mirai-api-http/releases) 处获取.

获取到插件形式的 `mirai-api-http` 后, 将其放入与 `mirai-console` 的同级目录 `plugins` 下,
并使用指令启动:

``` bash
java -jar mirai-console.jar
```

然后按照其提示进行操作即可.