export default {
  pages: [
    "pages/index/index",
    "pages/activity/Activity",
    "pages/user/index",
    "pages/refine/index",
    "pages/album/index",
    "pages/photo/index",
    "pages/faceswap/index",
    "pages/gen/index",
    "pages/user/agreements/index",
    "pages/user/privacy/index",
  ],
  tabBar: {
    backgroundColor: "#fafafa",
    borderStyle: "white",
    selectedColor: "#AB956D",
    color: "#666",
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "./static/image/tabbar/icons8-r2-d2-100.png",
        selectedIconPath: "./static/image/tabbar/icons8-r2-d2-100 (1).png",
        text: "首页",
      },
      {
        pagePath: "pages/refine/index",
        iconPath: "./static/image/tabbar/icons8-图片编辑器-100.png",
        selectedIconPath: "./static/image/tabbar/icons8-图片编辑器-100 (1).png",
        text: "修图",
      },
      {
        pagePath: "pages/album/index",
        iconPath: "./static/image/tabbar/icons8-ios的照片-100.png",
        selectedIconPath: "./static/image/tabbar/icons8-ios的照片-100 (1).png",
        text: "作品",
      },
      {
        pagePath: "pages/user/index",
        iconPath: "./static/image/tabbar/icons8-蝙蝠侠-200.png",
        selectedIconPath: "./static/image/tabbar/icons8-蝙蝠侠-100 (2).png",
        text: "我的",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTextStyle: "black",
    navigationStyle: "custom",
  },
};
