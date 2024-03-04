// 将按键浮在图片上方
import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import { View, Image, ScrollView, Text } from '@tarojs/components';
import { delete_all_images, delete_select_images } from '../../api';
import { getStorageSync } from '../../base/global';

const ImageList = ({ images, loadMore, onFetchData }) => {
  const [showImages, setShowImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedMode, setSelectedMode] = useState(false);
  useEffect(() => {
    setShowImages(images);
  }, [images]);

  const toggleSelectImage = (index) => {
    if (selectedMode) {
      if (selectedImages.includes(index)) {
        setSelectedImages(
          selectedImages.filter((selected) => selected !== index)
        );
      } else {
        setSelectedImages([...selectedImages, index]);
      }
    } else {
      const urlsArray = images.map((image) => image.url);
      Taro.previewImage({
        current: images[index].url,
        urls: urlsArray,
      });
    }
  };

  const handleDeleteSelectedImages = async () => {
    if (selectedImages.length) {
      Taro.showModal({
        title: '确认删除',
        content: '确定要永久删除选中的作品吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              const imagesToDelete = selectedImages.map(
                (index) => showImages[index]
              );
              const response = await delete_select_images(imagesToDelete); // 发送删除所有作品的请求
              setSelectedImages([]);
              const updatedImages = showImages.filter(
                (image, index) => !selectedImages.includes(index)
              );
              setShowImages(updatedImages);
            } catch (error) {
              console.error('删除全部作品失败', error);
            }
          }
        },
      });
    }
  };
  const handleDeleteAllImages = async () => {
    if (showImages.length) {
      Taro.showModal({
        title: '确认删除',
        content: '确定要永久删除全部作品吗？回收站同时清除~',
        success: async (res) => {
          if (res.confirm) {
            try {
              let userInfo = getStorageSync('userInfo');
              const response = await delete_all_images({
                userId: userInfo.data.userId,
              });
              setSelectedImages([]);
              setShowImages([]);
              setSelectedMode(!selectedMode);
            } catch (error) {
              console.error('删除全部作品失败', error);
            }
          }
        },
      });
    }
  };
  const handlSaveImages = async () => {
    if (selectedImages.length) {
      Taro.showModal({
        title: '保存文件',
        content: '确定要保存选中的作品吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              for (const index of selectedImages) {
                const imageUrl = showImages[index].url; // 获取选中作品的图片链接
                // 将图片下载到本地
                const { tempFilePath } = await Taro.downloadFile({
                  url: imageUrl,
                });
                // 保存图片到相册
                await Taro.saveImageToPhotosAlbum({ filePath: tempFilePath });
              }
              // 清空选中的图片
              setSelectedImages([]);
              // 提示保存成功
              Taro.showToast({ title: '保存成功', icon: 'success' });
            } catch (error) {
              console.error('保存作品失败', error);
              // 提示保存失败
              Taro.showToast({ title: '保存失败', icon: 'none' });
            }
          }
        },
      });
    }
  };
  const handleToggleMode = () => {
    if (selectedMode) {
      // 如果是从选择模式切换到预览模式，清空已选择的图片数组
      setSelectedImages([]);
    }
    setSelectedMode(!selectedMode); // 切换选择模式
  };

  return (
    <View style={{ marginTop: 50 }}>
      <View
        style={{
          position: 'fixed',
          top: 10,
          left: 10,
          display: 'flex',
          justifyContent: 'space-between',
          width: '95%',
          backgroundColor: 'rgb(255 255 255 / 51%)',
          borderRadius: '10%',
        }}
      >
        {!selectedMode ? (
          <View
            className="at-icon at-icon-reload"
            onClick={() => {
              onFetchData(true); // 调用fetchData函数
            }}
          >
            刷新
          </View>
        ) : (
          <View></View>
        )}
        <View style={{ display: 'flex' }}>
          {selectedMode && (
            <View style={{ display: 'flex' }}>
              <View className="at-icon at-icon-trash" onClick={handlSaveImages}>
                保存选中
              </View>
              <View
                className="at-icon at-icon-trash"
                onClick={handleDeleteAllImages}
              >
                删除全部
              </View>
              <View
                className="at-icon at-icon-trash"
                onClick={handleDeleteSelectedImages}
              >
                删除选中
              </View>
            </View>
          )}
          <View className="at-icon at-icon-list" onClick={handleToggleMode}>
            {selectedMode ? '取消' : '选择'}
          </View>
        </View>
      </View>
      <ScrollView
        scrollY
        // style={{ height: '100vh' }}
        onScrollToLower={loadMore}
      >
        {showImages.length === 0 ? (
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ textAlign: 'center' }}>
              没有作品可显示,快去首页试试吧~
            </Text>
          </View>
        ) : (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <View
              className=""
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                width: '96%',
              }}
            >
              {showImages?.map?.((image, index) => {
                return (
                  <View
                    style={{
                      display: 'inline-flex',
                      width: '49%',
                      position: 'relative',
                    }}
                  >
                    <Image
                      key={index}
                      style={{
                        width: '100%',
                        borderRadius: 5,
                        marginBottom: 8,
                      }}
                      mode="aspectFill"
                      lazyLoad={true}
                      className=" "
                      src={image.url}
                      onClick={() => {}}
                    ></Image>
                    {selectedMode && (
                      <View
                        style={{
                          opacity: selectedImages.includes(index) ? 0 : 1,
                          width: 20,
                          height: 20,
                          border: '2px solid #fff',
                          borderRadius: '50%',
                          position: 'absolute',
                          color: 'white',
                          right: 10,
                          top: 10,
                        }}
                        onClick={(e) => {
                          // e.stopPropagation();
                          toggleSelectImage(index);
                        }}
                      ></View>
                    )}
                    {selectedMode && (
                      <View
                        style={{
                          opacity: selectedImages.includes(index) ? 1 : 0,
                          // width: 20,
                          // height: 20,
                          color: 'white',
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          fontSize: 24,
                        }}
                        className="at-icon at-icon-check-circle"
                        onClick={(e) => {
                          // e.stopPropagation();
                          toggleSelectImage(index);
                        }}
                      ></View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ImageList;
