# 导入其他的 Application 实例

无论是什么项目, 只要做的大了, 都会遇到要用模块化解耦的需求, 对此我们也提供了相应的解决方案.

## 使用
假设我们需要让 `app1` 导入 `app2` 中监听的事件, 注册了的 `subroutine`, 生命周期函数:

``` python
from app2 import app2
app = Mirai(...)
```

我们只需要调用方法 `Mirai.include_others` 即可:
``` python
app.include_others(app2)
```

当然, 我们也可以传入多个 Application 实例:
``` python
app.include_others(app1, app2, app3, app4, ...)
```

方法 `Mirai.include_others` 会导入传入的所有 Application 实例中监听的事件, 注册了的 `subroutine`, 生命周期函数,
但**不包括**连接到 `mirai-api-http` 的各式信息, 例如 `authKey`, `qq` 等, 这类信息不会变动.