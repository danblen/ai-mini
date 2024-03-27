import { Image, Text, View } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { navigateTo } from '../../base/global';
import { URL_STATIC } from '../../api/config';
const IconGood1 = URL_STATIC + '/appstatic/image/my/icons8-奥运奖牌金牌-48.png';
const IconGood3 = URL_STATIC + '/appstatic/image/my/icons8-奥运奖牌铜牌-48.png';
const IconGood2 = URL_STATIC + '/appstatic/image/my/icons8-奥运奖牌银牌-48.png';

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

    navigateTo({
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
          imageUrl={
            activityTagsImage?.find((item) => item.tags === '港风')?.imageUrl
          }
          iconUrl={IconGood3}
          title="#港风"
          hotness={768}
          onClick={() =>
            handleItemClick(
              activityTagsImage?.find((item) => item.tags === '港风')?.imageUrl,
              '港风',
              `💫寻找电影感场景

              🌆用逆光和柔光创造港风氛围。
              
              💃🏻快来感受香港电影的魅力吧
              
              #港风写真 #香港风情 #电影感 #逆光柔光 #柔焦模式
              `
            )
          }
        />
        <LineSeparator />
        <CardItem
          imageUrl={
            activityTagsImage?.find((item) => item.tags === '焱落纱')?.imageUrl
          }
          iconUrl={IconGood2}
          title="#焱落纱"
          hotness={562}
          onClick={() =>
            handleItemClick(
              activityTagsImage?.find((item) => item.tags === '焱落纱')
                ?.imageUrl,
              '焱落纱',
              `
              🔥轻盈飘逸，如火焰般燃烧！

              💃🏻让你散发出独特而迷人的魅力！

              <原创:麦橘MERJIC>
              
              #焱落纱`
            )
          }
        />
        <LineSeparator />
        <CardItem
          imageUrl={
            activityTagsImage?.find((item) => item.tags === '水果裙')?.imageUrl
          }
          iconUrl={IconGood1}
          title="#水果裙"
          hotness={323}
          onClick={() =>
            handleItemClick(
              activityTagsImage?.find((item) => item.tags === '水果裙')
                ?.imageUrl,
              '水果裙',
              `
              🍉水果图案点缀，色彩缤纷绚丽！
              
              🍍让你在夏日中散发出活力和青春的气息！
              
              <原创:白泽MARS>

              #夏日时尚 #色彩缤纷 #夏日青春
              `
            )
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
          src={imageUrl}
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
