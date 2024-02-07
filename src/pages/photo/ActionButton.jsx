import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { AtButton } from 'taro-ui';
import { faceSwap } from '../../api/index.js';
import { data } from '../../const/sdApiParams.js';
import { downloadImages, wxPathToBase64 } from '../../utils/imageTools.js';

let isSwaped = false;

export default ({ albumUrls, selfUrl, onUpdateTaskImages }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  console.log('albumUrls', albumUrls);
  console.log('selfUrl', selfUrl);
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
    console.log('downm', albumUrls);
    let ignore = false;
    return () => {
      ignore = true;
    };
  }, [albumUrls]);

  const swapOneFace = async (originUrl) => {
    console.log('originUrl', originUrl);
    const originBase64 = await wxPathToBase64(originUrl);
    const selfBase64 = await wxPathToBase64(selfUrl);
    const storageUserInfo = getStorageSync('userInfo');
    console.log('storageUserInfo', storageUserInfo);
    if (storageUserInfo?.data?.userId) {
      data.userId = storageUserInfo?.data?.userId;
    }
    data.init_images = [originBase64];
    data.alwayson_scripts.roop.args[0] = selfBase64;
    let res = await faceSwap(data).catch((err) => {});
    console.log('faceSwap ok');
    if (res?.status === 'pending') {
      onUpdateTaskImages(res.request_id);
    } else {
      console.log('error_message', res);
      if (typeof res?.error_message === 'string') {
        Taro.showToast({
          title: res.error_message,
          icon: 'none',
        });
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
        if (selfUrl && albumUrls?.length && !isSwaped) {
          isSwaped = true;
          setLoading(true);
          swapOneFace(imageUrls[0]);
          // await Promise.all(imageUrls.map((albumUrl) => swapOneFace(albumUrl)));
          setLoading(false);
        }
      }}
    >
      一键换脸
    </AtButton>
  );
};
