import { Image, ScrollView, Text, View } from '@tarojs/components';
import React from 'react';
import { navigateTo } from '../../../base/global';
const photoPage = '/pages/photo/index';
export default ({ albums }) => {
  return (
    <View
      style={{
        borderRadius: '15rpx',
        marginTop: '20rpx',
      }}
    >
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: 40,
        }}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '96%',
          }}
        >
          <View
            style={{
              display: 'flex',
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                marginRight: 10,
              }}
              src="https://facei.top/static/allImages/activity_tags/%E6%B8%AF%E9%A3%8E/lszu7ifdfwjkb-1.jpg"
            ></Image>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              写真集
            </Text>
          </View>
          <View
            style={{
              color: 'grey',
              fontSize: 12,
            }}
            onClick={() => {}}
          >
            查看全部
          </View>
        </View>
      </View>

      <ScrollView
        style={{
          whiteSpace: 'nowrap',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}
        scroll-x
        scrollWithAnimation
      >
        {Object.values(albums)?.map?.((albumData) => (
          <View
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              height: 120,
            }}
          >
            <Image
              style={{
                marginLeft: '18rpx',
                width: 100,
                height: 100,
                borderRadius: 10,
              }}
              className=" "
              onClick={() => {
                navigateTo({
                  url: photoPage,
                  success: function (res) {},
                });
              }}
              src={albumData.index}
            ></Image>
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                opacity: 0.5,
                left: 10,
                borderRadius: 5,
                background: 'gray',
                fontSize: 12,
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              <View className="at-icon at-icon-eye"></View>
              {123}
            </View>
            <View
              style={{
                marginLeft: '18rpx',
              }}
            >
              {343242}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
