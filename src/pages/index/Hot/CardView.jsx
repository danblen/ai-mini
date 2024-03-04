import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import iconwechat from '../../../static/image/share/icon_wechat.png';

export default ({ infoLeftImage, infoTopLeftImage, infoTopRightImage }) => {
  const handleButtonClick = (pagePath, params) => {
    if (!pagePath || !params) {
      console.log('Invalid navigation parameters:', pagePath, params);
      return;
    }

    // 对参数进行编码
    const encodedParams = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    const url = `${pagePath}?${encodedParams}`;

    Taro.navigateTo({
      url: url,
    });
  };

  return (
    <View
      style={{
        background: '#ccc5c5', //`url(${iconwechat})`, // 使用 backgroundImage
        backgroundSize: 'cover',
        // height: 240,
        borderRadius: '10rpx',
        marginTop: '10px',
        marginLeft: '18rpx',
        marginRight: '18rpx',
      }}
    >
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '96%',
            justifyContent: 'space-between',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          {/* 左边大图 */}
          <View
            style={{
              width: '49%',
              position: 'relative',
              // height: 200,
            }}
            onClick={() =>
              handleButtonClick(infoLeftImage.pagePath, infoLeftImage.params)
            }
          >
            <Image
              src={
                infoLeftImage.params.imageUrl &&
                infoLeftImage.params.imageUrl.length > 0
                  ? infoLeftImage.params.imageUrl[0]
                  : []
              }
              mode="aspectFill"
              style={{
                width: '100%',
                borderRadius: 10,
                height: 200,
              }}
            />
            <Text
              style={{
                position: 'absolute',
                bottom: 13,
                right: 0,
              }}
            >
              sadads
            </Text>
          </View>
          {/* 右侧布局 */}
          <View
            style={{
              width: '49%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              // height: 200,
            }}
          >
            {/* 上半部分两个小图 */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Image
                // mode="widthFix"
                src={
                  infoTopLeftImage.params.imageUrl &&
                  infoTopLeftImage.params.imageUrl.length > 0
                    ? infoTopLeftImage.params.imageUrl[0]
                    : []
                }
                mode="aspectFill"
                style={{ width: '48%', height: 95, borderRadius: 5 }}
                onClick={() =>
                  handleButtonClick(
                    infoTopLeftImage.pagePath,
                    infoTopLeftImage.params
                  )
                }
              />
              <Image
                // mode="widthFix"
                src={
                  infoTopRightImage.params.imageUrl &&
                  infoTopRightImage.params.imageUrl.length > 0
                    ? infoTopRightImage.params.imageUrl[0]
                    : []
                }
                mode="aspectFill"
                style={{
                  width: '48%',
                  height: 95,
                  borderRadius: 5,
                  objectFit: 'cover', // 使用 cover 模式填充容器，保持原始宽高比
                  objectPosition: 'center', // 图片居中显示，避免左右留白
                }}
                onClick={() =>
                  handleButtonClick(
                    infoTopRightImage.pagePath,
                    infoTopRightImage.params
                  )
                }
              />
            </View>
            <View>
              {/* 下半部分长方形图 */}
              <Image
                src="https://facei.top/static/allImages/activity_tags/%E6%B8%AF%E9%A3%8E/lszu7ifdfwjkb-1.jpg"
                style={{
                  width: '100%',
                  height: 95,
                  borderRadius: 5,
                  // marginTop: '5px',
                  // objectFit: 'cover',
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
