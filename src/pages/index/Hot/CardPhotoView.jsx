import { View } from '@tarojs/components';
import AlbumsCard from './AlbumsCard.jsx';
import TitleView from './TitleView.jsx';
export default ({ albums }) => {
  return (
    <View
      style={{
        marginTop: 15,
        marginLeft: '18rpx',
        marginRight: '18rpx',
        borderRadius: '8rpx',
        paddingBottom: '8rpx',
        background: '0% 0% / cover rgb(204, 197, 197, 0.5)',
        // background:'#fff'
      }}
    >
      <TitleView title="写真集" />

      <AlbumsCard albums={albums} />
    </View>
  );
};
