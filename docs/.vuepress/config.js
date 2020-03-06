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
        link: "https://pypi.org/projects/kuriyama"
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
            ]
          },
          ["/tutorial/exception.md", "错误处理"],
          ["/tutorial/session/see-session-again", "又见 Session"],
          {
            title: "依赖注入",
            children: [
              ["/tutorial/dependencies/", "初识依赖注入"],
              ["/tutorial/dependencies/dependencies-in-receiver", "不受参依赖项"],
              ["/tutorial/dependencies/class-closure-as-depend", "定制化需求"]
            ]
          },
          ['/tutorial/middleware', "中间件"]
        ]
      },
      {
        title: "进阶",
        collapsable: false,
        children: [
          ['/advanced/use-get_tasks', '使用 Session.get_tasks']
        ]
      }
    ]
  },
  markdown: {
    lineNumbers: true
  }
}