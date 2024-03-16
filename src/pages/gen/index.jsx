import { Button, Text, View } from '@tarojs/components';
import { sdParams } from './const';
import { api } from '../../api';
import { AtButton, AtDrawer } from 'taro-ui';
import TaskListTip from '../faceswap/TaskListTip';
import TaskList from '../comps/TaskList';
import { useEffect, useState } from 'react';
import ImageList from '../comps/ImageList';
import { updateUserInfoFromStorage } from '../../common/user';

export default () => {
  const [images, setImages] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [startX, setStartX] = useState(0);
  useEffect(() => {
    updateUserInfoFromStorage();
  }, []);
  return (
    <View
      onTouchstart={(event) => {
        setStartX(event.touches[0].clientX);
      }}
      onTouchEnd={(event) => {
        const endX = event.changedTouches[0].clientX;
        const deltaX = endX - startX;
        if (deltaX < -50) {
          setShowDrawer(true);
        } else if (deltaX > 50) {
          setShowDrawer(false);
        }
      }}
      className=""
      style={{
        background: 'black',
      }}
    >
      <AtButton
        type="primary"
        style={{
          position: 'fixed',
          bottom: 20,
          background: 'linear-gradient(to right, #00467f, #a5cc82)',
          animation: 'swap 1s infinite',
          opacity: 0.8,
          fontWeight: 'bold',
          position: 'relative',
          zIndex: 0,
        }}
        shape="circle"
        // loading={loading}
        onClick={async () => {
          const res = await api.txt2img({
            userId: global.userInfo.data.userId,
            sdParams: sdParams,
          });
          if (res?.data) {
            setImages((prevImages) => [
              ...prevImages,
              {
                src: res.data.imageUrl,
                status: 'finished',
                // requestId: res.data.data.requestId,
              },
            ]);
          }
        }}
      >
        生成图片
      </AtButton>

      <TaskListTip onClick={() => setShowDrawer(true)}></TaskListTip>
      <AtDrawer
        show={showDrawer}
        right
        mask
        width="80%"
        onClose={() => setShowDrawer(false)}
        style={{ background: 'black', height: '100%', zIndex: 10 }}
      >
        <TaskList images={images} />
      </AtDrawer>
    </View>
  );
};
