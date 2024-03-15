import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { AtButton, AtFloatLayout } from 'taro-ui';
import { api, faceSwap } from '../../api/index.js';
import { data } from '../../const/sdApiParams.js';
import { downloadImages, wxPathToBase64 } from '../../utils/imageTools.js';
import { deepCopy } from '../../utils/object.js';
import { getStorageSync } from '../../base/global.js';
import LoginView from '../comps/LoginView.jsx';
import { saveUserInfo } from '../../common/user.js';
import { generateUniqueId } from '../../utils/index.js';
const SD_PARAMS = deepCopy(data);

export default ({ albumUrls, selfUrl, onUpdateTaskImages }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [usedFaceImages, setUsedFaceImages] = useState([]);
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
  const getParams = async (originUrl) => {
    const srcBase64 = await wxPathToBase64(originUrl);
    const tarBase64 = await wxPathToBase64(selfUrl);
    SD_PARAMS.init_images = [srcBase64];
    SD_PARAMS.alwayson_scripts.roop.args[0] = tarBase64;
    return SD_PARAMS;
  };
  // const swapOneFace = async (originUrl) => {
  //   const originBase64 = await wxPathToBase64(originUrl);
  //   const selfBase64 = await wxPathToBase64(selfUrl);
  //   const storageUserInfo = getStorageSync('userInfo');
  //   if (storageUserInfo?.data?.userId) {
  //     SD_PARAMS.userId = storageUserInfo?.data?.userId;
  //   }
  //   SD_PARAMS.init_images = [originBase64];
  //   SD_PARAMS.alwayson_scripts.roop.args[0] = selfBase64;
  //   let res = await faceSwap(SD_PARAMS).catch((err) => {});
  //   if (res?.data?.status === 'pending') {
  //     onUpdateTaskImages(res.data.requestId);
  //   } else {
  //     if (typeof res?.error === 'string') {
  //       if (res.error === 'no points') {
  //         Taro.showToast({
  //           title: '积分不足',
  //           icon: 'none',
  //         });
  //       } else {
  //         Taro.showToast({
  //           title: res.error,
  //           icon: 'none',
  //         });
  //       }
  //     } else {
  //       Taro.showToast({
  //         title: 'Unknown error occurred',
  //         icon: 'none',
  //       });
  //     }
  //   }
  // };
  // const onClick=async () => {
  //   // if (imageUrls && albumUrls?.length) {
  //   if (albumUrls?.length) {
  //     setLoading(true);
  //     // swapOneFace(imageUrls[0]);
  //     await Promise.all(imageUrls.map((imageUrl) => swapOneFace(imageUrl)));
  //     setLoading(false);
  //   }
  // }
  const onClick = async () => {
    if (!albumUrls?.length) {
      Taro.showToast({
        title: `出错了，返回页面重新进来试试~`,
        icon: 'none',
      });
      return;
    }
    if (!selfUrl) {
      Taro.showToast({
        title: `请点击+号,选择人脸图像~`,
        icon: 'none',
      });
      return;
    }
    if (usedFaceImages.indexOf(selfUrl) > -1) {
      Taro.showToast({
        title: `这张已经换过哦~`,
        icon: 'none',
      });
      return;
    }
    // 未登录
    if (global.userInfo === null || !global.userInfo.isLogin) {
      setIsOpened(true);
      return;
    }
    if (global.userInfo.data.points < 6) {
      Taro.showToast({
        title: `积分不足，请先获取积分`,
        icon: 'none',
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const swapOne = async (imageUrl) => {
      const requestId = generateUniqueId();
      console.log(requestId);
      onUpdateTaskImages('pending', requestId, '');
      const res = await api
        .img2img({
          userId: global.userInfo.data.userId,
          requestId,
          sdParams: await getParams(imageUrl),
        })
        .catch();
      if (res?.data) {
        onUpdateTaskImages('finished', requestId, res.data.imageUrl);
      } else {
        Taro.showToast({
          title: res.message,
          icon: 'none',
        });
        onUpdateTaskImages('failed', requestId, '');
      }
    };

    setUsedFaceImages([...usedFaceImages, selfUrl]);
    await Promise.all(imageUrls.map((imageUrl) => swapOne(imageUrl)));
  };

  return (
    <>
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
        onClick={onClick}
      >
        多张制作
      </AtButton>

      <AtFloatLayout
        isOpened={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
      >
        <LoginView
          onConfirmLogin={async (res) => {
            saveUserInfo({
              isLogin: true,
              data: res.data,
            });
            setIsOpened(false);
          }}
        />
      </AtFloatLayout>
    </>
  );
};
