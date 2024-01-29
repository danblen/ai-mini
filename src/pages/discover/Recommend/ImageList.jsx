import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';

export default ({ imageUrls }) => {
  return (
    <View style={Styles.container}>
      <View className="" style={Styles.imageList}>
        {imageUrls?.map?.((url, index) => (
          <View key={index} className="" style={Styles.imageWrap}>
            <Image
              style={Styles.image}
              mode="aspectFill"
              lazyLoad={true}
              className=" "
              onClick={() => {
                Taro.navigateTo({
                  url: '/pages/faceswap/index?imageUrl=' + src,
                });
              }}
              src={url}
            ></Image>

            <View className="heat-info" style={Styles.heatInfo}>
              <View
                className="at-icon at-icon-eye"
                style={{
                  size: '20px',
                  color: '#d6d6d6',
                }}
              ></View>
              <Text
                style={{
                  marginLeft: '8px',
                  color: '#e2e1e1',
                  fontSize: '14px',
                }}
                className="heat-value"
              >
                233
              </Text>
            </View>

            <Text className="ellipsis" style={Styles.text}>
              坟头草两米高
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const Styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  imageList: {
    display: 'flex',
    width: '96%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageWrap: {
    width: '49%',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    borderRadius: 5,
  },
  heatInfo: {
    position: 'relative',
    top: '-30px',
    right: '-110px',
    borderRadius: '10%',
    backgroundColor: 'rgba(2, 0, 0, 0.08)',
    width: '68px',
    textAlign: 'center',
  },
  text: {
    flex: 1,
    marginTop: '-17px',
    marginBottom: '5px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2, // 控制显示行数
    color: '#868686',
  },
};
