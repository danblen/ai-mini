import { View } from '@tarojs/components';
import TabsImageList from './TabsImageList';

export default ({ tags_image, onNavigateToHot }) => {
  return (
    <View
      style={{
        marginTop: '170rpx',
      }}
    >
      <TabsImageList
        tags_image={tags_image}
        onNavigateToHot={onNavigateToHot}
      ></TabsImageList>
    </View>
  );
};
