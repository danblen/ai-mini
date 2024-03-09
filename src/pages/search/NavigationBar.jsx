import { Input, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import { AtDrawer } from 'taro-ui';
import LeftDrawer from '../comps/LeftDrawer';
const PAGES = [
  'pages/index/index',
  'pages/create/index',
  'pages/user/index',
  'pages/postNode/index',
  'pages/discover/index',
  'pages/message/index',
  'pages/activity/Activity',
  'pages/setting/index',
  'pages/search/index',
  'pages/faceswap/index',
  'pages/refine/index',
  'pages/album/index',
  'pages/photo/index',
  'pages/gen/index',
  'pages/user/agreements/index',
  'pages/user/privacy/index',
];
const PAGE_INFO = {
  index: {
    url: 'pages/index/index',
    meta: 'index, home',
    name: '首页',
  },
  create: {
    url: 'pages/create/index',
    name: '创作',
  },
  user: {
    url: 'pages/user/index',
    name: '用户',
  },
  album: {
    url: 'pages/album/index',
    name: '作品',
  },
  discover: {
    url: 'pages/discover/index',
    name: '发现',
  },
  message: {
    url: 'pages/message/index',
    name: '消息',
  },
  refine: {
    url: 'pages/refine/index',
    name: '修图',
  },
  activity: {
    url: 'pages/activity/index',
    name: '反派挑战',
  },
  fix: {
    url: 'pages/fix/index',
    name: '老照片修复',
  },
};
export default () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const handleSearchChange = (value) => {
    setSearchKeyword(value);
  };
  const searchResults = '';

  // 展示匹配项的界面组件
  const SearchResultList = () => (
    <ul>
      {searchResults.map((result) => (
        <li key={result.id}>{result.name}</li>
      ))}
    </ul>
  );
  return (
    <>
      <View
        style={{
          height: '180rpx',
          width: '100%',
          display: 'flex',
          paddingTop: '100rpx',
        }}
      >
        <View
          className="at-icon at-icon-chevron-left"
          style={{
            marginLeft: '20rpx',
            fontSize: '50rpx',
            color: 'black',
          }}
          onClick={() => {
            Taro.navigateBack();
          }}
        ></View>
        <Input
          style={{
            width: '400rpx',
            height: '60rpx',
            borderRadius: '50rpx',
            marginLeft: '30rpx',
            paddingLeft: '30rpx',
            backgroundColor: '#f5f5f5',
            lineHeight: '60rpx',
          }}
          placeholder="搜索全站"
          onInput={() => {}}
          onClick={() => {}}
        ></Input>
      </View>

      <LeftDrawer
        showDrawer={showDrawer}
        onClose={() => {
          setShowDrawer(false);
        }}
      />
    </>
  );
};
