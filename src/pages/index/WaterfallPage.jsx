import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { View, ScrollView, Image } from '@tarojs/components';

export default ({}) => {
  const [col1H, setCol1H] = useState(0);
  const [col2H, setCol2H] = useState(0);
  const [scrollH, setScrollH] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [loadingCount, setLoadingCount] = useState(0);
  const [images, setImages] = useState([]);
  const [col1, setCol1] = useState([]);
  const [col2, setCol2] = useState([]);

  useEffect(() => {
    Taro.getSystemInfo({
      success: res => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let newImgWidth = ww * 0.48;
        let newScrollH = wh;

        setImgWidth(newImgWidth);
        setScrollH(newScrollH);
        console.log('newScrollH:', newImgWidth, newScrollH);

        // 加载首组图片
        loadImages();
      },
    });
  }, []);

  const onImageLoad = (e, index) => {
    console.log('Image loaded successfully:', images[index].pic);
    // 图片加载完成后的处理，计算图片高度，确定放在左列还是右列
    let imageHeight = (imgWidth / e.detail.width) * e.detail.height;
    let imageObj = images[index];

    imageObj.height = imageHeight;

    if (col1H <= col2H) {
      setCol1([...col1, imageObj]);
      setCol1H(col1H + imageHeight);
    } else {
      setCol2([...col2, imageObj]);
      setCol2H(col2H + imageHeight);
    }
  };

  const loadImages = () => {
    // 模拟加载图片的数据
    let newImages = [
      {
        id: 1,
        pic: 'https://facei.top/static/allImages/albums/people2/index/%E8%8A%AD%E8%95%BE.png',
        height: 0,
      },
      {
        id: 2,
        pic: 'https://facei.top/static/allImages/albums/people2/index/%E8%8A%AD%E8%95%BE.png',
        height: 0,
      },
      // 添加更多图片数据...
    ];

    setImages([...images, ...newImages]);
    setLoadingCount(loadingCount + 1);
  };

  return (
    <View>
      <ScrollView
        scrollY
        style={{ height: `${scrollH}px` }}
        onScrollToLower={loadImages}>
        <View style={{ width: '100%' }}>
          <View className="img_item">
            {col1.map((item, index) => (
              <Image
                key={item.id}
                src={item.pic}
                style={{ width: '100%', height: `${item.height}px` }}
                onLoad={e => onImageLoad(e, index)}
                onError={e => console.error('Image load error:', e)}
              />
            ))}
          </View>
          <View className="img_item">
            {col2.map((item, index) => (
              <Image
                key={item.id}
                src={item.pic}
                style={{ width: '100%', height: `${item.height}px` }}
                onLoad={e => onImageLoad(e, index + col1.length)}
                onError={e => console.error('Image load error:', e)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
