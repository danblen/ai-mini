import { View } from '@tarojs/components';
import ButtonsBox from '../../comps/ButtonsBox';

export default ({ allImages }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
      }}
    >
      <ButtonsBox
        buttons={[
          {
            imageUrl: require('../../../static/image/my/comment.png'),
            pagePath: '/pages/activity/Activity',
            text: '#影楼风格',
            params: {
              imageUrl: allImages?.activityTagsImage?.['影楼风格'],
              title: '影楼',
              description: '影楼风格',
              pagePath: '/pages/activity/Activity',
              text: '影楼风格',
            },
          },
          {
            imageUrl: require('../../../static/image/my/comment.png'),
            pagePath: '/pages/activity/Activity',
            text: '#繁花专场',
            params: {
              imageUrl: allImages?.activityTagsImage?.['繁花专场'],
              title: '繁花专场',
              description: '繁花专场\n参与活动，获取丰富奖励~',
              pagePath: '/pages/activity/Activity',
              text: '繁花专场',
            },
          },
          {
            imageUrl: require('../../../static/image/my/comment.png'),
            pagePath: '/pages/refine/index',
            text: 'AI修图',
            params: {
              title: '#AI修图',
              description: '分享你当反派能活到第几集\n参与活动，获取丰富奖励~',
            },
          },
          {
            imageUrl: require('../../../static/image/my/comment.png'),
            pagePath: '/pages/activity/Activity',
            text: '晒一晒加积分',
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
