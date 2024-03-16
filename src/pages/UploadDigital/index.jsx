import { View } from '@tarojs/components';
import ImagePicker from '../comps/ImagePicker';
import { AtButton } from 'taro-ui';
import { api } from '../../api';
import { updateUserInfoFromStorage } from '../../common/user';
import { useEffect, useState } from 'react';

export default () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  useEffect(() => {
    updateUserInfoFromStorage();
  }, []);
  return (
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
      <View
        style={{
          width: '95%',
        }}
      ></View>
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
          const res = await api.easyPhotoTrainLora({
            userId: global.userInfo.data.userId,
            userTrainImages: uploadedFiles
              .map((file) => file.compressBase64)
              .filter((file) => file),
          });
          if (res?.data) {
          }
        }}
      >
        一键换脸
      </AtButton>
    </View>
  );
};
