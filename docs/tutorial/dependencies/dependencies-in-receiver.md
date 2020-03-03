# 不受参依赖项

我们将无需传入的依赖注入项称为不受参依赖, 当事件被触发时,
不受参依赖仍然会被率先启动, 但是不会作为参数传入事件主体.

## 演示
``` python
@session.receiver(
    "FriendMessage",
    dependencies=[
        Depend(depend1),
        Depend(depend2)
    ]
)
async def fm(session: Session):
    print(session)
```