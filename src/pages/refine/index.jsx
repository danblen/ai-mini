/**
 * 修图页
 */
import Taro, { useRouter } from '@tarojs/taro';
import React, { useCallback, useState } from 'react';

import { Canvas, Image, View } from '@tarojs/components';
import { AtFloatLayout } from 'taro-ui';
import { faceSwap } from '../../api';
import { URL_STATIC } from '../../api/config.js';
import { getStorageSync } from '../../base/global.js';
import { getTaskImage } from '../../common/getTaskImage.js';
import { mask_data, scale_data } from '../../const/sdApiParams.js';
import compareIcon from '../../static/image/my/icons8-compare-64.png';
import { wxPathToBase64 } from '../../utils/imageTools';
import ImagePicker from '../comps/ImagePicker.jsx';
import IncreaseResolution from './IncreaseResolution.jsx';
import NavBar from './NavBar.jsx';
import TopButtons from './TopButtons.jsx';
import Repaint from './Repaint.jsx';

export default ({}) => {
  const router = useRouter();
  const [Ctx, setCtx] = useState(null);
  const [isButtonDown, setButtonDown] = useState(false);
  const [dpr] = useState(Taro.getSystemInfoSync().pixelRatio);
  const [screen, setScreen] = useState({
    screenWidth: '',
    screenHeight: '',
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [editHistoryImagesArray, setEditHistoryImagesArray] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [curImageIndex, setCurImageIndex] = useState(0);
  const [isShowOriginImage, setIsShowOriginImage] = useState(true);

  const [isOpened, setIsOpened] = useState(false);

  const [ouputImage, setOuputImage] = useState([]);
  const [srcImage, setSrcImage] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [isExpanded, setIsExpanded] = useState(0);
  const [hasDraw, sethasDraw] = useState(0);
  const [canUseCompare, setcanUseCompare] = useState(0);
  const [lineWidth, setlineWidth] = useState(15);
  const [isEraserActivated, setIsEraserActivated] = useState(false);
  const [hasLoadSrcImage, setHasLoadSrcImage] = useState(false);

  const onClick = useCallback((value) => {
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
            success: (res) => {
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

  const saveOutputImageToAlbum = (base64Image) => {
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
          success: (res) => {
            Taro.showToast({
              title: '保存成功',
              icon: 'success',
            });
          },
          fail: (error) => {
            Taro.showToast({
              title: '保存失败',
              icon: 'none',
            });
          },
        });
      },
      fail: (error) => {
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
      .exec((res) => {
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
    if (uploadedImages[selectedIndex]) {
      Taro.showLoading({
        title: '预计5秒,加载中...',
        mask: true,
      });
      const data = scale_data;
      const scaleFactor = 1.5; //放大倍数
      // ad_denoising_strength:Range[0-1],
      data.denoising_strength = 0; //图像变化幅度
      data.script_args[data.script_args.length - 1] = scaleFactor;
      requestSdTransform(data);
    }
  };

  const sdWith4KParams = () => {
    if (uploadedImages[selectedIndex]) {
      const data = scale_data;
      const scaleFactor = 2; //放大倍数
      // ad_denoising_strength:Range[0-1],
      data.denoising_strength = 0.4; //图像变化幅度
      data.script_args[data.script_args.length - 1] = scaleFactor;
      // Taro.showLoading({
      //   title: '预计5秒,加载中...',
      //   mask: true,
      // });
      requestSdTransform(data);
    }
  };
  const touchStart = (event) => {
    if (isExpanded) {
      Ctx.beginPath();
      Ctx.moveTo(event.touches[0].x, event.touches[0].y);
      setButtonDown(true);
      sethasDraw(true);
    }
  };
  const move = (event) => {
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

  const onUpdateTaskImages = async (requestId) => {
    const res = await getTaskImage(requestId);
    setEditHistoryImagesArray((prevArray) => {
      const newEditArray = prevArray.map((row, rowIndex) => {
        if (rowIndex === selectedIndex) {
          if (curImageIndex === row.length - 1) {
            row.push({
              url: URL_STATIC + res.data.imageUrl,
            });
          } else {
            row.slice(0, curImageIndex + 1).map((item, columnIndex) => {
              return columnIndex <= curImageIndex
                ? item
                : { url: URL_STATIC + res.data.imageUrl };
            });
          }
        }
        return row;
      });

      setCurImageIndex(curImageIndex + 1);
      Taro.hideLoading();

      return newEditArray;
    });

    // setOuputImage((prevImages) =>
    //   prevImages.map((image) =>
    //     image.requestId === requestId
    //       ? {
    //           ...image,
    //           src: 'data:image/png;base64,' + res.data.result.images[0],
    //           status: 'SUCCESS',
    //         }
    //       : image
    //   )
    // );
    // Taro.hideLoading();
  };

  const downloadImage = (url) => {
    return new Promise((resolve, reject) => {
      Taro.downloadFile({
        url: url,
        success: (res) => resolve(res.tempFilePath),
        fail: (error) => reject(error),
      });
    });
  };

  const getImageInfo = (src) => {
    return new Promise((resolve, reject) => {
      Taro.getImageInfo({
        src: src,
        success: (info) => resolve(info),
        fail: (error) => reject(error),
      });
    });
  };

  const canvasToTempFile = (canvas, dstWidth, dstHeight) => {
    return new Promise((resolve, reject) => {
      Taro.canvasToTempFilePath({
        canvas: canvas,
        destWidth: dstWidth,
        destHeight: dstHeight,
        success: (res) => resolve(res.tempFilePath),
        fail: (error) => reject(error),
      });
    });
  };

  const readFileAsBase64 = (filePath) => {
    return new Promise((resolve, reject) => {
      Taro.getFileSystemManager().readFile({
        filePath: filePath,
        encoding: 'base64',
        success: (data) => resolve(data),
        fail: (error) => reject(error),
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
          .exec((res) => resolve(res));
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
        info.height
      );

      // 将canvas转为base64用于请求server
      let canvasBase64 = await readFileAsBase64(canvasTempFile);
      let canvasBase64Pad = 'data:image/png;base64,' + canvasBase64.data;
      while (canvasBase64Pad.length % 4 !== 0) {
        canvasBase64Pad += '=';
      }

      const data = mask_data;
      data.mask = canvasBase64Pad;
      requestSdTransform(data);
    } catch (error) {
      console.error(error);
    }
  };

  const requestSdTransform = async (data) => {
    // 将原图转为base64
    const srcBase64 = await wxPathToBase64(uploadedImages[selectedIndex].url);

    const storageUserInfo = getStorageSync('userInfo');

    data.init_images = [srcBase64];
    data.userId = storageUserInfo.data.userId;

    const res1 = await faceSwap(data);
    if (res1.data?.status === 'pending') {
      initCanvas();
      onUpdateTaskImages(res1.data.requestId);
    } else {
      Taro.hideLoading();
      if (res1) {
        Taro.showToast({
          title: res1?.error_message,
          icon: 'none',
        });
      }
    }
  };

  return (
    <View
      style={{
        background: '#eee',
      }}
    >
      <NavBar></NavBar>

      <ImagePicker
        onFilesChange={(updatedImages) => {
          setUploadedImages(updatedImages);
          editHistoryImagesArray.filter((images) => images[0].find);
          setEditHistoryImagesArray((imagesArray) => {
            imagesArray = imagesArray.filter((images) =>
              updatedImages.some((image) => image.id === images[0].id)
            );
            if (
              !imagesArray.some(
                (images) =>
                  images[0].id === updatedImages[updatedImages.length - 1].id
              )
            ) {
              imagesArray.push(updatedImages[updatedImages.length - 1]);
            }
            return imagesArray;
          });
        }}
        onSelectImage={(index) => {
          setSelectedIndex(index);
          setEditHistoryImagesArray(uploadedImages.map((item) => [item]));
          if (editHistoryImagesArray.length) {
            setCurImageIndex(editHistoryImagesArray[index].length - 1);
          }
        }}
      />

      <TopButtons
        onBack={() => {
          if (curImageIndex > 0) {
            setCurImageIndex(curImageIndex - 1);
          }
        }}
        onForward={() => {
          if (
            curImageIndex <
            editHistoryImagesArray[selectedIndex].length - 1
          ) {
            setCurImageIndex(curImageIndex + 1);
          }
        }}
        onSave={() => {
          saveOutputImageToAlbum(ouputImage[ouputImage.length - 1].src);
        }}
      />
      <Image
        src={compareIcon}
        style={{
          position: 'absolute',
          right: 10,
          top: 160,
          width: '50rpx',
          height: '50rpx',
        }}
        onClick={() => {}}
        onTouchStart={() => setIsShowOriginImage(true)}
        onTouchEnd={() => setIsShowOriginImage(false)}
      />
      {isShowOriginImage && (
        <View
          style={{
            position: 'absolute',
            left: 10,
            top: 160,
          }}
        >
          原图
        </View>
      )}
      <Image
        mode="widthFix"
        style={{
          width: '100%',
          height: '100%',
          verticalAlign: 'middle',
          transition: 'opacity 0.5s ease', // 添加淡入淡出的动画效果
          opacity: 1,
        }}
        src={
          isShowOriginImage
            ? editHistoryImagesArray[selectedIndex]?.[0]?.url
            : editHistoryImagesArray[selectedIndex]?.[curImageIndex]?.url
        }
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
          id="canvas123"
        ></Canvas>
      )}

      <View>
        <View
          style={{
            position: 'absolute',
            bottom: 30,
            display: 'flex',
          }}
        >
          <View
            style={{
              marginLeft: 20,
            }}
            onClick={() => {
              setIsOpened(true);
              setCurrentTab(0);
            }}
          >
            清晰化
          </View>
          <View
            style={{
              marginLeft: 20,
            }}
            onClick={() => {
              setCurrentTab(1);
              setIsOpened(true);
            }}
          >
            局部重绘
          </View>
        </View>
      </View>
      <AtFloatLayout
        isOpened={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
      >
        {currentTab === 0 && (
          <IncreaseResolution
            sdWith2KParams={sdWith2KParams}
            sdWith4KParams={sdWith4KParams}
          />
        )}
        {/* {currentTab === 1 && (
          <Repaint
            onClick={async () => {
              console.log(lineWidth);
              if (lineWidth >= 40) setlineWidth(lineWidth);
              else setlineWidth(lineWidth + 5);
            }}
            // onClick={async () => {
            //   if (lineWidth <= 5) setlineWidth(5);
            //   else setlineWidth(lineWidth - 5);
            // }}
            // onClick={async () => {
            //   initCanvas();
            // }}
            // onClick={async () => {
            //   setIsEraserActivated(!isEraserActivated);
            // }}
            // onClick={async () => {
            //   inpaitUseSD();
            // }}
          />
        )} */}
      </AtFloatLayout>
    </View>
  );
};
