import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
const src1 =
  'https://facei.top/static/allImages/tags/海/006W9z2kly1hhb3e09wavj31hc1z4al1.jpg';

const highQualityImage =
  'https://facei.top/static/allImages/tags/海/006W9z2kly1hhb3e09wavj31hc1z4al1.jpg';
const ultraHighQualityImage =
  'https://facei.top/static/allImages/tags/海/006W9z2kly1hhb3ee5brkj31hc1z4dtg.jpg';
const partialRepairImage =
  'https://facei.top/static/allImages/tags/海/008sfn0Jgy1hhh5txlzxxj30u013xq78.jpg';

const HomePage = () => {
  const handleOptionClick = (option) => {
    // 处理选项点击事件，根据不同选项进行相应操作
    switch (option) {
      case 'highQuality':
        // 处理高清选项点击
        break;
      case 'ultraHighQuality':
        // 处理超清选项点击
        break;
      case 'partialRepair':
        // 处理局部修复选项点击
        break;
      default:
        break;
    }
  };

  const handleExperienceClick = () => {
    // 立即体验按钮点击事件处理
    // 进行相应操作
  };

  return (
    <View>
      <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>AI修图</Text>
      <Text style={{ fontSize: '14px' }}>一键拯救低画质</Text>
      <Image src={src1} style={{ width: '100%', height: '300px' }} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View onClick={() => handleOptionClick('highQuality')}>
          <Image
            src={highQualityImage}
            style={{ width: '100px', height: '100px' }}
          />
          <Text>高清</Text>
        </View>
        <View onClick={() => handleOptionClick('ultraHighQuality')}>
          <Image
            src={ultraHighQualityImage}
            style={{ width: '100px', height: '100px' }}
          />
          <Text>超清</Text>
        </View>
        <View onClick={() => handleOptionClick('partialRepair')}>
          <Image
            src={partialRepairImage}
            style={{ width: '100px', height: '100px' }}
          />
          <Text>局部修复</Text>
        </View>
      </View>
      <View onClick={handleExperienceClick}>
        <Text>立即体验</Text>
      </View>
    </View>
  );
};

export default HomePage;
