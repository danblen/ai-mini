import { View } from '@tarojs/components';
import ButtonsBox from '../../../comps/ButtonsBox';

export default () => {
  return (
    <View
      style={{
        marginTop: '170rpx',
      }}
    >
      <ButtonsBox
        buttons={[
          {
            imageUrl: require('../../../../static/image/my/comment.png'),
            pagePath: '/pages/activity/Activity',
            text: 'AI修图',
            params: {
              title: '#反派挑战',
              description: '分享你当反派能活到第几集\n参与活动，获取丰富奖励~',
            },
          },
          {
            imageUrl: require('../../../../static/image/my/comment.png'),
            pagePath: '/pages/activity/Activity',
            text: '老照片修复',
            params: {
              title: '#繁花专场',
              description: '繁花专场\n参与活动，获取丰富奖励~',
            },
          },
          {
            imageUrl: require('../../../../static/image/my/comment.png'),
            // pagePath: "/pages/activity/Activity",
            text: 'AI动漫',
            // params: {
            //   title: "#AI修图",
            //   description: "分享你当反派能活到第几集\n参与活动，获取丰富奖励~",
            // },
          },
          {
            imageUrl: require('../../../../static/image/my/comment.png'),
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
