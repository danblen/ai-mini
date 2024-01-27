import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import IconGood from '../../static/image/my/icons-good.png';
import IconGood1 from '../../static/image/my/icons-good1.png';

const Buttons = ({ buttons }) => {
  const handleButtonClick = (pagePath, params) => {
    if (!pagePath || !params) {
      console.error('Invalid navigation parameters:', pagePath, params);
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
        padding: '10px',
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '20rpx',
        marginRight: '20rpx',
        borderRadius: '10rpx',
        background: 'linear-gradient(to right, #02ad6e7a, #02ad6e7a)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}>
      <View style={{ display: 'flex', justifyContent: 'space-between' }}>
        {buttons.map((button, index) => (
          <View
            key={index}
            className="button-wrapper"
            onClick={() => handleButtonClick(button.pagePath, button.params)}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}>
              <Image
                src={button.imageUrl}
                style={{ width: '50px', height: '50px' }}
                className="button-image"
              />
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: '5px',
                  flex: 1,
                  color: '#cdcecd',
                }}>
                {button.text}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Buttons;