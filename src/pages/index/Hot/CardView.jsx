import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import buttonImages from '../../../static/image/my/mine_bg_3x.png';
import plusIcon from '../../../static/image/my/square-plus-w.png';

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
        backgroundSize: 'cover',
        borderRadius: '10rpx',
        marginTop: '10px',
        marginLeft: '18rpx',
        marginRight: '18rpx',
        backgroundImage:
          'linear-gradient(to right, rgb(181 191 193), rgb(11 118 228 / 48%))', // 添加渐变背景
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
              height: 200,
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
                borderRadius: 5,
                height: 200,
              }}
            />
            {/* 右下角角标 */}
            <View
              style={{
                position: 'absolute',
                top: '84%',
                right: '0%',
                flexDirection: 'row', // 设置为水平排列
                alignItems: 'center', // 垂直居中对齐
                borderRadius: '10px',
                paddingLeft: '10px',
                background: '#2196f394',
              }}
            >
              <Text
                style={{
                  overflow: 'hidden',
                  color: '#ffffff',
                  fontSize: '13px',
                }}
              >
                影楼风格
              </Text>
              <AtIcon value="chevron-right" size="24" color="#cdcecd" />
            </View>
          </View>

          {/* 右侧布局 */}
          <View
            style={{
              width: '49%',
              height: 200,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
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
              <View
                style={{
                  position: 'relative',
                  width: '48%',
                  height: 95,
                  borderRadius: 5,
                }}
              >
                <Image
                  src={
                    infoTopLeftImage.params.imageUrl &&
                    infoTopLeftImage.params.imageUrl.length > 0
                      ? infoTopLeftImage.params.imageUrl[0]
                      : []
                  }
                  mode="aspectFill"
                  style={{ width: '100%', height: 95, borderRadius: 5 }}
                  onClick={() =>
                    handleButtonClick(
                      infoTopLeftImage.pagePath,
                      infoTopLeftImage.params
                    )
                  }
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 5,
                  }}
                >
                  <AtIcon value="chevron-right" size="20" color="#ffffff" />
                </View>
              </View>
              <View
                style={{
                  position: 'relative',
                  width: '48%',
                  height: 95,
                  borderRadius: 5,
                }}
              >
                <Image
                  src={
                    infoTopRightImage.params.imageUrl &&
                    infoTopRightImage.params.imageUrl.length > 0
                      ? infoTopRightImage.params.imageUrl[29]
                      : []
                  }
                  mode="aspectFill"
                  style={{
                    width: '100%',
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
                {/* 右下角角标 */}
                <View
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 5,
                  }}
                >
                  <AtIcon value="chevron-right" size="20" color="#ffffff" />
                </View>
              </View>
            </View>
            {/* 下半部分长方形图 */}
            <View
              style={{
                width: '100%',
                height: 95,
                borderRadius: 5,
                display: 'flex',
                alignItems: 'center', // 垂直居中对齐
                justifyContent: 'center',
                background: `url(${buttonImages})`,
                backgroundSize: 'cover',
              }}
            >
              <Image
                src={plusIcon}
                style={{
                  width: '30px', // 设置图标宽度与字体大小相近
                  height: '30px', // 设置图标高度与字体大小相近
                  marginRight: '10px',
                }}
              />
              <Text
                style={{
                  overflow: 'hidden',
                  color: '#ffffff',
                  fontSize: '26px',
                }}
              >
                开始创作
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
