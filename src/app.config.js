export default {
  // 所有的页面，新增页面需要在这里加上才能用
  pages: [
    'pages/index/index',
    'pages/refine/index',
    'pages/create/index',
    'pages/user/index',
    'pages/album/postNode',
    'pages/discover/index',
    'pages/message/index',
    'pages/activity/Activity',
    'pages/setting/index',
    'pages/search/index',
    'pages/faceswap/index',
    'pages/album/index',
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
        iconPath: './static/image/tabbar/icons8-r2-d2-100.png',
        selectedIconPath: './static/image/tabbar/icons8-r2-d2-100 (1).png',
        text: '首页',
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
        iconPath: './static/image/tabbar/icons8-ios的照片-100.png',
        selectedIconPath: './static/image/tabbar/icons8-ios的照片-100 (1).png',
        text: '作品',
      },
      {
        pagePath: 'pages/user/index',
        iconPath: './static/image/tabbar/icons8-蝙蝠侠-200.png',
        selectedIconPath: './static/image/tabbar/icons8-蝙蝠侠-100 (2).png',
        text: '我的',
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
