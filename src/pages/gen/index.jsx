import { ScrollView, Text, Textarea, View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { AtButton } from 'taro-ui';
import { api } from '../../api';
import { updateUserInfoFromStorage } from '../../common/user';
import { appendnegativeprompt, appendprompt, sdParams } from './const';
import Container from '../comps/Container';
import { deepCopy, generateUniqueId } from '../../utils';
import Prompt from './Prompt';
import Selecter from './Selecter';
import FoldPanel from './FoldPanel';
import Advance from './Advance';
import Size from './Size';
const params = deepCopy(sdParams);
export default () => {
  const [images, setImages] = useState([]);
  const [prompt, setPrompt] = useState(params.prompt);
  const [usePoint, setUsePoint] = useState(1);
  const [negativePrompt, setNegativePrompt] = useState(params.negative_prompt);
  const [width, setWidth] = useState(params.width);
  const [loading, setLoading] = useState(false);
  const [height, setHeight] = useState(params.height);
  const [channels, setChannels] = useState([
    { name: '常规通道', selected: true },
    { name: '快速通道', selected: false },
  ]);
  useEffect(() => {
    updateUserInfoFromStorage();
  }, []);

  return (
    // <Container images={images} background={'#fff'}>
    <View style={{ margin: '0 auto' }}>
      <View style={{}}></View>
      <Prompt
        title={'绘画描述'}
        value={prompt}
        onChange={(value) => {
          setPrompt(value);
        }}
      />
      {/* <Size
        value={width}
        onChange={(value) => {
          setWidth(value);
        }}
      ></Size> */}
      <Selecter data={channels} title={'选择通道'}></Selecter>
      <View
        style={{
          marginTop: '20px',
        }}
      ></View>
      <Advance
        negativePrompt={negativePrompt}
        setNegativePrompt={setNegativePrompt}
      ></Advance>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'fixed',
          bottom: 20,
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* <View
            style={{
              // display: 'flex',
              // flexDirection: 'row',
              // justifyContent: 'center',
              // position: 'fixed',
              // bottom: 20,
              width: '96%',
            }}
          > */}
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
            width: '100%',
            zIndex: 0,
          }}
          shape="circle"
          loading={loading}
          onClick={async () => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 2000);
            params.prompt = prompt + appendprompt;
            params.negative_prompt = negativePrompt + appendnegativeprompt;
            params.width = width;
            params.height = height;

            let res;
            // for (let i = 0; i < 30; i++) {
            const requestId = generateUniqueId();
            res = await api.enqueue({
              sdParams: params,
              requestId,
              taskType: 'txt2img',
              userId: global.userInfo.data.userId,
            });
            // }
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
        {/* </View> */}
      </View>
    </View>
    // </Container>
  );
};
