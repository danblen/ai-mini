import { Textarea, View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { AtButton } from 'taro-ui';
import { api } from '../../api';
import { updateUserInfoFromStorage } from '../../common/user';
import { sdParams } from './const';
import Container from '../comps/Container';
import { deepCopy, generateUniqueId } from '../../utils';
import Prompt from './Prompt';
const params = deepCopy(sdParams);
export default () => {
  const [images, setImages] = useState([]);
  const [prompt, setPrompt] = useState(params.prompt);
  const [usePoint, setUsePoint] = useState(1);
  // const [negativePrompt, setNegativePrompt] = useState(params.negative_prompt);

  useEffect(() => {
    updateUserInfoFromStorage();
  }, []);
  return (
    <Container images={images} background={'#fff'}>
      <View style={{ marginTop: 90 }}></View>
      绘画描述
      <Prompt
        value={prompt}
        onChange={(value) => {
          setPrompt(value);
        }}
      />
      {/* <Prompt
        value={negativePrompt}
        onChange={(value) => {
          setNegativePrompt(value);
        }}
      /> */}
      {/* <View>
        通道设置
        <View>
          常规通道
        </View>
        <View>
          快速通道
        </View>
      </View> */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'fixed',
          bottom: 20,
          width: '100%',
        }}
      >
        <View
          style={{
            // display: 'flex',
            // flexDirection: 'row',
            // justifyContent: 'center',
            // position: 'fixed',
            // bottom: 20,
            width: '96%',
          }}
        >
          <AtButton
            type="primary"
            style={{
              position: 'relative',
              // bottom: 20,
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
              const requestId = generateUniqueId();
              const res = await api.enqueue({
                sdParams,
                requestId,
                taskType: 'txt2img',
                userId: global.userInfo.data.userId,
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
            立即生成图片（消耗{usePoint}积分）
          </AtButton>
        </View>
      </View>
    </Container>
  );
};
