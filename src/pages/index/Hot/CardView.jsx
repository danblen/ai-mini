/**
 * @description 生成一个包含左右布局的视图组件，用于展示图片和相关信息。
 * @param {Object} infoLeftImage - 左边大图的信息对象，包括页面路径和参数。
 * @param {Object} infoTopLeftImage - 右边上半部分左侧小图的信息对象，包括页面路径和参数。
 * @param {Object} infoTopRightImage - 右边上半部分右侧小图的信息对象，包括页面路径和参数。
 * @returns {JSX.Element} - 返回一个包含左右布局的视图组件。
 *
 * 此组件用于展示图片和相关信息，分为左右两部分布局，左侧包含大图和右下角角标，右侧包含两个小图和一个长方形图标。
 *
 * @example
 * // Example usage:
 * <CardView
 *    infoLeftImage={{
 *      pagePath: '/pages/activity/Activity',
 *      params: {
 *        imageUrl: allImages?.activityTagsImage?.['影楼'],
 *        title: '影楼',
 *        description: '影楼风格',
 *        pagePath: '/pages/activity/Activity',
 *        text: '影楼风格',
 *      },
 *    }}
 *    infoTopLeftImage={{
 *      pagePath: '/pages/activity/Activity',
 *      params: {
 *        imageUrl: allImages?.activityTagsImage?.['繁花专场'],
 *        title: '繁花专场',
 *        description: '繁花专场\n参与活动，获取丰富奖励~',
 *        pagePath: '/pages/activity/Activity',
 *        text: '繁花专场',
 *      },
 *    }}
 *    infoTopRightImage={{
 *      pagePath: '/pages/activity/Activity',
 *      params: {
 *        imageUrl: allImages?.tagsImage?.['韩式证件照'],
 *        title: '韩式证件照',
 *        description: '韩式证件照\n参与活动，获取丰富奖励~',
 *        pagePath: '/pages/activity/Activity',
 *        text: '韩式证件照',
 *      },
 *    }}
 * />
 */

import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import buttonImages from '../../../static/image/my/dddepth-335.jpg';
import plusIcon from '../../../static/image/my/add.png';

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
        background: '0% 0% / cover rgba(204, 197, 197, 0.5)', // 添加渐变背景
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
                  ? infoLeftImage.params.imageUrl[1]
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
                top: '77%',
                right: '0%',
                width: '100%', // 设置宽度为图片的宽度
                flexDirection: 'row', // 设置为水平排列
                justifyContent: 'center', // 水平居中对齐
                borderRadius: 5, // 继续使用像素值或者修改为 '5px'
                background:
                  'linear-gradient(to top, rgba(23, 24, 25, 0.86) 0%, rgba(23, 24, 25, 0.65) 50%, rgba(33, 150, 243, 0) 100%)', // 使用渐变，但只对PHOTO STUDIO生效
              }}
            >
              <Text
                style={{
                  overflow: 'hidden',
                  color: '#ffffff',
                  textAlign: 'center', // 文字水平居中
                }}
              >
                PHOTO STUDIO{'\n'}
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: '13px',
                    background:
                      'linear-gradient(to top, rgba(23, 24, 25, 0.94), rgba(33, 150, 243, 0))', // PHOTO STUDIO的渐变背景
                  }}
                >
                  影楼风格
                </Text>
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
                borderRadius: 20,
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
                  width: '20px', // 设置图标宽度与字体大小相近
                  height: '20px', // 设置图标高度与字体大小相近
                  marginRight: '5px',
                  borderRadius: '9px',
                  padding: '5px',
                  background: '#40a2dc',
                }}
              />
              <Text
                style={{
                  overflow: 'hidden',
                  color: '#000000',
                  fontWeight: 'bold',
                  fontSize: '24px',
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
