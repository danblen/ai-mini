import { Image, Text, View } from '@tarojs/components';
import React from 'react';
import { AtIcon } from 'taro-ui';

export default ({ imageUrls }) => {
  const getRandomImage = () => {
    if (!imageUrls || imageUrls.length === 0) {
      return ''; // 如果图片列表为空，返回空字符串或其他默认值
    }
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const randomImage = imageUrls[randomIndex].momentPics;
    return randomImage;
  };
  return (
    <View className="">
      <View className="" style={Styles.imageList}>
        {imageUrls?.map?.((image, index) => {
          // 获取本地路径下的所有图片列表
          const src = image.momentPics;

          // Extracting file name from the URL
          // const fileNameWithoutExtension = src.substring(
          //   src.lastIndexOf('/') + 1,
          //   src.lastIndexOf('.')
          // );
          // Generating a random number between 1 and 10000 for heat value
          const randomHeatValue = Math.floor(Math.random() * 500) + 1;

          return (
            <View key={index} className="" style={Styles.imageWrap}>
              <Image
                style={Styles.image}
                mode="aspectFill"
                lazyLoad={true}
                className=" "
                onClick={() => {
                  navigateTo({
                    url:
                      '/pages/faceswap/index?imageUrl=' +
                      src +
                      '&momentId=' +
                      image.momentId,
                  });
                }}
                src={src}
              ></Image>

              {/* Displaying file name dynamically */}
              <Text className="ellipsis" style={Styles.text}>
                {image.momentTitle}
              </Text>
              <View
                style={{
                  display: 'flex',
                  marginBottom: '20px',
                  alignItems: 'center',
                }}
              >
                <Image
                  mode="aspectFill"
                  src={image.userHeadPic}
                  style={{
                    width: '30px', // 调整为适当的宽度
                    height: '30px', // 调整为适当的高度
                    borderRadius: '50%', // 设置为圆形
                  }}
                />
                <Text
                  className="ellipsis"
                  style={{
                    flex: 1,
                    marginLeft: '10px',
                    marginRight: '5px',
                    marginBottom: '5px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1, // 控制显示行数
                    maxWidth: '105px',
                    color: '#9c9494',
                  }}
                >
                  {image.userName}
                </Text>
                <View
                  className="heat-info"
                  style={{
                    borderRadius: '10%',
                    backgroundColor: 'rgba(2, 0, 0, 0.08)',
                    width: '68px',
                  }}
                >
                  <AtIcon value="eye" size="20" color="#9c9494"></AtIcon>
                  <Text
                    style={{
                      marginLeft: '8px',
                      color: '#9c9494',
                      fontSize: '14px',
                    }}
                  >
                    {image.viewCount}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
const Styles = {
  image: {
    width: '360rpx',
    borderRadius: '10rpx',
    position: 'relative',
    marginBottom: '10px',
  },
  heatInfo: {
    position: 'relative',
    top: '-25px',
    right: '-135px',
    borderRadius: '10%',
    backgroundColor: 'rgba(2, 0, 0, 0.08)',
    width: '68px',
  },
  imageWrap: {
    paddingLeft: '10rpx',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  imageList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    // marginTop: '-17px',
    marginBottom: '5px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2, // 控制显示行数
    color: '#000000',
  },
};
