import { View } from '@tarojs/components';
import React, { useCallback, useState } from 'react';
import Buttons from '../comps/Buttons';
import NavigationBar from './NavigationBar';

export default ({}) => {
  const [current, setCurrent] = useState(0);
  const onClick = useCallback(value => {
    setCurrent(value);
  });
  return (
    <View>
      <NavigationBar></NavigationBar>
      <Buttons
        buttons={[
          {
            imageUrl: require('../../static/image/my/icons8-joker-dc-200.png'),
            pagePath: '/pages/activity/Activity',
            text: 'AI修图',
            params: {
              title: '#反派挑战',
              description: '分享你当反派能活到第几集\n参与活动，获取丰富奖励~',
            },
          },
          {
            imageUrl: require('../../static/image/my/icons8-神奇女侠-100.png'),
            pagePath: '/pages/activity/Activity',
            text: 'AI写真',
            params: {
              title: '#繁花专场',
              description: '繁花专场\n参与活动，获取丰富奖励~',
            },
          },
          {
            imageUrl: require('../../static/image/my/icons8-编辑图像-100.png'),
            // pagePath: "/pages/activity/Activity",
            text: 'AI动漫',
            // params: {
            //   title: "#AI修图",
            //   description: "分享你当反派能活到第几集\n参与活动，获取丰富奖励~",
            // },
          },
          {
            imageUrl: require('../../static/image/my/icons8-获得现金-100.png'),
            pagePath: '/pages/activity/Activity',
            text: 'AI证件照',
            params: {
              title: '#晒一晒加积分',
              description: '晒一晒你的作品，获取积分',
            },
          },
        ]}
      />
      <Buttons
        buttons={[
          {
            imageUrl: require('../../static/image/my/icons8-joker-dc-200.png'),
            pagePath: '/pages/activity/Activity',
            text: 'AI修图',
            params: {
              title: '#反派挑战',
              description: '分享你当反派能活到第几集\n参与活动，获取丰富奖励~',
            },
          },
          {
            imageUrl: require('../../static/image/my/icons8-神奇女侠-100.png'),
            pagePath: '/pages/activity/Activity',
            text: 'AI写真',
            params: {
              title: '#繁花专场',
              description: '繁花专场\n参与活动，获取丰富奖励~',
            },
          },
          {
            imageUrl: require('../../static/image/my/icons8-编辑图像-100.png'),
            // pagePath: "/pages/activity/Activity",
            text: 'AI动漫',
            // params: {
            //   title: "#AI修图",
            //   description: "分享你当反派能活到第几集\n参与活动，获取丰富奖励~",
            // },
          },
          {
            imageUrl: require('../../static/image/my/icons8-获得现金-100.png'),
            pagePath: '/pages/activity/Activity',
            text: 'AI证件照',
            params: {
              title: '#晒一晒加积分',
              description: '晒一晒你的作品，获取积分',
            },
          },
        ]}
      />
    </View>
  );
};
const Style = {
  gridContainerStyle: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '16px',
    margin: '10px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)' /* 3列的网格，每列平均分配宽度 */,
    gap: '16px' /* 网格项之间的间隔 */,
  },

  gridItemStyle: {
    padding: '16px',
    // border: '1px solid #ccc',
    textAlign: 'center',
  },
  wrap: {
    display: 'flex',
  },
  item: {
    width: '200rpx',
    height: '50rpx',
    border: '1px solid #aaa',
  },
  start: {
    width: '500rpx',
  },
};
