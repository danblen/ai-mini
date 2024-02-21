/**
 * 创作页
 * 用户发布作品
 */

import { Input, View } from '@tarojs/components';
import { getStorageSync, setStorageSync } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { AtImagePicker } from 'taro-ui';
import { api } from '../../api';
import { compressInputImage } from '../../utils/imageTools';
import NavBar from './NavBar';

export default () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    // 从storage中获取已经在本地存储的用户图片
    const createImages = getStorageSync('createImages');
    if (createImages) {
      setUploadedFiles(createImages);
    }
    return () => {};
  }, []);
  return (
    <View>
      <NavBar />
      <View
        style={{
          marginTop: 100,
        }}
      >
        <AtImagePicker
          length={2}
          count={1}
          style={{ height: '100rpx' }}
          files={uploadedFiles}
          onChange={async (newFiles) => {
            try {
              let curIndex = newFiles.length - 1;
              const compressedFile = await compressInputImage(
                newFiles[curIndex]
              );
              const updatedFiles = newFiles.map((file, index) => {
                if (index === curIndex) {
                  return {
                    ...file,
                    compressBase64: compressedFile.base64
                      ? compressedFile.base64
                      : null,
                  };
                }
                return file;
              });
              setUploadedFiles(updatedFiles);
              setStorageSync('createImage', newFiles);
            } catch (error) {
              console.error('处理图片失败：', error);
            }
          }}
          onImageClick={(index, file) => {}}
        />
      </View>
      <View
        style={{
          margin: 20,
        }}
      >
        添加标签
        <Input
          style={{
            height: '60rpx',
            borderRadius: '50rpx',
            paddingLeft: '30rpx',
            backgroundColor: '#f1f1f1',
            lineHeight: '60rpx',
          }}
          placeholder="请输入标签"
          onClick={() => {}}
        ></Input>
      </View>
      <View
        style={{
          margin: 20,
        }}
      >
        添加标题
        <Input
          style={{
            height: '60rpx',
            borderRadius: '50rpx',
            paddingLeft: '30rpx',
            backgroundColor: '#f1f1f1',
            lineHeight: '60rpx',
          }}
          placeholder="请输入标题"
          onClick={() => {}}
        ></Input>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'fixed',
          bottom: 30,
          width: '100%',
        }}
      >
        <View
          type="primary"
          style={{
            position: 'relative',
            animation: 'swap 1s infinite',
            backgroundColor: 'skyblue',
            width: '90%',
            height: '40px',
            borderRadius: '20px',
            textAlign: 'center',
            lineHeight: '40px',
          }}
          shape="circle"
          className="swap"
          onClick={() => {
            if (global.userInfo) {
              api.uploadImages({
                userId: global.userInfo.data.userId,
                tag: 'gufeng',
                image: uploadedFiles[0].compressBase64,
              });
            } else {
            }
          }}
        >
          上传
        </View>
      </View>
    </View>
  );
};
