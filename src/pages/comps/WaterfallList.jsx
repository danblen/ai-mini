import { Image, Text, View } from '@tarojs/components';
import React from 'react';
import compareIcon from '../../static/image/login/bg_login.png';
import SingleColumnImageList from './SingleColumnImageList';
const PostNodePages = '/pages/album/postNode';

export default ({ imageListLeft, imageListRight, curTagPage }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <View
        style={{
          width: '96%',
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
                marginLeft: '5px',
              }}
              onClick={() => {
                // 标记哪个页面发出的post
                const urlWithParams = `${PostNodePages}?tagName=${curTagPage}`;
                navigateTo({ url: urlWithParams });
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
                mode="aspectFill"
              />
              <Text
                style={{
                  flex: 1,
                  marginBottom: '5px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2, // 控制显示行数
                  color: '#ffffff',
                  fontSize: '26px',
                  zIndex: 1,
                  position: 'relative',
                  top: '60px',
                  left: '50px',
                }}
              >
                发布模板
              </Text>
            </View>
            <SingleColumnImageList imageUrls={imageListLeft} />
          </View>
        </View>
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
            <SingleColumnImageList imageUrls={imageListRight} />
          </View>
        </View>
      </View>
    </View>
  );
};
