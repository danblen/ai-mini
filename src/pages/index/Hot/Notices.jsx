import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { AtNoticebar } from 'taro-ui';

export default () => {
  const notices = [
    '每日签到即可加积分💕',
    '尝试使用标准人像照进行换脸，可能效果更好🤩',
    '换脸精修模式更好看🥰',
    '别人使用你发布的模板，你也会得到积分✌',
  ];

  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // 切换到下一条通知
      setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % notices.length);
    }, 5000); // 设置每条通知显示的时间，这里设置为1秒

    return () => {
      clearTimeout(timer);
    };
  }, [currentNoticeIndex]);
  return (
    <View
      style={{
        marginTop: '5px',
        width: '96%',
        margin: '10px auto 0',
      }}
    >
      <AtNoticebar icon="volume-plus">
        {notices[currentNoticeIndex]}
      </AtNoticebar>
    </View>
  );
};
