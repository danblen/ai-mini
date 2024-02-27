import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { AtButton } from 'taro-ui';
import { faceSwap } from '../../api/index.js';
import { data } from '../../const/sdApiParams.js';
import { downloadImages, wxPathToBase64 } from '../../utils/imageTools.js';
import { deepCopy } from '../../utils/object.js';
import { getStorageSync } from '../../base/global.js';
const SD_PARAMS = deepCopy(data);

export default ({ albumUrls, selfUrl, onUpdateTaskImages }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const down = async (urls) => {
      if (urls?.length) {
        let res = await Promise.all(
          urls.map(async (image) => {
            return await downloadImages(image);
          })
        );
        setImageUrls(res);
      }
    };
    down(albumUrls);
    let ignore = false;
    return () => {
      ignore = true;
    };
  }, [albumUrls]);

  const swapOneFace = async (originUrl) => {
    const originBase64 = await wxPathToBase64(originUrl);
    const selfBase64 = await wxPathToBase64(selfUrl);
    const storageUserInfo = getStorageSync('userInfo');
    if (storageUserInfo?.data?.userId) {
      SD_PARAMS.userId = storageUserInfo?.data?.userId;
    }
    SD_PARAMS.init_images = [originBase64];
    SD_PARAMS.alwayson_scripts.roop.args[0] = selfBase64;
    let res = await faceSwap(SD_PARAMS).catch((err) => {});
    console.log('faceSwap ok');
    if (res?.data?.status === 'pending') {
      onUpdateTaskImages(res.data.requestId);
    } else {
      if (typeof res?.error === 'string') {
        if (res.error === 'no points') {
          Taro.showToast({
            title: '积分不足',
            icon: 'none',
          });
        } else {
          Taro.showToast({
            title: res.error,
            icon: 'none',
          });
        }
      } else {
        Taro.showToast({
          title: 'Unknown error occurred',
          icon: 'none',
        });
      }
    }
  };

  return (
    <AtButton
      type="primary"
      style={{
        background: 'linear-gradient(to right, #00467f, #a5cc82)',
        animation: 'swap 1s infinite',
        opacity: 0.8,
        fontWeight: 'bold',
      }}
      shape="circle"
      loading={loading}
      onClick={async () => {
        // if (imageUrls && albumUrls?.length) {
        if (albumUrls?.length) {
          setLoading(true);
          // swapOneFace(imageUrls[0]);
          await Promise.all(imageUrls.map((imageUrl) => swapOneFace(imageUrl)));
          setLoading(false);
        }
      }}
    >
      多张制作
    </AtButton>
  );
};
