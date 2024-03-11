import React, { useState, useEffect } from 'react';
import { View, Canvas, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import iconwechat from '../../static/image/share/icon_wechat.png';
import QRCode from 'qrcode'; // 引入第三方库

export default () => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    // 在页面加载时生成二维码
    generateQrCode();
  }, []);

  const generateQrCode = () => {
    // 构造带参数的页面路径，包含小程序 AppID 和页面路径
    const path = `pages/index/index`;
    const appId = 'wx3e67e2268416075f';
    const fullUrl = `https://servicewechat.com/${appId}/${path}`;

    Taro.showLoading({ title: '正在生成二维码' });

    // 调用第三方库生成二维码
    QRCode.toDataURL(fullUrl)
      .then((url) => {
        setQrCodeUrl(url);
        Taro.hideLoading();
      })
      .catch((err) => {
        console.error('Failed to generate QR code:', err);
        Taro.hideLoading();
      });
  };

  return (
    <View>
      {/* Image 组件用于显示生成的二维码图片 */}
      <Image
        src={qrCodeUrl}
        style="width: 200px; height: 200px; margin:100px"
      />
    </View>
  );
};
