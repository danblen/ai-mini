import { Image, Text, View } from '@tarojs/components';
import { navigateTo } from '../../base/global';

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
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        background: '#dcdadacf',
        width: '96%',
      }}
    >
      <View style={{ display: 'flex', justifyContent: 'space-around' }}>
        {buttons.map((button, index) => (
          <View
            key={index}
            onClick={() => handleButtonClick(button.pagePath, button.params)}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Image
                style={{
                  width: 40,
                  height: 40,
                }}
                src={button.imageUrl}
              />
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: '5px',
                  fontSize: 12,
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
