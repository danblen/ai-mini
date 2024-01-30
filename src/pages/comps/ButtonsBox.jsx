import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

export default ({ buttons }) => {
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
        background: '#fff',
      }}
    >
      <View style={{ display: 'flex', justifyContent: 'space-between' }}>
        {buttons.map((button, index) => (
          <View
            key={index}
            className="button-wrapper"
            onClick={() => handleButtonClick(button.pagePath, button.params)}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
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
                }}
              >
                {button.text}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
