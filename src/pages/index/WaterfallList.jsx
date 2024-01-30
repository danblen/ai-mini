import { Image, View, Text } from '@tarojs/components';
import React from 'react';
import compareIcon from '../../static/image/my/go.png';
import ImageList from '../discover/Recommend/ImageList';

export default ({ imageListLeft, imageListRight }) => {
  return (
    <View style={{ display: 'flex', justifyContent: 'center' }}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            width: '49%',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              marginBottom: 10,
              borderRadius: 5,
            }}
          >
            <View
              style={{
                position: 'relative',
                height: '150px',
                marginBottom: '20px',
              }}
            >
              {/* Background image for "每日打卡" */}
              <Image
                src={compareIcon}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: 5,
                  objectFit: 'cover',
                }}
              />
              <Text
                style={{
                  flex: 1,
                  marginBottom: '5px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2, // 控制显示行数
                  color: '#334561',
                  fontSize: '26px',
                  zIndex: 1,
                  position: 'relative',
                  top: '60px',
                  left: '50px',
                }}
              >
                每日打卡
              </Text>
            </View>
            <ImageList imageUrls={imageListLeft} />
          </View>
        </View>
        <View
          style={{
            width: '50%',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              marginBottom: 10,
              borderRadius: 5,
            }}
          >
            <ImageList imageUrls={imageListRight} />
          </View>
        </View>
      </View>
    </View>
  );
};
