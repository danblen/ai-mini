import Taro from '@tarojs/taro';
import { api, faceSwap } from '../../api';
import { useState, useEffect, useRef } from 'react';
import { View, Button, Text } from '@tarojs/components';
import { AtButton, AtActivityIndicator, AtFloatLayout } from 'taro-ui';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui';
import { downloadImages, wxPathToBase64 } from '../../utils/imageTools';
import {
  saveUserInfo,
  updateUserInfoFromApi,
  wechatLogin,
} from '../../common/user.js';
import LoginView from '../comps/LoginView.jsx';
import { deepCopy, generateUniqueId } from '../../utils/index.js';
import {
  data,
  swap_face_and_add_detail_data,
  animeMix,
} from '../../const/sdApiParams.js';
import { PAGES } from '../../const/app';
import { URL_STATIC } from '../../api/config.js';

const sdFaceSwapAddDetailParam = deepCopy(swap_face_and_add_detail_data);
const sdFaceSwapParam = deepCopy(data);
const animeMixParam = deepCopy(animeMix);
const SwapCount = ({ clickCount }) => (
  <View
    style={{
      position: 'fixed',
      top: '45px',
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
export default ({
  imageUrl,
  selectedImageUrl,
  onUpdateTaskImages,
  selectedOption,
  momentId,
}) => {
  const [loading, setLoading] = useState(false);
  const clickCount = useRef(Taro.getApp().globalData.clickCount);
  const [isOpened, setIsOpened] = useState(false);
  const [updateTrigger, forceUpdate] = useState({});
  const [usedFaceImages, setUsedFaceImages] = useState([]);
  const [isOpenedText, setIsOpenedText] = useState(false);

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

  // 将图片文件转换为 base64 字符串的函数
  function getBase64(filePath) {
    return new Promise((resolve, reject) => {
      Taro.getFileSystemManager().readFile({
        filePath: filePath,
        encoding: 'base64',
        success: (res) => {
          resolve(res.data);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  }
  const getParams = async () => {
    let sdparam = sdFaceSwapParam;
    if (selectedOption.text === '快速模式') {
      sdparam = sdFaceSwapParam;
      const tarBase64 = await wxPathToBase64(selectedImageUrl);
      // 上传到服务器
      let dir = `/userImages/${global.userInfo.data.userId}/`;
      let filename =
        selectedImageUrl.substring(
          selectedImageUrl.lastIndexOf('/') + 1,
          selectedImageUrl.lastIndexOf('.')
        ) + '.png';
      api.saveImageToServerApi({
        imageBase64: tarBase64,
        dir,
        filename,
      });
      sdparam.init_images[0] = imageUrl;
      sdparam.alwayson_scripts.roop.args[0] = URL_STATIC + dir + filename;
      return sdparam;
    } else if (selectedOption.text === '数字分身模式') {
      return {
        imageUrls: [imageUrl],
      };
    } else if (
      selectedOption.text === '换背景' ||
      selectedOption.text === '转动漫'
    ) {
      const tarBase64 = await getBase64(imageUrl);
      sdparam = animeMixParam;
      sdparam.init_images[0] = tarBase64;
      return sdparam;
    } else if (selectedOption.text === '精修模式') {
      sdparam = sdFaceSwapAddDetailParam;
      const tarBase64 = await wxPathToBase64(selectedImageUrl);
      sdparam.alwayson_scripts.roop.args[0] = tarBase64;
      sdparam.init_images[0] = imageUrl;
      return sdparam;
    }
  };

  // const handleClick = async () => {
  //   if (imageUrl && selectedImageUrl) {
  //     try {
  //       // 异步操作
  //       let res = await faceSwap(await getParams());
  //       if (res.data?.status === 'pending') {
  //         onUpdateTaskImages(res.data.requestId);
  //       } else {
  //         if (typeof res?.error === 'string') {
  //           console.log('res', res);
  //           if (res.error === 'no points') {
  //             Taro.showToast({
  //               title: '积分不足',
  //               icon: 'none',
  //             });
  //           } else {
  //             Taro.showToast({
  //               title: res.error,
  //               icon: 'none',
  //             });
  //           }
  //         } else {
  //           Taro.showToast({
  //             title: 'Unknown error occurred',
  //             icon: 'none',
  //           });
  //         }
  //         setLoading(false);
  //         return;
  //       }

  //       setLoading(false);
  //       Taro.getApp().globalData.updateGlobalClickCount(1); // 减少全局变量中的点击次数
  //       clickCount.current = Taro.getApp().globalData.clickCount;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } else {
  //     Taro.showToast({
  //       title: `请点击+号,选择人脸图像~`,
  //       icon: 'none',
  //     });
  //   }
  // };
  const handleClick = async () => {
    if (!imageUrl) {
      Taro.showToast({
        title: `出错了，返回页面重新进来试试~`,
        icon: 'none',
      });
      return;
    }
    if (!selectedImageUrl && selectedOption.text == '快速模式') {
      Taro.showToast({
        title: `请点击+号,选择人脸图像~`,
        icon: 'none',
      });
      return;
    }
    // if (usedFaceImages.indexOf(selectedImageUrl) > -1) {
    //   Taro.showToast({
    //     title: `这张已经换过哦~`,
    //     icon: 'none',
    //   });
    //   return;
    // }
    // 未登录
    if (global.userInfo === null || !global.userInfo.isLogin) {
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    const requestId = generateUniqueId();
    onUpdateTaskImages(requestId);
    let res;
    if (selectedOption.text === '数字分身模式') {
      res = await api.easyPhotoSwapFace({
        userId: global.userInfo.data.userId,
        requestId,
        usePoint: selectedOption.usePoint,
        sdParams: await getParams(),
      });
      if (res?.message === 'User loraName not found') {
        setIsOpenedText(true);
      } else if (global.userInfo.data.loraStatus != 'pending') {
        Taro.showToast({
          title: '您的数字分身正在制作中，请稍候..',
          icon: 'none',
        });
      }
    } else {
      res = await api.img2img({
        userId: global.userInfo.data.userId,
        taskType: 'img2img',
        processType: 'img2img',
        requestId,
        usePoint: selectedOption.usePoint,
        sdParams: await getParams(),
        momentId: momentId,
      });
      res = await api.enqueue({
        userId: global.userInfo.data.userId,
        taskType: 'img2img',
        processType: 'img2img',
        requestId,
        usePoint: selectedOption.usePoint,
        sdParams: await getParams(),
        momentId: momentId,
      });
    }
    if (res?.data) {
      // setUsedFaceImages([...usedFaceImages, selectedImageUrl]);
      updateUserInfoFromApi();
    } else {
      Taro.showToast({
        title: res.message,
        icon: 'none',
      });
    }
  };
  const handleCancel = async () => {
    setIsOpenedText(false);
  };
  const handleConfirm = async () => {
    setIsOpenedText(false);
    Taro.switchTab({
      url: PAGES.user,
    });
  };

  return (
    <View
      style={{
        position: 'relative',
        width: '95%',
      }}
    >
      <AtModal isOpened={isOpenedText} onClose={handleCancel}>
        <AtModalHeader>👾 打造数字分身 👾</AtModalHeader>
        <AtModalContent>
          <div>
            <p>🌟 精准复现面部特征和表情 </p>
            <p>🏠 无论是户外风光还是室内布景，数字分身都能完美适应</p>
            <p>🌿 让您的写真充满生命力和个性。</p>
          </div>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => handleCancel()}>取消</Button>
          <Button onClick={() => handleConfirm()}>去制作</Button>
        </AtModalAction>
      </AtModal>
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
        一键换脸（消耗{selectedOption.usePoint}积分）
      </AtButton>
      <AtFloatLayout
        isOpened={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
      >
        <LoginView
          onConfirmLogin={async (res) => {
            setIsOpened(false);
          }}
        />
      </AtFloatLayout>
    </View>
  );
};
