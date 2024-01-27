/**
 * 修图页
 */
import React, { useState, useEffect, useCallback } from 'react';
import Taro, { useReady, useRouter } from '@tarojs/taro';

import { View, Canvas, Text, Image, Button } from '@tarojs/components';
import CustomNavBar from '../index/CustomNavBar.jsx';
import { AtTabs, AtIcon } from 'taro-ui';
import { mask_data, scale_data } from '../../const/sdApiParams.js';
import { wxPathToBase64 } from '../../utils/imageTools';
import { getTaskImage } from '../../common/getTaskImage.js';
import { faceSwap } from '../../api';
import defaultPic from '../../static/image/my/icons8-上传-64.png';

export default ({}) => {
  const router = useRouter();
  const [Ctx, setCtx] = useState(null);
  const [isButtonDown, setButtonDown] = useState(false);
  const [dpr] = useState(Taro.getSystemInfoSync().pixelRatio);
  const [screen, setScreen] = useState({
    screenWidth: '',
    screenHeight: '',
  });

  const [ouputImage, setOuputImage] = useState([]);
  const [srcImage, setSrcImage] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [isExpanded, setIsExpanded] = useState(0);
  const [hasDraw, sethasDraw] = useState(0);
  const [canUseCompare, setcanUseCompare] = useState(0);
  const [lineWidth, setlineWidth] = useState(15);
  const [isEraserActivated, setIsEraserActivated] = useState(false);
  const [hasLoadSrcImage, setHasLoadSrcImage] = useState(false);

  const onClick = useCallback(value => {
    console.log('cur:', value, hasLoadSrcImage);
    if (hasLoadSrcImage) {
      if (value === 1) {
        toggleCollapse();
      } else {
        if (
          ouputImage &&
          ouputImage.length > 0 &&
          ouputImage[ouputImage.length - 1].status === 'SUCCESS'
        ) {
          Taro.showModal({
            title: '是否保存文件',
            content: '是否需要保存当前文件？',
            success: res => {
              if (res.confirm) {
                console.log('用户点击确定');
                saveOutputImageToAlbum(ouputImage[ouputImage.length - 1].src);
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            },
          });
        }
        initCanvas();
        sethasDraw(false);
        setIsExpanded(false);
        setOuputImage([]);
        setIsEraserActivated(false);
      }
    }
    setCurrentTab(value);
  });

  const saveOutputImageToAlbum = base64Image => {
    // 将 base64 转为临时文件路径
    const tempFilePath = `${Taro.env.USER_DATA_PATH}/tempImage.png`;
    Taro.getFileSystemManager().writeFile({
      filePath: tempFilePath,
      data: base64Image.replace(/^data:image\/\w+;base64,/, ''),
      encoding: 'base64',
      success: () => {
        console.log('文件写入成功');
        // 保存到相册
        Taro.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success: res => {
            Taro.showToast({
              title: '保存成功',
              icon: 'success',
            });
          },
          fail: error => {
            Taro.showToast({
              title: '保存失败',
              icon: 'none',
            });
          },
        });
      },
      fail: error => {
        console.error('写入文件失败', error);
      },
    });
  };

  const toggleCollapse = () => {
    setcanUseCompare(false);
    setIsExpanded(true);
    // setTimeout(() => {
    console.log('进入画板');
    initCanvas();
    // }, 5);
  };

  const initCanvas = () => {
    Taro.createSelectorQuery()
      .select('#canvas123')
      .fields({
        node: true,
        size: true,
      })
      .exec(res => {
        const canvas = res[0].node;
        console.log('res:', res[0].width, res[0].height);
        canvas.width = res[0].width;
        canvas.height = res[0].height;
        const ctx = canvas.getContext('2d');
        ctx.globalAlpha = 0.1;
        ctx.globalCompositeOperation = 'source-over';

        ctx.clearRect(0, 0, res[0].width, res[0].height); // 清空画布
        // ctx.beginPath(); // 开始绘制
        // ctx.fillStyle = "#fbfbfb"; // 设置背景色
        // ctx.fillRect(0, 0, width, height);
        // 绘制图像作为背景
        sethasDraw(false);
        setCtx(ctx);
      });
  };

  const inpaitUseSD = () => {
    if (isExpanded) {
      if (hasDraw) {
        convertCanvasToImage();
      }
    }
  };

  const sdWith2KParams = async () => {
    if (hasLoadSrcImage) {
      const data = scale_data;
      const scaleFactor = 1.5; //放大倍数
      // ad_denoising_strength:Range[0-1],
      data.denoising_strength = 0; //图像变化幅度
      data.script_args[data.script_args.length - 1] = scaleFactor;
      Taro.showLoading({
        title: '预计5秒,加载中...',
        mask: true,
      });
      requestSdTransform(data);
    }
  };

  const sdWith4KParams = () => {
    if (hasLoadSrcImage) {
      const data = scale_data;
      const scaleFactor = 2; //放大倍数
      // ad_denoising_strength:Range[0-1],
      data.denoising_strength = 0.4; //图像变化幅度
      data.script_args[data.script_args.length - 1] = scaleFactor;
      Taro.showLoading({
        title: '预计5秒,加载中...',
        mask: true,
      });
      requestSdTransform(data);
    }
  };

  const touchStart = event => {
    if (isExpanded) {
      Ctx.beginPath();
      Ctx.moveTo(event.touches[0].x, event.touches[0].y);
      setButtonDown(true);
      sethasDraw(true);
    }
  };
  const move = event => {
    if (isExpanded) {
      if (isEraserActivated) {
        Ctx.globalCompositeOperation = 'destination-out';
      } else {
        Ctx.globalCompositeOperation = 'source-over';
      }
      Ctx.lineTo(event.touches[0].x, event.touches[0].y);
      Ctx.strokeStyle = '#000000';
      Ctx.lineWidth = lineWidth;
      Ctx.lineCap = 'round';
      Ctx.lineJoin = 'round';
      Ctx.stroke();
      // Ctx.draw(true);
    }
  };
  const touchEnd = () => {
    if (isExpanded) {
      Ctx.closePath();
    }
  };

  const onUpdateTaskImages = async requestId => {
    const newImage = {
      src: '',
      status: 'pending',
      requestId,
    };
    setOuputImage(prevImages => [...prevImages, newImage]);

    const res = await getTaskImage(requestId);
    setOuputImage(prevImages =>
      prevImages.map(image =>
        image.requestId === requestId
          ? {
              ...image,
              src: 'data:image/png;base64,' + res.result.images[0],
              status: 'SUCCESS',
            }
          : image,
      ),
    );
    Taro.hideLoading();
  };

  const downloadImage = url => {
    return new Promise((resolve, reject) => {
      Taro.downloadFile({
        url: url,
        success: res => resolve(res.tempFilePath),
        fail: error => reject(error),
      });
    });
  };

  const getImageInfo = src => {
    return new Promise((resolve, reject) => {
      Taro.getImageInfo({
        src: src,
        success: info => resolve(info),
        fail: error => reject(error),
      });
    });
  };

  const canvasToTempFile = (canvas, dstWidth, dstHeight) => {
    return new Promise((resolve, reject) => {
      Taro.canvasToTempFilePath({
        canvas: canvas,
        destWidth: dstWidth,
        destHeight: dstHeight,
        success: res => resolve(res.tempFilePath),
        fail: error => reject(error),
      });
    });
  };

  const readFileAsBase64 = filePath => {
    return new Promise((resolve, reject) => {
      Taro.getFileSystemManager().readFile({
        filePath: filePath,
        encoding: 'base64',
        success: data => resolve(data),
        fail: error => reject(error),
      });
    });
  };

  const convertCanvasToImage = async () => {
    try {
      Taro.showLoading({
        title: '预计5秒,加载中...',
        mask: true,
      });
      // 从canvas视图获取node、size
      const canvasQuery = await new Promise((resolve, reject) => {
        Taro.createSelectorQuery()
          .select('#canvas123')
          .fields({
            node: true,
            size: true,
          })
          .exec(res => resolve(res));
      });

      // const localImagePath = await downloadImage(srcImage);
      //获取原图实际宽高
      const info = await getImageInfo(srcImage);
      console.log('Original Image Size:', info.width, info.height);

      // 将canvas（蒙版）转换到原图宽高（蒙版图和原图宽高需要一致）
      const canvas = canvasQuery[0].node;
      const canvasTempFile = await canvasToTempFile(
        canvas,
        info.width,
        info.height,
      );
      console.log('canvasToTempFile success');

      // 将canvas转为base64用于请求server
      let canvasBase64 = await readFileAsBase64(canvasTempFile);
      let canvasBase64Pad = 'data:image/png;base64,' + canvasBase64.data;
      while (canvasBase64Pad.length % 4 !== 0) {
        canvasBase64Pad += '=';
      }
      console.log('canvasBase64 success');

      const data = mask_data;
      data.mask = canvasBase64Pad;
      requestSdTransform(data);
    } catch (error) {
      console.error(error);
    }
  };
  const requestSdTransform = async data => {
    // 将原图转为base64
    const srcBase64 = await wxPathToBase64(srcImage);
    console.log('srcBase64 success');

    const storageUserInfo = Taro.getStorageSync('userInfo');

    data.init_images = [srcBase64];
    data.user_id = storageUserInfo.data.user_id;

    const res1 = await faceSwap(data);
    if (res1.status === 'pending') {
      initCanvas();
      onUpdateTaskImages(res1.request_id);
    } else {
      Taro.hideLoading();
      Taro.showToast({
        title: res1.error_message,
        icon: 'none',
      });
    }
  };
  const handleUploadOptionClick = async index => {
    // 打开本地相册选择图片
    if (index === 0) {
      try {
        const result = await Taro.chooseImage({
          count: 1, // 可选择的图片数量，这里设置为 1
          sizeType: ['compressed'], // 压缩图片
          sourceType: ['album'], // 从相册选择
        });

        const tempFilePath = result.tempFilePaths[0];

        setSrcImage(tempFilePath);
        if (currentTab === 1) {
          toggleCollapse();
        }
        setHasLoadSrcImage(true);
      } catch (error) {
        console.error('Failed to choose image:', error);
      }
    }
  };

  const uploadSrcImage = () => {
    wx.showActionSheet({
      itemList: ['选择图片'],
      success: res => {
        console.log('res:', res);
        if (res.tapIndex !== undefined && !res.cancel) {
          handleUploadOptionClick(res.tapIndex);
        }
      },
      fail: error => {
        setHasLoadSrcImage(false);
      },
    });
  };
  return (
    <View>
      <CustomNavBar></CustomNavBar>
      <View style={{ top: '50px', position: 'relative' }}>
        {hasLoadSrcImage && (
          <AtIcon
            value="close"
            size="30"
            color="#000"
            onClick={() => {
              setSrcImage(null);
              setOuputImage([]);
              setHasLoadSrcImage(false);
            }}
          />
        )}
        {ouputImage &&
          ouputImage.length > 0 &&
          ouputImage[ouputImage.length - 1].status === 'SUCCESS' && (
            <AtIcon
              value="download"
              size="30"
              color="#000"
              onClick={() => {
                saveOutputImageToAlbum(ouputImage[ouputImage.length - 1].src);
              }}
            />
          )}
      </View>
      <View
        style={{ margin: '30px', marginTop: '100px', position: 'relative' }}>
        <Image
          mode="widthFix"
          style={{ width: '100%', height: '100%', verticalAlign: 'middle' }}
          src={
            ouputImage &&
            ouputImage.length > 0 &&
            ouputImage[ouputImage.length - 1].status === 'SUCCESS'
              ? ouputImage[ouputImage.length - 1].src
              : srcImage
              ? srcImage
              : defaultPic
          }
          onClick={() => {
            console.log('Image clicked');
            uploadSrcImage();
          }}
        />

        {hasLoadSrcImage && (
          <Canvas
            type="2d"
            onTouchStart={touchStart}
            onTouchMove={move}
            onTouchEnd={touchEnd}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 2,
            }}
            canvasId="canvas123"
            id="canvas123"></Canvas>
        )}
      </View>

      <View>
        <AtTabs
          current={currentTab}
          tabList={[{ title: '老旧照片变高清' }, { title: '局部重绘' }]}
          swipeable={true}
          scroll
          onClick={onClick}></AtTabs>

        {currentTab === 0 && (
          <View>
            <Button
              onClick={async () => {
                sdWith2KParams();
              }}>
              高清画质
            </Button>
            <Button
              onClick={async () => {
                sdWith4KParams();
              }}>
              超清画质
            </Button>
          </View>
        )}
        {currentTab === 1 && (
          <View>
            <Button
              onClick={async () => {
                console.log(lineWidth);
                if (lineWidth >= 40) setlineWidth(lineWidth);
                else setlineWidth(lineWidth + 5);
              }}>
              笔画+
            </Button>
            <Button
              onClick={async () => {
                if (lineWidth <= 5) setlineWidth(5);
                else setlineWidth(lineWidth - 5);
              }}>
              笔画-
            </Button>
            <Button
              onClick={async () => {
                initCanvas();
              }}>
              清屏
            </Button>
            <Button
              onClick={async () => {
                setIsEraserActivated(!isEraserActivated);
              }}>
              {isEraserActivated ? '取消橡皮擦' : '橡皮擦'}
            </Button>
            <Button onClick={async () => {}}>比较</Button>
            <Button
              onClick={async () => {
                inpaitUseSD();
              }}>
              开始重绘
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};
