import React, { useEffect, useState } from 'react';
import { View, Image, Text, Input, Button } from '@tarojs/components';
import { AtImagePicker } from 'taro-ui';

import Taro, { useRouter } from '@tarojs/taro'; // 导入 useRouter
import { Textarea } from '@tarojs/components';

export default () => {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    // 在这里可以处理页面初始化时的逻辑，比如获取服务端数据等

    // 获取传递过来的图片信息
    const images = JSON.parse(router.params.images || '[]');
    setSelectedImages(images);
  }, []);

  const handlePublish = async () => {
    // 在这里可以向服务端发送请求，上传图片和标题等信息
    // 你需要替换下面的示例代码为实际的服务端请求逻辑
    try {
      const res = await Taro.request({
        url: '你的服务端接口地址',
        method: 'POST',
        data: {
          images: selectedImages,
          title: title,
        },
      });

      console.log('发布成功:', res.data);
    } catch (error) {
      console.error('发布失败:', error);
    }
  };

  return (
    <View>
      {/* <View
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100vw', // 设置视口宽度的百分比
          margin: '10px',
        }}
      >
        {selectedImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            mode="aspectFill"
            style={{ width: '30vw', height: '30vw', margin: '5px' }}
          />
        ))}
      </View> */}

      <View>
        <AtImagePicker
          files={selectedImages.map((image, index) => ({ url: image }))}
          onChange={(files, operationType, index) => {
            const newImages = files
              .slice(selectedImages.length)
              .map((file) => file.url);

            // 判断是否为添加图片操作
            console.log(operationType, files);
            if (operationType === 'add') {
              // 计算当前已选择的图片数量
              const totalImages = selectedImages.length + newImages.length;

              // 设置允许的最大图片数量
              const maxImages = 9;

              if (totalImages <= maxImages) {
                setSelectedImages((prevImages) => [
                  ...prevImages,
                  ...newImages,
                ]);
              } else {
                Taro.showToast({
                  title: '最多选择9张图~',
                  icon: 'none',
                  duration: 2000,
                });
              }
            } else if (operationType === 'remove') {
              // 使用 index 参数确定被移除的图片
              const removedIndex = index;
              setSelectedImages((prevImages) => {
                const newImages = [...prevImages];
                newImages.splice(removedIndex, 1);
                return newImages;
              });
            }
          }}
          count={6}
          mode="aspectFill"
          length={3}
          showAddBtn={selectedImages.length < 9}
        />
      </View>
      <View
        style={{
          border: '3px solid #e4dddd',
          // background: '#e6e2e2',
          margin: '20px',
        }}
      >
        <Textarea
          placeholder="请输入标题"
          value={title}
          style={{
            // fontWeight: 'bold',
            fontSize: '18px',
            wordBreak: 'break-all',
            flexWrap: 'wrap',
            width: '100%',
          }}
          maxlength={100}
          onInput={(e) => setTitle(e.detail.value)}
        />
      </View>
      <View>
        <Button
          onClick={handlePublish}
          style={{
            border: '10px solid #f5f5f5', // 添加边框
            background: '#82b0e8', // 添加背景色
            borderRadius: '8px', // 添加圆角
            width: '130px',
          }}
        >
          发布
        </Button>
      </View>
    </View>
  );
};
