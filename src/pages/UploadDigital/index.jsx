import { View, Button, WebView } from '@tarojs/components';
import ImagePicker from '../comps/ImagePicker';
import { AtButton } from 'taro-ui';
import { api } from '../../api';
import { updateUserInfoFromStorage } from '../../common/user';
import { useEffect, useState } from 'react';
import { generateUniqueId } from '../../utils/index.js';
import Image from '@taroify/core/image/index.js';
import { AtImagePicker } from 'taro-ui';
import { compressInputImage } from '../comps/ImagePicker.jsx';
import Taro, { useDidShow } from '@tarojs/taro';
import { URL_STATIC } from '../../api/config';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui';

let notifyCheckPact = true;
const officialAccountQRcode =
  URL_STATIC + '/appstatic/image/my/qrcode_for_gh_778fd61f0698_258.jpg';

export default ({
  isLogin,
  isHaveUserGender,
  digitalUser,
  editDigitalMode,
  trainStatus,
  onLoginOpened,
  onNickOpened,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isOpenedText, setIsOpenedText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpenedWaitNofity, setIsOpenedWaitNofity] = useState(false);
  const maxTrainLoraImages = 5;

  useEffect(() => {
    updateUserInfoFromStorage();
  }, []);

  useEffect(() => {
    if (trainStatus === 'pending') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [trainStatus]);

  const handleCancel = async () => {
    setIsOpenedText(false);
    notifyCheckPact = true;
  };
  const handleClose = async () => {
    setIsOpenedText(false);
    notifyCheckPact = true;
  };
  const handleConfirm = async () => {
    setIsOpenedText(false);
    notifyCheckPact = false;
    if (uploadedFiles.length === 0) {
      Taro.showToast({
        title: `请点击+号,选择2-${maxTrainLoraImages}张人脸图像`,
        icon: 'none',
      });
    } else {
      MakeDigital();
    }
  };
  const handleClose1 = async () => {
    setIsOpenedWaitNofity(false);
  };
  const handleConfirm1 = async () => {
    setIsOpenedWaitNofity(false);
  };
  const handleConfirm2 = async () => {
    try {
      setIsOpenedWaitNofity(false);
      const res = await Taro.downloadFile({ url: officialAccountQRcode });
      if (res.statusCode === 200) {
        const saveRes = await Taro.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        });
        if (saveRes.errMsg === 'saveImageToPhotosAlbum:ok') {
          Taro.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000,
          });
        } else {
          Taro.showToast({
            title: '保存失败，请重试',
            icon: 'none',
            duration: 2000,
          });
        }
      } else {
        Taro.showToast({
          title: '下载失败，请重试',
          icon: 'none',
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('保存二维码失败', error);
      Taro.showToast({
        title: '保存失败，请重试',
        icon: 'none',
        duration: 2000,
      });
    }
  };
  const MakeDigital = async () => {
    if (uploadedFiles.length === 0) {
      Taro.showToast({
        title: `请点击+号,选择3-${maxTrainLoraImages}张人脸图像`,
        icon: 'none',
      });
    } else {
      setLoading(true);
      const userTrainImages = [];
      uploadedFiles.forEach((file, i) => {
        api.saveImageToServerApi({
          imageBase64: file.compressBase64,
          dir: `/trainPic/${global.userInfo.data.userId}`,
          filename: `pic_${i + 1}.png`,
        });
        userTrainImages.push(
          `/trainPic/${global.userInfo.data.userId}` + `/${`pic_${i + 1}.png`}`
        );
      });
      const res = await api.easyPhotoTrainLora({
        userId: global.userInfo.data.userId,
        requestId: generateUniqueId(),
        usePoint: 2,
        userTrainImages,
      });
      if (res?.data) {
        // 处理响应结果
        setIsOpenedWaitNofity(true);
      } else {
        setLoading(false);
        Taro.showToast({
          title: '服务器异常,可通过“样股网络”公众号反馈,感谢理解',
          icon: 'none',
        });
      }
    }
  };

  const checkMakeDigital = async () => {
    if (isLogin) {
      if (isHaveUserGender) {
        if (trainStatus !== 'pending') {
          if (notifyCheckPact) {
            setIsOpenedText(true);
            notifyCheckPact = false;
          } else {
            MakeDigital();
          }
        }
      } else {
        onNickOpened(true);
      }
    } else {
      onLoginOpened(true);
    }
  };

  return (
    <View
      style={{
        // position: 'fixed',
        width: '100%',
        marginTop: '10rpx',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
      }}
    >
      {editDigitalMode && (
        <View
          style={{
            marginTop: 30,
            marginBottom: '10rpx',
            borderRadius: '20rpx',
            background: 'transparent', // 将背景改为透明
            opacity: 1,
            color: 'white',
          }}
          onClick={() => {
            Taro.previewImage({
              current: digitalUser,
              urls: [digitalUser], // 将digitalUser包装在数组中传递给urls参数
            });
          }}
        >
          <Image mode="widthFix" src={digitalUser} />
        </View>
      )}
      {!trainStatus != 'pending' && editDigitalMode && (
        <View
          style={{
            width: '95%',
            marginBottom: '10rpx',
            borderRadius: '20rpx',
            background: 'transparent', // 将背景改为透明
            opacity: 1,
            color: 'white',
          }}
        >
          {/* <ImagePicker
            onFilesChange={(images) => setUploadedFiles(images)}
            onLoginOpened={(index) => {
              setSelectedIndex(index);
            }}
            disSelectPic={false}
          /> */}
          <AtImagePicker
            files={uploadedFiles}
            onChange={async (pickerAllFile, operationType, index) => {
              const newImages = pickerAllFile.slice(uploadedFiles.length);
              // 判断是否为添加图片操作
              if (operationType === 'add') {
                try {
                  // 计算当前已选择的图片数量
                  const totalImages = uploadedFiles.length + newImages.length;

                  // 设置允许的最大图片数量
                  if (totalImages <= maxTrainLoraImages) {
                    // 压缩输入的图片
                    for (let i = 0; i < newImages.length; i++) {
                      const compressedFile = await compressInputImage(
                        newImages[i]
                      );
                      // 压缩成功后添加base64数据
                      newImages[i].id = generateUniqueId();
                      newImages[i].compressBase64 = compressedFile.base64
                        ? compressedFile.base64
                        : null;
                    }
                    setUploadedFiles((prevImages) => [
                      ...prevImages,
                      ...newImages,
                    ]);
                  } else {
                    Taro.showToast({
                      title: `最多选择${maxTrainLoraImages}张图,处理不过来了`,
                      icon: 'none',
                      duration: 2000,
                    });
                  }
                } catch (error) {
                  console.error('处理图片失败：', error);
                }
              } else if (operationType === 'remove') {
                const removedIndex = index;
                setUploadedFiles((prevImages) => {
                  const newImages = [...prevImages];
                  newImages.splice(removedIndex, 1);
                  return newImages;
                });
              }
            }}
            count={maxTrainLoraImages - uploadedFiles.length}
            mode="aspectFill"
            length={maxTrainLoraImages}
            showAddBtn={uploadedFiles.length < maxTrainLoraImages}
          />
        </View>
      )}
      {editDigitalMode && (
        <AtButton
          type="primary"
          style={{
            position: 'fixed',
            bottom: 20,
            background: 'linear-gradient(to right, #00467f, #a5cc82)',
            animation: 'swap 1s infinite',
            opacity: 0.8,
            fontWeight: 'bold',
            position: 'relative',
            zIndex: 0,
          }}
          shape="circle"
          loading={trainStatus === 'pending' || loading}
          onClick={checkMakeDigital}
        >
          {trainStatus === 'pending'
            ? '制作分身中'
            : trainStatus === 'done'
            ? '修改数字分身'
            : trainStatus === 'error'
            ? '制作数字分身'
            : '制作数字分身'}
        </AtButton>
      )}
      <AtModal isOpened={isOpenedText} onClose={handleClose}>
        <AtModalHeader>AIGC协议</AtModalHeader>
        <AtModalContent>
          欢迎使用AIGC大头贴，您将上传照片用于生成图片服务，应当在取得照片权利人的同意后再进行操作，您上传的照片将仅用于制作数字分身，不会用于其他用途，相关规则请您仔细阅读
          <strong>《用户服务协议》</strong>
          <strong>《隐私政策》</strong>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => handleCancel()}>取消</Button>
          <Button onClick={() => handleConfirm()}>知道了</Button>
        </AtModalAction>
      </AtModal>
      <AtModal isOpened={isOpenedWaitNofity} onClose={handleClose1}>
        <AtModalContent>
          <div>
            <p>您的数字分身已开始制作，需要等待10-15分钟。</p>
            <p>也可尝试快速模式（3-5秒出图）</p>
            <p>保存二维码关注“AIGC大头贴” 公众号，完成后会通知您。</p>
            {/* <p>正在排队中，第5位 / 共5位</p> */}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* 显示二维码图片 */}
            <img
              src={officialAccountQRcode}
              alt="公众号二维码"
              style={{ width: '200px', height: '200px' }}
            />
          </div>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => handleConfirm1()}>等等吧</Button>
          <Button onClick={() => handleConfirm2()}>关注公众号</Button>
        </AtModalAction>
      </AtModal>
    </View>
  );
};
