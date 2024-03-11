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
            imageUrl: require('../../static/image/my/coin.png'),
            // pagePath: '/pages/activity/Activity',
            text: '我的积分',
          },
          {
            imageUrl: require('../../static/image/my/image (4).png'),
            // pagePath: PAGES.album,
            text: '我的作品',
            onClick: () => {
              Taro.switchTab({
                url: PAGES.album,
              });
            },
          },
          {
            imageUrl: require('../../static/image/my/comment.png'),
            pagePath: PAGES.feedback,
            text: '建议反馈',
          },
          {
            imageUrl: require('../../static/image/my/direct-instagram.png'),
            pagePath: PAGES.QrCodeGenerator,
            text: '分享+积分',
          },
          {
            imageUrl: require('../../static/image/my/export.png'),
            text: '退出登陆',
            onClick: onLogout,
          },
        ]}
      />
    </View>
  );
};
