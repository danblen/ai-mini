export default {
  // 所有的页面，新增页面需要在这里加上才能用
  pages: [
    'pages/index/index',
    'pages/user/index',
    'pages/album/index',
    'pages/refine/index',
    'pages/create/index',
    'pages/postNode/index',
    'pages/discover/index',
    'pages/message/index',
    'pages/activity/Activity',
    'pages/setting/index',
    'pages/search/index',
    'pages/faceswap/index',
    'pages/photo/index',
    'pages/user/agreements/index',
    'pages/user/privacy/index',
  ],
  // 底部导航tabbar
  tabBar: {
    backgroundColor: '#fafafa',
    borderStyle: 'white',
    selectedColor: '#AB956D',
    color: '#666',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: './static/image/tabbar/home.png',
        selectedIconPath: './static/image/tabbar/home-sel.png',
        // text: '首页',
      },
      // {
      //   pagePath: 'pages/discover/index',
      //   iconPath: './static/image/tabbar/icons8-图片编辑器-100.png',
      //   selectedIconPath: './static/image/tabbar/icons8-图片编辑器-100 (1).png',
      //   text: '发现',
      // },
      // {
      //   pagePath: 'pages/create/index',
      //   iconPath: './static/image/tabbar/icons8-图片编辑器-100.png',
      //   selectedIconPath: './static/image/tabbar/icons8-图片编辑器-100 (1).png',
      //   text: '创作',
      // },
      {
        pagePath: 'pages/album/index',
        iconPath: './static/image/tabbar/picture.png',
        selectedIconPath: './static/image/tabbar/picture-sel.png',
        // text: '作品',
      },
      {
        pagePath: 'pages/user/index',
        iconPath: './static/image/tabbar/user.png',
        selectedIconPath: './static/image/tabbar/user-sel.png',
        // text: '我的',
      },
    ],
  },
  // 全局配置
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom',
  },
};
