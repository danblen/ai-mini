import { Textarea, View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { AtButton } from 'taro-ui';
import { api } from '../../api';
import { updateUserInfoFromStorage } from '../../common/user';
import Container from './Container';
import { sdParams } from './const';

export default () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    updateUserInfoFromStorage();
  }, []);
  return (
    <Container images={images}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Textarea
          style={{
            width: '96%',
            height: '200rpx',
            marginBottom: '20rpx',
            borderRadius: '20rpx',
            background: 'transparent', // 将背景改为透明
            opacity: 1,
            color: 'black',
            border: '1px solid #bbb',
          }}
          placeholder="请输入文字"
          value={sdParams.prompt}
        ></Textarea>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Textarea
          style={{
            width: '96%',
            height: '200rpx',
            marginBottom: '20rpx',
            borderRadius: '20rpx',
            background: 'transparent', // 将背景改为透明
            opacity: 1,
            color: 'black',
            border: '1px solid #bbb',
          }}
          placeholder="请输入文字"
          value={sdParams.negative_prompt}
        ></Textarea>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
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
            width: '95%',
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
      </View>
    </Container>
  );
};
