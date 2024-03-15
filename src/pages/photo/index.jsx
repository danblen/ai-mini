import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { AtDrawer } from 'taro-ui';
import { URL_STATIC } from '../../api/config.js';
import TaskList from '../comps/TaskList';
import TaskListTip from '../faceswap/TaskListTip.jsx';
import ActionButton from './ActionButton';
import { clearTimers, getTaskImage } from '../../common/getTaskImage';
import ImagePicker from '../comps/ImagePicker';
import CustomNavBar from '../index/CustomNavBar.jsx';
import BackButton from '../comps/BackButton.jsx';
import ImageList from '../comps/ImageList.jsx';

export default () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [showDrawer, setShowDrawer] = useState(false);
  const [startX, setStartX] = useState(0);
  const [images, setImages] = useState([]);
  useEffect(() => {
    const eventChannel = Taro.getCurrentInstance().page.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      const albumData = data.albumData;
      setAlbumData(albumData);
    });
    return () => {
      clearTimers();
    };
  }, []);

  // const onUpdateTaskImages = async (requestId) => {
  //   console.log('requestId', requestId);
  //   const newImage = {
  //     src: '',
  //     status: 'pending',
  //     requestId,
  //   };
  //   setImages((prevImages) => [...prevImages, newImage]);

  //   try {
  //     const res = await getTaskImage(requestId);
  //     console.log('res', res);
  //     setImages((prevImages) =>
  //       prevImages.map((image) =>
  //         image.requestId === requestId
  //           ? {
  //               ...image,
  //               src: URL_STATIC + res.data.imageUrl,
  //               status: 'SUCCESS',
  //             }
  //           : image
  //       )
  //     );

  //     Taro.showToast({
  //       title: '一张已处理完成，在作品页查看~',
  //       icon: 'none',
  //     });
  //   } catch (error) {
  //     // 在这里处理异常情况，比如超时或其他错误
  //     console.error('Task error:', error);
  //     Taro.showToast({
  //       title: `请求超时,请重试`,
  //       icon: 'none',
  //     });
  //   }
  // };
  const onUpdateTaskImages = async (status, requestId, imageUrl) => {
    if (status == 'pending') {
      const newImage = {
        src: '',
        status,
        requestId,
      };
      setImages((prevImages) => [...prevImages, newImage]);
    } else if (status == 'finished') {
      setImages((prevImages) =>
        prevImages.map((image) =>
          image.requestId === requestId
            ? {
                ...image,
                src: imageUrl,
                status,
              }
            : image
        )
      );

      Taro.showToast({
        title: '已处理完成，在作品页查看~',
        icon: 'none',
      });
    } else if (status == 'failed') {
      setImages((prevImages) =>
        prevImages.map((image) =>
          image.requestId === requestId
            ? {
                ...image,
                status,
              }
            : image
        )
      );
    }
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
      className=""
      style={{
        // marginBottom: '200rpx',
        background: 'black',
      }}
    >
      <BackButton />
      <TaskListTip onClick={() => setShowDrawer(true)}></TaskListTip>

      <View className="">
        <View
          style={{
            height: '50vh',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '20rpx',
          }}
        >
          <Image
            style={{
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            mode="widthFix"
            src={albumData.index}
          />
        </View>
        <ImageList imageUrls={albumData.urls} />
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
        }}
      >
        <View
          style={{
            width: '95%',
            marginBottom: '40rpx',
            borderRadius: '20rpx',
            background: 'grey',
            opacity: 0.8,
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
        <View
          style={{
            width: '95%',
          }}
        >
          <ActionButton
            albumUrls={albumData.urls}
            selfUrl={
              uploadedFiles[selectedIndex]?.compressBase64 ||
              uploadedFiles[selectedIndex]?.url
            }
            onUpdateTaskImages={onUpdateTaskImages}
          />
        </View>
      </View>

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
      <View style={{ height: '200rpx' }}></View>
    </View>
  );
};
const Styles = {
  indexImage: {},
  image: {
    width: '360rpx',
    borderRadius: '10rpx',
  },
  imageWrap: {
    paddingLeft: '10rpx',
    display: 'inline-block',
  },
};
