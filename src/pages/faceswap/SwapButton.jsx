import Taro from '@tarojs/taro';
import { faceSwap } from '../../api';
import { useState, useEffect, useRef } from 'react';
import { View, Text } from '@tarojs/components';
import { AtButton, AtActivityIndicator, AtFloatLayout } from 'taro-ui';
import { wxPathToBase64 } from '../../utils/imageTools';
import { data } from '../../const/sdApiParams.js';
import { saveUserInfo, wechatLogin } from '../../common/user.js';
import LoginView from '../comps/LoginView.jsx';
const SwapCount = ({ clickCount }) => (
  <View
    style={{
      position: 'fixed',
      top: '70px',
      right: '60%',
      transform: 'translate(50%, -50%)', // 将元素居中
      display: clickCount > 0 ? 'block' : 'none',
      zIndex: 999,
    }}
  >
    {clickCount > 0 && (
      <View>
        <AtActivityIndicator
          mode="normal"
          color="#12fd0e"
          size="38"
          content={
            <Text style={{ fontWeight: 'bold', color: '#12fd0e' }}>
              {clickCount.toString()}个作品即将完成,预计等待
              {(clickCount * 5).toString()}秒...
            </Text>
          }
        />
      </View>
    )}
  </View>
);

export default ({ imageUrl, selectedImageUrl, onUpdateTaskImages }) => {
  const [loading, setLoading] = useState(false);
  const clickCount = useRef(Taro.getApp().globalData.clickCount);
  const [isOpened, setIsOpened] = useState(false);
  const [updateTrigger, forceUpdate] = useState({});

  useEffect(() => {
    // clickCount大于0，重新进入页面后，clickCount在其他页面变为0，不会触发这个地方，需要使用forceUpdate强制刷新
    clickCount.current = Taro.getApp().globalData.clickCount;
  }, [Taro.getApp().globalData.clickCount]);

  useEffect(() => {
    const updateClickCount = (newCount) => {
      clickCount.current = newCount;
      forceUpdate({}); //触发强制刷新页面
    };

    // 监听全局点击次数变化的事件
    Taro.eventCenter.on('globalClickCountChanged', updateClickCount);

    // 清除事件监听以避免内存泄漏
    return () => {
      Taro.eventCenter.off('globalClickCountChanged', updateClickCount);
    };
  }, []);

  const handleClick = async () => {
    if (!global.userInfo.isLogin) {
      setIsOpened(true);
      return;
    }
    if (global.userInfo.data.points < 1) {
      Taro.showToast({
        title: `积分为0，请先获取积分`,
        icon: 'none',
      });
      return;
    }
    if (imageUrl && selectedImageUrl) {
      setLoading(true);
      try {
        const srcBase64 = await wxPathToBase64(imageUrl);
        const tarBase64 = await wxPathToBase64(selectedImageUrl);
        const storageUserInfo = getStorageSync('userInfo');
        data.userId = storageUserInfo.data.userId;
        data.init_images = [srcBase64];
        data.alwayson_scripts.roop.args[0] = tarBase64;

        // 异步操作
        let res = await faceSwap(data);
        if (res.data?.status === 'pending') {
          onUpdateTaskImages(res.data.requestId);
        } else {
          Taro.showToast({
            title: res.error_message,
            icon: 'none',
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        Taro.getApp().globalData.updateGlobalClickCount(1); // 减少全局变量中的点击次数
        clickCount.current = Taro.getApp().globalData.clickCount;
      }
    } else {
      Taro.showToast({
        title: `请点击+号,选择人脸图像~`,
        icon: 'none',
      });
    }
  };

  return (
    <View
      style={{
        position: 'relative',
        width: '95%',
      }}
    >
      <SwapCount clickCount={clickCount.current} />
      <AtButton
        type="primary"
        style={{
          background: 'linear-gradient(to right, #00467f, #a5cc82)',
          animation: 'swap 1s infinite',
          opacity: 0.8,
          fontWeight: 'bold',
          position: 'relative',
          zIndex: 0,
        }}
        shape="circle"
        loading={loading}
        onClick={handleClick}
      >
        一键换脸
      </AtButton>
      <AtFloatLayout
        isOpened={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
      >
        <LoginView
          onConfirmLogin={async () => {
            const res = await wechatLogin();
            if (res?.data) {
              saveUserInfo({
                isLogin: true,
                data: res.data,
              });
              setIsOpened(false);
            }
          }}
        />
      </AtFloatLayout>
    </View>
  );
};
