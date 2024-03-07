/**
 * @description 生成一个包含标题和右侧文本按钮的视图组件。
 * @param {string} title - 标题文本。
 * @param {string} rightText - 右侧文本按钮文本。
 * @param {string} imageUrl - 图片 URL。
 * @param {function} onRightClick - 点击右侧文本按钮时的回调函数。
 * @param {Object} infoTopRightImage - 顶部右侧图片信息对象，包括页面路径和参数。
 * @returns {JSX.Element} - 返回一个包含标题和右侧文本按钮的视图组件。
 */

import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

export default ({
  title,
  rightText,
  imageUrl,
  onRightClick,
  infoTopRightImage,
}) => {
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
        display: 'flex',
        justifyContent: 'center',
        height: 40,
        width: '100%',
      }}
    >
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '96%',
        }}
      >
        <View
          style={{
            display: 'flex',
          }}
        >
          {imageUrl && (
            <Image
              style={{
                width: 20,
                height: 20,
                marginRight: 10,
              }}
              src={imageUrl}
            ></Image>
          )}
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            {title}
          </Text>
        </View>
        <View
          style={{
            background: '#038aa038',
            fontSize: 12,
            borderRadius: '6px',
            paddingLeft: '6px',
            paddingRight: '6px',
          }}
          // onClick={onRightClick} //跳转到推荐页
          onClick={() =>
            handleButtonClick(
              infoTopRightImage.pagePath,
              infoTopRightImage.params
            )
          }
        >
          {rightText === undefined ? '全部>' : rightText}
        </View>
      </View>
    </View>
  );
};
