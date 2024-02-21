import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import IconGood1 from '../../static/image/my/icons8-奥运奖牌金牌-48.png';
import IconGood2 from '../../static/image/my/icons8-奥运奖牌银牌-48.png';
import IconGood3 from '../../static/image/my/icons8-奥运奖牌铜牌-48.png';
import { AtIcon } from 'taro-ui';

const PopularTemplate = ({ activityTagsImage }) => {
  const handleItemClick = (imageUrl, title, description) => {
    const params = {
      imageUrl: imageUrl,
      title: title, // 设置 title 参数值
      description: description, // 设置 description 参数值
      pagePath: '/pages/activity/Activity',
      text: title,
    };

    // 对参数进行编码
    const encodedParams = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    const url = `${params.pagePath}?${encodedParams}`;

    // 使用 Taro.navigateTo 函数
    Taro.navigateTo({
      url: url,
    });
  };
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
        热门挑战
      </Text>
      <View
        style={{
          marginTop: '10px',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CardItem
          imageUrl={activityTagsImage?.['水果裙0']}
          iconUrl={IconGood1}
          title="#水果裙"
          hotness={798}
          onClick={() =>
            handleItemClick(
              activityTagsImage?.['水果裙0'],
              '水果裙',
              '奇装异服系列<原创:白泽MARS>'
            )
          }
        />
        <LineSeparator />
        <CardItem
          imageUrl={activityTagsImage?.['焱落纱0']}
          iconUrl={IconGood2}
          title="#焱落纱"
          hotness={562}
          onClick={() =>
            handleItemClick(
              activityTagsImage?.['焱落纱0'],
              '焱落纱',
              '焱落纱系列<原创:麦橘MERJIC>'
            )
          }
        />
        <LineSeparator />
        <CardItem
          imageUrl={activityTagsImage?.['港风0']}
          iconUrl={IconGood3}
          title="#港风"
          hotness={323}
          onClick={() =>
            handleItemClick(activityTagsImage?.['港风0'], '港风', '港风系列')
          }
        />
      </View>
    </View>
  );
};

const CardItem = ({ imageUrl, iconUrl, title, hotness, onClick }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
      }}
      onClick={() => onClick(imageUrl)}
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
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          overflow: 'hidden', // 设置溢出处理方式为隐藏
        }}
      >
        <Image
          src={imageUrl ? imageUrl[0] : null}
          style={{
            width: 80,
            marginLeft: 30,
            marginRight: 10,
            clipPath: 'inset(0 0 auto 0)', // 通过裁剪实现只显示顶部部分
          }}
          mode="widthFix"
        />
        <Text style={{ marginLeft: '10px' }}>{title}</Text>
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

export default PopularTemplate;
