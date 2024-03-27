/**
 * 换脸页面
 */

import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import {
  AtActionSheet,
  AtActionSheetItem,
  AtButton,
  AtDrawer,
  AtIcon,
} from 'taro-ui';
import { api } from '../../api';
import { URL_STATIC } from '../../api/config.js';
import { getStorage, setStorage } from '../../base/global.js';
import { getTaskImage } from '../../common/getTaskImage.js';
import { saveUserInfo } from '../../common/user.js';
import {
  data,
  swap_face_and_add_detail_data,
} from '../../const/sdApiParams.js';
import compareIcon from '../../static/image/my/icons8-compare-64.png';
import { downloadImages } from '../../utils/imageTools.js';
import { deepCopy } from '../../utils/object.js';
import ImagePicker from '../comps/ImagePicker.jsx';
import SwapButton from './SwapButton.jsx';
import TaskListTip from './TaskListTip.jsx';
import BackButton from '../comps/BackButton.jsx';
import Container from '../comps/Container.jsx';
import ModeSelect from './ModeSelect.jsx';
const IconBad = URL_STATIC + '/appstatic/image/my/icons-bad.png';
const IconBad1 = URL_STATIC + '/appstatic/image/my/icons-bad1.png';
const IconGood = URL_STATIC + '/appstatic/image/my/icons-good.png';
const IconGood1 = URL_STATIC + '/appstatic/image/my/icons-good1.png';

export default () => {
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [showImageSrc, setShowImageSrc] = useState(true);
  const [showImageSwap, setShowImageSwap] = useState(false);
  const [compareImageSwap, setCompareImageSwap] = useState(false);
  const [rating, setRating] = useState(0);
  const [requestId, setRequestId] = useState(0);

  const [selectedOption, setSelectedOption] = useState({
    text: '快速模式',
    usePoint: 1,
  }); // 用于存储选中的选项
  const [MomentId, setMomentId] = useState(MomentId);
  useEffect(() => {
    const fetchData = async () => {
      const swapMode = await getStorage('swapMode');
      if (swapMode) {
        setSelectedOption(swapMode);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    setStorage('swapMode', selectedOption);
  }, [selectedOption]);
  useEffect(() => {
    // 获取传递过来的参数
    const params = Taro.getCurrentInstance().router.params;
    let ignore = false;
    if (params && params.imageUrl) {
      setImageUrl(params.imageUrl);
      api.updateImageUserUploadInfo({
        momentId: params.momentId,
        viewCount: 1,
      });
      setMomentId(params.momentId);
    }
    return () => {
      ignore = true;
      //getTaskImage立即进行getSwapQueueResult不需要关闭定时器，如果关闭则相应request_id可能获取不到结果
      // 只需要等待getSwapQueueResult获取到结果即自动关闭定时器
      // clearTimers();
    };
  }, []);
  useEffect(() => {
    if (
      images &&
      images.length > 0 &&
      images[images.length - 1].status === 'SUCCESS'
    ) {
      setCompareImageSwap(true);
      setShowImageSwap(true);
      setShowImageSrc(false);
    } else {
      setShowImageSwap(false);
      setShowImageSrc(true);
      setRating(0);
    }
  }, [images]);

  useEffect(() => {
    const data = {};
    // data的任何字段都要匹配数据库字段
    data.userLikeStatus = rating;
    data.requestId = requestId;
    api.updateUserProcessInfo(data);
  }, [rating]);

  const onUpdateTaskImages = async (requestId) => {
    const newImage = {
      src: '',
      status: 'pending',
      requestId,
    };
    setImages((prevImages) => [...prevImages, newImage]);

    try {
      const res = await getTaskImage(requestId);
      setImages((prevImages) =>
        prevImages.map((image) =>
          image.requestId === requestId
            ? {
                ...image,
                src: res.data?.imageUrl,
                status: 'SUCCESS',
              }
            : image
        )
      );

      Taro.showToast({
        title: '已处理完成，在作品页查看~',
        icon: 'none',
      });
      setRequestId(requestId);
    } catch (error) {
      // 在这里处理异常情况，比如超时或其他错误
      console.error('Task error:', error);
      Taro.showToast({
        title: `请求超时,请重试`,
        icon: 'none',
      });
    }
    Taro.getApp().globalData.updateGlobalClickCount(-1);
    const updatedClickCount = Taro.getApp().globalData.clickCount;
    Taro.eventCenter.trigger('globalClickCountChanged', updatedClickCount);
  };

  // const onUpdateTaskImages = async (requestIds) => {
  // if (status == 'pending') {
  //   const newImage = {
  //     src: '',
  //     status,
  //     requestId,
  //   };
  //   setImages((prevImages) => [...prevImages, newImage]);
  // } else if (status == 'finished') {
  //   setImages((prevImages) =>
  //     prevImages.map((image) =>
  //       image.requestId === requestId
  //         ? {
  //             ...image,
  //             src: imageUrl,
  //             status: status,
  //           }
  //         : image
  //     )
  //   );

  //   Taro.showToast({
  //     title: '已处理完成，在作品页查看~',
  //     icon: 'none',
  //   });
  // } else if (status == 'failed') {
  //   setImages((prevImages) =>
  //     prevImages.map((image) =>
  //       image.requestId === requestId
  //         ? {
  //             ...image,
  //             status,
  //           }
  //         : image
  //     )
  //   );
  // }
  // Taro.getApp().globalData.updateGlobalClickCount(-1);
  // const updatedClickCount = Taro.getApp().globalData.clickCount;
  // Taro.eventCenter.trigger('globalClickCountChanged', updatedClickCount);
  // };

  return (
    <Container images={images}>
      <BackButton />
      <ModeSelect
        selectedOption={selectedOption}
        handleOptionSelect={(option) => {
          setSelectedOption(option);
        }}
      />

      <View
        style={{
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '90vh',
        }}
      >
        <Image
          mode="widthFix"
          style={{
            width: '100%',
            verticalAlign: 'middle',
            opacity: 1,
            transition: 'opacity 1s',
          }}
          src={imageUrl}
        />

        {/* 第二张图，初始时完全不可见，通过动画逐渐显示 */}
        <Image
          mode="widthFix"
          style={{
            width: '100%',
            verticalAlign: 'middle',
            position: 'absolute',
            right: 0, // 设置初始位置在屏幕右侧
            opacity: compareImageSwap ? 1 : 0, // 根据条件设置透明度
            transition: 'opacity 1s',
            zIndex: 1,
          }}
          src={
            showImageSwap && images[images.length - 1].status === 'SUCCESS'
              ? images[images.length - 1].src
              : imageUrl
          }
        />
        <View
          style={{
            position: 'absolute',
            top: '65%',
            left: '90%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column', // 将按钮排成一列
            alignItems: 'center',
          }}
        >
          {showImageSwap && (
            <View
              style={{
                marginTop: '5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Image
                src={rating === 1 ? IconGood : IconGood1}
                style={{ width: '24px', height: '24px' }}
                onClick={() => setRating((prev) => (prev === 1 ? 0 : 1))}
              />
              <Image
                src={rating === -1 ? IconBad : IconBad1}
                style={{
                  width: '24px',
                  height: '24px',
                  marginTop: '20px',
                }}
                onClick={() => setRating((prev) => (prev === -1 ? 0 : -1))}
              />
            </View>
          )}
          {showImageSwap && (
            <View
              type="primary"
              onClick={() => setCompareImageSwap((prev) => !prev)}
              style={{
                backgroundColor: showImageSwap ? '#ccc' : '#ccc',
                width: '50px',
                height: '50px',
                borderRadius: '50%', // 圆形背景
                marginTop: '20px',
              }}
            >
              <Image
                src={compareIcon}
                mode="widthFix"
                style={{
                  width: '50rpx',
                  height: '50rpx',
                  marginTop: '10px',
                  marginLeft: '10px',
                }}
              />
            </View>
          )}
        </View>
      </View>

      <View
        style={{
          position: 'fixed',
          width: '100%',
          bottom: '60rpx',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99,
        }}
      >
        <View
          style={{
            width: '95%',
            marginBottom: '40rpx',
            borderRadius: '20rpx',
            background: 'transparent', // 将背景改为透明
            opacity: 1,
            color: 'white',
          }}
        >
          <ImagePicker
            onFilesChange={(images) => setUploadedFiles(images)}
            onSelectImage={(index) => {
              setSelectedIndex(index);
            }}
          />
        </View>
        <SwapButton
          imageUrl={imageUrl}
          selectedImageUrl={
            uploadedFiles[selectedIndex]?.compressBase64 ||
            uploadedFiles[selectedIndex]?.url
          }
          onUpdateTaskImages={onUpdateTaskImages}
          selectedOption={selectedOption}
          momentId={MomentId}
        ></SwapButton>
      </View>
    </Container>
  );
};
