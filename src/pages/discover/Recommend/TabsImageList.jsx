import { ScrollView, View } from '@tarojs/components';
import React, { useEffect, useState } from 'react';
import { AtFloatLayout } from 'taro-ui';
import Images from './Images';

export default ({ tags_image }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [tabList, setTabList] = useState([]);
  const [current, setCurrent] = useState('古装');
  const [showDrawer, setShowDrawer] = useState(false);
  useEffect(() => {
    if (tags_image) {
      const tabList = Object.keys(tags_image).map(key => ({ title: key }));
      setTabList(tabList);
      console.log(tabList);
      setImageUrls(tags_image[tabList[0]?.title]);
    }
  }, [tags_image]);
  return (
    <View style={Styles.container}>
      <View
        style={{
          width: '100%',
          padding: '20rpx',
          display: 'flex',
          position: 'fixed',
          backgroundColor: 'white',
          zIndex: '5',
        }}>
        <ScrollView
          scrollX
          scrollWithAnimation
          style={{
            width: '90%',
            whiteSpace: 'nowrap',
          }}>
          {tabList?.map(tab => (
            <View
              style={{
                fontSize: '30rpx',
                marginRight: '20rpx',
                display: 'inline-block',
                backgroundColor: current === tab.title ? '#eee' : '#fff',
                width: '100rpx',
                borderRadius: '30rpx',
                lineHeight: '60rpx',
                textAlign: 'center',
              }}
              onClick={() => {
                setCurrent(tab.title);
                setImageUrls(tags_image[current]);
              }}>
              {tab.title}
            </View>
          ))}
        </ScrollView>
        <View
          className="at-icon at-icon-chevron-down"
          style={{
            width: '10%',
            textAlign: 'center',
            lineHeight: '60rpx',
          }}
          onClick={() => {
            setShowDrawer(true);
          }}></View>
      </View>

      <View style={{ paddingTop: '100rpx' }}>
        <Images imageUrls={imageUrls} />
      </View>

      <AtFloatLayout isOpened={showDrawer} onClose={() => setShowDrawer(false)}>
        <View>
          {tabList?.map(tab => (
            <View
              style={{
                fontSize: '30rpx',
                marginLeft: '40rpx',
                whiteSpace: 'nowrap',
                fontWeight: current === 'hot' ? 'bold' : 'normal',
                display: 'inline-block',
                backgroundColor: current === tab.title ? '#eee' : '#fff',
                height: '60rpx',
                width: '100rpx',
                borderRadius: '30rpx',
                lineHeight: '60rpx',
                textAlign: 'center',
              }}
              onClick={() => {
                setCurrent(tab.title);
                setImageUrls(tags_image[current]);
                setShowDrawer(false);
              }}>
              {tab.title}
            </View>
          ))}
        </View>
      </AtFloatLayout>
    </View>
  );
};
const Styles = {
  container: {
    borderRadius: '10rpx',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};
