import { useEffect, useState } from 'react';
import { api } from '../../../api';
import TabsImageList from './TabsImageList';

export default ({ onNavigateToTab, titleParam }) => {
  const [tagImages, setTagImages] = useState([]);
  useEffect(() => {
    getTagImages();
  }, []);
  const getTagImages = async () => {
    let res = await api.getImages([
      { tagName: '荷' },
      { tagName: '美中Girl' },
      { tagName: '美高Boy' },
      { tagName: '美中Boy' },
      { tagName: '纯欲' },
      { tagName: '海' },
    ]);
    setTagImages({
      荷: res.data[0],
      美中Girl: res.data[1],
      美高Boy: res.data[2],
      美中Boy: res.data[3],
      纯欲: res.data[4],
      海: res.data[5],
    });
    // if (res?.data) {
    //   // 过滤掉值为 null 的元素
    //   const filteredData = res.data[0].filter((item) => item !== null);
    //   if (filteredData.length > 0) {
    //     const shuffledImages = filteredData.sort(() => Math.random() - 0.5);
    //     setTagImages(shuffledImages);
    //   }
    // }
  };

  return (
    <TabsImageList
      tags_image={tagImages}
      onNavigateToTab={onNavigateToTab}
      titleParam={titleParam}
    ></TabsImageList>
  );
};
