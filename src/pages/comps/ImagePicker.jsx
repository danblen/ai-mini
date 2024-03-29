import React, { useState, useEffect, useRef } from 'react';
import { View, Image, ScrollView } from '@tarojs/components';
import { AtImagePicker } from 'taro-ui';
import Taro from '@tarojs/taro';
import { wxPathToBase64 } from '../../utils/imageTools';
import { getStorage, setStorage } from '../../base/global';
import { generateUniqueId } from '../../utils';

export const compressInputImage = async (file) => {
  try {
    let compressedFile;
    let srcBase64;
    let src_size = file.file.size;

    let quality = Math.floor((-0.0738 * src_size) / 1024 + 100);
    // 当文件大于300KB时循环压缩
    if (quality < 0) quality = 5;
    while (src_size > 300 * 1024 && quality > 0) {
      console.log('src_size', src_size, quality);
      compressedFile = await Taro.compressImage({
        src: file.url,
        quality,
      });
      srcBase64 = await wxPathToBase64(compressedFile.tempFilePath);
      src_size = srcBase64.length;
      // 根据线性关系调整压缩质量

      quality = Math.floor(-0.0738 * src_size + 113.75); // 动态调整压缩质量

      // 防止负数或过大的压缩质量值
      if (quality > 99) {
        quality = 99;
      }
      console.log('compressed size', src_size);
    }

    // 如果不需要压缩，直接转换成base64
    if (!compressedFile) {
      srcBase64 = await wxPathToBase64(file.url);
      console.log('uncompressed size', srcBase64.length);
    }

    return srcBase64;
  } catch (error) {
    console.error('图片压缩失败：', error);
    return null;
  }
};

export default function ImagePicker({ onFilesChange, onSelectImage }) {
  const [files, setFiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const filesRef = useRef(files);
  const selectedIndexRef = useRef(selectedIndex);

  useEffect(() => {
    filesRef.current = files;
    selectedIndexRef.current = selectedIndex;
  }, [files, selectedIndex]);
  const getFilesData = async () => {
    const storedFiles = await getStorage('filesData');
    if (storedFiles && storedFiles.files) {
      setFiles(storedFiles.files);
      setSelectedIndex(storedFiles.selectedIndex);
      onFilesChange(storedFiles.files);
      onSelectImage(storedFiles.selectedIndex);
    }
  };
  useEffect(() => {
    // 获取本地缓存数据
    getFilesData();
    return () => {
      const dataToStore = {
        files: filesRef.current,
        selectedIndex: selectedIndexRef.current, // 将 selectedIndex 存储为当前选中的索引
      };
      setStorage(
        'filesData', // 设置存储的key，用于后续获取数据
        dataToStore // 要保存的数据
      );
    };
  }, []);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {files.map(
        (file, index) =>
          index === selectedIndex && (
            <View
              key={index}
              style={{
                position: 'relative',
                margin: '5px',
                marginRight: '20px', // 间距以确保三角形与 AtImagePicker 有一定距离
              }}
            >
              <Image
                src={file.url}
                style={{
                  width: 80,
                  height: 80,
                  border: '2px solid #06638e', // 图像边框样式
                  borderRadius: 8,
                }}
                mode="aspectFill"
              />
              {/* 添加倒三角形 */}
              <View
                style={{
                  position: 'absolute',
                  top: '50%', // 上下居中
                  right: '-20px', // 贴近图像右侧
                  transform: 'translateY(-50%)', // 上下居中
                  width: 0,
                  height: 0,
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderRight: '8px solid #06638e', // 右侧三角形指向 AtImagePicker
                }}
              />
            </View>
          )
      )}
      <ScrollView
        scrollY
        style={{
          maxHeight: 160,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AtImagePicker
          length={4}
          count={99} // 设置可选择的图片数量
          files={files}
          onChange={async (newFiles) => {
            try {
              let curIndex = newFiles.length - 1;
              // 添加文件时才进行压缩处理
              if (newFiles.length > files.length) {
                newFiles[curIndex].id = generateUniqueId();
                newFiles[curIndex].compressBase64 = await compressInputImage(
                  newFiles[curIndex]
                );
              }

              const dataToStore = {
                files: newFiles,
                selectedIndex: curIndex, // 将 selectedIndex 存储为当前选中的索引
              };
              setStorage('filesData', dataToStore);
              setFiles(newFiles);
              setSelectedIndex(curIndex);
              onFilesChange(newFiles);
              onSelectImage(newFiles.length - 1);
            } catch (error) {
              console.error('处理图片失败：', error);
            }
          }}
          onFail={(mes) => {}}
          onImageClick={(index, file) => {
            setSelectedIndex(index);
            onSelectImage(index);
          }}
        />
      </ScrollView>
    </View>
  );
}
