import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import IconGood1 from '../../static/image/my/icons8-奥运奖牌金牌-48.png';
import IconGood2 from '../../static/image/my/icons8-奥运奖牌银牌-48.png';
import IconGood3 from '../../static/image/my/icons8-奥运奖牌铜牌-48.png';
import { AtIcon } from 'taro-ui';

export default () => {
  return (
    <View
      style={{
        padding: '10px',
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '18rpx',
        marginRight: '18rpx',
        borderRadius: '15rpx',
        background: '#fff',
      }}
    >
      <Text style={{ margin: '10px 0', fontSize: '18px', fontWeight: 'bold' }}>
        热门模板
      </Text>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CardItem
          imageUrl="https://facei.top/statics/allImages/banner/首页日更/photo_108@05-11-2022_05-24-49.jpg"
          iconUrl={IconGood1}
          description="#水果裙"
          hotness={798}
        />
        <LineSeparator />
        <CardItem
          imageUrl="https://facei.top/statics/allImages/banner/首页日更/photo_108@05-11-2022_05-24-49.jpg"
          iconUrl={IconGood2}
          description="#焱落纱"
          hotness={324}
        />
        <LineSeparator />
        <CardItem
          imageUrl="https://facei.top/statics/allImages/banner/首页日更/photo_108@05-11-2022_05-24-49.jpg"
          iconUrl={IconGood3}
          description="#机械战甲"
          hotness={122}
        />
      </View>
    </View>
  );
};

const CardItem = ({ imageUrl, iconUrl, description, hotness }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      {/* 添加左侧的 URL 图标 */}
      <Image
        src={iconUrl}
        style={{
          width: '25px',
          height: '25px',
          marginRight: '10px',
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />
      <View
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Image
          src={imageUrl}
          style={{
            width: '100px',
            height: '100px',
            marginLeft: '30px',
            marginRight: '10px',
          }}
        />
        <Text style={{ marginLeft: '10px' }}>{description}</Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text>热度:{hotness}</Text>
        {/* 使用 Taro 的 Icon 组件来表示热度 */}
        <AtIcon
          value="analytics"
          size="20"
          color="#FF5722"
          style={{ marginLeft: '5px' }}
        />
      </View>
    </View>
  );
};

// 添加灰色线条组件
const LineSeparator = () => {
  return (
    <View
      style={{
        height: '1px',
        backgroundColor: '#ccc',
        margin: '10px 0',
        marginLeft: '30px',
      }}
    />
  );
};
