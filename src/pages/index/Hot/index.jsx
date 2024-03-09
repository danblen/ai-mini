/**
 * 首页
 */

import { ScrollView, Text, View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { AtNoticebar } from 'taro-ui';
import { api, get_all_images } from '../../../api/index.js';
import { getStorageSync, setStorageSync } from '../../../base/global.js';
import ButtonsBox from '../../comps/ButtonsBox.jsx';
import CustomTop from '../../comps/CustomTop.jsx';
import WaterfallList from '../../comps/WaterfallList.jsx';
// import tabSelect from '../tabSelect.jsx';
import PopularTemplate from '../PopularTemplate.jsx';
import TopBanner from '../TopBanner.jsx';
import CardView from './CardView.jsx';
import PushView from './PushView.jsx';
import ButtonView from './ButtonView.jsx';
import CardPhotoView from './CardPhotoView.jsx';
import TitleView from './TitleView.jsx';

export default ({ onNavigateToTab }) => {
  let [allImages, setAllImages] = useState({ albums: {}, tags_image: {} });

  const getAllImages = async () => {
    let res = await get_all_images();
    if (res?.data) {
      setAllImages(res.data);
      setStorageSync('tmpAllimages', res.data);
    }
  };
  useEffect(() => {
    getAllImages();
    // const tmpAllimages = getStorageSync('tmpAllimages');
    // if (!tmpAllimages) {
    //   getAllImages();
    // } else {
    //   setAllImages(tmpAllimages);
    // }
    // const tmpHotTagimages = getStorageSync('tmpHotTagimages');
    // if (!tmpHotTagimages) {
    //   getTagImages();
    // } else {
    //   setLRHalfPic(tmpHotTagimages);
    // }
    // const timer = setInterval(() => {
    //   getAllImages();
    //   getTagImages();
    // }, 1 * 60 * 1000); // 1分钟
  }, []);
  const notices = [
    '每日签到即可加积分💕',
    '尝试使用标准人像照进行换脸，可能效果更好🤩',
    '换脸精修模式更好看🥰',
    '别人使用你发布的模板，你也会得到积分✌',
  ];

  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // 切换到下一条通知
      setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % notices.length);
    }, 5000); // 设置每条通知显示的时间，这里设置为1秒

    return () => {
      clearTimeout(timer);
    };
  }, [currentNoticeIndex]);
  return (
    <ScrollView enhanced showScrollbar={false} scroll-y>
      <TopBanner banners={allImages?.bannerImage?.['首页日更']} />

      <View
        style={{
          marginTop: '5px',
          // marginTop: '200px',
        }}
      >
        <AtNoticebar icon="volume-plus">
          {notices[currentNoticeIndex]}
        </AtNoticebar>
      </View>

      {/* <ButtonView allImages={allImages} /> */}
      <CardView
        infoLeftImage={{
          pagePath: '/pages/activity/Activity',
          params: {
            imageUrl: allImages?.activityTagsImage?.['影楼'],
            title: '影楼',
            description: `
            ✨不一样的你，不一样的风格

            💯影楼级真实体验

            #影楼风格 #自然美 #捕捉
            `,
            pagePath: '/pages/activity/Activity',
            text: '影楼风格',
          },
        }}
        infoTopLeftImage={{
          pagePath: '/pages/activity/Activity',
          params: {
            imageUrl: allImages?.activityTagsImage?.['繁花专场'],
            title: '繁花专场',
            description: `
            ✨光影交织，艺术感十足

            👉细腻呈现，勾勒出浓厚的情感

            #繁花风格写真 #光影 #艺术氛围#
            `,
            pagePath: '/pages/activity/Activity',
            text: '繁花专场',
          },
        }}
        infoTopRightImage={{
          pagePath: '/pages/activity/Activity',
          params: {
            imageUrl: allImages?.activityTagsImage?.['韩式证件照'],
            title: '韩式证件照',
            description: `
            📸想要与众不同的证件照吗？来试试韩式风格！

            💼时尚又有个性，让你瞬间提升颜值

            ✨清新自然的韩风魅力

            #韩式证件照 #时尚颜值 #个性魅力
            `,
            pagePath: '/pages/activity/Activity',
            text: '韩式证件照',
          },
        }}
        // infoTopRightImage={{
        //   pagePath: '/pages/refine/index',
        //   params: {
        //     imageUrl: allImages?.activityTagsImage?.['焱落纱'],
        //     title: '#AI修图',
        //     description: '分享你当反派能活到第几集\n参与活动，获取丰富奖励~',
        //   },
        // }}
      />

      <CardPhotoView allImages={allImages} />
      <PushView
        allImages={allImages}
        albums={allImages?.tagsImage?.['美高Girl'] || []}
        title="👩‍🎓美高Girl"
        description={`
        🕶️比法式更潮，比港式更青春

        ✨经典与时尚完美结合

        📸留下时光的印记，一起走进复古美高潮流

        #复古风 #潮流回潮 #青春时尚
        `}
        tagName="美高Girl"
        onNavigateToTab={onNavigateToTab}
      />
      <PushView
        allImages={allImages}
        albums={allImages?.tagsImage?.['江南'] || []}
        title="🏞️江南"
        description={`
        🌳江南风情，唤醒你的浪漫心弦

        ✨如诗如画的江南，让你陶醉其中

        🍃品味清茶，回味无穷

        #江南风情 #如诗如画 #浪漫心弦 #古典韵味
        `}
        tagName="江南"
        onNavigateToTab={onNavigateToTab}
      />
      <PushView
        allImages={allImages}
        albums={allImages?.tagsImage?.['美高Boy'] || []}
        title="🎓美高Boy"
        description={`

        📸 穿上经典的复古服装，搭配流行的时尚元素，创造独特的毕业照造型

        🎉 在青春洋溢的校园里，与朋友们一起留下珍贵的时光印记

        #美高 #复古风格 #时尚回潮 #青春记忆
        `}
        tagName="美高Boy"
        onNavigateToTab={onNavigateToTab}
      />
      <PushView
        allImages={allImages}
        albums={allImages?.tagsImage?.['暗调'] || []}
        title="🖤暗调"
        description={`
        ✨一种自信和独立的态度。

        🖤让你散发出与众不同的魅力。

        #暗调风格 #个性穿搭 #独特品味
        `}
        tagName="暗调"
        onNavigateToTab={onNavigateToTab}
      />
      <PushView
        allImages={allImages}
        albums={allImages?.tagsImage?.['古装'] || []}
        title="🪈古装"
        description={`
        别再等待了！想要展现你的英姿飒爽吗？还是更喜欢性感妩媚的风格？又或者你想要体验温婉典雅的气质？不用犹豫，汉服写真能满足你的所有期待！🌺💃

        ✨ 带上配剑，展现你的英姿飒爽，舞刀弄剑的酷酷风格

        🌸 温婉典雅的风格，让你感受古代大家闺秀的温婉高贵，享受幽静安静的美丽

        #汉服写真 #古风照片 #古色古香
        `}
        tagName="古装"
        onNavigateToTab={onNavigateToTab}
      />
      <PushView
        allImages={allImages}
        albums={allImages?.tagsImage?.['在逃公主'] || []}
        title="💍在逃公主"
        description={`

        👰 让你的婚纱照散发出浪漫而优雅的女性魅力

        🌸 在花海中绽放，展现出婚纱的美好与婀娜多姿的身姿
        
        🌿 在自然的背景下，展现纯净而宁静的婚纱照氛围
        
        🌹 走进梦幻般的故事，留下难忘的婚礼时刻
        
        #婚纱照 #浪漫婚礼 #宁静自然 #一生一次的回忆
        `}
        tagName="在逃公主"
        onNavigateToTab={onNavigateToTab}
      />
      <PushView
        allImages={allImages}
        albums={allImages?.tagsImage?.['活力'] || []}
        title="🎞️活力满满"
        description={`
        📸 用你最灿烂的笑容，展现活力四溢

        🔥 多样化的场景，让你尽情释放自己的能量

        💃 动感的造型和姿势，让你成为朋友圈的焦点

        🌈 用鲜艳的色彩和鲜活的表情，展现你的青春活力

        还等什么？快来试试「活力满满的写真」，让你的朋友圈充满活力和阳光！🌞💃

        #展现青春活力 #多样化 #色彩鲜活
        `}
        tagName="活力"
        onNavigateToTab={onNavigateToTab}
      />
      <PushView
        allImages={allImages}
        albums={allImages?.tagsImage?.['街道'] || []}
        title="🚉街道"
        description={`
        街道写真 – 展示城市独特风情

        🏙️ 漫步在街道之间，呼吸着城市的脉搏，记录下这独特的时刻

        🌆 大都市的霓虹灯光，将你衬托成一个行走的艺术品

        🌇 捕捉行人穿梭的气息，展现忙碌生活中的一瞬间

        #街道写真 #城市风景 #都市魅力
        `}
        tagName="街道"
        onNavigateToTab={onNavigateToTab}
      />
      <PopularTemplate activityTagsImage={allImages?.activityTagsImage} />
    </ScrollView>
  );
};
