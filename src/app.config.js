export default {
  pages: [
    "pages/index/index",
    "pages/user/index",
    "pages/album/index",
    "pages/gen/index"
  ],
  tabBar: {
    backgroundColor: "#fafafa",
    borderStyle: "white",
    selectedColor: "#AB956D",
    color: "#666",
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "./static/image/tabbar/home.png",
        selectedIconPath: "./static/image/tabbar/home1.png",
        text: "首页"
      },
      {
        pagePath: "pages/gen/index",
        iconPath: "./static/image/tabbar/cube1.png",
        selectedIconPath: "./static/image/tabbar/cube.png",
        text: "生成"
      },
      {
        pagePath: "pages/album/index",
        iconPath: "./static/image/tabbar/photo1.png",
        selectedIconPath: "./static/image/tabbar/photo2.png",
        text: "相册"
      },
      {
        pagePath: "pages/user/index",
        iconPath: "./static/image/tabbar/me.png",
        selectedIconPath: "./static/image/tabbar/me1.png",
        text: "我的"
      }
    ]
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  }
};
