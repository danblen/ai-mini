/**
 * 修图页
 */
import { View, Text, Image, Button } from '@tarojs/components';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AtButton, AtTabs, AtTabsPane } from 'taro-ui';
import { wxPathToBase64, downloadImages } from '../../utils/imageTools.js';
import { faceSwap, getSwapQueueResult } from '../../api/index.js';

export default ({}) => {
  const [current, setCurrent] = useState(0);
  const onClick = useCallback(value => {
    setCurrent(value);
  });
  return (
    <View>
      <View
        style={{
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '90vh',
        }}>
        {/* <Image
          mode="widthFix"
          style={{ width: "100%", verticalAlign: "middle" }}
          src={indexImage}
        /> */}
      </View>

      <View>
        <AtTabs
          current={current}
          tabList={[{ title: '换脸' }, { title: '清晰化' }, { title: '修图' }]}
          swipeable={true}
          scroll
          onClick={onClick}></AtTabs>

        {current === 0 && (
          <View>
            <Button
              onClick={async () => {
                setLoading(true);
                const srcBase64 = await wxPathToBase64(imageUrl);
                const tarBase64 = await wxPathToBase64(indexImage);
                data.init_images = [srcBase64];
                data.alwayson_scripts.roop.args[0] = tarBase64;
                let res = await faceSwap(data);
                setLoading(false);
                if (res.status === 'pending') {
                  getTaskImages(res.request_id);
                } else {
                  Taro.showToast({
                    title: res.error_message,
                    icon: 'none',
                  });
                }
              }}>
              -一键换脸-
            </Button>
          </View>
        )}
        {current === 1 && (
          <View style={Style.wrap}>
            {['2k', '4k'].map(item => (
              <View style={Style.item} onClick={async () => {}}>
                {item}
              </View>
            ))}
            <Button style={Style.start} onClick={async () => {}}>
              开始
            </Button>
          </View>
        )}
        {current === 2 && (
          <View>
            <Button onClick={async () => {}}>2k</Button>
            <Button onClick={async () => {}}>4k</Button>
          </View>
        )}
      </View>
    </View>
  );
};
const Style = {
  wrap: {
    display: 'flex',
  },
  item: {
    width: '200rpx',
    height: '50rpx',
    border: '1px solid #aaa',
  },
  start: {
    width: '500rpx',
  },
};
