export default {
  pages: ["pages/index/index", "pages/user/index"],
  tabBar: {
    backgroundColor: "#fafafa",
    borderStyle: "white",
    selectedColor: "#AB956D",
    color: "#666",
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "./static/images/home.png",
        selectedIconPath: "./static/images/home@selected.png",
        text: "首页",
      },
      // {
      //   pagePath: "pages/catalog/catalog",
      //   iconPath: "./static/images/category.png",
      //   selectedIconPath: "./static/images/category@selected.png",
      //   text: "分类",
      // },
      // {
      //   pagePath: "pages/cart/cart",
      //   iconPath: "./static/images/cart.png",
      //   selectedIconPath: "./static/images/cart@selected.png",
      //   text: "购物车",
      // },
      {
        pagePath: "pages/user/index",
        iconPath: "./static/images/my.png",
        selectedIconPath: "./static/images/my@selected.png",
        text: "个人",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  }
};
