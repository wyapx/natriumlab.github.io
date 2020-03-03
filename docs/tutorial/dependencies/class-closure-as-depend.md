# 使用类/闭包创建依赖注入项

由于设计简单的原因, 我们支持**所有**的 `Callable` 作为依赖注入项,
这意味着你可以使用一些魔法来使依赖注入更加强大

## 类(class)
你可以通过定义魔法方法 `__call__` 来使一个类变得可以调用,
并且能用于依赖注入, 这种方式多用于一些定制化的需求.

``` python
class DependAsClass:
    def __init__(self, msg):
        self.msg = msg

    async def __call__(self):
        print(self.msg)

...
@session.receiver("FriendMessage", dependencies=[Depend(DependAsClass("it works."))])
async def fm(session: Session):
   ...
...
```

## 闭包形式(closure)
如果你不喜欢使用类的形式, 可以使用闭包形式:

``` python
def DependAsClosure(msg):
    async def warpper():
       print(msg)
    return warpper()
```