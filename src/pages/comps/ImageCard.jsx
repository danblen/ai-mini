import { Image, Text, View } from '@tarojs/components';
import { navigateTo } from '../../base/global';
const url = '/pages/faceswap/index';
export default ({ image }) => {
  return (
    <View style={{marginBottom:10}}>
      <Image
        style={Styles.image}
        mode="aspectFill"
        lazyLoad={true}
        className=" "
        onClick={() => {
          navigateTo({
            url:
              url +
              '?imageUrl=' +
              image.momentPics +
              '&momentId=' +
              image.momentId,
          });
        }}
        src={image.momentPics}
      ></Image>

      {/* Displaying file name dynamically */}
      <Text className="ellipsis" style={Styles.text}>
        {image.momentTitle}
      </Text>

      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 12,
          height: 20,
        }}
      >
        <View
          style={{
            flex: '0 0 auto',
          }}
        >
          <Image
            mode="aspectFill"
            src={image.userHeadPic}
            style={{
              width: 20, // 调整为适当的宽度
              height: 20, // 调整为适当的高度
              borderRadius: '50%', // 设置为圆形
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            padding: 5,
            height: 20,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {image.userName}
        </View>
        <View
          style={{
            flex: '0 0 auto',
            height: 20,
          }}
        >
          <View className="at-icon at-icon-eye"></View>
          {image.viewCount}
        </View>
      </View>
    </View>
  );
};
const Styles = {
  image: {
    width: '100%',
    borderRadius: '10rpx',
  },
  text: {
    fontSize: 12,
    flex: 1,
    marginBottom: '5px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2, // 控制显示行数
    color: '#000000',
  },
};
