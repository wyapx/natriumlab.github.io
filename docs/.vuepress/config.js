module.exports = {
  title: "Mirai Framework for Python",
  description: "a framework for mirai, a powerful headless qq(oicq) client.",
  base: "/mirai-py/",
  head: [],
  themeConfig: {
    nav: [{
        text: 'Github',
        link: "https://github.com/Chenwe-i-lin/python-mirai"
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
        title: "基础教程",
        children: [
          ["/tutorial/hello-world", "Hello, world!"],
          ["/tutorial/components", "认识消息组件"],
          ["/tutorial/context", "初识上下文"],
          {
            title: "事件",
            children: [
              ["/tutorial/event/hello-event", "初识事件"]
            ]
          }
        ]
      }
    ]
  },
  markdown: {
    lineNumbers: true
  }
}