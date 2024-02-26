import { Image, Text, View } from '@tarojs/components';
import React from 'react';
import { AtIcon } from 'taro-ui';
const url = '/pages/faceswap/index';
export default ({ image }) => {
  return (
    <>
      <Image
        style={Styles.image}
        mode="aspectFill"
        lazyLoad={true}
        className=" "
        onClick={() => {
          navigateTo({
            url: url + '?imageUrl=' + src + '&momentId=' + image.momentId,
          });
        }}
        src={image.momentPics}
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
            maxWidth: '21%',
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
    </>
  );
};
const Styles = {
  image: {
    width: '100%',
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
  text: {
    flex: 1,
    marginBottom: '5px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2, // 控制显示行数
    color: '#000000',
    maxWidth: '50%',
  },
};
