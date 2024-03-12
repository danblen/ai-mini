import React, { useState, useEffect } from 'react';
import { View, Canvas, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { api } from '../../api';
// import QRCode from 'qrcode'; // 引入第三方库

export default () => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    // 在页面加载时生成二维码
    // generateQrCode();
    handleGenerateQRCode();
  }, []);
  async function handleGenerateQRCode() {
    try {
      const res = await api.getQRCode({
        shareUserId: global.userInfo.data.userId,
      }); // 获取微信接口调用凭证
      // 处理响应数据，例如显示小程序码
      const qrCodeData = Taro.arrayBufferToBase64(res.data.data);
      const qrCodeUrl = `data:image/png;base64,${qrCodeData}`;
      console.log('生成的小程序码链接：', qrCodeUrl);
      setQrCodeUrl(qrCodeUrl);

      // 这里可以使用 qrCodeUrl 来展示小程序码或进行其他操作
    } catch (error) {
      console.error('生成小程序码失败：', error);
    }
  }
  // const generateQrCode = () => {
  //   // 构造带参数的页面路径，包含小程序 AppID 和页面路径
  //   const path = `pages/index/index`;
  //   const appId = 'wx3e67e2268416075f';
  //   const fullUrl = `https://servicewechat.com/${appId}/${path}`;

  //   Taro.showLoading({ title: '正在生成二维码' });

  //   // 调用第三方库生成二维码
  //   QRCode.toDataURL(fullUrl)
  //     .then((url) => {
  //       setQrCodeUrl(url);
  //       Taro.hideLoading();
  //     })
  //     .catch((err) => {
  //       console.error('Failed to generate QR code:', err);
  //       Taro.hideLoading();
  //     });
  // };

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
