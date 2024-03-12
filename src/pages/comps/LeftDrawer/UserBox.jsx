import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { PAGES } from '../../../const/app';
import { URL_STATIC } from '../../../api/config';
const iconwechat = URL_STATIC + '/appstatic/image/share/icon_wechat.png';
export default ({ userInfo }) => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Image
        mode="aspectFill"
        className="avatar"
        style={{
          borderRadius: '10%',
          width: 30,
          height: 30,
        }}
        src={userInfo?.data?.userHeadPic || iconwechat}
      />
      <View
        style={{
          marginLeft: 5,
        }}
        onClick={() => {
          Taro.switchTab({ url: PAGES.user });
        }}
      >
        {userInfo?.isLogin ? (
          <Text> ID: {userInfo?.data?.userId}</Text>
        ) : (
          '去登陆'
        )}
        <View className="at-icon at-icon-chevron-right" />
      </View>
    </View>
  );
};
