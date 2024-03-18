import { View, Button } from '@tarojs/components';
import ImagePicker from '../comps/ImagePicker';
import { AtButton } from 'taro-ui';
import { api } from '../../api';
import { updateUserInfoFromStorage } from '../../common/user';
import { useEffect, useState } from 'react';
import { generateUniqueId } from '../../utils/index.js';
import Image from '@taroify/core/image/index.js';
import { AtImagePicker } from 'taro-ui';
import { compressInputImage } from '../comps/ImagePicker.jsx';
import Taro from '@tarojs/taro';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui';

let notifyCheckPact = true;
export default ({ digitalUser, editDigitalMode }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isOpenedText, setIsOpenedText] = useState(false);
  const [isOpenedWaitNofity, setIsOpenedWaitNofity] = useState(false);
  const maxTrainLoraImages = 5;

  useEffect(() => {
    updateUserInfoFromStorage();
  }, []);

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
    }
  };
  const handleClose1 = async () => {
    setIsOpenedWaitNofity(false);
  };
  const handleConfirm1 = async () => {
    setIsOpenedWaitNofity(false);
  };
  const handleConfirm2 = async () => {
    setIsOpenedWaitNofity(false);
  };
  return (
    <View
      style={{
        position: 'fixed',
        width: '100%',
        marginTop: '10rpx',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
      }}
    >
      <View
        style={{
          marginBottom: '10rpx',
          borderRadius: '20rpx',
          background: 'transparent', // 将背景改为透明
          opacity: 1,
          color: 'white',
        }}
      >
        <Image mode="aspectFill" src={digitalUser} />
      </View>

      {editDigitalMode && (
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
            onSelectImage={(index) => {
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
                      title: `最多选择${maxTrainLoraImages}张图,算不过来了`,
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
          // loading={loading}
          onClick={async () => {
            if (notifyCheckPact) {
              setIsOpenedText(true);
              notifyCheckPact = false;
            } else {
              if (uploadedFiles.length === 0) {
                Taro.showToast({
                  title: `请点击+号,选择2-${maxTrainLoraImages}张人脸图像`,
                  icon: 'none',
                });
              } else {
                const res = await api.easyPhotoTrainLora({
                  userId: global.userInfo.data.userId,
                  requestId: generateUniqueId(),
                  usePoint: 2,
                  userTrainImages: uploadedFiles
                    .map((file) => file.compressBase64)
                    .filter((file) => file),
                });
                if (res?.data) {
                }
                setIsOpenedWaitNofity(true);
              }
            }
          }}
        >
          制作数字分身
        </AtButton>
      )}
      <AtModal isOpened={isOpenedText} onClose={handleClose}>
        <AtModalHeader>AIGC协议</AtModalHeader>
        <AtModalContent>
          欢迎使用AIGC大头贴，您将上传照片用于生成图片服务，应当在取得照片权利人的同意后再进行操作，您上传的照片将仅用于制作数字分身，不会用于其他用途，相关规则请您仔细阅读《用户服务协议》《隐私政策》
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => handleCancel()}>取消</Button>
          <Button onClick={() => handleConfirm()}>知道了</Button>
        </AtModalAction>
      </AtModal>
      <AtModal isOpened={isOpenedWaitNofity} onClose={handleClose1}>
        <AtModalHeader>开始训练</AtModalHeader>
        <AtModalContent>
          需要等待5-10分钟,您可以关注“AIGC大头贴”公众号，完成后会通知您，前方还有n位...
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => handleConfirm1()}>等等吧</Button>
          <Button onClick={() => handleConfirm2()}>关注公众号</Button>
        </AtModalAction>
      </AtModal>
    </View>
  );
};
