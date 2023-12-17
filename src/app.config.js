export default {
  pages: [
    "pages/index/index",
    "pages/refine/index",
    "pages/user/index",
    "pages/album/index",
    "pages/photo/index",
    "pages/faceswap/index",
    "pages/gen/index",
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
        text: "首页",
      },
      {
        pagePath: "pages/refine/index",
        iconPath: "./static/image/tabbar/cube1.png",
        selectedIconPath: "./static/image/tabbar/cube.png",
        text: "修图",
      },
      {
        pagePath: "pages/album/index",
        iconPath: "./static/image/tabbar/photo1.png",
        selectedIconPath: "./static/image/tabbar/photo2.png",
        text: "作品",
      },
      {
        pagePath: "pages/user/index",
        iconPath: "./static/image/tabbar/me.png",
        selectedIconPath: "./static/image/tabbar/me1.png",
        text: "我的",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "AI写真",
    navigationBarTextStyle: "black",
  },
};
