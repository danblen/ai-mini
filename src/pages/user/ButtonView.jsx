import { View } from '@tarojs/components';
import ButtonsBox from '../comps/ButtonsBox';
import { PAGES } from '../../const/app';
import Taro from '@tarojs/taro';

export default ({ onLogout }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
      }}
    >
      <ButtonsBox
        background="#fff"
        buttons={[
          {
            imageUrl: require('../../static/image/my/icons8-joker-dc-200.png'),
            // pagePath: '/pages/activity/Activity',
            text: '我的积分',
          },
          {
            imageUrl: require('../../static/image/my/icons8-编辑图像-100.png'),
            // pagePath: PAGES.album,
            text: '我的作品',
            onClick: () => {
              Taro.switchTab({
                url: PAGES.album,
              });
            }
          },
          {
            imageUrl: require('../../static/image/my/feedback.png'),
            pagePath: PAGES.feedback,
            text: '建议反馈',
          },
          {
            imageUrl: require('../../static/image/my/icons8-编辑图像-100.png'),
            text: '退出登陆',
            onClick: onLogout,
          },
        ]}
      />
    </View>
  );
};
