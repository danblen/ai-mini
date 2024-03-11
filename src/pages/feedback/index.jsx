/**
 * 创作页
 * 用户发布作品
 */

import { Textarea, View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { AtImagePicker } from 'taro-ui';
import { api } from '../../api';
import { getStorageSync, setStorageSync } from '../../base/global';
import { compressInputImage } from '../../utils/imageTools';
import Taro from '@tarojs/taro';

export default () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [desc, setDesc] = useState([]);

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
      {/* <NavBar /> */}
      {/* <BackButton /> */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          // alignItems:'center',
          width: '100%',
          // width: '96%',
        }}
      >
        输入问题描述
        <Textarea
          style={{
            height: 200,
            width: '96%',
            marginLeft: 'auto',
            marginLRight: 'auto',
            borderRadius: 10,
            marginTop: 10,
            padding: 10,
            backgroundColor: '#f1f1f1',
          }}
          placeholder="请输入"
          onClick={(event) => {
            setDesc(event.target.value);
          }}
          value={desc}
        ></Textarea>
      </View>
      上传截图（选填）
      <AtImagePicker
        length={2}
        count={1}
        style={{ height: '100rpx' }}
        files={uploadedFiles}
        onChange={async (newFiles) => {
          try {
            let curIndex = newFiles.length - 1;
            const compressedFile = await compressInputImage(newFiles[curIndex]);
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
              api.feedback({
                userId: global.userInfo.data.userId,
                desc,
                image: uploadedFiles,
              });
              Taro.showToast({ title: '反馈成功', icon: 'none' });
            } else {
            }
          }}
        >
          提交
        </View>
      </View>
    </View>
  );
};
