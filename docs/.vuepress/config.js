module.exports = {
  title: "Mirai Framework for Python",
  description: "a framework for mirai, a powerful headless qq(oicq) client.",
  head: [],
  themeConfig: {
    nav: [{
        text: 'Github',
        link: "https://github.com/NatriumLab/python-mirai"
      },
      {
        text: 'Mirai',
        link: "https://github.com/mamoe/mirai"
      },
      {
        text: "PyPI",
        link: "https://pypi.org/project/kuriyama"
      }
    ],
    sidebar: [
      ["/hello-mirai", '向 Mirai 道个好'],
      {
        title: "教程",
        collapsable: false,
        children: [
          {
            title: "搭建开发环境",
            collapsable: false,
            children: [
              ['/mirai/use-console.md', '使用 mirai-console']
            ]
          },
          ["/tutorial/hello-world", "Hello, world!"],
          ["/tutorial/components", "认识消息组件"],
          ["/tutorial/annotations", "类型注解(Annotations)"],
          {
            title: "事件",
            children: [
              ["/tutorial/event/hello-event", "初识事件"],
              ["/tutorial/event/receiver", "事件接收器"],
              ["/tutorial/event/event_type.md", "事件类型一览"],
            ]
          },
          ["/tutorial/exception.md", "错误处理"],
          ["/tutorial/application/see-application-again", "又见 Application"],
          {
            title: "依赖注入",
            children: [
              ["/tutorial/dependencies/", "初识依赖注入"],
              ["/tutorial/dependencies/dependencies-in-receiver", "在注册事件时声明依赖注入"],
              ["/tutorial/dependencies/class-closure-as-depend", "定制化需求"]
            ]
          },
          ["/tutorial/subroutine", "协处理器"],
          ['/tutorial/middleware', "中间件"],
          ['/tutorial/on_stage', "生命周期机制"],
          ['/tutorial/extend_others', "导入其他实例"]
        ]
      }
    ]
  },
  markdown: {
    lineNumbers: true
  }
}
