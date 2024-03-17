import { Image, ScrollView, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useCallback } from 'react';
import { AtIcon } from 'taro-ui';

export default ({ images }) => {
  const imageUrls = images.map((img) => img.src);
  const handleImageClick = useCallback(
    (src) => {
      Taro.previewImage({
        current: src,
        urls: imageUrls,
      });
    },
    [imageUrls]
  );
  return (
    <View
      style={{
        background: 'black',
        height: '100vh',
        color: '#fff',
        paddingTop: 40,
      }}
    >
      <View
        style={{
          background: 'black',
          paddingTop: '20rpx',
          marginBottom: '20rpx',
          marginLeft: '15rpx',
        }}
        onClick={() => {
          Taro.reLaunch({
            url: '/pages/album/index',
          });
        }}
      >
        作品集
        <AtIcon value="chevron-right" size="22" />
      </View>

      <ScrollView
        style={{
          background: 'black',
        }}
      >
        <View
          style={{
            background: 'black',
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              width: '96%',
            }}
          >
            {images?.map((image) => (
              <>
                {image.status === 'pending' && (
                  <View
                    style={{
                      width: '49%',
                      height: 200,
                      marginBottom: 6,
                      borderRadius: 5,
                      border: '1px solid #aaa',
                      boxSizing: 'border-box',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {/* <Loading /> */}
                    <View
                      style={{
                        padding: 10,
                      }}
                    >
                      制作中...
                    </View>
                  </View>
                )}
                {image.status === 'failed' && (
                  <View
                    style={{
                      border: '1px solid #eee',
                      borderRadius: 5,
                      boxSizing: 'border-box',
                      width: '49%',
                      height: 200,
                      marginBottom: 6,
                      borderRadius: '10rpx',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        padding: 10,
                      }}
                    >
                      已在后台排队处理中，请稍后在作品页查看
                    </View>
                  </View>
                )}
                {image.status === 'finished' && (
                  <Image
                    style={{
                      width: '49%',
                      height: 200,
                      marginBottom: 6,
                      borderRadius: 5,
                    }}
                    src={image.src}
                    mode="widthFix"
                    onClick={() => handleImageClick(image.src)}
                  />
                )}
              </>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
