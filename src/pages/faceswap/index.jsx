/**
 * 换脸页面
 */

import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { AtDrawer, AtIcon } from 'taro-ui';
import compareIcon from '../../static/image/my/icons8-compare-64.png';
import IconGood from '../../static/image/my/icons-good.png';
import IconGood1 from '../../static/image/my/icons-good1.png';
import IconBad from '../../static/image/my/icons-bad.png';
import IconBad1 from '../../static/image/my/icons-bad1.png';
import { downloadImages } from '../../utils/imageTools.js';
import TaskList from '../comps/TaskList.jsx';
import ImagePicker from '../comps/ImagePicker.jsx';
import SwapButton from './SwapButton.jsx';
import TaskListTip from './TaskListTip.jsx';
import { clearTimers, getTaskImage } from '../../common/getTaskImage.js';
import { updateUserProcessInfo } from '../../api';
import CustomNavBar from '../index/CustomNavBar.jsx';
export default () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [startX, setStartX] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [showImageSrc, setShowImageSrc] = useState(true);
  const [showImageSwap, setShowImageSwap] = useState(false);
  const [compareImageSwap, setCompareImageSwap] = useState(false);
  const [rating, setRating] = useState(0);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    const down = async () => {
      const tempFilePath = await downloadImages(params.imageUrl);
      if (!ignore) setImageUrl(tempFilePath);
    };
    // 获取传递过来的参数
    const params = Taro.getCurrentInstance().router.params;
    let ignore = false;
    if (params && params.imageUrl) {
      // 先把图片下载下来，并展示出来
      down();
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
    data.user_like_status = rating;
    data.request_id = requestId;
    // updateUserProcessInfo(data);
  }, [rating]);

  const onUpdateTaskImages = async (requestId) => {
    const newImage = {
      src: '',
      status: 'pending',
      requestId,
    };
    setImages((prevImages) => [...prevImages, newImage]);

    const res = await getTaskImage(requestId);
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.requestId === requestId
          ? {
              ...image,
              src: 'data:image/png;base64,' + res.data.result.images[0],
              status: 'SUCCESS',
            }
          : image
      )
    );
    setRequestId(requestId);
    Taro.getApp().globalData.updateGlobalClickCount(-1);
    const updatedClickCount = Taro.getApp().globalData.clickCount;
    Taro.eventCenter.trigger('globalClickCountChanged', updatedClickCount);
  };

  const onTouchStart = (event) => {
    setStartX(event.touches[0].clientX);
  };
  const onTouchEnd = (event) => {
    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (deltaX < -50) {
      setShowDrawer(true);
    } else if (deltaX > 50) {
      setShowDrawer(false);
    }
  };
  return (
    <View
      onTouchstart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ background: 'black', height: '100vh' }}
    >
      <CustomNavBar></CustomNavBar>
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

      <TaskListTip onClick={() => setShowDrawer(true)}></TaskListTip>

      <View
        style={{
          position: 'fixed',
          width: '100%',
          bottom: '60rpx',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
        ></SwapButton>
      </View>

      <AtDrawer
        show={showDrawer}
        right
        mask
        width="80%"
        onClose={() => setShowDrawer(false)}
        style={{ background: 'black', height: '100%' }}
      >
        <TaskList images={images} />
      </AtDrawer>
    </View>
  );
};
